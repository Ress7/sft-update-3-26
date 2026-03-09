import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollSection, { FadeInBlock } from "../ScrollSection";

const EraDigital = () => {
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
  // Image hue rotates slightly on scroll — digital feel
  const hueRotate = useTransform(scrollYProgress, [0, 1], [0, 30]);
  // Text sections slide in from alternating sides
  const text1X = useTransform(textProgress, [0, 0.5], [-60, 0]);
  const text2X = useTransform(textProgress, [0.2, 0.7], [60, 0]);

  return (
    <>
      {/* separator */}
      <div className="py-16 flex items-center justify-center gap-6 max-w-xl mx-auto px-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/10" />
        <p className="text-[10px] uppercase tracking-[0.6em] text-primary/25 font-mono whitespace-nowrap">
          2000s
        </p>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/10" />
      </div>

      {/* Full-bleed digital network with hue shift */}
      <div ref={imageRef} className="relative h-[85vh] overflow-hidden">
        <motion.div 
          style={{ 
            y: imageY,
            filter: useTransform(hueRotate, (v) => `contrast(1.15) brightness(0.4) saturate(1.2) hue-rotate(${v}deg)`),
          }} 
          className="absolute inset-0"
        >
          <img
            src="/images/digital-network.jpg"
            alt="Digital neural networks"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
        
        {/* Scan line overlay */}
        <div className="absolute inset-0 scan-lines" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-center max-w-3xl px-6"
          >
            <h2 className="text-5xl md:text-7xl font-display font-light leading-[0.9]">
              Information became the{" "}
              <span className="text-gradient-primary italic font-semibold">
                dominant force.
              </span>
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Data revolution — text slides in from alternating sides */}
      <ScrollSection className="bg-background">
        <div ref={textRef} className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div style={{ x: text1X, opacity: useTransform(textProgress, [0, 0.4], [0, 1]) }}>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-light tracking-tight leading-[0.95] mb-10 text-foreground/80">
              Billions of data points flowing every second.
            </h2>
          </motion.div>

          <motion.div style={{ x: text2X, opacity: useTransform(textProgress, [0.2, 0.6], [0, 1]) }}>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-light tracking-tight leading-[0.95] mb-10">
              <span className="text-gradient-primary italic font-semibold">
                Too much for any human mind.
              </span>
            </h2>
          </motion.div>

          <FadeInBlock delay={0.2}>
            <p className="text-base text-muted-foreground max-w-lg mx-auto leading-relaxed mb-8">
              Networks connected the world. Data became the most valuable
              resource on Earth. But processing it all required something
              beyond human capability.
            </p>
          </FadeInBlock>

          <FadeInBlock delay={0.35}>
            <p className="text-xl md:text-2xl text-foreground/70 font-display italic max-w-lg mx-auto">
              The stage was set for{" "}
              <motion.span 
                className="text-gradient-primary font-semibold inline-block"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                artificial intelligence.
              </motion.span>
            </p>
          </FadeInBlock>
        </div>
      </ScrollSection>
    </>
  );
};

export default EraDigital;
