import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BottomNavigation, PageHeader } from "@/components/Navigation";
import {
  MapPin,
  AlertTriangle,
  Send,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const incidentTypes = [
  { id: "harassment", label: "Harassment" },
  { id: "stalking", label: "Stalking" },
  { id: "unsafe-area", label: "Unsafe Area" },
  { id: "suspicious", label: "Suspicious Activity" },
  { id: "assault", label: "Assault" },
  { id: "other", label: "Other" },
];

const severityLevels = [
  { id: "low", label: "Low", color: "bg-success/10 text-success" },
  { id: "medium", label: "Medium", color: "bg-warning/10 text-warning" },
  { id: "high", label: "High", color: "bg-destructive/10 text-destructive" },
];

export default function Report() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [severity, setSeverity] = useState("medium");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Not supported",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
      });
      return;
    }

    setGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocation(`${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`);
        setGettingLocation(false);
        toast({
          title: "Location captured",
          description: "Your current location has been added.",
        });
      },
      (error) => {
        setGettingLocation(false);
        toast({
          title: "Location error",
          description: "Unable to get your location. Please enter manually.",
          variant: "destructive",
        });
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("incident_reports").insert({
        user_id: user?.id,
        incident_type: selectedType,
        description,
        location_name: location,
        latitude: coords?.lat,
        longitude: coords?.lng,
        severity,
        is_anonymous: isAnonymous,
      });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: "Report submitted",
        description: "Thank you for helping keep our community safe.",
      });
    } catch (error) {
      console.error("Error submitting report:", error);
      toast({
        title: "Error",
        description: "Failed to submit report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
                setSeverity("medium");
                setIsAnonymous(false);
                setCoords(null);
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

              {/* Severity */}
              <div className="space-y-2">
                <Label>Severity Level</Label>
                <div className="flex gap-2">
                  {severityLevels.map((level) => (
                    <Button
                      key={level.id}
                      type="button"
                      variant={severity === level.id ? "default" : "secondary"}
                      size="sm"
                      onClick={() => setSeverity(level.id)}
                      className={severity === level.id ? "" : level.color}
                    >
                      {level.label}
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
                  onClick={handleGetLocation}
                  disabled={gettingLocation}
                >
                  {gettingLocation ? (
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  ) : (
                    <MapPin className="w-4 h-4 mr-1" />
                  )}
                  Use current location
                </Button>
              </div>

              {/* Anonymous Option */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="anonymous" className="text-sm font-normal">
                  Submit anonymously
                </Label>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={!selectedType || !description || loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </>
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
