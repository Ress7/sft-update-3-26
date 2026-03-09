import { motion } from "framer-motion";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { ArrowUpRight, ArrowDownRight, PieChart, TrendingUp, Layers, DollarSign } from "lucide-react";

const holdings = [
  { symbol: "NVDA", name: "NVIDIA Corp.", shares: 12, avgCost: 720.0, current: 874.15, positive: true },
  { symbol: "MSFT", name: "Microsoft Corp.", shares: 8, avgCost: 390.0, current: 421.33, positive: true },
  { symbol: "AAPL", name: "Apple Inc.", shares: 25, avgCost: 270.0, current: 258.63, positive: false },
  { symbol: "BTC", name: "Bitcoin", shares: 0.5, avgCost: 82000.0, current: 94200.0, positive: true },
];

const allocationColors = ["hsl(25,85%,50%)", "hsl(200,70%,50%)", "hsl(80,40%,40%)", "hsl(280,50%,55%)"];

const Portfolio = () => {
  const totalValue = holdings.reduce((sum, h) => sum + h.shares * h.current, 0);
  const totalCost = holdings.reduce((sum, h) => sum + h.shares * h.avgCost, 0);
  const totalPnl = totalValue - totalCost;
  const totalPct = ((totalPnl / totalCost) * 100).toFixed(2);

  // SVG donut chart
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const total = holdings.reduce((sum, h) => sum + h.shares * h.current, 0);
  let offset = 0;
  const segments = holdings.map((h, i) => {
    const pct = (h.shares * h.current) / total;
    const seg = { pct, offset, color: allocationColors[i % allocationColors.length] };
    offset += pct;
    return seg;
  });

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-[1400px] mx-auto">
        <div className="mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl font-display font-bold text-foreground">Portfolio</h1>
          <p className="text-[10px] md:text-xs text-muted-foreground/40 mt-0.5 font-mono">Performance Overview</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Total Value", value: `$${totalValue.toLocaleString(undefined, {maximumFractionDigits: 0})}`, icon: DollarSign, color: "text-foreground/80" },
            { label: "Total P&L", value: `${totalPnl >= 0 ? "+" : ""}$${totalPnl.toLocaleString(undefined, {maximumFractionDigits: 0})}`, icon: TrendingUp, color: totalPnl >= 0 ? "text-green-400" : "text-red-400" },
            { label: "Return", value: `${parseFloat(totalPct) >= 0 ? "+" : ""}${totalPct}%`, icon: ArrowUpRight, color: parseFloat(totalPct) >= 0 ? "text-green-400" : "text-red-400" },
            { label: "Positions", value: `${holdings.length}`, icon: Layers, color: "text-accent/80" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-panel-subtle p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground/40 font-mono">{s.label}</span>
                <s.icon className="w-3.5 h-3.5 text-muted-foreground/20" />
              </div>
              <p className={`text-xl font-bold font-mono ${s.color}`}>{s.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-4">
          {/* Holdings table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel-subtle p-4 md:p-5 overflow-x-auto"
          >
            <h3 className="text-xs md:text-sm font-display font-semibold text-foreground/80 mb-3 md:mb-4">Holdings</h3>
            <div className="min-w-[400px] space-y-px">
              <div className="grid grid-cols-5 px-2 md:px-3 py-2 text-[8px] md:text-[9px] font-mono uppercase tracking-wider text-muted-foreground/30">
                <span>Asset</span>
                <span className="text-right">Shares</span>
                <span className="text-right">Avg Cost</span>
                <span className="text-right">Current</span>
                <span className="text-right">P&L</span>
              </div>
              {holdings.map((h, i) => {
                const pnl = (h.current - h.avgCost) * h.shares;
                const pct = ((h.current - h.avgCost) / h.avgCost * 100).toFixed(2);
                return (
                  <motion.div
                    key={h.symbol}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.07 }}
                    className="grid grid-cols-5 px-3 py-3 rounded-lg hover:bg-secondary/20 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-8 rounded-full"
                        style={{ background: allocationColors[i % allocationColors.length] }}
                      />
                      <div>
                        <p className="text-xs font-mono font-bold text-foreground/70">{h.symbol}</p>
                        <p className="text-[9px] text-muted-foreground/30 truncate max-w-[80px]">{h.name}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-foreground/50 text-right self-center">{h.shares}</span>
                    <span className="text-xs font-mono text-foreground/50 text-right self-center">${h.avgCost.toLocaleString()}</span>
                    <span className="text-xs font-mono text-foreground/60 text-right self-center">${h.current.toLocaleString()}</span>
                    <div className="text-right self-center">
                      <p className={`text-xs font-mono font-bold ${h.positive ? "text-green-400/80" : "text-red-400/80"}`}>
                        {h.positive ? "+" : ""}${Math.abs(pnl).toFixed(0)}
                      </p>
                      <p className={`text-[9px] font-mono ${h.positive ? "text-green-400/50" : "text-red-400/50"}`}>
                        {parseFloat(pct) >= 0 ? "+" : ""}{pct}%
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Allocation donut */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-panel-subtle p-5"
          >
            <h3 className="text-sm font-display font-semibold text-foreground/80 mb-4 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-muted-foreground/30" />
              Allocation
            </h3>
            <div className="flex justify-center mb-5">
              <div className="relative w-40 h-40">
                <svg viewBox="0 0 180 180" className="w-full h-full -rotate-90">
                  {segments.map((seg, i) => (
                    <circle
                      key={i}
                      cx="90" cy="90" r={radius}
                      fill="none"
                      stroke={seg.color}
                      strokeWidth="18"
                      strokeDasharray={`${seg.pct * circumference} ${circumference}`}
                      strokeDashoffset={-seg.offset * circumference}
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                  ))}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-lg font-mono font-bold text-foreground/80">{holdings.length}</p>
                  <p className="text-[9px] text-muted-foreground/30 font-mono uppercase">Assets</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {holdings.map((h, i) => (
                <div key={h.symbol} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: allocationColors[i % allocationColors.length] }} />
                  <span className="text-xs font-mono text-foreground/50 flex-1">{h.symbol}</span>
                  <span className="text-xs font-mono text-foreground/40">
                    {((h.shares * h.current / totalValue) * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Portfolio;
