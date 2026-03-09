import { useEffect, useRef } from "react";

const ORION_STARS = [
  { x: 0.35, y: 0.15, r: 3, name: "Betelgeuse" },
  { x: 0.65, y: 0.12, r: 2.5, name: "Bellatrix" },
  { x: 0.42, y: 0.42, r: 1.8, name: "Belt1" },
  { x: 0.50, y: 0.44, r: 2.0, name: "Belt2" },
  { x: 0.58, y: 0.46, r: 1.8, name: "Belt3" },
  { x: 0.30, y: 0.75, r: 2.2, name: "Saiph" },
  { x: 0.70, y: 0.78, r: 3.2, name: "Rigel" },
  { x: 0.50, y: 0.55, r: 1.5, name: "Sword1" },
  { x: 0.48, y: 0.62, r: 1.5, name: "Sword2" },
];

const ORION_CONNECTIONS = [
  [0, 1], [0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6], [3, 7], [7, 8],
];

interface Props {
  className?: string;
  showConstellation?: boolean;
}

const OrionConstellation = ({ className = "", showConstellation = true }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const bgStars: { x: number; y: number; r: number; twinkle: number }[] = [];
    for (let i = 0; i < 200; i++) {
      bgStars.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.5 + 0.3,
        twinkle: Math.random() * Math.PI * 2,
      });
    }

    const draw = (time: number) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (const star of bgStars) {
        const alpha = 0.2 + Math.sin(time * 0.001 + star.twinkle) * 0.15 + 0.15;
        ctx.fillStyle = `hsla(38, 25%, 80%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(star.x * w, star.y * h, star.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!showConstellation) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      const cx = w * 0.5;
      const cy = h * 0.5;
      const scale = Math.min(w, h) * 0.7;
      const offsetX = cx - scale * 0.5;
      const offsetY = cy - scale * 0.5;

      const getPos = (i: number) => ({
        x: offsetX + ORION_STARS[i].x * scale,
        y: offsetY + ORION_STARS[i].y * scale,
      });

      // Warm-colored connections
      for (const [a, b] of ORION_CONNECTIONS) {
        const pa = getPos(a);
        const pb = getPos(b);
        const pulse = Math.sin(time * 0.0015 + a) * 0.3 + 0.7;
        ctx.strokeStyle = `hsla(25, 75%, 48%, ${0.25 * pulse})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }

      // Warm-colored stars
      for (const star of ORION_STARS) {
        const sx = offsetX + star.x * scale;
        const sy = offsetY + star.y * scale;
        const pulse = Math.sin(time * 0.002 + star.x * 10) * 0.3 + 0.7;

        const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, star.r * 8);
        grd.addColorStop(0, `hsla(25, 75%, 55%, ${0.3 * pulse})`);
        grd.addColorStop(1, "hsla(25, 75%, 55%, 0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(sx, sy, star.r * 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(38, 50%, 85%, ${0.7 + pulse * 0.3})`;
        ctx.beginPath();
        ctx.arc(sx, sy, star.r * (0.8 + pulse * 0.3), 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [showConstellation]);

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${className}`} />;
};

export default OrionConstellation;
