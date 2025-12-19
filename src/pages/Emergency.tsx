import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, X, MapPin, Shield, AlertTriangle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface LocationData {
  latitude: number | null;
  longitude: number | null;
  locationName: string | null;
}

export default function Emergency() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [countdown, setCountdown] = useState(5);
  const [alertSent, setAlertSent] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [location, setLocation] = useState<LocationData>({
    latitude: null,
    longitude: null,
    locationName: null,
  });
  const [isGettingLocation, setIsGettingLocation] = useState(true);
  const [contactsNotified, setContactsNotified] = useState(0);

  // Get GPS location on mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Got GPS coordinates:", latitude, longitude);
          
          // Try to get address from coordinates using reverse geocoding
          let locationName = null;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            locationName = data.display_name || null;
            console.log("Reverse geocoded address:", locationName);
          } catch (error) {
            console.error("Failed to reverse geocode:", error);
          }

          setLocation({ latitude, longitude, locationName });
          setIsGettingLocation(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setIsGettingLocation(false);
          toast.error("Could not get your location. Alert will still be sent.");
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setIsGettingLocation(false);
      toast.error("Geolocation not supported by your browser.");
    }
  }, []);

  // Countdown and send alert
  useEffect(() => {
    if (isCancelled || alertSent || isGettingLocation) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          sendEmergencyAlert();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isCancelled, alertSent, isGettingLocation]);

  const sendEmergencyAlert = async () => {
    if (!user) {
      toast.error("You must be logged in to send alerts");
      return;
    }

    try {
      console.log("Sending emergency alert with location:", location);
      
      const { data, error } = await supabase.functions.invoke("send-sos-notification", {
        body: {
          user_id: user.id,
          latitude: location.latitude,
          longitude: location.longitude,
          location_name: location.locationName,
        },
      });

      if (error) {
        console.error("Error sending alert:", error);
        toast.error("Failed to send alert. Please call emergency services directly.");
        return;
      }

      console.log("Alert sent successfully:", data);
      setContactsNotified(data.contactsNotified || 0);
      setAlertSent(true);
      toast.success("Emergency alert sent to your trusted contacts!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send alert. Please call emergency services directly.");
    }
  };

  const handleCancel = () => {
    setIsCancelled(true);
    navigate("/home");
  };

  const handleCallEmergency = () => {
    window.location.href = "tel:911";
  };

  if (alertSent) {
    return (
      <div className="min-h-screen bg-gradient-emergency flex flex-col items-center justify-center p-6 text-primary-foreground">
        <div className="animate-fade-in text-center space-y-6">
          <div className="w-24 h-24 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto">
            <Shield className="w-12 h-12" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Alert Sent!</h1>
            <p className="text-primary-foreground/80 max-w-xs mx-auto">
              Your trusted contacts have been notified with your current location.
            </p>
          </div>

          <div className="bg-primary-foreground/10 rounded-2xl p-4 space-y-3 max-w-xs mx-auto">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              <div className="text-left">
                <p className="text-sm font-medium">Location shared</p>
                <p className="text-xs text-primary-foreground/70">
                  {location.locationName 
                    ? location.locationName.substring(0, 50) + "..."
                    : location.latitude && location.longitude
                    ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
                    : "Location unavailable"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5" />
              <div className="text-left">
                <p className="text-sm font-medium">{contactsNotified} contacts notified</p>
                <p className="text-xs text-primary-foreground/70">Email notification sent</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <Button
              size="xl"
              className="w-full max-w-xs bg-primary-foreground text-destructive hover:bg-primary-foreground/90"
              onClick={handleCallEmergency}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Emergency Services
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="w-full max-w-xs text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => navigate("/home")}
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-emergency flex flex-col items-center justify-center p-6 text-primary-foreground">
      <div className="text-center space-y-8 animate-fade-in">
        <div className="relative">
          <div className="w-40 h-40 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto animate-pulse-glow">
            <div className="w-32 h-32 rounded-full bg-primary-foreground/30 flex items-center justify-center">
              {isGettingLocation ? (
                <Loader2 className="w-16 h-16 animate-spin" />
              ) : (
                <AlertTriangle className="w-16 h-16" />
              )}
            </div>
          </div>
          {/* Countdown */}
          {!isGettingLocation && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold">{countdown}</span>
            </div>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-2">
            {isGettingLocation ? "Getting Your Location..." : "Sending Emergency Alert"}
          </h1>
          <p className="text-primary-foreground/80">
            {isGettingLocation 
              ? "Please allow location access for accurate help"
              : "Alert will be sent to your trusted contacts"}
          </p>
        </div>

        {location.latitude && location.longitude && (
          <div className="bg-primary-foreground/10 rounded-xl p-3 max-w-xs mx-auto">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4" />
              <span className="truncate">
                {location.locationName 
                  ? location.locationName.substring(0, 40) + "..."
                  : `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`}
              </span>
            </div>
          </div>
        )}

        <Button
          size="xl"
          className="w-full max-w-xs bg-primary-foreground text-destructive hover:bg-primary-foreground/90"
          onClick={handleCancel}
        >
          <X className="w-5 h-5 mr-2" />
          Cancel Alert
        </Button>

        <p className="text-sm text-primary-foreground/60">
          Your location will be shared when the alert is sent
        </p>
      </div>
    </div>
  );
}
