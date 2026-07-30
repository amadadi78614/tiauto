import { motion } from 'framer-motion';
import { Compass, ListChecks, ArrowRightCircle, Gavel, Gauge, FileText } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import CursorSpotlight from '../components/CursorSpotlight';
import { pickLeadIn } from '../utils/phrasing';
import { briefingSections } from '../data/domainData';

const confidenceTone = (c: string) => {
  if (c.toLowerCase().startsWith('medium')) return 'text-[var(--efi-accent-amber)] bg-amber-400/10 border-amber-400/30';
  if (c.toLowerCase().startsWith('low')) return 'text-[var(--efi-accent-rose)] bg-rose-400/10 border-rose-400/30';
  return 'text-[var(--efi-accent-emerald)] bg-emerald-400/10 border-emerald-400/30';
};

export default function ExecutiveFinanceBriefing() {
  return (
    <div className="px-6 lg:px-10 py-10 max-w-[1100px] mx-auto relative">
      <CursorSpotlight />
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 text-[var(--efi-accent-cyan)]/80 text-[12px] font-mono mb-3">
          <FileText size={13} /> Executive Finance Briefing
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-medium text-[var(--efi-ink-0)]">Today's Finance Briefing</h1>
        <p className="text-[var(--efi-ink-1)] mt-2 max-w-2xl text-[15px]">
          From reporting the past to recommending the next action.
        </p>
        <p className="text-[12px] text-[var(--efi-ink-2)] mt-3 max-w-2xl">
          Illustrative content for demonstration purposes — directional only, pending validation against current source data.
        </p>
      </div>

      <div className="space-y-8">
        {briefingSections.map((s, idx) => (
          <GlassCard key={s.id} strong delay={idx * 0.1} className="p-7">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
              <div className="text-[11px] uppercase tracking-[0.16em] text-[var(--efi-accent-cyan)] font-mono">{s.domain}</div>
              <span className={`text-[10.5px] font-mono px-2.5 py-1 rounded-full border ${confidenceTone(s.confidence)}`}>
                {s.confidence}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-[var(--efi-ink-1)] font-medium mb-2">
                  <Compass size={13} className="text-[var(--efi-accent-cyan)]" /> Situation
                </div>
                <p className="text-[11.5px] text-[var(--efi-ink-2)] italic mb-1.5">{pickLeadIn('situation', s.id)}</p>
                <p className="text-[14px] text-[var(--efi-ink-0)] leading-relaxed">{s.situation}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-[var(--efi-ink-1)] font-medium mb-2">
                  <ListChecks size={13} className="text-[var(--efi-accent-blue)]" /> Evidence
                </div>
                <p className="text-[11.5px] text-[var(--efi-ink-2)] italic mb-1.5">{pickLeadIn('evidence', s.id)}</p>
                <ul className="space-y-1.5">
                  {s.evidence.map((e) => (
                    <li key={e} className="text-[13px] text-[var(--efi-ink-1)] leading-relaxed flex gap-2">
                      <span className="text-[var(--efi-accent-blue)] mt-1.5 w-1 h-1 rounded-full bg-blue-300 shrink-0" />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-[var(--efi-ink-1)] font-medium mb-2">
                  <ArrowRightCircle size={13} className="text-[var(--efi-accent-emerald)]" /> Recommended Action
                </div>
                <p className="text-[11.5px] text-[var(--efi-ink-2)] italic mb-1.5">{pickLeadIn('recommendation', s.id)}</p>
                <p className="text-[14px] text-[var(--efi-ink-0)] leading-relaxed">{s.recommendedAction}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-[var(--efi-ink-1)] font-medium mb-2">
                  <Gavel size={13} className="text-[var(--efi-accent-amber)]" /> Decision Required
                </div>
                <p className="text-[11.5px] text-[var(--efi-ink-2)] italic mb-1.5">{pickLeadIn('decision', s.id)}</p>
                <p className="text-[14px] text-[var(--efi-ink-0)] leading-relaxed">{s.decisionRequired}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8 flex items-center gap-2 justify-center text-[12px] text-[var(--efi-ink-2)]">
        <Gauge size={13} /> Confidence reflects data readiness, not certainty of outcome.
      </motion.div>
    </div>
  );
}
