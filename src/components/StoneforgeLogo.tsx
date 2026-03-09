const StonforgeLogo = ({ className = "", variant = "full" }: { className?: string; variant?: "full" | "icon" }) => {
  if (variant === "icon") {
    return (
      <svg viewBox="0 0 64 32" className={className} xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(4,0)" strokeLinecap="round">
          <path d="M6 2 L18 14" stroke="#999999" strokeWidth="6"/>
          <path d="M18 2 L6 14" stroke="#4d4d4d" strokeWidth="6"/>
          <path d="M6 30 L18 14" stroke="#999999" strokeWidth="6"/>
          <path d="M18 30 L6 14" stroke="#4d4d4d" strokeWidth="6"/>
        </g>
        <g transform="translate(32,0)" strokeLinecap="round">
          <path d="M6 2 L18 14" stroke="#4d4d4d" strokeWidth="6"/>
          <path d="M18 2 L6 14" stroke="#999999" strokeWidth="6"/>
          <path d="M6 30 L18 14" stroke="#4d4d4d" strokeWidth="6"/>
          <path d="M18 30 L6 14" stroke="#999999" strokeWidth="6"/>
        </g>
      </svg>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 64 32" className="h-8 w-16" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(4,0)" strokeLinecap="round">
          <path d="M6 2 L18 14" stroke="#999999" strokeWidth="6"/>
          <path d="M18 2 L6 14" stroke="#4d4d4d" strokeWidth="6"/>
          <path d="M6 30 L18 14" stroke="#999999" strokeWidth="6"/>
          <path d="M18 30 L6 14" stroke="#4d4d4d" strokeWidth="6"/>
        </g>
        <g transform="translate(32,0)" strokeLinecap="round">
          <path d="M6 2 L18 14" stroke="#4d4d4d" strokeWidth="6"/>
          <path d="M18 2 L6 14" stroke="#999999" strokeWidth="6"/>
          <path d="M6 30 L18 14" stroke="#4d4d4d" strokeWidth="6"/>
          <path d="M18 30 L6 14" stroke="#999999" strokeWidth="6"/>
        </g>
      </svg>
      <span className="font-display text-xl font-bold tracking-tight">
        <span className="text-foreground">Stoneforge</span>
        <span className="text-gradient-primary">.</span>
      </span>
    </div>
  );
};

export default StonforgeLogo;
