import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollSection, { FadeInBlock } from "../ScrollSection";

const EraEnlightenment = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: textProgress } = useScroll({
    target: textRef,
    offset: ["start end", "center center"],
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  // Image reveals from center outward like opening curtains
  const clipLeft = useTransform(scrollYProgress, [0, 0.4], [50, 0]);
  const clipRight = useTransform(scrollYProgress, [0, 0.4], [50, 0]);

  return (
    <>
      {/* separator */}
      <div className="py-16 flex items-center justify-center gap-6 max-w-xl mx-auto px-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-patina/10" />
        <p className="text-[10px] uppercase tracking-[0.6em] text-patina/25 font-mono whitespace-nowrap">
          1600s
        </p>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-patina/10" />
      </div>

      {/* Age of Discovery — curtain reveal */}
      <div ref={imageRef} className="relative h-[85vh] overflow-hidden">
        <motion.div 
          style={{ 
            y: imageY,
            clipPath: useTransform(
              [clipLeft, clipRight],
              ([l, r]) => `inset(0 ${r}% 0 ${l}%)`
            ),
          }} 
          className="absolute inset-0"
        >
          <img
            src="/images/age-of-discovery.jpg"
            alt="Renaissance astronomer studying the cosmos"
            className="w-full h-full object-cover"
            style={{ filter: "contrast(1.15) brightness(0.4) saturate(1.05)" }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-center max-w-3xl px-6"
          >
            <h2 className="text-5xl md:text-7xl font-display font-light leading-[0.9]">
              Human intelligence began{" "}
              <span className="text-gradient-primary italic font-semibold">
                unlocking
              </span>{" "}
              the world's secrets.
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Scientific revolution — text with scroll-driven letter spacing */}
      <ScrollSection className="bg-background">
        <div ref={textRef} className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <FadeInBlock>
                <motion.h2 
                  className="text-3xl md:text-5xl font-display font-light tracking-tight leading-[1.05] mb-8 text-foreground/80"
                  style={{
                    letterSpacing: useTransform(textProgress, [0, 1], ["0.1em", "-0.02em"]),
                  }}
                >
                  Science replaced superstition.
                  <br />
                  <span className="text-gradient-primary italic font-semibold">
                    Data replaced guessing.
                  </span>
                </motion.h2>
              </FadeInBlock>
              <FadeInBlock delay={0.2}>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  Observation, measurement, and reason unlocked the deepest
                  mysteries of the universe. Maps charted new worlds.
                </p>
                <p className="text-xl text-muted-foreground font-display italic">
                  Yet somehow, traders still rely on{" "}
                  <span className="text-foreground font-semibold">gut instinct.</span>
                </p>
              </FadeInBlock>
            </div>
            <FadeInBlock delay={0.15}>
              <motion.div 
                className="img-reveal aspect-[4/3] overflow-hidden"
                whileHover={{ 
                  boxShadow: "0 0 60px -10px hsl(25 85% 50% / 0.3)",
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.img
                  src="/images/starry-night.jpg"
                  alt="The Starry Night by Vincent van Gogh"
                  className="img-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>
            </FadeInBlock>
          </div>
        </div>
      </ScrollSection>
    </>
  );
};

export default EraEnlightenment;
