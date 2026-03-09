import { motion } from "framer-motion";
import { Shield, Star, TrendingUp, Eye, EyeOff } from "lucide-react";

interface TraderCardProps {
  name: string;
  handle: string;
  code: string;
  winRate: number;
  allTimeReturn: number;
  rank: "Bronze" | "Silver" | "Gold" | "Platinum" | "Orion Elite";
  isPublic: boolean;
  followers?: number;
  trades?: number;
  large?: boolean;
}

const rankColors: Record<string, { from: string; to: string; accent: string; label: string }> = {
  Bronze:       { from: "#6b3e1a", to: "#c97c3a", accent: "#e8944a", label: "BRONZE" },
  Silver:       { from: "#2a2a3a", to: "#8888aa", accent: "#aaaacc", label: "SILVER" },
  Gold:         { from: "#5a3d00", to: "#c49a00", accent: "#f0c040", label: "GOLD" },
  Platinum:     { from: "#0a1a2a", to: "#2060a0", accent: "#60a8e0", label: "PLATINUM" },
  "Orion Elite":{ from: "#1a0a2a", to: "#7030a8", accent: "#c060f0", label: "ORION ELITE" },
};

const statusFromWinRate = (wr: number) => {
  if (wr >= 75) return { label: "ELITE", color: "#c060f0" };
  if (wr >= 65) return { label: "SHARP", color: "#f0c040" };
  if (wr >= 55) return { label: "ACTIVE", color: "#60a8e0" };
  return { label: "DEVELOPING", color: "#aaaacc" };
};

const TraderCard = ({ name, handle, code, winRate, allTimeReturn, rank, isPublic, followers = 0, trades = 0, large = false }: TraderCardProps) => {
  const rc = rankColors[rank] || rankColors["Bronze"];
  const status = statusFromWinRate(winRate);

  // Simple QR-like grid from code hash
  const qrGrid: boolean[][] = Array.from({ length: 7 }, (_, r) =>
    Array.from({ length: 7 }, (_, c) => {
      const idx = (code.charCodeAt(r % code.length) + c * 17 + r * 13) % 2 === 0;
      return idx;
    })
  );

  return (
    <motion.div
      whileHover={{ scale: 1.02, rotateY: 3 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative overflow-hidden rounded-2xl ${large ? "w-80 h-52" : "w-64 h-44"}`}
      style={{
        background: `linear-gradient(135deg, ${rc.from} 0%, ${rc.to} 100%)`,
        boxShadow: `0 0 40px -10px ${rc.accent}40, 0 20px 50px -15px rgba(0,0,0,0.8)`,
      }}
    >
      {/* Holographic shimmer */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 8px,
            ${rc.accent}15 8px,
            ${rc.accent}15 10px
          )`,
        }}
      />
      {/* Glow orb */}
      <div
        className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${rc.accent}30 0%, transparent 70%)` }}
      />
      {/* Scan lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.05) 3px, rgba(255,255,255,0.05) 4px)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-4 h-full flex flex-col justify-between">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[9px] font-mono tracking-[0.3em] opacity-60" style={{ color: rc.accent }}>
                {rc.label}
              </span>
              {isPublic ? (
                <Eye className="w-2.5 h-2.5 opacity-50" style={{ color: rc.accent }} />
              ) : (
                <EyeOff className="w-2.5 h-2.5 opacity-50" style={{ color: rc.accent }} />
              )}
            </div>
            <h3 className="text-white font-mono font-bold text-sm tracking-wide">{name}</h3>
            <p className="text-[10px] opacity-50 font-mono" style={{ color: rc.accent }}>@{handle}</p>
          </div>
          {/* Status badge */}
          <div
            className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider border"
            style={{ color: status.color, borderColor: `${status.color}40`, background: `${status.color}15` }}
          >
            {status.label}
          </div>
        </div>

        {/* Middle stats */}
        <div className="flex items-center gap-4">
          <div>
            <p className="text-[9px] opacity-40 font-mono uppercase tracking-wider" style={{ color: rc.accent }}>Win Rate</p>
            <p className="text-lg font-mono font-bold text-white">{winRate}%</p>
          </div>
          <div>
            <p className="text-[9px] opacity-40 font-mono uppercase tracking-wider" style={{ color: rc.accent }}>All Time</p>
            <p className={`text-lg font-mono font-bold ${allTimeReturn >= 0 ? "text-green-400" : "text-red-400"}`}>
              {allTimeReturn >= 0 ? "+" : ""}{allTimeReturn}%
            </p>
          </div>
          <div>
            <p className="text-[9px] opacity-40 font-mono uppercase tracking-wider" style={{ color: rc.accent }}>Followers</p>
            <p className="text-lg font-mono font-bold text-white">{followers > 999 ? `${(followers/1000).toFixed(1)}k` : followers}</p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[9px] opacity-30 font-mono uppercase tracking-widest mb-1" style={{ color: rc.accent }}>Unique Code</p>
            <p className="text-sm font-mono font-bold tracking-[0.25em] text-white opacity-80">{code}</p>
          </div>
          {/* Mini QR */}
          <div className="grid gap-px" style={{ gridTemplateColumns: "repeat(7, 6px)" }}>
            {qrGrid.map((row, r) =>
              row.map((cell, c) => (
                <div
                  key={`${r}-${c}`}
                  className="w-[6px] h-[6px] rounded-[1px]"
                  style={{ background: cell ? `${rc.accent}CC` : "transparent" }}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Bottom shimmer bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${rc.accent}80, transparent)` }}
      />
    </motion.div>
  );
};

export default TraderCard;
