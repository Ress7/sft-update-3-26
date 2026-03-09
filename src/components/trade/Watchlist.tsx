import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, Star, Plus, Search } from "lucide-react";
import { motion } from "framer-motion";

interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  positive: boolean;
}

interface WatchlistProps {
  items: WatchlistItem[];
  selectedSymbol: string;
  onSelect: (item: WatchlistItem) => void;
}

const Watchlist = ({ items, selectedSymbol, onSelect }: WatchlistProps) => {
  const [filter, setFilter] = useState<"all" | "stocks" | "crypto">("all");

  const filtered = items.filter((item) => {
    if (filter === "crypto") return ["BTC", "ETH", "SOL"].some((c) => item.symbol.includes(c));
    if (filter === "stocks") return !["BTC", "ETH", "SOL"].some((c) => item.symbol.includes(c));
    return true;
  });

  return (
    <div className="glass-panel-subtle p-3 md:p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 md:mb-3">
        <h3 className="text-xs md:text-sm font-display font-semibold text-foreground/80">Watchlist</h3>
        <button className="p-1.5 rounded-md hover:bg-secondary/40 text-muted-foreground/40 hover:text-foreground/60 transition-colors">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-1 mb-3">
        {(["all", "stocks", "crypto"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono uppercase transition-all ${
              filter === f
                ? "bg-primary/15 text-primary border border-primary/25"
                : "text-muted-foreground/30 hover:text-muted-foreground/50"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto space-y-0.5 -mx-2 px-2">
        {filtered.map((item, i) => (
          <motion.button
            key={item.symbol}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            onClick={() => onSelect(item)}
            className={`w-full flex items-center justify-between py-2.5 px-3 rounded-lg transition-all group ${
              selectedSymbol === item.symbol
                ? "bg-primary/10 border border-primary/20"
                : "hover:bg-secondary/40"
            }`}
          >
            <div className="text-left flex items-center gap-2.5">
              <Star className="w-3 h-3 text-muted-foreground/20 group-hover:text-amber-400/50 transition-colors" />
              <div>
                <p className="text-xs font-mono font-bold text-foreground/80">{item.symbol}</p>
                <p className="text-[9px] text-muted-foreground/30 truncate max-w-[80px]">
                  {item.name}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-mono text-foreground/70">
                ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p
                className={`text-[10px] font-mono flex items-center gap-0.5 justify-end ${
                  item.positive ? "text-olive" : "text-destructive"
                }`}
              >
                {item.positive ? (
                  <ArrowUpRight className="w-2.5 h-2.5" />
                ) : (
                  <ArrowDownRight className="w-2.5 h-2.5" />
                )}
                {item.positive ? "+" : ""}
                {item.change}%
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
