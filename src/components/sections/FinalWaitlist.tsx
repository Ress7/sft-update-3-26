import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollSection, { FadeInBlock } from "../ScrollSection";
import StoneforgeLogo from "../StoneforgeLogo";
import WaitlistApplication from "../WaitlistApplication";
import InviteCodeEntry from "../InviteCodeEntry";
import { useNavigate } from "react-router-dom";

const FinalWaitlist = () => {
  const [mode, setMode] = useState<"cta" | "apply" | "invite">("cta");
  const navigate = useNavigate();

  const handleAccessGranted = () => {
    navigate("/dashboard");
  };

  if (mode === "apply") {
    return <WaitlistApplication onComplete={() => setMode("cta")} onBack={() => setMode("cta")} />;
  }

  if (mode === "invite") {
    return <InviteCodeEntry onSuccess={handleAccessGranted} onBack={() => setMode("cta")} />;
  }

  return (
    <ScrollSection className="bg-background py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(25_85%_50%_/_0.03)_0%,_transparent_50%)]" />

      <div className="relative z-10 max-w-xl mx-auto px-6 w-full text-center">
        <FadeInBlock>
          <StoneforgeLogo variant="icon" className="h-8 w-8 mx-auto mb-8 opacity-30" />
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-light tracking-tight leading-[0.95] mb-4">
            Stop guessing.
          </h2>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-light tracking-tight leading-[0.95] mb-8">
            Start trading with{" "}
            <span className="text-gradient-primary italic font-semibold">intelligence.</span>
          </h2>
        </FadeInBlock>

        <FadeInBlock delay={0.15}>
          <p className="text-sm text-muted-foreground/50 max-w-sm mx-auto mb-10">
            Stoneforge is currently in private access. Early members gain priority access, early Orion features, and direct product influence.
          </p>
        </FadeInBlock>

        <FadeInBlock delay={0.3}>
          <div className="max-w-sm mx-auto space-y-3">
            <button
              onClick={() => setMode("apply")}
              className="btn-premium w-full text-center"
            >
              Apply for Early Access
            </button>
            <button
              onClick={() => setMode("invite")}
              className="btn-ghost-premium w-full text-center"
            >
              Enter Invite Code
            </button>
            <p className="text-[10px] text-muted-foreground/25 font-mono tracking-wide mt-4">
              Fewer than 5% of applicants are accepted.
            </p>
          </div>
        </FadeInBlock>
      </div>
    </ScrollSection>
  );
};

export default FinalWaitlist;
