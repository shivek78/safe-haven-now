import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BottomNavigation, PageHeader } from "@/components/Navigation";
import {
  AlertTriangle,
  Phone,
  MapPin,
  FileText,
  Users,
  Shield,
  ChevronRight,
  Bell,
  UserPlus,
} from "lucide-react";

const quickActions = [
  {
    icon: Phone,
    label: "Resources",
    description: "Hotlines & support",
    path: "/resources",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: MapPin,
    label: "Location",
    description: "Share your location",
    path: "/home",
    color: "bg-success/10 text-success",
  },
  {
    icon: FileText,
    label: "Report",
    description: "Report incident",
    path: "/report",
    color: "bg-warning/10 text-warning",
  },
  {
    icon: UserPlus,
    label: "Contacts",
    description: "Trusted people",
    path: "/contacts",
    color: "bg-primary/10 text-primary",
  },
];

const recentAlerts = [
  {
    id: 1,
    title: "Safety Alert",
    description: "Increased activity reported near Downtown area",
    time: "2 hours ago",
    type: "warning",
  },
  {
    id: 2,
    title: "Community Update",
    description: "New safe walking routes added in your area",
    time: "5 hours ago",
    type: "info",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [userName] = useState("Sarah");

  return (
    <div className="min-h-screen bg-gradient-hero pb-24">
      <PageHeader
        title={`Hi, ${userName}`}
        subtitle="Stay safe today"
        action={
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </Button>
        }
      />

      <main className="container max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* SOS Button Section */}
        <section className="text-center space-y-4">
          <div className="relative inline-flex">
            <Button
              variant="emergency"
              size="icon-xl"
              className="w-32 h-32 text-2xl font-bold"
              onClick={() => navigate("/emergency")}
            >
              <div className="flex flex-col items-center gap-1">
                <AlertTriangle className="w-10 h-10" />
                <span>SOS</span>
              </div>
            </Button>
            {/* Pulse rings */}
            <div className="absolute inset-0 rounded-full border-2 border-destructive/30 animate-ping" />
            <div className="absolute inset-[-8px] rounded-full border border-destructive/20 animate-pulse" />
          </div>
          <p className="text-sm text-muted-foreground">
            Tap to send emergency alert to your trusted contacts
          </p>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Card
                  key={action.label}
                  variant="elevated"
                  className="cursor-pointer hover:scale-[1.02] transition-transform"
                  onClick={() => navigate(action.path)}
                >
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl ${action.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm">{action.label}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {action.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Safety Tips Card */}
        <Card
          variant="elevated"
          className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate("/safety-tips")}
        >
          <CardContent className="p-0">
            <div className="bg-gradient-primary p-4 flex items-center gap-4">
              <div className="p-3 bg-primary-foreground/20 rounded-xl">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-primary-foreground">Safety Tips</h3>
                <p className="text-sm text-primary-foreground/80">
                  Learn essential self-defense techniques
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-primary-foreground/60" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Recent Alerts
            </h2>
            <Button variant="ghost" size="sm" onClick={() => navigate("/community")}>
              View all
            </Button>
          </div>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <Card key={alert.id} className="animate-fade-in">
                <CardContent className="p-4 flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      alert.type === "warning"
                        ? "bg-warning/10 text-warning"
                        : "bg-accent/10 text-accent"
                    }`}
                  >
                    <Bell className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm">{alert.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {alert.description}
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-1">{alert.time}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
}
