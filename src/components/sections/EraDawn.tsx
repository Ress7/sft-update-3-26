import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import ScrollSection, { FadeInBlock } from "../ScrollSection";

const EraDawn = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.4, 1, 1.05]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.3], [200, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      setExpanded(v > 0.15);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <>
      {/* Full-bleed fire scene — starts as circle, expands to full viewport */}
      <div ref={imageRef} className="relative h-[120vh] overflow-hidden">
        <motion.div
          style={{ y: imageY, scale: imageScale, borderRadius }}
          className="absolute inset-0 overflow-hidden"
        >
          <img
            src="/images/dawn-of-fire.jpg"
            alt="Early humans discovering fire — the birth of intelligence"
            className="w-full h-full object-cover"
            style={{ filter: "contrast(1.2) brightness(0.4) saturate(1.1)" }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 to-transparent" />
        
        <div className="absolute inset-0 flex items-end pb-24">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl ml-8 md:ml-20"
          >
            <p className="text-[10px] uppercase tracking-[0.6em] text-accent/40 mb-4 font-mono">
              40,000 BC
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-light leading-[0.9] text-foreground/80">
              Before systems —{" "}
              <span className="text-gradient-gold italic font-semibold">
                there was curiosity.
              </span>
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Cave paintings + text with staggered word reveals */}
      <ScrollSection className="bg-background">
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <FadeInBlock>
                <h2 className="text-3xl md:text-5xl font-display font-light tracking-tight leading-[1.05] mb-8 text-foreground/80">
                  {["The", "first", "humans", "didn't", "just", "survive."].map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.6 }}
                      className="inline-block mr-[0.3em]"
                    >
                      {word}
                    </motion.span>
                  ))}
                  <br />
                  <span className="text-gradient-gold italic font-semibold">
                    {["They", "observed."].map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                        className="inline-block mr-[0.3em]"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </span>
                </h2>
              </FadeInBlock>
              <FadeInBlock delay={0.2}>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  They tracked the stars. They studied the seasons. They painted
                  what they learned on cave walls — humanity's first data
                  visualization.
                </p>
                <p className="text-xl text-muted-foreground font-display italic">
                  Intelligence began with{" "}
                  <span className="text-foreground font-semibold">
                    pattern recognition.
                  </span>
                </p>
              </FadeInBlock>
            </div>
            <FadeInBlock delay={0.15}>
              <motion.div 
                className="img-reveal aspect-[4/3]"
                initial={{ clipPath: "inset(50% 50% 50% 50%)" }}
                whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src="/images/cave-paintings.jpg"
                  alt="Ancient cave paintings"
                  className="img-cover animate-slow-zoom"
                />
              </motion.div>
            </FadeInBlock>
          </div>
        </div>
      </ScrollSection>
    </>
  );
};

export default EraDawn;
