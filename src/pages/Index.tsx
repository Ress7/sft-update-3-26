import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import StoneforgeLogo from "../components/StoneforgeLogo";
import EraDawn from "../components/sections/EraDawn";
import EraAncient from "../components/sections/EraAncient";
import EraRenaissance from "../components/sections/EraRenaissance";
import EraEnlightenment from "../components/sections/EraEnlightenment";
import EraIndustrial from "../components/sections/EraIndustrial";
import EraWallStreet from "../components/sections/EraWallStreet";
import EraDigital from "../components/sections/EraDigital";
import EraStoneforge from "../components/sections/EraStoneforge";
import OrionInteraction from "../components/sections/OrionInteraction";
import DashboardPreview from "../components/DashboardPreview";
import WhyDifferent from "../components/sections/WhyDifferent";
import FinalWaitlist from "../components/sections/FinalWaitlist";
import ScrollMouseIndicator from "../components/ScrollMouseIndicator";

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);
  const symbolScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.15]);
  
  // Hands moving closer together as you scroll
  const leftHandX = useTransform(scrollYProgress, [0, 0.5], ["0%", "8%"]);
  const rightHandX = useTransform(scrollYProgress, [0, 0.5], ["0%", "-8%"]);
  const handsOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.12, 0.25, 0]);
  const handsScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* ENTRY — Minimal black page with Creation of Adam hands */}
      <div ref={heroRef} className="relative h-[200vh]">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background with Creation of Adam hands - split into two moving toward each other */}
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            {/* Left hand (God's hand) */}
            <motion.div
              className="absolute w-1/2 h-full left-0 overflow-hidden"
              style={{ x: leftHandX, scale: handsScale }}
            >
              <motion.img
                src="/images/creation-hands-hero.png"
                alt=""
                className="absolute right-0 w-[200%] h-full object-cover object-right"
                style={{
                  opacity: handsOpacity,
                  filter: "grayscale(100%) brightness(0.2) contrast(1.3)",
                  mixBlendMode: "screen",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>

            {/* Right hand (Adam's hand) */}
            <motion.div
              className="absolute w-1/2 h-full right-0 overflow-hidden"
              style={{ x: rightHandX, scale: handsScale }}
            >
              <motion.img
                src="/images/creation-hands-hero.png"
                alt=""
                className="absolute left-0 w-[200%] h-full object-cover object-left"
                style={{
                  opacity: handsOpacity,
                  filter: "grayscale(100%) brightness(0.2) contrast(1.3)",
                  mixBlendMode: "screen",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>

            {/* Glow where hands meet in the center */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
                filter: "blur(40px)",
                opacity: useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 1, 0]),
                scale: useTransform(scrollYProgress, [0, 0.4], [0.5, 1.5]),
              }}
            />

            {/* Ethereal particles floating */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-primary/20"
                style={{
                  left: `${20 + (i * 5)}%`,
                  top: `${30 + (i % 4) * 10}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 0.4, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 4 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Noise overlay for texture */}
            <div 
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_hsl(var(--background))_80%)]" />
          </div>

          {/* Content on top */}
          <div className="relative z-10 flex flex-col items-center">
            {/* >< Symbol */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              style={{ scale: symbolScale }}
            >
              <StoneforgeLogo variant="icon" className="h-16 w-16 md:h-20 md:w-20 opacity-60" />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.5 }}
              className="mt-8 text-sm md:text-base font-display italic tracking-wide text-foreground/30"
            >
              Intelligence evolves.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1.2 }}
            className="absolute bottom-10 z-10"
          >
            <ScrollMouseIndicator />
          </motion.div>
        </motion.div>
      </div>

      {/* HERO CONTEXT — Give users purpose before the story */}
      <section className="relative py-32 md:py-48 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(25_85%_50%_/_0.03)_0%,_transparent_60%)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-[10px] uppercase tracking-[0.6em] text-accent/40 mb-8 font-mono"
          >
            The Story of Intelligence
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl lg:text-6xl font-display font-light tracking-tight leading-[0.95] mb-8 text-foreground/80"
          >
            For thousands of years, humanity has sought{" "}
            <span className="text-gradient-primary italic font-semibold">
              an edge.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-12"
          >
            From cave walls to trading floors, intelligence has always been 
            the ultimate advantage. Scroll to witness how it evolved — and 
            where it's going next.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-px h-16 bg-gradient-to-b from-accent/20 to-transparent" />
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
              <StoneforgeLogo variant="icon" className="h-5 w-5 opacity-20" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stage 1: Dawn of Humanity */}
      <EraDawn />

      {/* Stage 2: Ancient Civilizations */}
      <EraAncient />

      {/* Stage 3: Renaissance */}
      <EraRenaissance />

      {/* Stage 4: Age of Discovery */}
      <EraEnlightenment />

      {/* Stage 5: Industrial Revolution */}
      <EraIndustrial />

      {/* Stage 6: Wall Street */}
      <EraWallStreet />

      {/* Stage 7: Digital Age */}
      <EraDigital />

      {/* Stage 8: The Emergence of Orion */}
      <EraStoneforge />

      {/* Interactive Orion */}
      <OrionInteraction />

      {/* Dashboard Preview */}
      <DashboardPreview />

      {/* Why Different */}
      <WhyDifferent />

      {/* Final Waitlist */}
      <div id="waitlist">
        <FinalWaitlist />
      </div>

      {/* Minimal footer */}
      <footer className="border-t border-border/10 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <StoneforgeLogo className="mb-4 scale-90 origin-left" />
              <p className="text-[10px] text-muted-foreground/30 leading-relaxed">
                Intelligence evolves.<br />The next era of trading.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/50 mb-3">Platform</h4>
              <div className="space-y-2">
                <button onClick={() => navigate("/dashboard/trade")} className="block text-xs text-muted-foreground/40 hover:text-foreground/60 transition-colors">Trading Terminal</button>
                <button onClick={() => navigate("/dashboard/orion")} className="block text-xs text-muted-foreground/40 hover:text-foreground/60 transition-colors">Orion AI</button>
                <button onClick={() => navigate("/dashboard/portfolio")} className="block text-xs text-muted-foreground/40 hover:text-foreground/60 transition-colors">Portfolio</button>
                <button onClick={() => navigate("/dashboard/social")} className="block text-xs text-muted-foreground/40 hover:text-foreground/60 transition-colors">Social</button>
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/50 mb-3">Company</h4>
              <div className="space-y-2">
                <a href="#" className="block text-xs text-muted-foreground/40 hover:text-foreground/60 transition-colors">About</a>
                <a href="#" className="block text-xs text-muted-foreground/40 hover:text-foreground/60 transition-colors">Careers</a>
                <a href="#" className="block text-xs text-muted-foreground/40 hover:text-foreground/60 transition-colors">Blog</a>
                <a href="#" className="block text-xs text-muted-foreground/40 hover:text-foreground/60 transition-colors">Press</a>
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/50 mb-3">Legal</h4>
              <div className="space-y-2">
                <a href="#" className="block text-xs text-muted-foreground/40 hover:text-foreground/60 transition-colors">Privacy Policy</a>
                <a href="#" className="block text-xs text-muted-foreground/40 hover:text-foreground/60 transition-colors">Terms of Service</a>
                <a href="#" className="block text-xs text-muted-foreground/40 hover:text-foreground/60 transition-colors">Risk Disclosure</a>
              </div>
            </div>
          </div>
          <div className="border-t border-border/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[10px] text-muted-foreground/30 tracking-widest font-mono">
              © 2026 Stoneforge. All rights reserved.
            </p>
            <p className="text-[9px] text-muted-foreground/20 font-mono max-w-sm text-center sm:text-right">
              Trading involves risk. Past performance does not guarantee future results.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
