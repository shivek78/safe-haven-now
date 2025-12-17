import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Emergency from "./pages/Emergency";
import Resources from "./pages/Resources";
import Report from "./pages/Report";
import Community from "./pages/Community";
import Contacts from "./pages/Contacts";
import SafetyTips from "./pages/SafetyTips";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/report" element={<Report />} />
          <Route path="/community" element={<Community />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/safety-tips" element={<SafetyTips />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
