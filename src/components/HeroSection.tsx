import { motion } from "framer-motion";
import NeuralNetwork from "./NeuralNetwork";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <NeuralNetwork opacity={0.25} nodeCount={50} />

      {/* Floating data cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] right-[10%] glass-panel-subtle p-4 hidden lg:block"
        >
          <div className="text-xs text-muted-foreground mb-1">AAPL</div>
          <div className="text-lg font-display font-bold text-foreground">$198.42</div>
          <div className="text-xs text-green-400">+2.34%</div>
        </motion.div>

        <motion.div
          animate={{ y: [5, -8, 5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[25%] left-[8%] glass-panel-subtle p-4 hidden lg:block"
        >
          <div className="text-xs text-muted-foreground mb-1">AI Signal</div>
          <div className="text-sm font-display font-semibold text-primary">BUY — 94% Confidence</div>
          <div className="w-full h-1 bg-secondary rounded-full mt-2">
            <div className="h-full w-[94%] bg-primary rounded-full" />
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [-8, 4, -8] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[30%] left-[15%] glass-panel-subtle p-3 hidden lg:block"
        >
          <div className="text-xs text-muted-foreground">Portfolio</div>
          <div className="text-base font-display font-bold text-foreground">$1.24M</div>
        </motion.div>
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] tracking-tight mb-6">
            Trading Without
            <br />
            Intelligence Is
            <br />
            <span className="text-gradient-primary">Guessing.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Stoneforge turns market chaos into intelligent decisions with Orion AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="btn-premium">Join the Waitlist</button>
          <button className="btn-ghost-premium">Meet Orion</button>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
