import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Dashboard pages
import DashboardHome from "./pages/dashboard/DashboardHome";
import Trade from "./pages/dashboard/Trade";
import Portfolio from "./pages/dashboard/Portfolio";
import Orion from "./pages/dashboard/Orion";
import Social from "./pages/dashboard/Social";
import Settings from "./pages/dashboard/Settings";
import ConnectBroker from "./pages/dashboard/ConnectBroker";
import News from "./pages/dashboard/News";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const ok = typeof window !== "undefined" && localStorage.getItem("sf_invite_ok") === "true";
  return ok ? children : <Navigate to="/" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Dashboard routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
          <Route path="/dashboard/trade" element={<ProtectedRoute><Trade /></ProtectedRoute>} />
          <Route path="/dashboard/portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
          <Route path="/dashboard/orion" element={<ProtectedRoute><Orion /></ProtectedRoute>} />
          <Route path="/dashboard/social" element={<ProtectedRoute><Social /></ProtectedRoute>} />
          <Route path="/dashboard/news" element={<ProtectedRoute><News /></ProtectedRoute>} />
          <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/dashboard/connect-broker" element={<ProtectedRoute><ConnectBroker /></ProtectedRoute>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
