import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const ScrollSection = ({ children, className = "", id }: ScrollSectionProps) => (
  <section id={id} className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
    {children}
  </section>
);

export const FadeInBlock = ({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default ScrollSection;
