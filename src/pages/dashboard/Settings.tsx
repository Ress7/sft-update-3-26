import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import TraderCard from "../../components/dashboard/TraderCard";
import {
  User, Lock, Eye, EyeOff, Shield, Bell, Globe,
  CreditCard, LogOut, ChevronRight, Copy, BadgeCheck
} from "lucide-react";

const Settings = () => {
  const [profilePublic, setProfilePublic] = useState(true);
  const [copyTradeEnabled, setCopyTradeEnabled] = useState(false);
  const [copyFee, setCopyFee] = useState("5");
  const [notifications, setNotifications] = useState({
    trades: true,
    signals: true,
    followers: false,
    community: true,
  });

  const myTrader = {
    name: "You",
    handle: "your_handle",
    code: "SF8K42",
    winRate: 62,
    allTimeReturn: 48.2,
    rank: "Silver" as const,
    isPublic: profilePublic,
    followers: 24,
    trades: 86,
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-[1000px] mx-auto">
        <div className="mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl font-display font-bold text-foreground">Settings</h1>
          <p className="text-[10px] md:text-xs text-muted-foreground/40 mt-0.5 font-mono">Account · Profile · Trader Card</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 md:gap-6">
          {/* Left: Settings */}
          <div className="space-y-4">
            {/* Profile */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel-subtle p-5"
            >
              <h3 className="text-sm font-display font-semibold text-foreground/80 mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground/30" />
                Profile
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-muted-foreground/40 font-mono uppercase tracking-wider mb-1 block">Display Name</label>
                    <input
                      defaultValue="Trader"
                      className="w-full px-3 py-2 bg-secondary/30 border border-border/20 rounded-lg text-xs font-mono text-foreground/70 focus:outline-none focus:border-primary/30"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground/40 font-mono uppercase tracking-wider mb-1 block">Handle</label>
                    <input
                      defaultValue="your_handle"
                      className="w-full px-3 py-2 bg-secondary/30 border border-border/20 rounded-lg text-xs font-mono text-foreground/70 focus:outline-none focus:border-primary/30"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground/40 font-mono uppercase tracking-wider mb-1 block">Email</label>
                  <input
                    defaultValue="trader@email.com"
                    className="w-full px-3 py-2 bg-secondary/30 border border-border/20 rounded-lg text-xs font-mono text-foreground/70 focus:outline-none focus:border-primary/30"
                  />
                </div>
              </div>
            </motion.div>

            {/* Privacy */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-panel-subtle p-5"
            >
              <h3 className="text-sm font-display font-semibold text-foreground/80 mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-muted-foreground/30" />
                Privacy & Social
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-mono text-foreground/70">Public Profile</p>
                    <p className="text-[10px] text-muted-foreground/30">Visible on leaderboard and social search</p>
                  </div>
                  <button
                    onClick={() => setProfilePublic(!profilePublic)}
                    className={`w-10 h-5 rounded-full transition-all relative ${profilePublic ? "bg-primary/30" : "bg-secondary/50"}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${profilePublic ? "left-5 bg-primary" : "left-0.5 bg-muted-foreground/40"}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-mono text-foreground/70">Enable Copy Trading</p>
                    <p className="text-[10px] text-muted-foreground/30">Allow others to copy your trades</p>
                  </div>
                  <button
                    onClick={() => setCopyTradeEnabled(!copyTradeEnabled)}
                    className={`w-10 h-5 rounded-full transition-all relative ${copyTradeEnabled ? "bg-primary/30" : "bg-secondary/50"}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${copyTradeEnabled ? "left-5 bg-primary" : "left-0.5 bg-muted-foreground/40"}`} />
                  </button>
                </div>
                <AnimatePresence>
                  {copyTradeEnabled && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-3 rounded-xl bg-secondary/20 border border-border/15">
                        <label className="text-[10px] text-muted-foreground/40 font-mono uppercase tracking-wider mb-1 block">Monthly Fee ($)</label>
                        <input
                          value={copyFee}
                          onChange={(e) => setCopyFee(e.target.value)}
                          type="number"
                          max={15}
                          className="w-full px-3 py-2 bg-secondary/30 border border-border/20 rounded-lg text-xs font-mono text-foreground/70 focus:outline-none focus:border-primary/30"
                        />
                        <p className="text-[9px] text-muted-foreground/30 mt-1.5">
                          Max $15 without verification. <button className="text-accent/60 hover:underline">Apply for higher.</button>
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-panel-subtle p-5"
            >
              <h3 className="text-sm font-display font-semibold text-foreground/80 mb-4 flex items-center gap-2">
                <Bell className="w-4 h-4 text-muted-foreground/30" />
                Notifications
              </h3>
              <div className="space-y-3">
                {([
                  ["trades", "Trade Executions"],
                  ["signals", "Orion AI Signals"],
                  ["followers", "New Followers"],
                  ["community", "Community Updates"],
                ] as const).map(([key, label]) => (
                  <div key={key} className="flex items-center justify-between">
                    <p className="text-xs font-mono text-foreground/60">{label}</p>
                    <button
                      onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                      className={`w-10 h-5 rounded-full transition-all relative ${notifications[key] ? "bg-primary/30" : "bg-secondary/50"}`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${notifications[key] ? "left-5 bg-primary" : "left-0.5 bg-muted-foreground/40"}`} />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Danger zone */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-panel-subtle p-5 border-destructive/10"
            >
              <button className="flex items-center gap-2 text-xs font-mono text-destructive/60 hover:text-destructive/80 transition-all">
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </motion.div>
          </div>

          {/* Right: Trader Card preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="glass-panel-subtle p-4">
              <h3 className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/40 mb-3">Your Trader Card</h3>
              <div className="flex justify-center">
                <TraderCard {...myTrader} large />
              </div>
              <p className="text-[9px] text-muted-foreground/30 text-center mt-3 font-mono">
                Share your unique code: <span className="text-foreground/50">{myTrader.code}</span>
              </p>
            </div>

            <div className="glass-panel-subtle p-4">
              <h3 className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/40 mb-3">Quick Stats</h3>
              <div className="space-y-2">
                {[
                  { label: "Trades", value: myTrader.trades },
                  { label: "Win Rate", value: `${myTrader.winRate}%` },
                  { label: "All Time", value: `+${myTrader.allTimeReturn}%` },
                  { label: "Followers", value: myTrader.followers },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between py-1.5">
                    <span className="text-[10px] font-mono text-muted-foreground/40">{s.label}</span>
                    <span className="text-xs font-mono text-foreground/60">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
