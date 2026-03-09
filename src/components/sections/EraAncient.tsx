import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollSection, { FadeInBlock } from "../ScrollSection";

const EraAncient = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  const marqueeX = useTransform(sectionProgress, [0, 1], ["10%", "-30%"]);

  return (
    <>
      {/* >< separator */}
      <div className="py-16 flex items-center justify-center gap-6 max-w-xl mx-auto px-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent/10" />
        <p className="text-[10px] uppercase tracking-[0.6em] text-accent/25 font-mono whitespace-nowrap">
          3000 BC
        </p>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent/10" />
      </div>

      {/* Full-bleed Pantheon with tilt on scroll */}
      <div ref={imageRef} className="relative h-[85vh] overflow-hidden">
        <motion.div style={{ y: imageY, rotate: imageRotate }} className="absolute inset-[-5%]">
          <img
            src="/images/pantheon.jpg"
            alt="The Pantheon — ancient architectural genius"
            className="w-full h-full object-cover"
            style={{ filter: "sepia(0.2) contrast(1.15) brightness(0.4) saturate(0.9)" }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
        <div className="absolute inset-0 flex items-end pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-2xl ml-8 md:ml-20"
          >
            <h2 className="text-4xl md:text-6xl font-display font-light leading-[0.95] text-foreground/80">
              The greatest minds understood that{" "}
              <span className="text-gradient-gold italic font-semibold">
                intelligence
              </span>{" "}
              conquers chaos.
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Horizontal scrolling text marquee */}
      <div ref={sectionRef} className="overflow-hidden py-16">
        <motion.div style={{ x: marqueeX }} className="whitespace-nowrap">
          <span className="text-6xl md:text-[8rem] font-display font-light text-foreground/[0.03] tracking-tight">
            PATTERNS · KNOWLEDGE · STRATEGY · OBSERVATION · MATHEMATICS · WISDOM · 
          </span>
        </motion.div>
      </div>

      {/* Greek astronomers + text */}
      <ScrollSection className="bg-background">
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <FadeInBlock>
              <motion.div 
                className="img-reveal aspect-[4/3] overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6 }}
              >
                <motion.img
                  src="/images/greek-astronomers.jpg"
                  alt="Greek philosophers studying the stars"
                  className="img-cover"
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>
            </FadeInBlock>
            <div>
              <FadeInBlock delay={0.15}>
                <h2 className="text-3xl md:text-5xl font-display font-light tracking-tight leading-[1.05] mb-8 text-foreground/80">
                  They studied the{" "}
                  <span className="text-gradient-gold italic font-semibold">stars</span>,
                  mapped{" "}
                  <span className="text-gradient-gold italic font-semibold">patterns</span>,
                  and built{" "}
                  <span className="text-gradient-gold italic font-semibold">systems</span>.
                </h2>
              </FadeInBlock>
              <FadeInBlock delay={0.3}>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  Greek and Roman civilizations understood that observation,
                  mathematics, and strategy were the keys to mastering complexity.
                </p>
                <p className="text-xl text-muted-foreground font-display italic">
                  Markets are no different.
                </p>
              </FadeInBlock>
            </div>
          </div>
        </div>
      </ScrollSection>
    </>
  );
};

export default EraAncient;
