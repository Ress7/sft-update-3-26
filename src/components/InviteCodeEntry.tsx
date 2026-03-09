import { useState, useRef } from "react";
import { motion } from "framer-motion";
import StoneforgeLogo from "./StoneforgeLogo";

interface InviteCodeEntryProps {
  onSuccess: () => void;
  onBack: () => void;
}

const VALID_CODE = "123456";

const InviteCodeEntry = ({ onSuccess, onBack }: InviteCodeEntryProps) => {
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    setError(false);

    const newDigits = [...digits];
    newDigits[index] = value.slice(-1);
    setDigits(newDigits);

    // Auto-advance
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all filled
    const code = newDigits.join("");
    if (code.length === 6 && newDigits.every((d) => d !== "")) {
      if (code === VALID_CODE) {
        setSuccess(true);
        setTimeout(onSuccess, 1500);
      } else {
        setError(true);
        setTimeout(() => {
          setDigits(["", "", "", "", "", ""]);
          inputRefs.current[0]?.focus();
        }, 800);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newDigits = [...digits];
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setDigits(newDigits);

    const code = newDigits.join("");
    if (code.length === 6) {
      if (code === VALID_CODE) {
        setSuccess(true);
        setTimeout(onSuccess, 1500);
      } else {
        setError(true);
        setTimeout(() => {
          setDigits(["", "", "", "", "", ""]);
          inputRefs.current[0]?.focus();
        }, 800);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      <div className="absolute top-5 left-6">
        <button onClick={onBack} className="text-xs text-muted-foreground/40 hover:text-foreground/60 transition-colors font-mono tracking-wide">
          ← Back
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center px-6 max-w-md w-full"
      >
        <StoneforgeLogo variant="icon" className="h-10 w-10 mx-auto mb-10 opacity-30" />

        <h2 className="text-2xl md:text-3xl font-display font-light tracking-tight mb-3 text-foreground/80">
          Enter your <span className="text-gradient-primary italic font-semibold">invite code</span>
        </h2>
        <p className="text-sm text-muted-foreground/40 mb-12">
          6-digit access code from an existing member.
        </p>

        {/* 6-digit code input */}
        <div className="flex justify-center gap-3 mb-8" onPaste={handlePaste}>
          {digits.map((digit, i) => (
            <motion.input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              autoFocus={i === 0}
              animate={
                error
                  ? { x: [0, -8, 8, -4, 4, 0], borderColor: "hsl(0 72% 50%)" }
                  : success
                  ? { borderColor: "hsl(142 71% 45%)", scale: [1, 1.05, 1] }
                  : {}
              }
              transition={{ duration: 0.4 }}
              className={`w-12 h-14 md:w-14 md:h-16 text-center text-xl font-mono font-bold rounded-xl border bg-secondary/30 text-foreground focus:outline-none transition-all duration-300 ${
                error
                  ? "border-destructive/60"
                  : success
                  ? "border-green-500/60"
                  : digit
                  ? "border-primary/40"
                  : "border-border/30 focus:border-primary/40"
              }`}
            />
          ))}
        </div>

        {/* Status messages */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: error || success ? 1 : 0, height: error || success ? "auto" : 0 }}
          className="overflow-hidden"
        >
          {error && (
            <p className="text-xs text-destructive/60 font-mono tracking-wide">
              Invalid code. Try again.
            </p>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-xs text-green-500/60 font-mono tracking-wide">
                Access granted. Welcome to Stoneforge.
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default InviteCodeEntry;
