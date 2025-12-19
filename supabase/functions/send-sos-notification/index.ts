import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SOSRequest {
  user_id: string;
  latitude: number | null;
  longitude: number | null;
  location_name: string | null;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { user_id, latitude, longitude, location_name }: SOSRequest = await req.json();
    
    console.log("Received SOS request for user:", user_id);
    console.log("Location:", { latitude, longitude, location_name });

    // Get user's profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("display_name, phone")
      .eq("id", user_id)
      .maybeSingle();

    if (profileError) {
      console.error("Error fetching profile:", profileError);
    }

    const userName = profile?.display_name || "A user";

    // Get trusted contacts
    const { data: contacts, error: contactsError } = await supabase
      .from("trusted_contacts")
      .select("name, phone, email, relationship")
      .eq("user_id", user_id);

    if (contactsError) {
      console.error("Error fetching contacts:", contactsError);
      throw new Error("Failed to fetch trusted contacts");
    }

    console.log("Found contacts:", contacts?.length || 0);

    // Create the emergency alert record
    const { data: alert, error: alertError } = await supabase
      .from("emergency_alerts")
      .insert({
        user_id,
        latitude,
        longitude,
        location_name,
        status: "active",
      })
      .select()
      .single();

    if (alertError) {
      console.error("Error creating alert:", alertError);
      throw new Error("Failed to create emergency alert");
    }

    console.log("Created alert:", alert.id);

    // Build Google Maps link
    const mapsLink = latitude && longitude 
      ? `https://www.google.com/maps?q=${latitude},${longitude}`
      : "Location unavailable";

    const locationText = location_name || (latitude && longitude ? `${latitude.toFixed(6)}, ${longitude.toFixed(6)}` : "Unknown location");

    // Send email notifications to contacts (using Resend)
    const contactsWithEmail = (contacts || []).filter(c => c.email);
    console.log(`Contacts with email: ${contactsWithEmail.length}`);
    
    const emailPromises = contactsWithEmail.map(async (contact) => {
      console.log(`Sending email notification to ${contact.name} (${contact.email}) for emergency from ${userName}`);
      
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "SafeHer <onboarding@resend.dev>",
            to: [contact.email],
            subject: `🚨 EMERGENCY ALERT from ${userName}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: #dc2626; color: white; padding: 20px; text-align: center;">
                  <h1 style="margin: 0;">🚨 EMERGENCY ALERT</h1>
                </div>
                <div style="padding: 20px; background: #fef2f2;">
                  <h2 style="color: #dc2626;">${userName} needs help!</h2>
                  <p style="font-size: 16px;">This is an emergency SOS alert. ${userName} has triggered their safety alert and may need immediate assistance.</p>
                  
                  <div style="background: white; border-radius: 8px; padding: 15px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #374151;">📍 Location</h3>
                    <p style="margin: 5px 0;"><strong>Address:</strong> ${locationText}</p>
                    ${latitude && longitude ? `<p style="margin: 5px 0;"><a href="${mapsLink}" style="color: #dc2626; font-weight: bold;">View on Google Maps →</a></p>` : ''}
                  </div>
                  
                  <div style="background: white; border-radius: 8px; padding: 15px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #374151;">What to do</h3>
                    <ol style="margin: 0; padding-left: 20px;">
                      <li>Try to contact ${userName} immediately</li>
                      <li>If no response, consider calling emergency services (911)</li>
                      <li>Go to their location if safe to do so</li>
                    </ol>
                  </div>
                  
                  <p style="color: #6b7280; font-size: 14px;">
                    Alert sent at: ${new Date().toISOString()}<br>
                    You received this because you are listed as a trusted contact.
                  </p>
                </div>
              </div>
            `,
          }),
        });
        
        const result = await emailResponse.json();
        console.log(`Email sent successfully:`, result);
        return { success: true, contact: contact.name };
      } catch (emailError) {
        console.error(`Failed to send email to ${contact.name}:`, emailError);
        return { success: false, contact: contact.name, error: emailError };
      }
    });

    const emailResults = await Promise.all(emailPromises);
    console.log("Email results:", emailResults);

    return new Response(
      JSON.stringify({
        success: true,
        alertId: alert.id,
        contactsNotified: contactsWithEmail.length,
        totalContacts: contacts?.length || 0,
        location: { latitude, longitude, location_name },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-sos-notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
