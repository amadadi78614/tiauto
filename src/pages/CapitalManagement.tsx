import { motion } from 'framer-motion';
import { RadioTower } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { capitalProjects } from '../data/domainData';
import CursorSpotlight from '../components/CursorSpotlight';

const pacingStyle: Record<string, string> = {
  ahead: 'text-[var(--efi-accent-amber)]',
  'on-track': 'text-[var(--efi-accent-emerald)]',
  behind: 'text-[var(--efi-ink-2)]',
};

const pacingBar: Record<string, string> = {
  ahead: 'bg-gradient-to-r from-amber-400 to-rose-400',
  'on-track': 'bg-gradient-to-r from-blue-400 to-cyan-400',
  behind: 'bg-gradient-to-r from-white/30 to-white/10',
};

const pacingLabel: Record<string, string> = {
  ahead: 'Ahead of plan',
  'on-track': 'On track',
  behind: 'Early stage',
};

export default function CapitalManagement() {
  return (
    <div className="px-6 lg:px-10 py-10 max-w-[1200px] mx-auto relative">
      <CursorSpotlight />
      <div className="mb-8">
        <div className="text-[11px] uppercase tracking-[0.16em] text-[var(--efi-accent-blue)]/80 font-mono mb-2">Payment & Automation Intelligence</div>
        <h1 className="font-display text-2xl sm:text-3xl font-medium text-[var(--efi-ink-0)]">Finance automation in motion — from development to controlled production</h1>
        <p className="text-[11.5px] text-[var(--efi-ink-2)] mt-3">Illustrative delivery indicators grounded in the TiAuto transformation pipeline — not connected to live production telemetry.</p>
      </div>

      <div className="space-y-4">
        {capitalProjects.map((p, i) => (
          <GlassCard key={p.id} delay={i * 0.07} className="p-6">
            <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <RadioTower size={14} className="text-[var(--efi-accent-blue)]" />
                  <span className="text-[15px] text-[var(--efi-ink-0)] font-medium font-display">{p.name}</span>
                </div>
                <div className="text-[11.5px] font-mono text-[var(--efi-ink-2)]">Phase: {p.phase} · Delivery {p.depreciationStart}</div>
              </div>
              <div className="text-right">
                <div className={`font-mono text-[13px] ${pacingStyle[p.pacing]}`}>{pacingLabel[p.pacing]}</div>
                <div className="text-[10.5px] font-mono text-[var(--efi-ink-2)] max-w-[220px]">{p.pacingNote}</div>
              </div>
            </div>
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${p.progress}%` }}
                transition={{ duration: 1, delay: 0.2 + i * 0.05 }}
                className={`h-full ${pacingBar[p.pacing]}`}
              />
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-6 mt-8">
        <div className="text-[var(--efi-accent-emerald)] text-[11px] uppercase tracking-wide font-medium mb-3">Automation Delivery Insight</div>
        <p className="text-[14.5px] text-[var(--efi-ink-0)] leading-relaxed">
          The payment-sheet automation is developed, but Python conversion and SI report installation remain gating dependencies. Confirm accountable owners and dates before committing the solution to production use, while protecting the current AP payment timetable.
        </p>
      </GlassCard>
    </div>
  );
}
