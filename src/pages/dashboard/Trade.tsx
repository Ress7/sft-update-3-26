import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import TradingViewChart from "../../components/trade/TradingViewChart";
import SymbolSearch from "../../components/trade/SymbolSearch";
import OrderPanel from "../../components/trade/OrderPanel";
import MarketData from "../../components/trade/MarketData";
import Watchlist from "../../components/trade/Watchlist";
import { useIsMobile } from "../../hooks/use-mobile";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../../components/ui/sheet";
import { Layout, Maximize2, Settings2, List } from "lucide-react";

const watchlistData = [
  { symbol: "AAPL", name: "Apple Inc.", price: 258.63, change: -1.09, positive: false },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 421.33, change: +0.87, positive: true },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 874.15, change: +4.21, positive: true },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 178.92, change: +0.34, positive: true },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 205.74, change: -0.56, positive: false },
  { symbol: "TSLA", name: "Tesla Inc.", price: 312.18, change: -2.14, positive: false },
  { symbol: "META", name: "Meta Platforms", price: 598.40, change: +1.22, positive: true },
  { symbol: "BTC", name: "Bitcoin USD", price: 94200.00, change: +3.15, positive: true },
  { symbol: "ETH", name: "Ethereum USD", price: 3480.00, change: +2.08, positive: true },
];

// Map symbols to TradingView format
const getTradingViewSymbol = (symbol: string): string => {
  const mapping: Record<string, string> = {
    AAPL: "NASDAQ:AAPL",
    MSFT: "NASDAQ:MSFT",
    NVDA: "NASDAQ:NVDA",
    GOOGL: "NASDAQ:GOOGL",
    AMZN: "NASDAQ:AMZN",
    TSLA: "NASDAQ:TSLA",
    META: "NASDAQ:META",
    BTC: "BINANCE:BTCUSDT",
    ETH: "BINANCE:ETHUSDT",
    BTCUSD: "BINANCE:BTCUSDT",
    ETHUSD: "BINANCE:ETHUSDT",
    SOLUSD: "BINANCE:SOLUSDT",
    SPY: "AMEX:SPY",
    QQQ: "NASDAQ:QQQ",
    EURUSD: "FX:EURUSD",
    GBPUSD: "FX:GBPUSD",
  };
  return mapping[symbol] || `NASDAQ:${symbol}`;
};

const Trade = () => {
  const [selected, setSelected] = useState(watchlistData[2]); // NVDA default
  const [tvSymbol, setTvSymbol] = useState("NASDAQ:NVDA");
  const [watchlistOpen, setWatchlistOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleSymbolSelect = (symbol: string, name: string) => {
    const watchlistItem = watchlistData.find((w) => w.symbol === symbol);
    if (watchlistItem) {
      setSelected(watchlistItem);
    } else {
      setSelected({
        symbol,
        name,
        price: 100,
        change: 0,
        positive: true,
      });
    }
    setTvSymbol(getTradingViewSymbol(symbol));
  };

  const handleWatchlistSelect = (item: typeof watchlistData[0]) => {
    setSelected(item);
    setTvSymbol(getTradingViewSymbol(item.symbol));
    setWatchlistOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-60px)] flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-3 md:px-4 py-2 md:py-3 border-b border-border/20 bg-background/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
            <SymbolSearch
              selectedSymbol={selected.symbol}
              onSymbolSelect={handleSymbolSelect}
            />
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm md:text-lg font-mono font-bold text-foreground/90">
                ${selected.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <span
                className={`text-[10px] md:text-xs font-mono ${
                  selected.positive ? "text-olive" : "text-destructive"
                }`}
              >
                {selected.positive ? "+" : ""}
                {selected.change}%
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <span className="hidden sm:flex items-center gap-1.5 px-2 md:px-2.5 py-1 md:py-1.5 rounded-lg bg-olive/10 border border-olive/20 text-[8px] md:text-[9px] font-mono text-olive/70">
              <span className="w-1.5 h-1.5 rounded-full bg-olive/60 animate-pulse" />
              PAPER
            </span>
            
            {/* Mobile Watchlist Toggle */}
            <Sheet open={watchlistOpen} onOpenChange={setWatchlistOpen}>
              <SheetTrigger asChild>
                <button className="xl:hidden p-2 rounded-lg hover:bg-secondary/40 text-muted-foreground/40 hover:text-foreground/60 transition-colors">
                  <List className="w-4 h-4" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0 bg-background border-border/20">
                <SheetHeader className="p-4 border-b border-border/20">
                  <SheetTitle className="text-sm font-display">Watchlist</SheetTitle>
                </SheetHeader>
                <div className="h-[calc(100vh-80px)] overflow-hidden">
                  <Watchlist
                    items={watchlistData}
                    selectedSymbol={selected.symbol}
                    onSelect={handleWatchlistSelect}
                  />
                </div>
              </SheetContent>
            </Sheet>
            
            <button className="hidden md:block p-2 rounded-lg hover:bg-secondary/40 text-muted-foreground/40 hover:text-foreground/60 transition-colors">
              <Layout className="w-4 h-4" />
            </button>
            <button className="hidden md:block p-2 rounded-lg hover:bg-secondary/40 text-muted-foreground/40 hover:text-foreground/60 transition-colors">
              <Settings2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile price display */}
        <div className="sm:hidden flex items-center justify-between px-3 py-2 border-b border-border/10 bg-background/30">
          <span className="text-lg font-mono font-bold text-foreground/90">
            ${selected.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
          <span
            className={`text-xs font-mono ${
              selected.positive ? "text-olive" : "text-destructive"
            }`}
          >
            {selected.positive ? "+" : ""}
            {selected.change}%
          </span>
        </div>

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-0 overflow-hidden">
          {/* Left: Chart + Market Data */}
          <div className="flex flex-col overflow-hidden xl:border-r xl:border-border/10">
            {/* TradingView Chart */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 min-h-[250px] md:min-h-[400px] relative"
            >
              <TradingViewChart symbol={tvSymbol} theme="dark" />
              <button className="absolute top-2 right-2 md:top-3 md:right-3 p-1.5 md:p-2 rounded-lg bg-background/60 backdrop-blur-sm border border-border/20 text-muted-foreground/40 hover:text-foreground/60 transition-colors">
                <Maximize2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </button>
            </motion.div>

            {/* Bottom: Market Data + Order Panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 p-2 md:p-3 border-t border-border/10 bg-background/30 overflow-y-auto max-h-[400px] md:max-h-none">
              <MarketData
                symbol={selected.symbol}
                price={selected.price}
                change={selected.change}
                positive={selected.positive}
              />
              <OrderPanel
                symbol={selected.symbol}
                symbolName={selected.name}
                price={selected.price}
              />
            </div>
          </div>

          {/* Right: Watchlist (Desktop only) */}
          <div className="hidden xl:block p-3 overflow-hidden">
            <Watchlist
              items={watchlistData}
              selectedSymbol={selected.symbol}
              onSelect={handleWatchlistSelect}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Trade;
