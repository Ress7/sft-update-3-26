import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const OrionSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 400;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const center = size / 2;
    const nodes: { x: number; y: number; r: number; phase: number; ring: number }[] = [];

    // Create brain-like node cluster
    for (let ring = 0; ring < 4; ring++) {
      const count = 6 + ring * 4;
      const radius = 30 + ring * 40;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + ring * 0.3;
        nodes.push({
          x: center + Math.cos(angle) * radius + (Math.random() - 0.5) * 15,
          y: center + Math.sin(angle) * radius + (Math.random() - 0.5) * 15,
          r: 2 + Math.random() * 2,
          phase: Math.random() * Math.PI * 2,
          ring,
        });
      }
    }
    // Center node
    nodes.push({ x: center, y: center, r: 4, phase: 0, ring: -1 });

    let frame: number;
    const draw = (time: number) => {
      ctx.clearRect(0, 0, size, size);

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            const pulse = Math.sin(time * 0.001 + nodes[i].phase) * 0.5 + 0.5;
            const alpha = (1 - dist / 80) * 0.2 * (0.5 + pulse * 0.5);
            ctx.strokeStyle = `hsla(230, 80%, 60%, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const node of nodes) {
        const pulse = Math.sin(time * 0.002 + node.phase) * 0.5 + 0.5;
        const alpha = 0.4 + pulse * 0.6;

        // Glow
        const grd = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.r * 6);
        grd.addColorStop(0, `hsla(230, 80%, 65%, ${alpha * 0.3})`);
        grd.addColorStop(1, `hsla(230, 80%, 65%, 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * 6, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `hsla(230, 80%, 70%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * (0.8 + pulse * 0.3), 0, Math.PI * 2);
        ctx.fill();
      }

      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);

  const panels = [
    { label: "AI Signal", value: "STRONG BUY", color: "text-green-400" },
    { label: "Confidence", value: "96.4%", color: "text-primary" },
    { label: "Sentiment", value: "Bullish", color: "text-green-400" },
    { label: "Probability", value: "0.87", color: "text-accent" },
  ];

  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Artificial Intelligence</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight">
            Meet <span className="text-gradient-primary">Orion</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            An artificial trading brain that processes millions of signals to deliver intelligent decisions.
          </p>
        </motion.div>

        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Left panels */}
          <div className="flex flex-col gap-4 w-full lg:w-48">
            {panels.slice(0, 2).map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                className="glass-panel p-4"
              >
                <div className="text-xs text-muted-foreground mb-1">{p.label}</div>
                <div className={`text-sm font-display font-bold ${p.color}`}>{p.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Neural brain */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-full bg-primary/5 blur-3xl" />
            <canvas ref={canvasRef} className="relative z-10" />
          </motion.div>

          {/* Right panels */}
          <div className="flex flex-col gap-4 w-full lg:w-48">
            {panels.slice(2).map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                className="glass-panel p-4"
              >
                <div className="text-xs text-muted-foreground mb-1">{p.label}</div>
                <div className={`text-sm font-display font-bold ${p.color}`}>{p.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrionSection;
