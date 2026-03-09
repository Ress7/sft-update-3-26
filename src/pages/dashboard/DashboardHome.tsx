import { motion } from "framer-motion";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import {
  TrendingUp, Briefcase, Bot, Users, Activity, DollarSign, Layers,
  ArrowUpRight, ArrowDownRight, Zap
} from "lucide-react";

const stats = [
  { label: "Total Value", value: "$24,847", sub: "Portfolio value", icon: DollarSign, color: "text-foreground/80" },
  { label: "Profit/Loss", value: "+$4,218", sub: "+20.4% overall", icon: TrendingUp, color: "text-green-400" },
  { label: "Assets", value: "4", sub: "In portfolio", icon: Layers, color: "text-foreground/60" },
  { label: "Orion AI", value: "2", sub: "Active strategies", icon: Bot, color: "text-accent/80" },
];

const watchlist = [
  { symbol: "AAPL", name: "Apple Inc.", price: "$258.63", change: "-1.09%", positive: false },
  { symbol: "MSFT", name: "Microsoft Corp.", price: "$421.33", change: "+0.87%", positive: true },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: "$874.15", change: "+4.21%", positive: true },
  { symbol: "BTC", name: "Bitcoin", price: "$94,200", change: "+3.15%", positive: true },
];

const recentTrades = [
  { symbol: "NVDA", action: "BUY", qty: 5, price: "$862.40", time: "2h ago", pnl: "+$58.75" },
  { symbol: "MSFT", action: "BUY", qty: 3, price: "$418.20", time: "1d ago", pnl: "+$9.39" },
];

const DashboardHome = () => {
  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-foreground tracking-tight">
              Dashboard
            </h1>
            <p className="text-[10px] md:text-xs text-muted-foreground/40 mt-1 font-mono">Welcome back to Stoneforge</p>
          </div>
          <button className="btn-ghost-premium flex items-center justify-center gap-2 !py-2 md:!py-2.5 !px-4 md:!px-5 !text-[10px] md:!text-xs w-full sm:w-auto">
            <TrendingUp className="w-3.5 h-3.5" />
            Start Trading
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 mb-4 md:mb-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-panel-subtle p-4 group hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground/40 font-mono">{stat.label}</span>
                <stat.icon className="w-4 h-4 text-muted-foreground/20" />
              </div>
              <p className={`text-xl md:text-2xl font-bold font-mono ${stat.color}`}>
                {stat.value}
              </p>
              <p className="text-[10px] text-muted-foreground/30 mt-1">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Holdings overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="lg:col-span-2 glass-panel-subtle p-5"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-display font-semibold text-foreground/80">Quick Watchlist</h3>
              <span className="text-[10px] text-muted-foreground/30 font-mono cursor-pointer hover:text-foreground/50 transition-colors">View All</span>
            </div>

            <div className="space-y-1">
              {watchlist.map((item) => (
                <div
                  key={item.symbol}
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-secondary/20 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-secondary/50 border border-border/20 flex items-center justify-center">
                      <span className="text-[10px] font-mono font-bold text-foreground/60">{item.symbol[0]}</span>
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-foreground/70 group-hover:text-foreground transition-colors">{item.symbol}</span>
                      <p className="text-[10px] text-muted-foreground/30">{item.name}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <span className="text-xs font-mono text-foreground/60">{item.price}</span>
                    <span className={`text-[10px] font-mono flex items-center gap-0.5 ${
                      item.positive ? "text-green-400/70" : "text-red-400/70"
                    }`}>
                      {item.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Orion Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="glass-panel-subtle p-5"
            >
              <h3 className="text-sm font-display font-semibold text-foreground/80 flex items-center gap-2 mb-4">
                <Bot className="w-4 h-4 text-accent/60" />
                Orion Insights
              </h3>

              <div className="space-y-3">
                <div className="glass-panel-subtle p-3 border-green-400/15 bg-green-400/5">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-3 h-3 text-green-400/60" />
                    <span className="text-xs font-medium text-green-400/70">Buy Signal</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground/40 leading-relaxed">
                    NVDA showing strong momentum. Confidence: 94%
                  </p>
                </div>

                <div className="glass-panel-subtle p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-3 h-3 text-accent/50" />
                    <span className="text-xs font-medium text-foreground/70">Win Rate</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground/40 leading-relaxed">
                    Your strategies: 68% this week
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Recent Trades */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="glass-panel-subtle p-5"
            >
              <h3 className="text-sm font-display font-semibold text-foreground/80 mb-4">Recent Trades</h3>
              <div className="space-y-2">
                {recentTrades.map((trade, i) => (
                  <div key={i} className="flex items-center justify-between py-2 px-2 rounded-lg bg-secondary/20">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                        trade.action === "BUY" ? "bg-green-400/10 text-green-400/70" : "bg-red-400/10 text-red-400/70"
                      }`}>
                        {trade.action}
                      </span>
                      <span className="text-xs font-mono text-foreground/60">{trade.symbol}</span>
                    </div>
                    <span className="text-[10px] font-mono text-green-400/60">{trade.pnl}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;
