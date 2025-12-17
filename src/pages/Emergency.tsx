import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, X, MapPin, Shield, AlertTriangle } from "lucide-react";

export default function Emergency() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [alertSent, setAlertSent] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    if (isCancelled || alertSent) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setAlertSent(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isCancelled, alertSent]);

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
                <p className="text-xs text-primary-foreground/70">Live tracking enabled</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5" />
              <div className="text-left">
                <p className="text-sm font-medium">3 contacts notified</p>
                <p className="text-xs text-primary-foreground/70">SMS and app notification sent</p>
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
              <AlertTriangle className="w-16 h-16" />
            </div>
          </div>
          {/* Countdown */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-bold">{countdown}</span>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-2">Sending Emergency Alert</h1>
          <p className="text-primary-foreground/80">
            Alert will be sent to your trusted contacts
          </p>
        </div>

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
