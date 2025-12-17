import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BottomNavigation, PageHeader } from "@/components/Navigation";
import {
  Shield,
  AlertTriangle,
  MapPin,
  Phone,
  Eye,
  Users,
  ChevronRight,
  Play,
  BookOpen,
  Zap,
} from "lucide-react";

const safetyCategories = [
  {
    id: "awareness",
    icon: Eye,
    title: "Situational Awareness",
    color: "bg-accent/10 text-accent",
  },
  {
    id: "physical",
    icon: Shield,
    title: "Physical Safety",
    color: "bg-primary/10 text-primary",
  },
  {
    id: "digital",
    icon: Zap,
    title: "Digital Safety",
    color: "bg-warning/10 text-warning",
  },
  {
    id: "travel",
    icon: MapPin,
    title: "Travel Safety",
    color: "bg-success/10 text-success",
  },
];

const safetyTips = [
  {
    id: 1,
    category: "awareness",
    title: "Trust Your Instincts",
    content: "If something feels wrong, it probably is. Don't ignore your gut feelings about people or situations.",
    icon: Eye,
  },
  {
    id: 2,
    category: "awareness",
    title: "Stay Alert in Public",
    content: "Avoid distractions like looking at your phone while walking. Keep your head up and be aware of your surroundings.",
    icon: AlertTriangle,
  },
  {
    id: 3,
    category: "physical",
    title: "Basic Self-Defense Moves",
    content: "Learn basic moves like palm strikes, knee kicks, and how to break free from common holds. Practice regularly.",
    icon: Shield,
  },
  {
    id: 4,
    category: "physical",
    title: "Keys as a Tool",
    content: "Hold your keys between your fingers when walking alone. They can be used to create distance if needed.",
    icon: Shield,
  },
  {
    id: 5,
    category: "digital",
    title: "Location Sharing",
    content: "Share your live location with trusted contacts when traveling alone, especially at night.",
    icon: MapPin,
  },
  {
    id: 6,
    category: "digital",
    title: "Emergency Contacts",
    content: "Set up emergency contacts on your phone that can be accessed from the lock screen.",
    icon: Phone,
  },
  {
    id: 7,
    category: "travel",
    title: "Safe Transportation",
    content: "Verify rideshare details before getting in. Share your trip with friends and sit behind the driver.",
    icon: MapPin,
  },
  {
    id: 8,
    category: "travel",
    title: "Well-Lit Routes",
    content: "Choose well-lit, populated routes even if they take longer. Avoid shortcuts through isolated areas.",
    icon: Eye,
  },
];

const selfDefenseVideos = [
  {
    id: 1,
    title: "Breaking Free from Wrist Grabs",
    duration: "3:45",
    thumbnail: "Self-defense techniques",
  },
  {
    id: 2,
    title: "Effective Palm Strikes",
    duration: "2:30",
    thumbnail: "Palm strike defense",
  },
  {
    id: 3,
    title: "Creating Distance Safely",
    duration: "4:15",
    thumbnail: "Distance creation",
  },
];

export default function SafetyTips() {
  const [activeCategory, setActiveCategory] = useState("awareness");

  const filteredTips = safetyTips.filter((tip) => tip.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-hero pb-24">
      <PageHeader title="Safety Tips" subtitle="Knowledge is your best defense" />

      <main className="container max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Hero Card */}
        <Card className="bg-gradient-primary border-0 overflow-hidden">
          <CardContent className="p-5 text-primary-foreground">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary-foreground/20 rounded-xl">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-lg font-bold mb-1">Stay Prepared</h2>
                <p className="text-sm text-primary-foreground/80">
                  Learn essential safety tips and self-defense techniques to protect yourself.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-3">
          {safetyCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <Card
                key={category.id}
                variant={isActive ? "elevated" : "default"}
                className={`cursor-pointer transition-all ${
                  isActive ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${category.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{category.title}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tips List */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Tips & Guides
          </h2>
          <div className="space-y-3">
            {filteredTips.map((tip) => {
              const Icon = tip.icon;
              return (
                <Card key={tip.id} variant="elevated" className="animate-fade-in">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm mb-1">
                          {tip.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{tip.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Self Defense Videos */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Self-Defense Videos
            </h2>
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </div>
          <div className="space-y-3">
            {selfDefenseVideos.map((video) => (
              <Card key={video.id} variant="elevated" className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-20 h-14 rounded-lg bg-muted flex items-center justify-center">
                    <Play className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground text-sm line-clamp-1">
                      {video.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{video.duration}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Emergency Info */}
        <Card className="bg-destructive/5 border-destructive/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground text-sm">In Case of Emergency</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  If you're in immediate danger, call 911 or use the SOS button to alert your
                  trusted contacts instantly.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
}
