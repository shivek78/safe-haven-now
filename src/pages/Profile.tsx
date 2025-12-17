import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { BottomNavigation, PageHeader } from "@/components/Navigation";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  Moon,
  Globe,
  Lock,
  HelpCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const settingsGroups = [
  {
    title: "Preferences",
    items: [
      {
        icon: Bell,
        label: "Notifications",
        description: "Push notifications and alerts",
        type: "toggle",
        value: true,
      },
      {
        icon: MapPin,
        label: "Location Services",
        description: "Allow location sharing",
        type: "toggle",
        value: true,
      },
      {
        icon: Moon,
        label: "Dark Mode",
        description: "Use dark theme",
        type: "toggle",
        value: false,
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
  const [user] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    avatar: "S",
  });

  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({
    Notifications: true,
    "Location Services": true,
    "Dark Mode": false,
  });

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

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-hero pb-24">
      <PageHeader title="Profile" subtitle="Manage your account" />

      <main className="container max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Profile Card */}
        <Card variant="elevated">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-glow">
                {user.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-foreground">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground">{user.phone}</p>
              </div>
              <Button variant="outline" size="sm">
                Edit
              </Button>
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
                3 trusted contacts • Location sharing on
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
                {group.items.map((item, index) => {
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
