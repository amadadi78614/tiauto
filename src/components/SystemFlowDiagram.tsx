import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface FlowSource {
  label: string;
  icon: LucideIcon;
}

interface SystemFlowDiagramProps {
  sources: FlowSource[];
  centerLabel: string;
  centerSub?: string;
  color?: string;
}

export default function SystemFlowDiagram({ sources, centerLabel, centerSub, color = 'var(--efi-cyan)' }: SystemFlowDiagramProps) {
  return (
    <div className="relative w-full flex flex-col items-center py-10">
      <div className="flex flex-wrap items-center justify-center gap-4 mb-2">
        {sources.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="efi-glass rounded-xl px-4 py-3 flex items-center gap-2.5"
            >
              <Icon size={15} className="text-[var(--efi-ink-1)]" />
              <span className="text-[12.5px] text-[var(--efi-ink-0)] font-medium">{s.label}</span>
            </motion.div>
          );
        })}
      </div>

      <div className="relative h-16 w-[2px] my-2">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--efi-border-strong)] to-transparent" />
        {[0, 0.4, 0.8].map((d) => (
          <motion.span
            key={d}
            className="absolute w-1.5 h-1.5 rounded-full left-1/2 -translate-x-1/2"
            style={{ background: color }}
            initial={{ top: 0, opacity: 0 }}
            animate={{ top: '100%', opacity: [0, 1, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: d, ease: 'easeIn' }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="efi-glass-strong rounded-2xl px-8 py-5 text-center"
        style={{ boxShadow: `0 0 50px -14px ${color}` }}
      >
        <div className="font-display text-[16px] font-medium text-[var(--efi-ink-0)]">{centerLabel}</div>
        {centerSub && <div className="font-mono text-[11px] text-[var(--efi-ink-2)] mt-1">{centerSub}</div>}
      </motion.div>

      <div className="relative h-16 w-[2px] my-2">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--efi-border-strong)] to-transparent" />
        {[0.2, 0.6, 1].map((d) => (
          <motion.span
            key={d}
            className="absolute w-1.5 h-1.5 rounded-full left-1/2 -translate-x-1/2"
            style={{ background: 'var(--efi-mint)' }}
            initial={{ top: 0, opacity: 0 }}
            animate={{ top: '100%', opacity: [0, 1, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: d, ease: 'easeIn' }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="efi-glass rounded-xl px-5 py-3 text-[12.5px] text-[var(--efi-accent-emerald)] font-medium"
      >
        Executive Recommendation
      </motion.div>
    </div>
  );
}
