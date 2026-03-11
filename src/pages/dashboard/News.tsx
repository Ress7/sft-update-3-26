import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { motion } from "framer-motion";

type Article = {
  title: string;
  link: string;
  pubDate?: string;
  source: string;
  summary?: string;
  category: "stocks" | "crypto" | "forex" | "macro";
};

const feeds = [
  { url: "https://feeds.reuters.com/reuters/businessNews", source: "Reuters" },
  { url: "https://finance.yahoo.com/rss/topstories", source: "Yahoo Finance" },
  { url: "https://www.coindesk.com/arc/outboundfeeds/rss/?outputType=xml", source: "CoinDesk" },
  { url: "https://www.dailyfx.com/feeds/all", source: "DailyFX" },
];

const classify = (title: string, summary: string) => {
  const t = `${title} ${summary}`.toLowerCase();
  const scores: Record<"stocks" | "crypto" | "forex" | "macro", number> = {
    stocks: 0,
    crypto: 0,
    forex: 0,
    macro: 0,
  };
  const add = (k: keyof typeof scores, n = 1) => (scores[k] += n);

  if (/\b(stock|stocks|equity|equities|shares|earnings|NASDAQ|NYSE|S&P|Dow)\b/i.test(t)) add("stocks", 3);
  if (/\b(aapl|msft|nvda|tsla|amzn|googl|meta|ibm|nflx)\b/i.test(t)) add("stocks", 2);

  if (/\b(crypto|bitcoin|btc|ethereum|eth|blockchain|token|defi|stablecoin)\b/i.test(t)) add("crypto", 3);

  if (/\b(forex|fx|currency|eurusd|gbpusd|usdjpy|usdchf|yen|euro|pound|usd)\b/i.test(t)) add("forex", 3);

  if (/\b(inflation|interest rate|rates|fomc|fed|central bank|gdp|unemployment|recession|cpi|ppi)\b/i.test(t)) add("macro", 3);

  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  return (best?.[0] as Article["category"]) || "macro";
};

const fetchRSS = async (feedUrl: string) => {
  const proxied = `https://api.allorigins.win/raw?url=${encodeURIComponent(feedUrl)}`;
  const res = await fetch(proxied);
  const xml = await res.text();
  const doc = new DOMParser().parseFromString(xml, "text/xml");
  const items = Array.from(doc.querySelectorAll("item"));
  return items.map((item) => {
    const title = item.querySelector("title")?.textContent || "";
    const link = item.querySelector("link")?.textContent || "";
    const pubDate = item.querySelector("pubDate")?.textContent || undefined;
    const summary = item.querySelector("description")?.textContent || undefined;
    return { title, link, pubDate, summary };
  });
};

const News = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Article["category"]>("stocks");

  useEffect(() => {
    setLoading(true);
    Promise.all(
      feeds.map(async (f) => {
        try {
          const items = await fetchRSS(f.url);
          return items.map((i) => ({
            title: i.title,
            link: i.link,
            pubDate: i.pubDate,
            source: f.source,
            summary: i.summary,
            category: classify(i.title, i.summary || ""),
          })) as Article[];
        } catch (e) {
          return [] as Article[];
        }
      }),
    )
      .then((lists) => {
        const combined = lists.flat();
        combined.sort((a, b) => (b.pubDate ? new Date(b.pubDate).getTime() : 0) - (a.pubDate ? new Date(a.pubDate).getTime() : 0));
        setArticles(combined);
        setLoading(false);
      })
      .catch((e) => {
        setError("Failed to load news");
        setLoading(false);
      });
  }, []);

  const byCategory = useMemo(() => {
    return {
      stocks: articles.filter((a) => a.category === "stocks"),
      crypto: articles.filter((a) => a.category === "crypto"),
      forex: articles.filter((a) => a.category === "forex"),
      macro: articles.filter((a) => a.category === "macro"),
    };
  }, [articles]);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-[0.5em] text-primary/30 mb-2 font-mono">Intelligence</p>
          <h1 className="text-2xl md:text-3xl font-display font-light text-foreground/80">Market News</h1>
          <p className="text-sm text-muted-foreground/50 mt-2">Auto-tagged by category using an AI-like classifier.</p>
        </div>

        <Tabs value={tab} onValueChange={(v) => setTab(v as Article["category"])} className="space-y-6">
          <TabsList className="grid grid-cols-5 max-w-2xl">
            <TabsTrigger value="stocks">Stocks</TabsTrigger>
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
            <TabsTrigger value="forex">Forex</TabsTrigger>
            <TabsTrigger value="macro">Macro</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>

          {["stocks", "crypto", "forex", "macro"].map((cat) => (
            <TabsContent key={cat} value={cat}>
              {loading && <p className="text-muted-foreground/50 text-sm">Loading...</p>}
              {error && <p className="text-destructive/70 text-sm">{error}</p>}
              {!loading && !error && (
                <div className="grid md:grid-cols-2 gap-4">
                  {byCategory[cat as keyof typeof byCategory].slice(0, 20).map((a, i) => (
                    <motion.a
                      key={`${a.link}-${i}`}
                      href={a.link}
                      target="_blank"
                      rel="noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="group p-5 rounded-xl border border-border/20 hover:border-primary/30 hover:bg-primary/5 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/40">{a.source}</span>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-primary/50">{a.category}</span>
                      </div>
                      <h3 className="mt-2 text-base text-foreground/90 group-hover:text-foreground">{a.title}</h3>
                      {a.summary && <p className="mt-2 text-xs text-muted-foreground/60 line-clamp-2">{a.summary.replace(/<[^>]+>/g, "")}</p>}
                      {a.pubDate && (
                        <p className="mt-3 text-[10px] text-muted-foreground/40 font-mono">
                          {new Date(a.pubDate).toLocaleString()}
                        </p>
                      )}
                    </motion.a>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}

          <TabsContent value="all">
            {loading && <p className="text-muted-foreground/50 text-sm">Loading...</p>}
            {error && <p className="text-destructive/70 text-sm">{error}</p>}
            {!loading && !error && (
              <div className="grid md:grid-cols-2 gap-4">
                {articles.slice(0, 40).map((a, i) => (
                  <motion.a
                    key={`${a.link}-${i}`}
                    href={a.link}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="group p-5 rounded-xl border border-border/20 hover:border-primary/30 hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/40">{a.source}</span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-primary/50">{a.category}</span>
                    </div>
                    <h3 className="mt-2 text-base text-foreground/90 group-hover:text-foreground">{a.title}</h3>
                    {a.summary && <p className="mt-2 text-xs text-muted-foreground/60 line-clamp-2">{a.summary.replace(/<[^>]+>/g, "")}</p>}
                    {a.pubDate && (
                      <p className="mt-3 text-[10px] text-muted-foreground/40 font-mono">
                        {new Date(a.pubDate).toLocaleString()}
                      </p>
                    )}
                  </motion.a>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default News;
