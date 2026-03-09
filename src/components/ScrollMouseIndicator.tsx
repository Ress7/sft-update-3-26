import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  className?: string;
};

const ScrollMouseIndicator: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("flex flex-col items-center gap-3 text-foreground/40", className)}>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      >
        <svg width="28" height="46" viewBox="0 0 28 46" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
          <rect x="1.5" y="1.5" width="25" height="43" rx="12.5" fill="none" stroke="currentColor" strokeWidth="3" />
          <motion.circle
            cx="14"
            cy="12"
            r="2.5"
            fill="currentColor"
            animate={{ y: [0, 6, 0], opacity: [0.6, 0.2, 0.6] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
      <div className="w-px h-12 bg-gradient-to-b from-transparent via-foreground/10 to-foreground/20" />
    </div>
  );
};

export default ScrollMouseIndicator;
