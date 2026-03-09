import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

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
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/dashboard/trade" element={<Trade />} />
          <Route path="/dashboard/portfolio" element={<Portfolio />} />
          <Route path="/dashboard/orion" element={<Orion />} />
          <Route path="/dashboard/social" element={<Social />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/connect-broker" element={<ConnectBroker />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
