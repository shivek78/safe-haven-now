import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Loader2,
  X,
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
import { formatDistanceToNow } from "date-fns";

interface CommunityPost {
  id: string;
  user_id: string;
  content: string;
  post_type: string | null;
  location_name: string | null;
  likes_count: number;
  is_anonymous: boolean;
  created_at: string;
  profiles?: {
    display_name: string | null;
  };
}

const typeStyles: Record<string, string> = {
  alert: "bg-destructive/10 text-destructive",
  update: "bg-success/10 text-success",
  tip: "bg-accent/10 text-accent",
  general: "bg-muted text-muted-foreground",
};

const typeIcons: Record<string, typeof AlertTriangle> = {
  alert: AlertTriangle,
  update: Shield,
  tip: MessageCircle,
  general: MessageCircle,
};

const postTypes = [
  { id: "general", label: "General" },
  { id: "alert", label: "Safety Alert" },
  { id: "tip", label: "Safety Tip" },
  { id: "update", label: "Update" },
];

export default function Community() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newPost, setNewPost] = useState({
    content: "",
    post_type: "general",
    location_name: "",
    is_anonymous: false,
  });

  useEffect(() => {
    fetchPosts();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("community-posts")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "community_posts",
        },
        (payload) => {
          setPosts((prev) => [payload.new as CommunityPost, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("community_posts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast({
        title: "Error",
        description: "Failed to load community posts.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.content.trim()) {
      toast({
        title: "Missing content",
        description: "Please write something to share.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.from("community_posts").insert({
        user_id: user?.id,
        content: newPost.content,
        post_type: newPost.post_type,
        location_name: newPost.location_name || null,
        is_anonymous: newPost.is_anonymous,
      });

      if (error) throw error;

      setNewPost({ content: "", post_type: "general", location_name: "", is_anonymous: false });
      setIsCreatingPost(false);
      toast({
        title: "Post shared",
        description: "Your post has been shared with the community.",
      });
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        title: "Error",
        description: "Failed to create post.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.location_name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
  );

  return (
    <div className="min-h-screen bg-gradient-hero pb-24">
      <PageHeader
        title="Community"
        subtitle="Stay informed, stay safe"
        action={
          <Dialog open={isCreatingPost} onOpenChange={setIsCreatingPost}>
            <DialogTrigger asChild>
              <Button size="icon" variant="default">
                <Plus className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share with Community</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Post Type</Label>
                  <div className="flex flex-wrap gap-2">
                    {postTypes.map((type) => (
                      <Button
                        key={type.id}
                        type="button"
                        variant={newPost.post_type === type.id ? "default" : "secondary"}
                        size="sm"
                        onClick={() => setNewPost({ ...newPost, post_type: type.id })}
                      >
                        {type.label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Message *</Label>
                  <Textarea
                    id="content"
                    placeholder="Share a safety tip, alert, or update..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    className="min-h-[100px] resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location (optional)</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Downtown, Oak Street"
                    value={newPost.location_name}
                    onChange={(e) => setNewPost({ ...newPost, location_name: e.target.value })}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={newPost.is_anonymous}
                    onChange={(e) => setNewPost({ ...newPost, is_anonymous: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="anonymous" className="text-sm font-normal">
                    Post anonymously
                  </Label>
                </div>
                <Button className="w-full" onClick={handleCreatePost} disabled={saving}>
                  {saving ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  Share Post
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <main className="container max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card variant="elevated">
            <CardContent className="p-3 text-center">
              <Users className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">{posts.length}</p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent className="p-3 text-center">
              <AlertTriangle className="w-5 h-5 text-warning mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">
                {posts.filter((p) => p.post_type === "alert").length}
              </p>
              <p className="text-xs text-muted-foreground">Alerts</p>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent className="p-3 text-center">
              <Shield className="w-5 h-5 text-success mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">
                {posts.filter((p) => p.post_type === "tip").length}
              </p>
              <p className="text-xs text-muted-foreground">Tips</p>
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
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => {
              const TypeIcon = typeIcons[post.post_type || "general"] || MessageCircle;
              return (
                <Card key={post.id} variant="elevated" className="animate-fade-in">
                  <CardContent className="p-4">
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                        {post.is_anonymous ? "?" : "U"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-foreground text-sm">
                            {post.is_anonymous ? "Anonymous" : "Community Member"}
                          </p>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              typeStyles[post.post_type || "general"]
                            }`}
                          >
                            {post.post_type === "alert" ? "Safety Alert" : 
                             post.post_type === "tip" ? "Safety Tip" :
                             post.post_type === "update" ? "Update" : "General"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                          {post.location_name && (
                            <>
                              <span>•</span>
                              <MapPin className="w-3 h-3" />
                              {post.location_name}
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
                        <span className="text-sm">{post.likes_count}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors ml-auto">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {filteredPosts.length === 0 && !loading && (
              <div className="text-center py-12">
                <MessageCircle className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-muted-foreground">No posts yet</p>
                <p className="text-sm text-muted-foreground/60">
                  Be the first to share with the community
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}
