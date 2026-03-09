import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollSection, { FadeInBlock } from "../ScrollSection";

const QUESTIONS = [
  {
    question: "What do you analyze?",
    answer: "I process millions of market signals — price action, volume, sentiment, options flow, macro data — and synthesize them into actionable intelligence in milliseconds.",
  },
  {
    question: "How does Stoneforge work?",
    answer: "Stoneforge combines my analytical engine with an institutional-grade trading terminal. Every signal I generate is explainable, every recommendation is transparent.",
  },
  {
    question: "Why do traders fail?",
    answer: "Emotion. Information overload. Lack of edge. Most traders fight the market with gut instinct. I fight it with mathematics, pattern recognition, and cold logic.",
  },
];

const OrionInteraction = () => {
  const [selectedQ, setSelectedQ] = useState<number | null>(null);
  const [showContinue, setShowContinue] = useState(false);

  const handleSelect = (i: number) => {
    setSelectedQ(i);
    setTimeout(() => setShowContinue(true), 2000);
  };

  return (
    <ScrollSection className="bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(25_85%_50%_/_0.02)_0%,_transparent_50%)]" />

      <div className="relative z-10 max-w-xl mx-auto px-6 w-full">
        <FadeInBlock className="flex justify-center mb-10">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-primary/8 flex items-center justify-center border border-primary/15">
              <div className="w-10 h-10 rounded-full bg-primary/15 animate-pulse-glow flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-primary/30" />
              </div>
            </div>
            <div className="absolute inset-0 rounded-full bg-primary/3 blur-[60px] scale-[4]" />
          </div>
        </FadeInBlock>

        <FadeInBlock delay={0.15} className="mb-8">
          <div className="glass-panel p-6 border-ancient">
            <p className="text-[10px] uppercase tracking-[0.4em] text-primary/40 mb-3 font-mono">Orion</p>
            <p className="text-lg text-foreground/70 font-display leading-relaxed italic">
              "I analyze markets the way the greatest strategists analyzed battle — with precision, discipline, and foresight."
            </p>
          </div>
        </FadeInBlock>

        <FadeInBlock delay={0.3} className="space-y-2 mb-6">
          {QUESTIONS.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selectedQ !== null}
              className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 text-xs font-mono
                ${selectedQ === i
                  ? "border-primary/30 bg-primary/5 text-foreground/80"
                  : selectedQ !== null
                    ? "border-border/10 text-muted-foreground/20 cursor-default"
                    : "border-border/20 text-muted-foreground/60 hover:border-primary/20 hover:text-foreground/70 cursor-pointer"
                }`}
            >
              {q.question}
            </button>
          ))}
        </FadeInBlock>

        <AnimatePresence>
          {selectedQ !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel p-6 mb-6 border-ancient"
            >
              <p className="text-[10px] uppercase tracking-[0.4em] text-primary/40 mb-3 font-mono">Orion</p>
              <p className="text-foreground/60 leading-relaxed font-display text-base italic">
                {QUESTIONS[selectedQ].answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showContinue && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <p className="text-base text-muted-foreground/40 font-display italic">
                "Keep scrolling."
              </p>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mt-3 text-accent/20 text-sm"
              >
                ↓
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollSection>
  );
};

export default OrionInteraction;