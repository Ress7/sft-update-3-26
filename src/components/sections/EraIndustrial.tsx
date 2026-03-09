import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import ScrollSection, { FadeInBlock } from "../ScrollSection";

const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const EraIndustrial = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  // Horizontal strips assembling
  const strip1 = useTransform(scrollYProgress, [0, 0.4], ["-100%", "0%"]);
  const strip2 = useTransform(scrollYProgress, [0, 0.4], ["100%", "0%"]);
  const strip3 = useTransform(scrollYProgress, [0.05, 0.45], ["-100%", "0%"]);

  return (
    <>
      {/* separator */}
      <div className="py-16 flex items-center justify-center gap-6 max-w-xl mx-auto px-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-bronze/10" />
        <p className="text-[10px] uppercase tracking-[0.6em] text-bronze/25 font-mono whitespace-nowrap">
          1800s
        </p>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-bronze/10" />
      </div>

      {/* Full-bleed industrial scene — image assembles from horizontal strips */}
      <div ref={imageRef} className="relative h-[85vh] overflow-hidden">
        <div className="absolute inset-0 flex flex-col">
          {[strip1, strip2, strip3].map((x, i) => (
            <motion.div key={i} style={{ x }} className="flex-1 overflow-hidden">
              <img
                src="/images/industrial-revolution.jpg"
                alt="The Industrial Revolution"
                className="w-full object-cover"
                style={{ 
                  filter: "contrast(1.2) brightness(0.35) saturate(1.05)",
                  height: "85vh",
                  marginTop: `-${i * 33.33}%`,
                }}
              />
            </motion.div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-center max-w-3xl px-6"
          >
            <h2 className="text-5xl md:text-7xl font-display font-light leading-[0.9]">
              Humanity built{" "}
              <span className="text-gradient-terracotta italic font-semibold">
                machines
              </span>{" "}
              that amplified its power.
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Stats with animated counters */}
      <div className="py-20 max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-3 gap-8 text-center">
          {[
            { value: 1760, suffix: "", label: "Year of revolution" },
            { value: 200, suffix: "x", label: "Productivity increase" },
            { value: 8, suffix: "B+", label: "Connected lives" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
            >
              <p className="text-3xl md:text-5xl font-display font-light text-foreground/80">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-[10px] text-muted-foreground/40 font-mono uppercase tracking-wider mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Computing machines */}
      <ScrollSection className="bg-background">
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <FadeInBlock>
              <motion.div 
                className="img-reveal aspect-[4/3] overflow-hidden relative scan-lines"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
              >
                <motion.img
                  src="/images/early-computing.jpg"
                  alt="Early computing machines"
                  className="img-cover"
                  initial={{ y: "20%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>
            </FadeInBlock>
            <div>
              <FadeInBlock delay={0.15}>
                <h2 className="text-3xl md:text-5xl font-display font-light tracking-tight leading-[1.05] mb-8 text-foreground/80">
                  Steam, steel, and mathematics{" "}
                  <span className="text-gradient-terracotta italic font-semibold">
                    transformed
                  </span>{" "}
                  the world.
                </h2>
              </FadeInBlock>
              <FadeInBlock delay={0.3}>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  The industrial revolution proved that complex systems could be
                  engineered. Mechanical calculators laid the foundation for the
                  computational age to come.
                </p>
                <p className="text-xl text-muted-foreground font-display italic">
                  Human systems became more{" "}
                  <span className="text-foreground font-semibold">
                    powerful and complex.
                  </span>
                </p>
              </FadeInBlock>
            </div>
          </div>
        </div>
      </ScrollSection>
    </>
  );
};

export default EraIndustrial;
