import { useState } from "react";
import { motion } from "framer-motion";
import NeuralNetwork from "./NeuralNetwork";
import StoneforgeLogo from "./StoneforgeLogo";

interface WaitlistGateProps {
  onPass: () => void;
}

const WaitlistGate = ({ onPass }: WaitlistGateProps) => {
  const [mode, setMode] = useState<"choose" | "waitlist" | "invite">("choose");
  const [email, setEmail] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(onPass, 2000);
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPass();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex items-center justify-center bg-background overflow-hidden"
    >
      <NeuralNetwork opacity={0.15} nodeCount={40} />

      {/* Animated data lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-data-flow"
            style={{
              top: `${20 + i * 15}%`,
              width: "60%",
              left: "20%",
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="glass-panel p-8 md:p-10">
          <div className="flex justify-center mb-8">
            <StoneforgeLogo />
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-2 text-foreground">
            Access the Future of Trading.
          </h2>
          <p className="text-muted-foreground text-center text-sm mb-8">
            Intelligent markets await.
          </p>

          {mode === "choose" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              <button
                onClick={() => setMode("waitlist")}
                className="btn-premium w-full text-center justify-center"
              >
                Join Waitlist
              </button>
              <button
                onClick={() => setMode("invite")}
                className="btn-ghost-premium w-full text-center"
              >
                Enter Invite Code
              </button>
            </motion.div>
          )}

          {mode === "waitlist" && (
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleWaitlistSubmit}
              className="space-y-4"
            >
              {!submitted ? (
                <>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full px-4 py-3.5 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                    />
                  </div>
                  <button type="submit" className="btn-premium w-full text-center">
                    Request Access
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("choose")}
                    className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ← Back
                  </button>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <div className="text-2xl mb-2">✓</div>
                  <p className="text-foreground font-medium">You're on the list.</p>
                  <p className="text-muted-foreground text-sm mt-1">Redirecting...</p>
                </motion.div>
              )}
            </motion.form>
          )}

          {mode === "invite" && (
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleInviteSubmit}
              className="space-y-4"
            >
              <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="Enter invite code"
                required
                className="w-full px-4 py-3.5 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm font-mono tracking-widest text-center uppercase"
              />
              <button type="submit" className="btn-premium w-full text-center">
                Enter
              </button>
              <button
                type="button"
                onClick={() => setMode("choose")}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back
              </button>
            </motion.form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WaitlistGate;
