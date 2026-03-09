import { TrendingUp, TrendingDown, Clock, Activity, Volume2 } from "lucide-react";

interface MarketDataProps {
  symbol: string;
  price: number;
  change: number;
  positive: boolean;
}

const MarketData = ({ symbol, price, change, positive }: MarketDataProps) => {
  // Mock additional market data
  const mockData = {
    open: price * 0.995,
    high: price * 1.012,
    low: price * 0.988,
    volume: "42.8M",
    avgVolume: "38.2M",
    marketCap: "3.42T",
    pe: "34.2",
    eps: "$6.43",
    dividend: "0.52%",
    beta: "1.24",
    fiftyTwoHigh: price * 1.15,
    fiftyTwoLow: price * 0.72,
  };

  return (
    <div className="glass-panel-subtle p-3 md:p-4 space-y-3 md:space-y-4">
      {/* Header with price */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base md:text-lg font-mono font-bold text-foreground/90">{symbol}</h3>
          <p className="text-[9px] md:text-[10px] text-muted-foreground/40">Real-time Quote</p>
        </div>
        <div className="text-right">
          <p className="text-xl md:text-2xl font-mono font-bold text-foreground/90">
            ${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          <p
            className={`text-[10px] md:text-xs font-mono flex items-center gap-1 justify-end ${
              positive ? "text-olive" : "text-destructive"
            }`}
          >
            {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {positive ? "+" : ""}
            {change}%
          </p>
        </div>
      </div>

      {/* Key stats grid */}
      <div className="grid grid-cols-4 gap-1.5 md:gap-2">
        {[
          { label: "Open", value: `$${mockData.open.toFixed(2)}` },
          { label: "High", value: `$${mockData.high.toFixed(2)}` },
          { label: "Low", value: `$${mockData.low.toFixed(2)}` },
          { label: "Volume", value: mockData.volume },
        ].map((stat) => (
          <div key={stat.label} className="text-center p-1.5 md:p-2 rounded-lg bg-secondary/30">
            <p className="text-[8px] md:text-[9px] text-muted-foreground/40 font-mono uppercase">{stat.label}</p>
            <p className="text-[10px] md:text-xs font-mono text-foreground/70 mt-0.5">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Extended stats */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2 border-t border-border/10">
        {[
          { label: "Market Cap", value: mockData.marketCap },
          { label: "P/E Ratio", value: mockData.pe },
          { label: "EPS", value: mockData.eps },
          { label: "Dividend", value: mockData.dividend },
          { label: "Beta", value: mockData.beta },
          { label: "Avg Volume", value: mockData.avgVolume },
        ].map((stat) => (
          <div key={stat.label} className="flex justify-between py-1">
            <span className="text-[10px] text-muted-foreground/40 font-mono">{stat.label}</span>
            <span className="text-[10px] text-foreground/60 font-mono">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* 52-week range */}
      <div className="pt-2 border-t border-border/10">
        <p className="text-[9px] text-muted-foreground/40 font-mono uppercase mb-2">52-Week Range</p>
        <div className="relative h-1.5 bg-secondary/40 rounded-full overflow-hidden">
          <div
            className="absolute h-full bg-gradient-to-r from-destructive/50 to-olive/50"
            style={{ width: "100%" }}
          />
          <div
            className="absolute h-3 w-0.5 bg-foreground/60 top-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: `${((price - mockData.fiftyTwoLow) / (mockData.fiftyTwoHigh - mockData.fiftyTwoLow)) * 100}%`,
            }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-[9px] font-mono text-muted-foreground/40">
            ${mockData.fiftyTwoLow.toFixed(2)}
          </span>
          <span className="text-[9px] font-mono text-muted-foreground/40">
            ${mockData.fiftyTwoHigh.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MarketData;
