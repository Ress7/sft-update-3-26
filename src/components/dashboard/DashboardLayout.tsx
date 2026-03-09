import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import StoneforgeLogo from "../StoneforgeLogo";
import { useTheme } from "../ThemeProvider";
import {
  BarChart3, TrendingUp, Briefcase, Bot, Users, Settings,
  Bell, ChevronLeft, ChevronRight, Link2, Menu, X, Sun, Moon
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: BarChart3, path: "/dashboard" },
  { label: "Trade", icon: TrendingUp, path: "/dashboard/trade" },
  { label: "Portfolio", icon: Briefcase, path: "/dashboard/portfolio" },
  { label: "Orion AI", icon: Bot, path: "/dashboard/orion" },
  { label: "Social", icon: Users, path: "/dashboard/social" },
  { label: "Settings", icon: Settings, path: "/dashboard/settings" },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 220 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`
          fixed top-0 left-0 h-full z-50 flex flex-col border-r border-border/20
          bg-background/95 backdrop-blur-xl overflow-hidden
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          transition-transform md:transition-none
        `}
      >
        {/* Logo */}
        <div className="flex items-center h-14 px-4 border-b border-border/20 shrink-0">
          {collapsed ? (
            <StoneforgeLogo variant="icon" className="w-7 h-7 mx-auto" />
          ) : (
            <StoneforgeLogo className="scale-90 origin-left" />
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== "/dashboard" && location.pathname.startsWith(item.path));
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-200
                  ${isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground/50 hover:text-foreground/70 hover:bg-secondary/50"
                  }
                `}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="truncate"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </NavLink>
            );
          })}

          {/* Connect Broker */}
          <NavLink
            to="/dashboard/connect-broker"
            onClick={() => setMobileOpen(false)}
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 mt-4 border border-dashed
              ${location.pathname === "/dashboard/connect-broker"
                ? "bg-accent/10 text-accent border-accent/30"
                : "text-muted-foreground/30 hover:text-foreground/50 border-border/20 hover:border-border/40"
              }
            `}
          >
            <Link2 className="w-4 h-4 shrink-0" />
            {!collapsed && <span className="truncate">Connect Broker</span>}
          </NavLink>
        </nav>

        {/* Collapse toggle (desktop only) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex items-center justify-center h-10 border-t border-border/20 text-muted-foreground/30 hover:text-foreground/60 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen transition-all duration-300">
        <style>{`
          @media (min-width: 768px) {
            #dashboard-main-content { margin-left: ${collapsed ? 64 : 220}px; }
          }
        `}</style>
        <div id="dashboard-main-content" className="flex-1 flex flex-col min-h-screen">
          {/* Top bar */}
          <header className="sticky top-0 z-30 h-14 flex items-center justify-between px-4 md:px-6 border-b border-border/20 bg-background/80 backdrop-blur-xl">
            <button
              className="md:hidden p-2 text-muted-foreground/40 hover:text-foreground/60"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex-1" />
            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 text-muted-foreground/40 hover:text-foreground/60 transition-colors"
                title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button className="relative p-2 text-muted-foreground/40 hover:text-foreground/60 transition-colors">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
              </button>
              <NavLink to="/dashboard/settings">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 border border-primary/30 flex items-center justify-center">
                  <span className="text-[10px] font-mono text-primary/80">SF</span>
                </div>
              </NavLink>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
