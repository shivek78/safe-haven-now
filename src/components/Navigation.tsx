import { Link, useLocation } from "react-router-dom";
import {
  Home,
  AlertTriangle,
  Phone,
  FileText,
  Users,
  UserPlus,
  Shield,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/home", icon: Home, label: "Home" },
  { path: "/resources", icon: Phone, label: "Resources" },
  { path: "/community", icon: Users, label: "Community" },
  { path: "/profile", icon: User, label: "Profile" },
];

export function BottomNavigation() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50 pb-safe">
      <div className="container max-w-lg mx-auto">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200",
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive && "scale-110")} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export function PageHeader({
  title,
  subtitle,
  showBack,
  action,
}: {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  action?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-40 glass border-b border-border/50">
      <div className="container max-w-lg mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">{title}</h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {action}
        </div>
      </div>
    </header>
  );
}
