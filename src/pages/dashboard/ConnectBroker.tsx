import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { Search, Star, ExternalLink, Link2, X, Check, ChevronDown } from "lucide-react";

const brokerCategories = ["All Brokers", "Stocks", "Crypto", "Forex", "Futures", "CFDs"];

const brokers = [
  { name: "Paper Trading", desc: "Brokerage simulator by Stoneforge", rating: null, icon: "📋", featured: false, category: ["Stocks", "Crypto", "Forex"] },
  { name: "Capital.com", desc: "Forex, CFDs", rating: 4.8, icon: "C", featured: true, category: ["Forex", "CFDs"] },
  { name: "OKX", desc: "Crypto", rating: 4.9, icon: "⬡", featured: false, category: ["Crypto"] },
  { name: "Interactive Brokers", desc: "Stocks, Options, Futures", rating: 4.7, icon: "IB", featured: false, category: ["Stocks", "Futures"] },
  { name: "Alpaca", desc: "Stocks, Crypto", rating: 4.6, icon: "🦙", featured: false, category: ["Stocks", "Crypto"] },
  { name: "Binance", desc: "Crypto", rating: 4.8, icon: "B", featured: false, category: ["Crypto"] },
  { name: "TD Ameritrade", desc: "Stocks, Options", rating: 4.5, icon: "TD", featured: false, category: ["Stocks"] },
  { name: "IC Markets", desc: "Forex, CFDs", rating: 4.6, icon: "IC", featured: false, category: ["Forex", "CFDs"] },
  { name: "Pepperstone", desc: "Forex, CFDs", rating: 4.6, icon: "P", featured: false, category: ["Forex", "CFDs"] },
  { name: "Coinbase", desc: "Crypto", rating: 4.4, icon: "CB", featured: false, category: ["Crypto"] },
  { name: "OANDA", desc: "Forex", rating: 4.5, icon: "OA", featured: false, category: ["Forex"] },
  { name: "Kraken", desc: "Crypto", rating: 4.5, icon: "K", featured: false, category: ["Crypto"] },
  { name: "TradeStation", desc: "Stocks, Futures", rating: 4.3, icon: "TS", featured: false, category: ["Stocks", "Futures"] },
  { name: "eToro", desc: "Stocks, Crypto, CFDs", rating: 4.4, icon: "eT", featured: false, category: ["Stocks", "Crypto", "CFDs"] },
  { name: "FxPro", desc: "Forex, CFDs", rating: 4.4, icon: "FP", featured: false, category: ["Forex", "CFDs"] },
];

const ConnectBroker = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Brokers");
  const [selectedBroker, setSelectedBroker] = useState<string | null>(null);

  const filtered = brokers.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All Brokers" || b.category.includes(category);
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl md:text-4xl font-display font-bold text-foreground tracking-tight mb-2">
            Connect Broker
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground/40">Pick a broker to enable live trading with Orion AI.</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center gap-2 mb-4 md:mb-6"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search brokers..."
              className="pl-9 pr-4 py-2 bg-secondary/30 border border-border/20 rounded-xl text-xs text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/30 font-mono w-52"
            />
          </div>
          {brokerCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all border ${
                category === cat
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "text-muted-foreground/30 border-border/20 hover:text-foreground/50 hover:border-border/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Featured broker */}
        {category === "All Brokers" && !search && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-6 p-5 rounded-2xl border border-border/20 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(280 40% 15%) 0%, hsl(25 50% 12%) 100%)",
            }}
          >
            <span className="absolute top-4 right-4 text-[9px] font-mono px-2 py-0.5 rounded bg-foreground/10 border border-foreground/10 text-foreground/50">FEATURED</span>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-background/30 border border-border/20 flex items-center justify-center text-2xl">
                C
              </div>
              <div>
                <h2 className="text-lg font-mono font-bold text-foreground/90">Capital.com</h2>
                <p className="text-xs text-muted-foreground/40 mb-2">Tradable assets: Forex, CFDs</p>
                <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground/50">
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-accent/60 fill-accent/60" /> 4.8 · Excellent</span>
                  <span>28.4K Reviews</span>
                  <span>281.5K Accounts</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button className="px-5 py-2 rounded-xl text-xs font-mono font-bold bg-foreground/10 text-foreground/80 border border-foreground/15 hover:bg-foreground/15 transition-all flex items-center gap-1.5">
                Connect <ExternalLink className="w-3 h-3" />
              </button>
              <button className="px-5 py-2 rounded-xl text-xs font-mono text-muted-foreground/40 border border-border/20 hover:text-foreground/60 transition-all">
                Learn More
              </button>
            </div>
          </motion.div>
        )}

        {/* Broker grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3">
          {filtered.map((broker, i) => (
            <motion.button
              key={broker.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * Math.min(i, 15) }}
              onClick={() => setSelectedBroker(broker.name === selectedBroker ? null : broker.name)}
              className={`glass-panel-subtle p-4 text-center hover:border-primary/20 transition-all relative group ${
                selectedBroker === broker.name ? "border-primary/30 bg-primary/5" : ""
              }`}
            >
              {selectedBroker === broker.name && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary" />
                </div>
              )}
              <div className="w-12 h-12 rounded-xl bg-secondary/50 border border-border/20 mx-auto mb-3 flex items-center justify-center text-lg font-mono font-bold text-foreground/60 group-hover:border-primary/20 transition-all">
                {broker.icon.length <= 3 ? broker.icon : <span className="text-base">{broker.icon}</span>}
              </div>
              <p className="text-xs font-mono font-medium text-foreground/70 mb-0.5">{broker.name}</p>
              {broker.rating ? (
                <p className="text-[10px] font-mono text-muted-foreground/30 flex items-center justify-center gap-1">
                  <Star className="w-2.5 h-2.5 fill-accent/50 text-accent/50" />
                  {broker.rating}
                </p>
              ) : (
                <p className="text-[10px] font-mono text-muted-foreground/25">{broker.desc}</p>
              )}
            </motion.button>
          ))}
        </div>

        {/* Connect CTA */}
        {selectedBroker && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
          >
            <div className="glass-panel px-6 py-3 flex items-center gap-4 glow-warm">
              <p className="text-xs font-mono text-foreground/70">
                Connect to <span className="font-bold text-primary/80">{selectedBroker}</span>?
              </p>
              <button className="px-5 py-2 rounded-xl text-xs font-mono font-bold bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 transition-all flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5" />
                Connect
              </button>
              <button
                onClick={() => setSelectedBroker(null)}
                className="p-1.5 text-muted-foreground/30 hover:text-foreground/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Need a broker? */}
        <div className="text-center mt-8 mb-4">
          <button className="text-xs font-mono text-muted-foreground/30 hover:text-foreground/50 transition-all flex items-center gap-1.5 mx-auto">
            <Link2 className="w-3 h-3" />
            Need a broker? We'll help you choose.
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ConnectBroker;
