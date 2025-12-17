import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { BottomNavigation, PageHeader } from "@/components/Navigation";
import {
  Search,
  MapPin,
  Clock,
  AlertTriangle,
  MessageCircle,
  Heart,
  Share2,
  Plus,
  Shield,
  Users,
} from "lucide-react";

const communityPosts = [
  {
    id: 1,
    user: "Sarah M.",
    avatar: "S",
    type: "alert",
    title: "Safety Alert",
    content: "Suspicious individual reported near Oak Street Park around 8pm. Please be cautious if walking alone.",
    location: "Oak Street Park",
    time: "15 min ago",
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    user: "Community Watch",
    avatar: "C",
    type: "update",
    title: "New Safe Zone",
    content: "Great news! The new well-lit walking path on Maple Avenue is now open. Feel free to add it to your safe routes!",
    location: "Maple Avenue",
    time: "2 hours ago",
    likes: 56,
    comments: 12,
  },
  {
    id: 3,
    user: "Emily R.",
    avatar: "E",
    type: "tip",
    title: "Safety Tip",
    content: "Always share your live location with a trusted contact when walking home late. It only takes a few seconds!",
    time: "4 hours ago",
    likes: 89,
    comments: 15,
  },
  {
    id: 4,
    user: "Local Police",
    avatar: "P",
    type: "alert",
    title: "Traffic Advisory",
    content: "Increased foot patrol in downtown area this weekend. Feel safer knowing we're around!",
    location: "Downtown",
    time: "6 hours ago",
    likes: 112,
    comments: 23,
  },
];

const typeStyles = {
  alert: "bg-destructive/10 text-destructive",
  update: "bg-success/10 text-success",
  tip: "bg-accent/10 text-accent",
};

const typeIcons = {
  alert: AlertTriangle,
  update: Shield,
  tip: MessageCircle,
};

export default function Community() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = communityPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-hero pb-24">
      <PageHeader
        title="Community"
        subtitle="Stay informed, stay safe"
        action={
          <Button size="icon" variant="default">
            <Plus className="w-5 h-5" />
          </Button>
        }
      />

      <main className="container max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card variant="elevated">
            <CardContent className="p-3 text-center">
              <Users className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">2.4K</p>
              <p className="text-xs text-muted-foreground">Members</p>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent className="p-3 text-center">
              <AlertTriangle className="w-5 h-5 text-warning mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">12</p>
              <p className="text-xs text-muted-foreground">Alerts Today</p>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent className="p-3 text-center">
              <Shield className="w-5 h-5 text-success mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">98%</p>
              <p className="text-xs text-muted-foreground">Safe Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search community posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-12"
          />
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {filteredPosts.map((post) => {
            const TypeIcon = typeIcons[post.type as keyof typeof typeIcons];
            return (
              <Card key={post.id} variant="elevated" className="animate-fade-in">
                <CardContent className="p-4">
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {post.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-foreground text-sm">
                          {post.user}
                        </p>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            typeStyles[post.type as keyof typeof typeStyles]
                          }`}
                        >
                          {post.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {post.time}
                        {post.location && (
                          <>
                            <span>•</span>
                            <MapPin className="w-3 h-3" />
                            {post.location}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-sm text-foreground mb-4">{post.content}</p>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-3 border-t border-border">
                    <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors ml-auto">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
