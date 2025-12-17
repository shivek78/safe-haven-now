import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { BottomNavigation, PageHeader } from "@/components/Navigation";
import { Search, Phone, Globe, Clock, MapPin, ChevronRight, Shield } from "lucide-react";

const categories = [
  { id: "all", label: "All" },
  { id: "emergency", label: "Emergency" },
  { id: "support", label: "Support" },
  { id: "legal", label: "Legal" },
  { id: "medical", label: "Medical" },
];

const resources = [
  {
    id: 1,
    name: "National Domestic Violence Hotline",
    phone: "1-800-799-7233",
    category: "emergency",
    available: "24/7",
    description: "Free, confidential support for victims of domestic violence",
  },
  {
    id: 2,
    name: "RAINN Sexual Assault Hotline",
    phone: "1-800-656-4673",
    category: "support",
    available: "24/7",
    description: "Support for survivors of sexual violence and their loved ones",
  },
  {
    id: 3,
    name: "National Sexual Assault Hotline",
    phone: "1-800-656-4673",
    category: "emergency",
    available: "24/7",
    description: "Confidential support from trained staff members",
  },
  {
    id: 4,
    name: "Women's Law Legal Help",
    phone: "1-800-799-7233",
    category: "legal",
    available: "Mon-Fri 9am-5pm",
    description: "Legal information and resources for survivors",
  },
  {
    id: 5,
    name: "Crisis Text Line",
    phone: "Text HOME to 741741",
    category: "support",
    available: "24/7",
    description: "Free crisis counseling via text message",
  },
  {
    id: 6,
    name: "Planned Parenthood",
    phone: "1-800-230-7526",
    category: "medical",
    available: "Varies by location",
    description: "Reproductive health services and support",
  },
];

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || resource.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCall = (phone: string) => {
    if (phone.startsWith("Text")) {
      // Open SMS
      window.location.href = `sms:741741?body=HOME`;
    } else {
      window.location.href = `tel:${phone.replace(/[^0-9]/g, "")}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero pb-24">
      <PageHeader title="Resources" subtitle="Help is always available" />

      <main className="container max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Emergency Banner */}
        <Card className="bg-gradient-emergency border-0 overflow-hidden">
          <CardContent className="p-4 flex items-center gap-4 text-primary-foreground">
            <div className="p-3 bg-primary-foreground/20 rounded-xl">
              <Phone className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Emergency? Call 911</p>
              <p className="text-sm text-primary-foreground/80">
                For immediate danger, call emergency services
              </p>
            </div>
            <Button
              size="sm"
              className="bg-primary-foreground text-destructive hover:bg-primary-foreground/90"
              onClick={() => (window.location.href = "tel:911")}
            >
              Call
            </Button>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-12"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "secondary"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className="shrink-0"
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Resource List */}
        <div className="space-y-3">
          {filteredResources.map((resource) => (
            <Card key={resource.id} variant="elevated" className="animate-fade-in">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-sm line-clamp-1">
                      {resource.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {resource.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {resource.available}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCall(resource.phone)}
                    className="shrink-0"
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                </div>
                <p className="text-sm font-medium text-primary mt-3">{resource.phone}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <Shield className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-muted-foreground">No resources found</p>
            <p className="text-sm text-muted-foreground/60">Try adjusting your search</p>
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}
