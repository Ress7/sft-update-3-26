import { motion } from "framer-motion";
import ScrollSection, { FadeInBlock } from "../ScrollSection";

const AncientSection = () => {
  return (
    <>
      {/* Full-bleed image interlude */}
      <section className="relative h-[70vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <img
            src="/images/pantheon.jpg"
            alt="Classical architecture"
            className="w-full h-full object-cover"
            style={{ filter: 'sepia(0.25) contrast(1.05) brightness(0.55) saturate(0.9)' }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-start">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-xs uppercase tracking-[0.4em] text-accent/70 ml-8 md:ml-16 font-mono"
          >
            Ancient Intelligence
          </motion.p>
        </div>
      </section>

      <ScrollSection className="bg-background relative">
        {/* Marble texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <img
            src="/images/marble-texture.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Decorative columns */}
        {[10, 90].map((left) => (
          <div
            key={left}
            className="absolute bottom-0 opacity-[0.04] hidden lg:block"
            style={{ left: `${left}%`, transform: "translateX(-50%)" }}
          >
            <div className="w-12 h-[60vh] bg-gradient-to-t from-accent/30 to-transparent rounded-t-lg" />
          </div>
        ))}

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Text */}
            <div>
              <FadeInBlock>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-light tracking-tight leading-[1.05] mb-8 text-foreground/90">
                  For centuries, civilizations relied on
                  <br />
                  <span className="text-gradient-gold italic font-semibold">intelligence, strategy,</span>
                  <br />
                  and <span className="text-gradient-gold italic font-semibold">discipline</span> to master complex systems.
                </h2>
              </FadeInBlock>

              <FadeInBlock delay={0.2}>
                <p className="text-2xl md:text-3xl text-muted-foreground font-display italic">
                  Markets are no different.
                </p>
              </FadeInBlock>
            </div>

            {/* Classical art image */}
            <FadeInBlock delay={0.15}>
              <div className="img-reveal aspect-[3/4] max-h-[70vh]">
                <img
                  src="/images/greek-sculpture.jpg"
                  alt="Classical Greek sculpture"
                  className="img-cover animate-slow-zoom"
                />
              </div>
            </FadeInBlock>
          </div>
        </div>
      </ScrollSection>

      {/* Second image interlude — temple */}
      <section className="relative h-[50vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <img
            src="/images/greek-temple.jpg"
            alt="Greek temple"
            className="w-full h-full object-cover"
            style={{ filter: 'sepia(0.3) contrast(1.1) brightness(0.5) saturate(0.85)' }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </section>
    </>
  );
};

export default AncientSection;
