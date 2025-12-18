import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { BottomNavigation, PageHeader } from "@/components/Navigation";
import {
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  Moon,
  Globe,
  Lock,
  HelpCircle,
  MapPin,
  Loader2,
  Save,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Profile {
  display_name: string | null;
  phone: string | null;
  emergency_medical_info: string | null;
  blood_type: string | null;
  allergies: string | null;
  emergency_instructions: string | null;
}

const settingsGroups = [
  {
    title: "Preferences",
    items: [
      {
        icon: Bell,
        label: "Notifications",
        description: "Push notifications and alerts",
        type: "toggle",
      },
      {
        icon: MapPin,
        label: "Location Services",
        description: "Allow location sharing",
        type: "toggle",
      },
      {
        icon: Moon,
        label: "Dark Mode",
        description: "Use dark theme",
        type: "toggle",
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        icon: Lock,
        label: "Privacy & Security",
        description: "Password, 2FA settings",
        type: "link",
      },
      {
        icon: Globe,
        label: "Language",
        description: "English (US)",
        type: "link",
      },
      {
        icon: HelpCircle,
        label: "Help & Support",
        description: "FAQs, contact support",
        type: "link",
      },
    ],
  },
];

export default function Profile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [contactsCount, setContactsCount] = useState(0);
  const [editForm, setEditForm] = useState<Profile>({
    display_name: "",
    phone: "",
    emergency_medical_info: "",
    blood_type: "",
    allergies: "",
    emergency_instructions: "",
  });

  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({
    Notifications: true,
    "Location Services": true,
    "Dark Mode": false,
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchContactsCount();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .maybeSingle();

      if (error) throw error;
      
      setProfile(data);
      if (data) {
        setEditForm({
          display_name: data.display_name || "",
          phone: data.phone || "",
          emergency_medical_info: data.emergency_medical_info || "",
          blood_type: data.blood_type || "",
          allergies: data.allergies || "",
          emergency_instructions: data.emergency_instructions || "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchContactsCount = async () => {
    try {
      const { count } = await supabase
        .from("trusted_contacts")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user?.id);

      setContactsCount(count || 0);
    } catch (error) {
      console.error("Error fetching contacts count:", error);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user?.id,
          ...editForm,
        });

      if (error) throw error;

      setProfile({ ...profile, ...editForm });
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been saved successfully.",
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description: "Failed to save profile.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = (label: string) => {
    setToggleStates((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
    toast({
      title: `${label} ${toggleStates[label] ? "disabled" : "enabled"}`,
      description: `Your preference has been updated.`,
    });
  };

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero pb-24">
      <PageHeader title="Profile" subtitle="Manage your account" />

      <main className="container max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Profile Card */}
        <Card variant="elevated">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-glow">
                {profile?.display_name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-foreground">
                  {profile?.display_name || "Set your name"}
                </h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                {profile?.phone && (
                  <p className="text-sm text-muted-foreground">{profile.phone}</p>
                )}
              </div>
              <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="display_name">Display Name</Label>
                      <Input
                        id="display_name"
                        placeholder="Your name"
                        value={editForm.display_name || ""}
                        onChange={(e) => setEditForm({ ...editForm, display_name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={editForm.phone || ""}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="blood_type">Blood Type</Label>
                      <Input
                        id="blood_type"
                        placeholder="e.g., A+, O-"
                        value={editForm.blood_type || ""}
                        onChange={(e) => setEditForm({ ...editForm, blood_type: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="allergies">Allergies</Label>
                      <Input
                        id="allergies"
                        placeholder="List any allergies"
                        value={editForm.allergies || ""}
                        onChange={(e) => setEditForm({ ...editForm, allergies: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergency_medical_info">Medical Conditions</Label>
                      <Textarea
                        id="emergency_medical_info"
                        placeholder="Any important medical information"
                        value={editForm.emergency_medical_info || ""}
                        onChange={(e) => setEditForm({ ...editForm, emergency_medical_info: e.target.value })}
                        className="min-h-[80px] resize-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergency_instructions">Emergency Instructions</Label>
                      <Textarea
                        id="emergency_instructions"
                        placeholder="Special instructions for emergencies"
                        value={editForm.emergency_instructions || ""}
                        onChange={(e) => setEditForm({ ...editForm, emergency_instructions: e.target.value })}
                        className="min-h-[80px] resize-none"
                      />
                    </div>
                    <Button className="w-full" onClick={handleSaveProfile} disabled={saving}>
                      {saving ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      Save Profile
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Safety Status */}
        <Card className="bg-success/5 border-success/20">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-success/10">
              <Shield className="w-6 h-6 text-success" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Safety Status: Active</h3>
              <p className="text-sm text-muted-foreground">
                {contactsCount} trusted contact{contactsCount !== 1 ? "s" : ""} • Location sharing {toggleStates["Location Services"] ? "on" : "off"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        {settingsGroups.map((group) => (
          <section key={group.title}>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              {group.title}
            </h2>
            <Card variant="elevated">
              <CardContent className="p-0 divide-y divide-border">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-muted">
                        <Icon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                      {item.type === "toggle" ? (
                        <Switch
                          checked={toggleStates[item.label]}
                          onCheckedChange={() => handleToggle(item.label)}
                        />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </section>
        ))}

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full text-destructive border-destructive/30 hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Log Out
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          SafeHer v1.0.0 • Made with ❤️ for women's safety
        </p>
      </main>

      <BottomNavigation />
    </div>
  );
}
