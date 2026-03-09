import { motion } from "framer-motion";
import ScrollSection, { FadeInBlock } from "../ScrollSection";
import OrionConstellation from "../OrionConstellation";

const EmergenceSection = () => {
  return (
    <ScrollSection className="bg-background">
      <OrionConstellation showConstellation={true} />

      {/* Warm radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(25_60%_50%_/_0.05)_0%,_transparent_50%)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <FadeInBlock>
          <p className="text-xs uppercase tracking-[0.4em] text-primary/60 mb-8 font-mono">The Emergence</p>
        </FadeInBlock>

        <FadeInBlock delay={0.15}>
          <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-display font-light tracking-tight mb-8 leading-[0.85]">
            Meet{" "}
            <span className="text-gradient-primary italic font-semibold">Orion</span>
            <span className="text-gradient-gold">.</span>
          </h2>
        </FadeInBlock>

        <FadeInBlock delay={0.3}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed font-display italic text-2xl">
            An intelligence that analyzes markets the way ancient strategists analyzed battle — 
            with precision, discipline, and foresight.
          </p>
        </FadeInBlock>
      </div>
    </ScrollSection>
  );
};

export default EmergenceSection;
