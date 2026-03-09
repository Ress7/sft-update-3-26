import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import {
  Bot, Send, Zap, TrendingUp, ShieldCheck, AlertTriangle,
  Target, BarChart3, Brain, ChevronRight, Sparkles
} from "lucide-react";

const insights = [
  {
    type: "signal" as const,
    title: "NVDA Buy Signal Detected",
    desc: "Strong momentum with rising volume. Confidence: 94%",
    icon: TrendingUp,
    color: "text-green-400/80",
    bgColor: "bg-green-400/5 border-green-400/15",
    time: "2 min ago",
  },
  {
    type: "risk" as const,
    title: "Portfolio Risk Alert",
    desc: "Tech sector allocation at 72%. Consider diversifying into defensives.",
    icon: AlertTriangle,
    color: "text-accent/80",
    bgColor: "bg-accent/5 border-accent/15",
    time: "15 min ago",
  },
  {
    type: "strategy" as const,
    title: "Mean Reversion Strategy Active",
    desc: "Monitoring 3 positions. Current win rate: 68%. Avg hold time: 4.2 days.",
    icon: Target,
    color: "text-primary/80",
    bgColor: "bg-primary/5 border-primary/15",
    time: "Active",
  },
  {
    type: "insight" as const,
    title: "Market Regime: Risk-On",
    desc: "VIX at 14.2. Favorable conditions for momentum strategies.",
    icon: Brain,
    color: "text-patina",
    bgColor: "bg-patina/5 border-patina/15",
    time: "1 hr ago",
  },
];

const strategies = [
  { name: "Momentum Alpha", status: "Active", winRate: 72, trades: 148, pnl: "+$8,420", risk: "Medium" },
  { name: "Mean Reversion", status: "Active", winRate: 68, trades: 92, pnl: "+$3,210", risk: "Low" },
  { name: "Breakout Scanner", status: "Paused", winRate: 61, trades: 54, pnl: "+$1,840", risk: "High" },
  { name: "Sector Rotation", status: "Active", winRate: 77, trades: 36, pnl: "+$5,680", risk: "Low" },
];

type ChatMessage = { role: "user" | "assistant"; content: string };

const mockResponses: Record<string, string> = {
  default:
    "I'm analyzing the current market conditions. Based on my models, the tech sector shows continued strength with NVDA leading. I'd recommend maintaining your current momentum strategy while keeping stop-losses tight at 2.5% below entry.",
  performance:
    "Your portfolio is up 12.4% this month. Your best performer is NVDA (+21.4%). The Mean Reversion strategy has a 68% win rate across 92 trades. Overall Sharpe ratio is 1.8.",
  risk:
    "Current portfolio risk assessment: Your max drawdown potential is 8.2%. I recommend hedging your tech exposure with VIX calls. Your position sizing is well-calibrated at 2% risk per trade.",
  market:
    "Today's market outlook: S&P 500 is in a bullish trend above all major moving averages. Earnings season begins next week — expect increased volatility. Key levels to watch: SPX 5,200 support, 5,350 resistance.",
};

const Orion = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "I'm Orion, your AI trading strategist. I analyze markets the way the greatest strategists analyzed battle — with precision, patience, and pattern recognition. Ask me anything about your portfolio, strategies, or market conditions." },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim().toLowerCase();
    setChatMessages((prev) => [...prev, { role: "user", content: input.trim() }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let response = mockResponses.default;
      if (userMsg.includes("performance") || userMsg.includes("how am i")) response = mockResponses.performance;
      else if (userMsg.includes("risk") || userMsg.includes("drawdown")) response = mockResponses.risk;
      else if (userMsg.includes("market") || userMsg.includes("outlook")) response = mockResponses.market;

      setChatMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-[1400px] mx-auto">
        <div className="mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl font-display font-bold text-foreground flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Bot className="w-4 h-4 md:w-5 md:h-5 text-accent/80" />
            </div>
            Orion AI
          </h1>
          <p className="text-[10px] md:text-xs text-muted-foreground/40 mt-1 font-mono">Intelligent Trading Strategist</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_380px] gap-4">
          {/* Left: Chat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel-subtle flex flex-col h-[calc(100vh-180px)] md:h-[calc(100vh-200px)] min-h-[400px] md:min-h-[500px]"
          >
            {/* Chat header */}
            <div className="px-5 py-3 border-b border-border/20 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent/60 animate-pulse" />
              <span className="text-xs font-mono text-muted-foreground/50">Orion AI · Online</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {chatMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary/15 text-foreground/80 rounded-br-md border border-primary/20"
                        : "bg-secondary/40 text-foreground/70 rounded-bl-md border border-border/20"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Sparkles className="w-3 h-3 text-accent/60" />
                        <span className="text-[9px] font-mono text-accent/50 uppercase tracking-wider">Orion</span>
                      </div>
                    )}
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 px-4 py-3 bg-secondary/30 rounded-2xl rounded-bl-md w-fit border border-border/20">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <motion.div
                        key={d}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                        className="w-1.5 h-1.5 rounded-full bg-accent/50"
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick actions */}
            <div className="px-5 py-2 flex gap-2 overflow-x-auto scrollbar-none">
              {["How's my performance?", "Market outlook?", "Risk assessment"].map((q) => (
                <button
                  key={q}
                  onClick={() => { setInput(q); }}
                  className="shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-mono text-muted-foreground/40 border border-border/20 hover:border-primary/20 hover:text-foreground/60 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-5 py-4 border-t border-border/20">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask Orion anything..."
                  className="flex-1 px-4 py-2.5 bg-secondary/30 border border-border/20 rounded-xl text-xs text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/30 font-mono"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-2.5 rounded-xl bg-primary/15 border border-primary/25 text-primary/70 hover:bg-primary/25 transition-all disabled:opacity-30"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right: Insights + Strategies */}
          <div className="space-y-4">
            {/* Live Insights */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-panel-subtle p-5"
            >
              <h3 className="text-sm font-display font-semibold text-foreground/80 mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent/60" />
                Live Insights
              </h3>
              <div className="space-y-2">
                {insights.map((ins, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className={`p-3 rounded-xl border ${ins.bgColor} cursor-pointer hover:brightness-125 transition-all`}
                  >
                    <div className="flex items-start gap-2">
                      <ins.icon className={`w-4 h-4 ${ins.color} mt-0.5 shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-xs font-medium ${ins.color}`}>{ins.title}</p>
                          <span className="text-[9px] text-muted-foreground/30 font-mono shrink-0 ml-2">{ins.time}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground/40 mt-0.5 leading-relaxed">{ins.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Strategies */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-panel-subtle p-5"
            >
              <h3 className="text-sm font-display font-semibold text-foreground/80 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary/60" />
                Active Strategies
              </h3>
              <div className="space-y-2">
                {strategies.map((s, i) => (
                  <div key={i} className="p-3 rounded-xl bg-secondary/20 border border-border/15 hover:bg-secondary/30 transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-mono font-medium text-foreground/70">{s.name}</p>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                        s.status === "Active"
                          ? "text-green-400/70 bg-green-400/10 border border-green-400/15"
                          : "text-muted-foreground/40 bg-secondary/30 border border-border/20"
                      }`}>
                        {s.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-mono text-muted-foreground/40">
                      <span>WR: <span className="text-foreground/60">{s.winRate}%</span></span>
                      <span>Trades: <span className="text-foreground/60">{s.trades}</span></span>
                      <span className="text-green-400/60">{s.pnl}</span>
                    </div>
                    {/* Win rate bar */}
                    <div className="w-full h-1 bg-secondary/40 rounded-full mt-2">
                      <div
                        className="h-full bg-primary/50 rounded-full transition-all"
                        style={{ width: `${s.winRate}%` }}
                      />
                    </div>
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

export default Orion;
