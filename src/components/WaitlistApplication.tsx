import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StoneforgeLogo from "./StoneforgeLogo";

interface WaitlistApplicationProps {
  onComplete: () => void;
  onBack: () => void;
}

const STEPS = [
  {
    id: "name",
    question: "What should we call you?",
    subtitle: "Full name as it appears professionally.",
    type: "text" as const,
    placeholder: "Your full name",
    required: true,
  },
  {
    id: "email",
    question: "Where can we reach you?",
    subtitle: "We'll use this for access notifications only.",
    type: "email" as const,
    placeholder: "your@email.com",
    required: true,
  },
  {
    id: "experience",
    question: "How long have you been trading?",
    subtitle: "Select the option that best describes your experience.",
    type: "select" as const,
    options: [
      "Less than 1 year",
      "1–3 years",
      "3–7 years",
      "7+ years",
      "Institutional / Professional",
    ],
    required: true,
  },
  {
    id: "capital",
    question: "What is your approximate trading capital?",
    subtitle: "This helps us tailor platform features. All information is confidential.",
    type: "select" as const,
    options: [
      "Under $10,000",
      "$10,000 – $50,000",
      "$50,000 – $250,000",
      "$250,000 – $1,000,000",
      "$1,000,000+",
    ],
    required: true,
  },
  {
    id: "markets",
    question: "Which markets do you primarily trade?",
    subtitle: "Select all that apply.",
    type: "multi" as const,
    options: ["Stocks", "Crypto", "Forex", "Options", "Futures", "Commodities"],
    required: true,
  },
  {
    id: "why",
    question: "Why do you want early access to Stoneforge?",
    subtitle: "Convince us. What would you do with an unfair advantage?",
    type: "textarea" as const,
    placeholder: "Tell us what drives you...",
    required: true,
  },
];

const WaitlistApplication = ({ onComplete, onBack }: WaitlistApplicationProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const step = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const currentValue = answers[step.id] || (step.type === "multi" ? [] : "");

  const canProceed = step.type === "multi"
    ? (currentValue as string[]).length > 0
    : (currentValue as string).trim().length > 0;

  const handleNext = async () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      if (sending) return;
      setSending(true);
      const payload = {
        name: (answers["name"] as string) || "",
        email: (answers["email"] as string) || "",
        markets: (answers["markets"] as string[]) || [],
        capital: (answers["capital"] as string) || "",
        experience: (answers["experience"] as string) || "",
        reason: (answers["why"] as string) || "",
      };
      await fetch("https://script.google.com/macros/s/AKfycbw3OEkJWMU7NAnXLZLOMLP3uDJOyhwJFMog4ITsQIoDztRQ4Kj6kkKbmU_mwATCUC1g/exec", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
        redirect: "follow",
        keepalive: true,
      }).catch(() => undefined);
      setSubmitted(true);
      setSending(false);
      setTimeout(onComplete, 3000);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const toggleMulti = (option: string) => {
    const current = (answers[step.id] as string[]) || [];
    const updated = current.includes(option)
      ? current.filter((o) => o !== option)
      : [...current, option];
    setAnswers({ ...answers, [step.id]: updated });
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center px-6 max-w-md"
        >
          <StoneforgeLogo variant="icon" className="h-12 w-12 mx-auto mb-8 opacity-40" />
          <h2 className="text-3xl md:text-4xl font-display font-light tracking-tight mb-4 text-foreground/80">
            Application <span className="text-gradient-primary italic font-semibold">received.</span>
          </h2>
          <p className="text-sm text-muted-foreground/50 mb-2">
            Your application is under review. We accept fewer than 5% of applicants.
          </p>
          <p className="text-xs text-muted-foreground/30 mt-4 font-mono">
            Redirecting to the experience...
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-background"
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-px bg-border/20">
        <motion.div
          className="h-full bg-primary/60"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5">
        <button onClick={handleBack} className="text-xs text-muted-foreground/40 hover:text-foreground/60 transition-colors font-mono tracking-wide">
          ← Back
        </button>
        <span className="text-[10px] font-mono text-muted-foreground/30 tracking-widest uppercase">
          {currentStep + 1} / {STEPS.length}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg"
          >
            <p className="text-[10px] uppercase tracking-[0.5em] text-accent/30 mb-6 font-mono">
              Application
            </p>

            <h2 className="text-2xl md:text-4xl font-display font-light tracking-tight mb-3 text-foreground/80 leading-tight">
              {step.question}
            </h2>

            <p className="text-sm text-muted-foreground/40 mb-10">
              {step.subtitle}
            </p>

            {/* Input types */}
            {(step.type === "text" || step.type === "email") && (
              <input
                type={step.type}
                value={(currentValue as string)}
                onChange={(e) => setAnswers({ ...answers, [step.id]: e.target.value })}
                placeholder={step.placeholder}
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && canProceed && handleNext()}
                className="w-full bg-transparent border-b border-border/30 pb-4 text-lg text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:border-primary/40 transition-colors font-light"
              />
            )}

            {step.type === "textarea" && (
              <textarea
                value={(currentValue as string)}
                onChange={(e) => setAnswers({ ...answers, [step.id]: e.target.value })}
                placeholder={step.placeholder}
                autoFocus
                rows={4}
                className="w-full bg-transparent border border-border/20 rounded-xl p-4 text-base text-foreground placeholder:text-muted-foreground/20 focus:outline-none focus:border-primary/30 transition-colors font-light resize-none"
              />
            )}

            {step.type === "select" && (
              <div className="space-y-2">
                {step.options!.map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, [step.id]: option })}
                    className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-300 text-sm ${
                      currentValue === option
                        ? "border-primary/40 bg-primary/5 text-foreground"
                        : "border-border/20 text-muted-foreground/60 hover:border-border/40 hover:text-foreground/80"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {step.type === "multi" && (
              <div className="flex flex-wrap gap-2">
                {step.options!.map((option) => {
                  const selected = (currentValue as string[]).includes(option);
                  return (
                    <button
                      key={option}
                      onClick={() => toggleMulti(option)}
                      className={`px-5 py-3 rounded-xl border transition-all duration-300 text-sm ${
                        selected
                          ? "border-primary/40 bg-primary/5 text-foreground"
                          : "border-border/20 text-muted-foreground/60 hover:border-border/40 hover:text-foreground/80"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Continue button */}
            <motion.div className="mt-10">
              <button
                onClick={handleNext}
                disabled={!canProceed || sending}
                className="btn-premium disabled:opacity-20 disabled:pointer-events-none"
              >
                {currentStep === STEPS.length - 1 ? "Submit Application" : "Continue"}
              </button>
              {(step.type === "text" || step.type === "email") && canProceed && (
                <p className="text-[10px] text-muted-foreground/20 mt-3 font-mono">
                  Press Enter ↵
                </p>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default WaitlistApplication;
