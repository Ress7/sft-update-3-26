import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import TraderCard from "../../components/dashboard/TraderCard";
import {
  Users, Trophy, Copy, Search, Crown, Star, TrendingUp,
  ArrowUpRight, Lock, Unlock, BadgeCheck, ChevronRight, Plus,
  Globe, Shield, DollarSign, MessageSquare
} from "lucide-react";

type SocialTab = "leaderboard" | "copy-trade" | "communities";

const topTraders = [
  { name: "Alex Morgan", handle: "alphamorgan", code: "AM7K92", winRate: 78, allTimeReturn: 342.5, rank: "Orion Elite" as const, isPublic: true, followers: 12400, trades: 1840, copyFee: 12 },
  { name: "Sarah Chen", handle: "chensharp", code: "SC4R18", winRate: 74, allTimeReturn: 218.3, rank: "Platinum" as const, isPublic: true, followers: 8200, trades: 960, copyFee: 10 },
  { name: "Marcus Wolf", handle: "wolfstreet", code: "MW2X56", winRate: 71, allTimeReturn: 189.7, rank: "Gold" as const, isPublic: true, followers: 5400, trades: 720, copyFee: 8 },
  { name: "Elena Volkov", handle: "volktrade", code: "EV9P33", winRate: 69, allTimeReturn: 156.2, rank: "Gold" as const, isPublic: true, followers: 3200, trades: 580, copyFee: 5 },
  { name: "James Park", handle: "jpark_ai", code: "JP1L77", winRate: 67, allTimeReturn: 124.8, rank: "Silver" as const, isPublic: true, followers: 1800, trades: 440, copyFee: 3 },
  { name: "Yuki Tanaka", handle: "tanaka_fx", code: "YT5M41", winRate: 65, allTimeReturn: 98.4, rank: "Silver" as const, isPublic: false, followers: 920, trades: 320, copyFee: 0 },
];

const communities = [
  { name: "Alpha Hunters", leader: "alphamorgan", members: 2840, monthlyReturn: 14.2, description: "Momentum-based strategies focusing on tech and AI stocks", fee: 12, verified: true },
  { name: "Crypto Wolves", leader: "wolfstreet", members: 1560, monthlyReturn: 22.8, description: "High-conviction crypto trades with risk management", fee: 15, verified: true },
  { name: "Steady Gains Club", leader: "chensharp", members: 4200, monthlyReturn: 8.4, description: "Low-risk value investing with consistent returns", fee: 8, verified: true },
  { name: "Forex Masters", leader: "tanaka_fx", members: 680, monthlyReturn: 6.1, description: "Daily forex signals and pair analysis", fee: 5, verified: false },
];

const Social = () => {
  const [tab, setTab] = useState<SocialTab>("leaderboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  const tabs = [
    { key: "leaderboard" as const, label: "Leaderboard", icon: Trophy },
    { key: "copy-trade" as const, label: "Copy Trade", icon: Copy },
    { key: "communities" as const, label: "Communities", icon: Users },
  ];

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4 md:mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-display font-bold text-foreground">Social</h1>
            <p className="text-[10px] md:text-xs text-muted-foreground/40 mt-0.5 font-mono">Traders · Leaderboard · Copy Trade · Communities</p>
          </div>
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/30" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search traders or code..."
              className="w-full sm:w-56 pl-9 pr-4 py-2 bg-secondary/30 border border-border/20 rounded-xl text-xs text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/30 font-mono"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-4 md:mb-6 p-1 bg-secondary/20 rounded-xl w-full sm:w-fit overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-lg text-[10px] md:text-xs font-mono transition-all whitespace-nowrap flex-1 sm:flex-none justify-center ${
                tab === t.key
                  ? "bg-primary/15 text-primary border border-primary/20"
                  : "text-muted-foreground/40 hover:text-foreground/60"
              }`}
            >
              <t.icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === "leaderboard" && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Featured card row */}
              <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-none mb-4 md:mb-6">
                {topTraders.slice(0, 3).map((trader, i) => (
                  <motion.div
                    key={trader.handle}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <TraderCard {...trader} large />
                  </motion.div>
                ))}
              </div>

              {/* Leaderboard table */}
              <div className="glass-panel-subtle p-3 md:p-5">
                <h3 className="text-sm font-display font-semibold text-foreground/80 mb-4">
                  Global Leaderboard
                </h3>
                <div className="space-y-1">
                  {/* Mobile: card layout, Desktop: table */}
                  <div className="hidden md:grid grid-cols-7 px-3 py-2 text-[9px] font-mono uppercase tracking-wider text-muted-foreground/30">
                    <span>Rank</span>
                    <span className="col-span-2">Trader</span>
                    <span className="text-center">Win Rate</span>
                    <span className="text-center">All Time</span>
                    <span className="text-center">Followers</span>
                    <span className="text-right">Action</span>
                  </div>
                  {topTraders.map((trader, i) => (
                    <motion.div
                      key={trader.handle}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="md:grid md:grid-cols-7 flex flex-col gap-2 md:gap-0 px-3 py-3 rounded-xl hover:bg-secondary/20 transition-all items-start md:items-center"
                    >
                      <span className="hidden md:flex items-center gap-2">
                        {i < 3 ? (
                          <Crown className={`w-4 h-4 ${i === 0 ? "text-accent" : i === 1 ? "text-marble" : "text-bronze"}`} />
                        ) : (
                          <span className="text-xs font-mono text-muted-foreground/40 ml-1">{i + 1}</span>
                        )}
                      </span>
                      <div className="col-span-2 flex items-center gap-3">
                        <div className="md:hidden shrink-0">
                          {i < 3 ? (
                            <Crown className={`w-4 h-4 ${i === 0 ? "text-accent" : i === 1 ? "text-marble" : "text-bronze"}`} />
                          ) : (
                            <span className="text-xs font-mono text-muted-foreground/40">{i + 1}</span>
                          )}
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 flex items-center justify-center">
                          <span className="text-[10px] font-mono font-bold text-primary/80">{trader.name.split(" ").map(n => n[0]).join("")}</span>
                        </div>
                        <div>
                          <p className="text-xs font-mono font-medium text-foreground/70">{trader.name}</p>
                          <p className="text-[9px] text-muted-foreground/30">@{trader.handle}</p>
                        </div>
                      </div>
                      <div className="flex md:hidden items-center gap-4 text-[10px] font-mono text-muted-foreground/40 ml-6">
                        <span>WR: <span className="text-foreground/60">{trader.winRate}%</span></span>
                        <span className="text-olive">+{trader.allTimeReturn}%</span>
                        <span>{(trader.followers/1000).toFixed(1)}k followers</span>
                      </div>
                      <span className="hidden md:block text-center text-xs font-mono text-foreground/60">{trader.winRate}%</span>
                      <span className="hidden md:block text-center text-xs font-mono text-olive">+{trader.allTimeReturn}%</span>
                      <span className="hidden md:block text-center text-xs font-mono text-muted-foreground/40">{(trader.followers/1000).toFixed(1)}k</span>
                      <div className="hidden md:block text-right">
                        <button className="px-3 py-1.5 rounded-lg text-[10px] font-mono bg-primary/10 text-primary/70 border border-primary/20 hover:bg-primary/20 transition-all">
                          Copy
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {tab === "copy-trade" && (
            <motion.div
              key="copy-trade"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Marketplace Info */}
              <div className="glass-panel-subtle p-5 mb-4 border-accent/15 bg-accent/5">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-accent/60 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="text-sm font-display font-semibold text-foreground/80 mb-1">Copy Trading Marketplace</h3>
                    <p className="text-xs text-muted-foreground/40 leading-relaxed">
                      Follow top traders and automatically mirror their trades. Traders can set a monthly fee up to <span className="text-accent/70 font-mono">$15.00</span>.
                      Fees above $15 require Orion Verification — an application process proving strategy excellence through AI-validated performance metrics.
                    </p>
                  </div>
                </div>
              </div>

              {/* Trader cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topTraders.filter(t => t.isPublic).map((trader, i) => (
                  <motion.div
                    key={trader.handle}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="glass-panel-subtle p-5 hover:border-primary/20 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 flex items-center justify-center">
                          <span className="text-xs font-mono font-bold text-primary/80">{trader.name.split(" ").map(n => n[0]).join("")}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-mono font-bold text-foreground/80">{trader.name}</p>
                            {trader.rank === "Orion Elite" && <BadgeCheck className="w-3.5 h-3.5 text-accent/70" />}
                          </div>
                          <p className="text-[10px] text-muted-foreground/30 font-mono">@{trader.handle} · {trader.rank}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground/40">{trader.code}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center p-2 rounded-lg bg-secondary/20">
                        <p className="text-[9px] text-muted-foreground/30 font-mono uppercase mb-0.5">Win Rate</p>
                        <p className="text-sm font-mono font-bold text-foreground/70">{trader.winRate}%</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-secondary/20">
                        <p className="text-[9px] text-muted-foreground/30 font-mono uppercase mb-0.5">All Time</p>
                        <p className="text-sm font-mono font-bold text-green-400/70">+{trader.allTimeReturn}%</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-secondary/20">
                        <p className="text-[9px] text-muted-foreground/30 font-mono uppercase mb-0.5">Trades</p>
                        <p className="text-sm font-mono font-bold text-foreground/70">{trader.trades}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="w-3 h-3 text-accent/50" />
                        <span className="text-xs font-mono text-accent/70">${trader.copyFee}/mo</span>
                        {trader.copyFee > 15 && (
                          <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-accent/10 text-accent/60 border border-accent/15">VERIFIED</span>
                        )}
                      </div>
                      <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-mono font-bold bg-primary/15 text-primary/80 border border-primary/20 hover:bg-primary/25 transition-all">
                        <Copy className="w-3 h-3" />
                        Copy Trade
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Become a copy trader CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-panel-subtle p-6 mt-4 text-center border-dashed"
              >
                <Crown className="w-8 h-8 text-accent/30 mx-auto mb-3" />
                <h3 className="text-sm font-display font-semibold text-foreground/70 mb-2">Become a Copy Trader</h3>
                <p className="text-xs text-muted-foreground/40 max-w-md mx-auto mb-4 leading-relaxed">
                  Share your trades and earn up to $15/month per follower. Want to charge more? Apply for Orion Verification to prove your strategy deserves premium pricing.
                </p>
                <div className="flex gap-3 justify-center">
                  <button className="btn-ghost-premium !py-2 !px-5 !text-xs">Enable Copy Trading</button>
                  <button
                    onClick={() => setShowVerifyModal(true)}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-mono bg-accent/10 text-accent/70 border border-accent/20 hover:bg-accent/20 transition-all"
                  >
                    <BadgeCheck className="w-3.5 h-3.5" />
                    Apply for Verification
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {tab === "communities" && (
            <motion.div
              key="communities"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Create community CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-panel-subtle p-4 mb-4 flex items-center justify-between border-dashed"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Plus className="w-5 h-5 text-primary/60" />
                  </div>
                  <div>
                    <p className="text-sm font-display font-semibold text-foreground/70">Create a Community</p>
                    <p className="text-[10px] text-muted-foreground/30">Build your following. Let members copy-trade your live portfolio.</p>
                  </div>
                </div>
                <button className="btn-ghost-premium !py-2 !px-5 !text-xs">Create</button>
              </motion.div>

              {/* Community cards */}
              <div className="space-y-3">
                {communities.map((c, i) => (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="glass-panel-subtle p-5 hover:border-primary/20 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/15 flex items-center justify-center">
                          <Globe className="w-5 h-5 text-primary/50" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-sm font-mono font-bold text-foreground/80">{c.name}</h3>
                            {c.verified && <BadgeCheck className="w-3.5 h-3.5 text-accent/70" />}
                          </div>
                          <p className="text-[10px] text-muted-foreground/30 font-mono">by @{c.leader}</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-accent/70 flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {c.fee}/mo
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground/40 mb-3 leading-relaxed">{c.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-4 text-[10px] font-mono text-muted-foreground/40">
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" />{c.members.toLocaleString()} members</span>
                        <span className="flex items-center gap-1 text-green-400/60"><TrendingUp className="w-3 h-3" />+{c.monthlyReturn}% this month</span>
                      </div>
                      <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-mono font-bold bg-primary/15 text-primary/80 border border-primary/20 hover:bg-primary/25 transition-all">
                        Join Community
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Verify modal */}
        <AnimatePresence>
          {showVerifyModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowVerifyModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-panel p-6 max-w-lg w-full"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <BadgeCheck className="w-5 h-5 text-accent/70" />
                  </div>
                  <div>
                    <h2 className="text-lg font-display font-bold text-foreground/90">Orion Verification</h2>
                    <p className="text-[10px] text-muted-foreground/40 font-mono">Premium Copy Trading Application</p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground/40 mb-5 leading-relaxed">
                  To charge more than $15/month for copy trading, you must be verified by the Stoneforge team.
                  We evaluate your trading history, Orion AI strategy performance, risk management, and consistency.
                </p>

                <div className="space-y-3 mb-5">
                  <div>
                    <label className="text-[10px] text-muted-foreground/40 font-mono uppercase tracking-wider mb-1 block">Desired Monthly Fee</label>
                    <input
                      placeholder="e.g. $25"
                      className="w-full px-4 py-2.5 bg-secondary/30 border border-border/20 rounded-xl text-xs text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-accent/30 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground/40 font-mono uppercase tracking-wider mb-1 block">Why does your strategy deserve premium pricing?</label>
                    <textarea
                      rows={3}
                      placeholder="Describe your trading approach, win rate, risk management..."
                      className="w-full px-4 py-2.5 bg-secondary/30 border border-border/20 rounded-xl text-xs text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-accent/30 font-mono resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground/40 font-mono uppercase tracking-wider mb-1 block">Orion AI Strategy Details</label>
                    <textarea
                      rows={3}
                      placeholder="How do you use Orion AI? Which strategies? Performance metrics..."
                      className="w-full px-4 py-2.5 bg-secondary/30 border border-border/20 rounded-xl text-xs text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-accent/30 font-mono resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowVerifyModal(false)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-mono text-muted-foreground/40 border border-border/20 hover:text-foreground/60 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowVerifyModal(false)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-mono font-bold bg-accent/15 text-accent/80 border border-accent/25 hover:bg-accent/25 transition-all"
                  >
                    Submit Application
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default Social;
