import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Zap, AlertTriangle, Info } from "lucide-react";

interface OrderPanelProps {
  symbol: string;
  symbolName: string;
  price: number;
}

const OrderPanel = ({ symbol, symbolName, price }: OrderPanelProps) => {
  const [orderType, setOrderType] = useState<"market" | "limit" | "stop">("market");
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [qty, setQty] = useState("1");
  const [limitPrice, setLimitPrice] = useState(price.toString());

  const total = price * parseFloat(qty || "0");

  return (
    <div className="glass-panel-subtle p-3 md:p-4 space-y-3 md:space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs md:text-sm font-display font-semibold text-foreground/80">Order Entry</h3>
        <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-olive/10 border border-olive/20 text-[8px] md:text-[9px] font-mono text-olive/70">
          <span className="w-1.5 h-1.5 rounded-full bg-olive/60 animate-pulse" />
          PAPER
        </span>
      </div>

      {/* Buy/Sell Toggle */}
      <div className="grid grid-cols-2 gap-1 p-1 bg-secondary/30 rounded-lg">
        {(["buy", "sell"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSide(s)}
            className={`py-2 rounded-md text-xs font-mono font-bold uppercase tracking-wider transition-all ${
              side === s
                ? s === "buy"
                  ? "bg-olive/20 text-olive border border-olive/30"
                  : "bg-destructive/20 text-destructive border border-destructive/30"
                : "text-muted-foreground/40 hover:text-muted-foreground/60"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Order Type */}
      <div>
        <label className="text-[10px] text-muted-foreground/40 font-mono uppercase tracking-wider mb-1.5 block">
          Order Type
        </label>
        <div className="grid grid-cols-3 gap-1">
          {(["market", "limit", "stop"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setOrderType(t)}
              className={`py-1.5 rounded-md text-[10px] font-mono uppercase transition-all ${
                orderType === t
                  ? "bg-primary/15 text-primary border border-primary/25"
                  : "bg-secondary/40 text-muted-foreground/40 hover:text-muted-foreground/60"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <label className="text-[10px] text-muted-foreground/40 font-mono uppercase tracking-wider mb-1.5 block">
          Quantity
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="flex-1 px-3 py-2 bg-secondary/40 border border-border/30 rounded-lg text-sm font-mono text-foreground/80 focus:outline-none focus:border-primary/40"
          />
          <div className="flex gap-1">
            {["25%", "50%", "MAX"].map((pct) => (
              <button
                key={pct}
                className="px-2 py-1 bg-secondary/40 border border-border/20 rounded-md text-[9px] font-mono text-muted-foreground/40 hover:text-foreground/60 hover:border-primary/30 transition-all"
              >
                {pct}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Limit Price (conditional) */}
      {orderType !== "market" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <label className="text-[10px] text-muted-foreground/40 font-mono uppercase tracking-wider mb-1.5 block">
            {orderType === "limit" ? "Limit Price" : "Stop Price"}
          </label>
          <input
            type="number"
            value={limitPrice}
            onChange={(e) => setLimitPrice(e.target.value)}
            className="w-full px-3 py-2 bg-secondary/40 border border-border/30 rounded-lg text-sm font-mono text-foreground/80 focus:outline-none focus:border-primary/40"
          />
        </motion.div>
      )}

      {/* Summary */}
      <div className="p-3 rounded-lg bg-secondary/20 space-y-2">
        <div className="flex justify-between text-[10px] font-mono">
          <span className="text-muted-foreground/40">Symbol</span>
          <span className="text-foreground/70">{symbol}</span>
        </div>
        <div className="flex justify-between text-[10px] font-mono">
          <span className="text-muted-foreground/40">Market Price</span>
          <span className="text-foreground/70">${price.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-[10px] font-mono">
          <span className="text-muted-foreground/40">Quantity</span>
          <span className="text-foreground/70">{qty}</span>
        </div>
        <div className="border-t border-border/10 pt-2 flex justify-between text-sm font-mono">
          <span className="text-muted-foreground/50">Est. Total</span>
          <span className="font-bold text-foreground/90">
            ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Orion Signal */}
      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-accent/5 border border-accent/15">
        <Zap className="w-3.5 h-3.5 text-accent/70" />
        <span className="text-[10px] font-mono text-accent/70">
          Orion suggests: <span className="font-semibold">BUY</span> signal active
        </span>
      </div>

      {/* Submit Button */}
      <button
        className={`w-full py-3 rounded-xl text-sm font-mono font-bold uppercase tracking-wider transition-all ${
          side === "buy"
            ? "bg-olive/20 hover:bg-olive/30 text-olive border border-olive/30"
            : "bg-destructive/20 hover:bg-destructive/30 text-destructive border border-destructive/30"
        }`}
      >
        {side === "buy" ? "Buy" : "Sell"} {symbol}
      </button>

      {/* Disclaimer */}
      <p className="text-[9px] text-muted-foreground/30 text-center">
        Paper trading mode • No real funds
      </p>
    </div>
  );
};

export default OrderPanel;
