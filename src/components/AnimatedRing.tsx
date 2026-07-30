import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnimatedRingProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  sublabel?: string;
  delay?: number;
}

export default function AnimatedRing({ value, size = 76, strokeWidth = 7, color = '#38BDF8', label, sublabel, delay = 0 }: AnimatedRingProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped / 100);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      const start = performance.now();
      const duration = 1100;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        setCount(Math.round(clamped * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay * 1000);
    return () => clearTimeout(t);
  }, [clamped, delay]);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={strokeWidth} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-[15px] font-semibold text-[var(--efi-ink-0)]">{count}%</span>
      </div>
      {(label || sublabel) && (
        <div className="absolute -bottom-8 text-center w-max">
          {label && <div className="text-[11px] text-[var(--efi-ink-0)] font-medium">{label}</div>}
          {sublabel && <div className="text-[9.5px] text-[var(--efi-ink-2)] font-mono">{sublabel}</div>}
        </div>
      )}
    </div>
  );
}
