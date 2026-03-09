import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollSection, { FadeInBlock } from "../ScrollSection";

const EraWallStreet = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: statProgress } = useScroll({
    target: statRef,
    offset: ["start end", "center center"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  // The "90%" text scales up dramatically on scroll
  const statScale = useTransform(statProgress, [0, 0.8], [0.3, 1]);
  const statOpacity = useTransform(statProgress, [0, 0.5], [0, 1]);
  const statBlur = useTransform(statProgress, [0, 0.6], [20, 0]);

  return (
    <>
      {/* separator */}
      <div className="py-16 flex items-center justify-center gap-6 max-w-xl mx-auto px-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-destructive/10" />
        <p className="text-[10px] uppercase tracking-[0.6em] text-destructive/25 font-mono whitespace-nowrap">
          1900s
        </p>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-destructive/10" />
      </div>

      {/* Wall Street */}
      <div ref={imageRef} className="relative h-[85vh] overflow-hidden">
        <motion.div style={{ y: imageY }} className="absolute inset-0">
          <img
            src="/images/wall-street-trading.jpg"
            alt="Wall Street trading floor"
            className="w-full h-full object-cover"
            style={{ filter: "contrast(1.15) brightness(0.35) saturate(0.9)" }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
        <div className="absolute inset-0 flex items-end pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-2xl ml-8 md:ml-20"
          >
            <h2 className="text-4xl md:text-6xl font-display font-light leading-[0.95]">
              Wall Street was built on{" "}
              <span className="text-gradient-terracotta italic font-semibold">
                information asymmetry.
              </span>
            </h2>
          </motion.div>
        </div>
      </div>

      {/* The "90%" — dramatic scroll-driven scale + deblur */}
      <div ref={statRef} className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(0_72%_50%_/_0.03)_0%,_transparent_60%)]" />
        <motion.div
          style={{ scale: statScale, opacity: statOpacity, filter: useTransform(statBlur, (v) => `blur(${v}px)`) }}
          className="text-center"
        >
          <h2 className="text-8xl md:text-[12rem] lg:text-[16rem] font-display font-light leading-none glitch-text cursor-default">
            <span className="text-destructive/70 font-semibold italic">90%</span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl text-foreground/40 font-display mt-4"
          >
            of traders lose money.
          </motion.p>
        </motion.div>
      </div>

      {/* The Problem */}
      <ScrollSection className="bg-background">
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <div className="max-w-xl mx-auto space-y-6">
            <FadeInBlock delay={0.1}>
              <p className="text-base text-muted-foreground leading-relaxed">
                Most platforms give you charts, indicators, and data feeds. But
                none of them actually tell you{" "}
                <span className="text-foreground font-medium">what matters.</span>
              </p>
            </FadeInBlock>

            <FadeInBlock delay={0.2}>
              <p className="text-base text-muted-foreground leading-relaxed">
                So traders do what they've always done. They guess. And the market{" "}
                <motion.span 
                  className="text-destructive/70 inline-block"
                  whileHover={{ scale: 1.1, color: "hsl(0 72% 50%)" }}
                  transition={{ duration: 0.3 }}
                >
                  punishes guessing.
                </motion.span>
              </p>
            </FadeInBlock>

            <FadeInBlock delay={0.3}>
              <p className="text-xl text-foreground/70 font-display italic mt-8">
                Most traders lose not because they lack ambition. They lose
                because they lack intelligence systems.
              </p>
            </FadeInBlock>
          </div>

          {/* The Shift */}
          <div className="mt-24 max-w-xl mx-auto">
            <FadeInBlock delay={0.1}>
              <h3 className="text-3xl md:text-4xl font-display font-light tracking-tight leading-[1] mb-8 text-foreground/80">
                Professional desks don't operate like{" "}
                <span className="text-gradient-primary italic font-semibold">
                  retail traders.
                </span>
              </h3>
            </FadeInBlock>

            <FadeInBlock delay={0.25}>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {["Quantitative models", "Deep analytics", "Disciplined systems", "Institutional infrastructure"].map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="glass-panel-subtle p-3 border-ancient"
                    whileHover={{ 
                      borderColor: "hsl(25 85% 50% / 0.3)",
                      y: -2,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-xs text-foreground/60 font-mono">{item}</p>
                  </motion.div>
                ))}
              </div>
            </FadeInBlock>

            <FadeInBlock delay={0.4}>
              <p className="text-xl text-muted-foreground font-display italic">
                Retail traders have never had access to that.
              </p>
              <motion.p 
                className="text-xl text-foreground font-display italic font-semibold mt-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Until now.
              </motion.p>
            </FadeInBlock>
          </div>
        </div>
      </ScrollSection>
    </>
  );
};

export default EraWallStreet;
