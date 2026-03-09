import ScrollSection, { FadeInBlock } from "../ScrollSection";
import StoneforgeLogo from "../StoneforgeLogo";

const CARDS = [
  {
    title: "AI Trade Intelligence",
    desc: "Signals backed by real analysis. Not noise. Not guesswork.",
  },
  {
    title: "Institutional-Grade Analytics",
    desc: "Understand markets like a professional desk.",
  },
  {
    title: "Strategy Automation",
    desc: "Turn insight into disciplined execution.",
  },
  {
    title: "Verified Social Trading",
    desc: "Follow traders with verified performance.",
  },
  {
    title: "Portfolio Intelligence",
    desc: "Know your risk before the market teaches you.",
  },
];

const WhyDifferent = () => {
  return (
    <ScrollSection className="bg-background py-32">
      <div className="relative z-10 max-w-4xl mx-auto px-6 w-full">
        <FadeInBlock className="text-center mb-16">
          <StoneforgeLogo variant="icon" className="h-6 w-6 mx-auto mb-6 opacity-20" />
          <h2 className="text-3xl md:text-5xl font-display font-light tracking-tight mb-4 text-foreground/80">
            Instead of staring at charts…
          </h2>
          <p className="text-xl text-foreground/60 font-display italic">
            Stoneforge <span className="text-gradient-primary font-semibold">shows you.</span>
          </p>
        </FadeInBlock>

        {/* Comparison */}
        <FadeInBlock delay={0.15} className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
            <div className="glass-panel-subtle p-5 text-center">
              <p className="text-[10px] uppercase tracking-wider text-destructive/40 mb-2 font-mono">Old Trading</p>
              <p className="text-sm text-muted-foreground font-display italic">Look at charts → guess</p>
            </div>
            <div className="glass-panel p-5 text-center border-ancient glow-warm">
              <p className="text-[10px] uppercase tracking-wider text-primary/40 mb-2 font-mono">Stoneforge</p>
              <p className="text-sm text-foreground/80 font-display italic font-semibold">Understand → act</p>
            </div>
          </div>
        </FadeInBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CARDS.map((card, i) => (
            <FadeInBlock key={card.title} delay={i * 0.06}>
              <div className="glass-panel-subtle p-6 h-full border-ancient group hover:border-primary/15 transition-all duration-500">
                <h3 className="text-base font-display font-semibold text-foreground/70 mb-2">{card.title}</h3>
                <p className="text-xs text-muted-foreground/60 leading-relaxed">{card.desc}</p>
              </div>
            </FadeInBlock>
          ))}
        </div>
      </div>
    </ScrollSection>
  );
};

export default WhyDifferent;