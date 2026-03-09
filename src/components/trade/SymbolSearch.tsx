import { useState, useRef, useEffect } from "react";
import { Search, X, TrendingUp, Bitcoin, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Symbol {
  symbol: string;
  name: string;
  type: "stock" | "crypto" | "forex";
  exchange: string;
}

const popularSymbols: Symbol[] = [
  { symbol: "AAPL", name: "Apple Inc.", type: "stock", exchange: "NASDAQ" },
  { symbol: "MSFT", name: "Microsoft Corp.", type: "stock", exchange: "NASDAQ" },
  { symbol: "NVDA", name: "NVIDIA Corp.", type: "stock", exchange: "NASDAQ" },
  { symbol: "GOOGL", name: "Alphabet Inc.", type: "stock", exchange: "NASDAQ" },
  { symbol: "AMZN", name: "Amazon.com Inc.", type: "stock", exchange: "NASDAQ" },
  { symbol: "TSLA", name: "Tesla Inc.", type: "stock", exchange: "NASDAQ" },
  { symbol: "META", name: "Meta Platforms", type: "stock", exchange: "NASDAQ" },
  { symbol: "SPY", name: "S&P 500 ETF", type: "stock", exchange: "NYSE" },
  { symbol: "QQQ", name: "Nasdaq 100 ETF", type: "stock", exchange: "NASDAQ" },
  { symbol: "BTCUSD", name: "Bitcoin / USD", type: "crypto", exchange: "CRYPTO" },
  { symbol: "ETHUSD", name: "Ethereum / USD", type: "crypto", exchange: "CRYPTO" },
  { symbol: "SOLUSD", name: "Solana / USD", type: "crypto", exchange: "CRYPTO" },
  { symbol: "EURUSD", name: "Euro / US Dollar", type: "forex", exchange: "FX" },
  { symbol: "GBPUSD", name: "British Pound / USD", type: "forex", exchange: "FX" },
];

interface SymbolSearchProps {
  selectedSymbol: string;
  onSymbolSelect: (symbol: string, name: string) => void;
}

const SymbolSearch = ({ selectedSymbol, onSymbolSelect }: SymbolSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = popularSymbols.filter(
    (s) =>
      s.symbol.toLowerCase().includes(query.toLowerCase()) ||
      s.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const getTypeIcon = (type: Symbol["type"]) => {
    switch (type) {
      case "crypto":
        return <Bitcoin className="w-3 h-3" />;
      case "forex":
        return <DollarSign className="w-3 h-3" />;
      default:
        return <TrendingUp className="w-3 h-3" />;
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 bg-secondary/40 hover:bg-secondary/60 border border-border/30 rounded-lg transition-all"
      >
        <Search className="w-3.5 h-3.5 text-muted-foreground/50" />
        <span className="text-sm font-mono text-foreground/80">{selectedSymbol}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-80 bg-background/95 backdrop-blur-xl border border-border/30 rounded-xl shadow-2xl shadow-black/50 z-50 overflow-hidden"
          >
            {/* Search input */}
            <div className="p-3 border-b border-border/20">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search symbol or name..."
                  className="w-full pl-10 pr-10 py-2.5 bg-secondary/40 border border-border/20 rounded-lg text-sm font-mono text-foreground/90 placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/40"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground/60"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground/40">
                  No symbols found
                </div>
              ) : (
                <div className="py-2">
                  {filtered.map((s) => (
                    <button
                      key={s.symbol}
                      onClick={() => {
                        onSymbolSelect(s.symbol, s.name);
                        setIsOpen(false);
                        setQuery("");
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-secondary/40 transition-colors ${
                        selectedSymbol === s.symbol ? "bg-primary/10" : ""
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                          s.type === "crypto"
                            ? "bg-amber-500/10 text-amber-400/70"
                            : s.type === "forex"
                            ? "bg-emerald-500/10 text-emerald-400/70"
                            : "bg-primary/10 text-primary/70"
                        }`}
                      >
                        {getTypeIcon(s.type)}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-mono font-semibold text-foreground/80">
                          {s.symbol}
                        </p>
                        <p className="text-[10px] text-muted-foreground/40 truncate">
                          {s.name}
                        </p>
                      </div>
                      <span className="text-[9px] font-mono text-muted-foreground/30 px-1.5 py-0.5 bg-secondary/40 rounded">
                        {s.exchange}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SymbolSearch;
