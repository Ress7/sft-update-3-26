import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OrionConstellation from "./OrionConstellation";
import StoneforgeLogo from "./StoneforgeLogo";

interface EntryAnimationProps {
  onEnter: () => void;
  onInvite: () => void;
}

const EntryAnimation = ({ onEnter, onInvite }: EntryAnimationProps) => {
  const [phase, setPhase] = useState<"stars" | "constellation" | "logo" | "text" | "ready">("stars");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("constellation"), 1200),
      setTimeout(() => setPhase("logo"), 2800),
      setTimeout(() => setPhase("text"), 4200),
      setTimeout(() => setPhase("ready"), 5500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const showConstellation = phase !== "stars";

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
    >
      <OrionConstellation showConstellation={showConstellation} />

      {/* Top-right invite code link */}
      <AnimatePresence>
        {phase === "ready" && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            onClick={onInvite}
            className="fixed top-6 right-6 z-50 text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase"
          >
            Enter Invite Code
          </motion.button>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col items-center gap-8">
        <AnimatePresence>
          {(phase === "logo" || phase === "text" || phase === "ready") && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <StoneforgeLogo variant="icon" className="h-20 w-20 neural-glow" />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {(phase === "text" || phase === "ready") && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl font-display tracking-wide text-muted-foreground text-center"
            >
              Intelligence Changes Everything.
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase === "ready" && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={onEnter}
              className="btn-premium mt-4"
            >
              Enter Stoneforge
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default EntryAnimation;
