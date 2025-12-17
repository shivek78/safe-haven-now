import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BottomNavigation, PageHeader } from "@/components/Navigation";
import {
  MapPin,
  Calendar,
  Clock,
  AlertTriangle,
  Camera,
  Send,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const incidentTypes = [
  { id: "harassment", label: "Harassment" },
  { id: "stalking", label: "Stalking" },
  { id: "unsafe-area", label: "Unsafe Area" },
  { id: "suspicious", label: "Suspicious Activity" },
  { id: "assault", label: "Assault" },
  { id: "other", label: "Other" },
];

export default function Report() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      toast({
        title: "Report submitted",
        description: "Thank you for helping keep our community safe.",
      });
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-hero pb-24">
        <PageHeader title="Report Submitted" />
        <main className="container max-w-lg mx-auto px-4 py-12">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Thank You
              </h2>
              <p className="text-muted-foreground max-w-xs mx-auto">
                Your report has been submitted and will help keep our community safe.
              </p>
            </div>
            <Button
              size="lg"
              onClick={() => {
                setSubmitted(false);
                setSelectedType("");
                setDescription("");
                setLocation("");
              }}
            >
              Submit Another Report
            </Button>
          </div>
        </main>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero pb-24">
      <PageHeader title="Report Incident" subtitle="Help keep our community safe" />

      <main className="container max-w-lg mx-auto px-4 py-6 space-y-6">
        <Card variant="elevated">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Report an Incident
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Incident Type */}
              <div className="space-y-2">
                <Label>Type of Incident *</Label>
                <div className="grid grid-cols-2 gap-2">
                  {incidentTypes.map((type) => (
                    <Button
                      key={type.id}
                      type="button"
                      variant={selectedType === type.id ? "default" : "secondary"}
                      size="sm"
                      onClick={() => setSelectedType(type.id)}
                      className="justify-start"
                    >
                      {type.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Please describe what happened..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="min-h-[120px] resize-none"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Enter location or address"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-11 h-12"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-primary"
                >
                  <MapPin className="w-4 h-4 mr-1" />
                  Use current location
                </Button>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input id="date" type="date" className="pl-11 h-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input id="time" type="time" className="pl-11 h-12" />
                  </div>
                </div>
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <Label>Add Photos (optional)</Label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Tap to upload photos
                  </p>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={!selectedType || !description || loading}
              >
                {loading ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Report
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground text-center">
          Your report is confidential. If you're in immediate danger, please call 911.
        </p>
      </main>

      <BottomNavigation />
    </div>
  );
}
