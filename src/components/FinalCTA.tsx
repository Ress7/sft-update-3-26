import { motion } from "framer-motion";
import NeuralNetwork from "./NeuralNetwork";

const FinalCTA = () => {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      <NeuralNetwork opacity={0.2} nodeCount={30} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-display font-bold tracking-tight leading-[1.05] mb-6">
            The Future of Trading
            <br />
            Intelligence Has{" "}
            <span className="text-gradient-primary">Arrived.</span>
          </h2>

          <p className="text-muted-foreground max-w-md mx-auto mb-10">
            Join the next generation of intelligent traders.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-premium">Join the Waitlist</button>
            <button className="btn-ghost-premium">Enter the Terminal</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
