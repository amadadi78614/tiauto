import { motion } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';

interface ConfidenceGaugeProps {
  score: number; // 0-100
  label?: string;
}

export default function ConfidenceGauge({ score, label = 'Confidence' }: ConfidenceGaugeProps) {
  const clamped = Math.max(0, Math.min(100, score));
  const radius = 54;
  const circumference = Math.PI * radius; // half circle
  const offset = circumference * (1 - clamped / 100);
  const color = clamped >= 65 ? '#10B981' : clamped >= 45 ? '#FACC15' : '#FB7185';
  const count = useCountUp(clamped, true, 1100);

  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="80" viewBox="0 0 140 80">
        <path d="M 13 70 A 54 54 0 0 1 127 70" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" strokeLinecap="round" />
        <motion.path
          d="M 13 70 A 54 54 0 0 1 127 70"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="-mt-7 text-center">
        <div className="font-display text-xl font-semibold text-[var(--efi-ink-0)]">{count}%</div>
        <div className="text-[10px] uppercase tracking-wide text-[var(--efi-ink-2)] mt-0.5">{label}</div>
      </div>
    </div>
  );
}
