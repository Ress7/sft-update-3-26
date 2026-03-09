import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollSection, { FadeInBlock } from "../ScrollSection";
import OrionConstellation from "../OrionConstellation";
import StoneforgeLogo from "../StoneforgeLogo";

const EraStoneforge = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: revealProgress } = useScroll({
    target: revealRef,
    offset: ["start end", "center center"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  // Everything converges to center
  const convergeScale = useTransform(revealProgress, [0, 0.8], [1.5, 1]);
  const convergeOpacity = useTransform(revealProgress, [0, 0.5], [0, 1]);
  const convergeBlur = useTransform(revealProgress, [0, 0.6], [15, 0]);

  const capabilities = ["Price action", "Market structure", "Volatility regimes", "Sentiment signals", "Liquidity flows"];

  return (
    <>
      {/* separator with >< */}
      <div className="py-20 flex flex-col items-center justify-center gap-4">
        <motion.div
          initial={{ rotate: 0 }}
          whileInView={{ rotate: 360 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        >
          <StoneforgeLogo variant="icon" className="h-8 w-8 opacity-20" />
        </motion.div>
        <p className="text-[10px] uppercase tracking-[0.6em] text-primary/25 font-mono">
          Now
        </p>
      </div>

      {/* Orion emergence — image starts zoomed and converges */}
      <div ref={imageRef} className="relative h-[100vh] overflow-hidden">
        <motion.div style={{ y: imageY }} className="absolute inset-0">
          <img
            src="/images/orion-emergence.jpg"
            alt="The Orion constellation transforming into a neural network"
            className="w-full h-full object-cover"
            style={{ filter: "contrast(1.2) brightness(0.35) saturate(1.2)" }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl px-6"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-light leading-[0.9]">
              From the stars,{" "}
              <span className="text-gradient-primary italic font-semibold">
                intelligence
              </span>{" "}
              was born.
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Meet Orion — elements converge from scaled/blurred state */}
      <ScrollSection className="bg-background">
        <OrionConstellation showConstellation={true} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(25_85%_50%_/_0.03)_0%,_transparent_50%)]" />

        <div ref={revealRef} className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div
            style={{ 
              scale: convergeScale, 
              opacity: convergeOpacity,
              filter: useTransform(convergeBlur, (v) => `blur(${v}px)`),
            }}
          >
            <StoneforgeLogo variant="icon" className="h-10 w-10 mx-auto mb-8 opacity-40" />

            <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-display font-light tracking-tight mb-8 leading-[0.85]">
              Meet{" "}
              <span className="text-gradient-primary italic font-semibold">
                Orion
              </span>
              <span className="text-gradient-gold">.</span>
            </h2>
          </motion.div>

          <FadeInBlock delay={0.3}>
            <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed mb-8">
              Thousands of years of human intelligence — from cave paintings to
              quantum physics — led to this moment. Orion analyzes markets
              across thousands of data points in real time.
            </p>
          </FadeInBlock>

          <FadeInBlock delay={0.45}>
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              {capabilities.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 300 }}
                  whileHover={{ 
                    scale: 1.1, 
                    borderColor: "hsl(25 85% 50% / 0.4)",
                    boxShadow: "0 0 20px hsl(25 85% 50% / 0.15)",
                  }}
                  className="glass-panel-subtle px-3 py-1.5 text-[10px] font-mono text-foreground/50 border-ancient cursor-default"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </FadeInBlock>

          <FadeInBlock delay={0.6}>
            <p className="text-xl md:text-2xl text-foreground/70 font-display italic max-w-md mx-auto">
              Not noise. Not guesswork.
              <br />
              <span className="text-gradient-primary font-semibold">
                Intelligence.
              </span>
            </p>
          </FadeInBlock>
        </div>
      </ScrollSection>
    </>
  );
};

export default EraStoneforge;
