import { motion } from "framer-motion";
import ScrollSection, { FadeInBlock } from "../ScrollSection";

const ProblemSection = () => {
  const candles = Array.from({ length: 30 }, (_, i) => {
    const open = 100 - i * 1.5 + Math.random() * 10;
    const close = open - Math.random() * 8;
    const high = Math.max(open, close) + Math.random() * 4;
    const low = Math.min(open, close) - Math.random() * 4;
    return { open, close, high, low, x: i * 22 + 20 };
  });

  return (
    <ScrollSection className="bg-background">
      {/* Falling red candles background */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.06]">
        <svg viewBox="0 0 700 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          {candles.map((c, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
            >
              <line x1={c.x} y1={300 - c.high} x2={c.x} y2={300 - c.low} stroke="hsl(var(--destructive))" strokeWidth="1" />
              <rect
                x={c.x - 6}
                y={300 - Math.max(c.open, c.close)}
                width={12}
                height={Math.abs(c.open - c.close) || 1}
                fill="hsl(var(--destructive))"
              />
            </motion.g>
          ))}
        </svg>
      </div>

      {/* Greek sculpture image floating */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[40vw] max-w-lg opacity-[0.12] pointer-events-none hidden md:block">
        <img
          src="/images/greek-sculpture.jpg"
          alt=""
          className="w-full h-auto object-cover rounded-l-3xl"
          style={{ filter: 'sepia(0.3) contrast(1.1) brightness(0.6)' }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <FadeInBlock>
          <p className="text-xs uppercase tracking-[0.3em] text-destructive/70 mb-6 font-mono">The Problem</p>
        </FadeInBlock>

        <FadeInBlock delay={0.1}>
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-display font-light tracking-tight leading-[0.9] mb-8">
            <span className="text-destructive/80 font-semibold italic">90%</span> of traders
            <br />
            lose money.
          </h2>
        </FadeInBlock>

        <FadeInBlock delay={0.25}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed mb-6">
            Platforms give tools, not intelligence.
          </p>
        </FadeInBlock>

        <FadeInBlock delay={0.4}>
          <p className="text-lg text-muted-foreground/50 max-w-md mx-auto italic font-display text-2xl">
            Traders are left guessing.
          </p>
        </FadeInBlock>
      </div>
    </ScrollSection>
  );
};

export default ProblemSection;
