import { motion } from 'framer-motion';
import { CheckCircle2, Clock, AlertTriangle, Layers } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { closeActivities } from '../data/domainData';
import CursorSpotlight from '../components/CursorSpotlight';
import { useCountUp } from '../hooks/useCountUp';

const statusMeta = {
  complete: { icon: CheckCircle2, color: 'text-[var(--efi-accent-emerald)]', bg: 'bg-emerald-400/10', label: 'Complete' },
  'in-progress': { icon: Clock, color: 'text-[var(--efi-accent-cyan)]', bg: 'bg-cyan-400/10', label: 'In Progress' },
  blocked: { icon: AlertTriangle, color: 'text-[var(--efi-accent-rose)]', bg: 'bg-rose-400/10', label: 'Blocked' },
};

export default function FinancialClose() {
  const complete = closeActivities.filter((c) => c.status === 'complete').length;
  const progress = Math.round((complete / closeActivities.length) * 100);
  const progressCount = useCountUp(progress, true, 1200);

  return (
    <div className="px-6 lg:px-10 py-10 max-w-[1200px] mx-auto relative">
      <CursorSpotlight />
      <div className="mb-6">
        <div className="text-[11px] uppercase tracking-[0.16em] text-[var(--efi-accent-amber)]/80 font-mono mb-2">Financial Close Intelligence</div>
        <h1 className="font-display text-2xl sm:text-3xl font-medium text-[var(--efi-ink-0)]">Close day 4 of 6 — one blocked activity needs a decision</h1>
        <p className="text-[11.5px] text-[var(--efi-ink-2)] mt-3">Illustrative close cycle — not sourced from a live Sage close calendar.</p>
      </div>

      <GlassCard strong className="p-6 mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-[13px] text-[var(--efi-ink-0)] font-medium"><Layers size={15} className="text-[var(--efi-accent-amber)]" /> Close progress across the enterprise</div>
          <span className="font-mono text-[13px] text-[var(--efi-accent-amber)]">{progressCount}%</span>
        </div>
        <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="h-full bg-gradient-to-r from-amber-400 to-cyan-400" />
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {closeActivities.map((c, i) => {
          const meta = statusMeta[c.status];
          const Icon = meta.icon;
          return (
            <GlassCard key={c.id} delay={i * 0.05} className="p-5 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[11px] font-mono text-[var(--efi-ink-2)] mb-1">{c.businessUnit}</div>
                <div className="text-[14px] text-[var(--efi-ink-0)] font-medium truncate">{c.activity}</div>
                <div className="text-[11.5px] text-[var(--efi-ink-2)] mt-1">{c.owner}</div>
              </div>
              <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-mono shrink-0 ${meta.color} ${meta.bg}`}>
                <Icon size={12} /> {meta.label}
              </div>
            </GlassCard>
          );
        })}
      </div>

      <GlassCard className="p-6">
        <div className="text-[var(--efi-accent-emerald)] text-[11px] uppercase tracking-wide font-medium mb-3">Executive Recommendation</div>
        <p className="text-[14.5px] text-[var(--efi-ink-0)] leading-relaxed">
          Hold CWIP capitalisation postings on the three flagged Accounts Payable projects until Capital Accounting confirms the
          project cost baseline. This keeps close on schedule for day 5 sign-off without carrying an unreconciled variance into the
          trial balance lock.
        </p>
      </GlassCard>
    </div>
  );
}
