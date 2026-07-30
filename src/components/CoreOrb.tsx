import { motion } from 'framer-motion';

interface CoreOrbProps {
  size?: number;
  label?: string;
  sublabel?: string;
  active?: boolean;
}

export default function CoreOrb({ size = 220, label, sublabel, active = true }: CoreOrbProps) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Outer pulse rings */}
      {active && [0, 0.7, 1.4].map((d) => (
        <span
          key={d}
          className="efi-pulse-ring absolute rounded-full border"
          style={{
            width: size * 0.55,
            height: size * 0.55,
            borderColor: 'rgba(52,216,255,0.35)',
            animationDelay: `${d}s`,
          }}
        />
      ))}

      {/* Orbit rings */}
      <motion.div
        className="absolute rounded-full border border-cyan-400/15"
        style={{ width: size, height: size }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_12px_3px_rgba(52,216,255,0.7)]" />
      </motion.div>
      <motion.div
        className="absolute rounded-full border border-blue-400/15"
        style={{ width: size * 0.78, height: size * 0.78 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-300 shadow-[0_0_10px_3px_rgba(47,111,237,0.7)]" />
      </motion.div>

      {/* Core sphere */}
      <motion.div
        className="efi-float relative rounded-full flex items-center justify-center text-center"
        style={{
          width: size * 0.5,
          height: size * 0.5,
          background: 'radial-gradient(circle at 32% 28%, rgba(120,180,255,0.55), rgba(20,30,55,0.9) 70%)',
          border: '1px solid rgba(150,200,255,0.4)',
          boxShadow: '0 0 80px -10px rgba(52,216,255,0.5), inset 0 0 40px rgba(52,216,255,0.15)',
        }}
      >
        <div className="px-3">
          {label && <div className="font-display text-[11px] tracking-widest uppercase text-cyan-100/90">{label}</div>}
          {sublabel && <div className="font-mono text-[9px] text-[var(--efi-accent-cyan)]/60 mt-1">{sublabel}</div>}
        </div>
      </motion.div>
    </div>
  );
}
