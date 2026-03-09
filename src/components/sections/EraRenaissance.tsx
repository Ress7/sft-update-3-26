import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import ScrollSection, { FadeInBlock } from "../ScrollSection";

const EraRenaissance = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const blurRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!blurRef.current) return;
    const rect = blurRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <>
      {/* separator */}
      <div className="py-16 flex items-center justify-center gap-6 max-w-xl mx-auto px-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/10" />
        <p className="text-[10px] uppercase tracking-[0.6em] text-primary/25 font-mono whitespace-nowrap">
          1400 AD
        </p>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/10" />
      </div>

      {/* Creation of Adam — full bleed with clip-path reveal */}
      <div ref={imageRef} className="relative h-[90vh] overflow-hidden">
        <motion.div style={{ y: imageY }} className="absolute inset-0">
          <motion.img
            src="/images/creation-of-adam.jpg"
            alt="Michelangelo — The Creation of Adam"
            className="w-full h-full object-cover"
            style={{ filter: "contrast(1.15) brightness(0.45) saturate(0.95)" }}
            initial={{ scale: 1.3 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="text-center max-w-3xl px-6"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-light leading-[0.9]">
              The spark of{" "}
              <span className="text-gradient-primary italic font-semibold">understanding</span>
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Da Vinci — Blurred text with magnifying glass hover */}
      <ScrollSection className="bg-background">
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <FadeInBlock>
                <h2 className="text-3xl md:text-5xl font-display font-light tracking-tight leading-[1.05] mb-8 text-foreground/80">
                  Da Vinci didn't just paint.
                  <br />
                  <span className="text-gradient-primary italic font-semibold">He analyzed.</span>
                </h2>
              </FadeInBlock>

              {/* Magnifying glass blur reveal */}
              <FadeInBlock delay={0.2}>
                <div
                  ref={blurRef}
                  className="relative cursor-none select-none mb-8"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {/* Blurred layer */}
                  <p className="text-base text-muted-foreground leading-relaxed" style={{ filter: "blur(5px)" }}>
                    He studied anatomy, engineering, mathematics, and nature — then synthesized it all into genius.
                    The Renaissance proved that the greatest breakthroughs come from connecting disciplines.
                  </p>

                  {/* Clear text revealed through magnifying glass circle */}
                  {isHovering && (
                    <div
                      className="absolute inset-0 pointer-events-none overflow-hidden"
                      style={{
                        clipPath: `circle(60px at ${mousePos.x}px ${mousePos.y}px)`,
                      }}
                    >
                      <p className="text-base text-foreground/80 leading-relaxed">
                        He studied anatomy, engineering, mathematics, and nature — then synthesized it all into genius.
                        The Renaissance proved that the greatest breakthroughs come from connecting disciplines.
                      </p>
                    </div>
                  )}

                  {/* Magnifying glass cursor */}
                  {isHovering && (
                    <div
                      className="absolute pointer-events-none z-20"
                      style={{
                        left: mousePos.x - 60,
                        top: mousePos.y - 60,
                        width: 120,
                        height: 120,
                      }}
                    >
                      <div className="w-full h-full rounded-full border-2 border-primary/30 shadow-[0_0_20px_hsl(25_85%_50%/0.15)]" />
                    </div>
                  )}

                  <p className="text-[10px] text-primary/30 mt-3 font-mono tracking-wider">
                    ↑ HOVER TO REVEAL
                  </p>
                </div>
              </FadeInBlock>

              <FadeInBlock delay={0.35}>
                <p className="text-xl text-muted-foreground font-display italic">
                  Trading intelligence works the same way.
                </p>
              </FadeInBlock>
            </div>

            {/* Staggered masonry images */}
            <div className="grid grid-cols-2 gap-4">
              <FadeInBlock delay={0.1}>
                <motion.div 
                  className="img-reveal aspect-[3/4] overflow-hidden"
                  initial={{ clipPath: "inset(100% 0 0 0)" }}
                  whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img
                    src="/images/mona-lisa.jpg"
                    alt="Mona Lisa by Leonardo da Vinci"
                    className="img-cover animate-slow-zoom"
                  />
                </motion.div>
              </FadeInBlock>
              <FadeInBlock delay={0.25}>
                <motion.div 
                  className="img-reveal aspect-[3/4] mt-12 overflow-hidden"
                  initial={{ clipPath: "inset(0 0 100% 0)" }}
                  whileInView={{ clipPath: "inset(0 0 0% 0)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img
                    src="/images/vitruvian-man.jpg"
                    alt="Vitruvian Man by Leonardo da Vinci"
                    className="img-cover animate-slow-zoom"
                  />
                </motion.div>
              </FadeInBlock>
            </div>
          </div>
        </div>
      </ScrollSection>

      {/* Birth of Venus interlude — horizontal scroll-linked pan */}
      <section className="relative h-[60vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.15, x: "-5%" }}
          whileInView={{ scale: 1, x: "0%" }}
          viewport={{ once: true }}
          transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <img
            src="/images/birth-of-venus.jpg"
            alt="Birth of Venus by Botticelli"
            className="w-full h-full object-cover"
            style={{ filter: "contrast(1.05) brightness(0.4) saturate(0.85)" }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </section>
    </>
  );
};

export default EraRenaissance;
