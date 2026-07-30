import { useState } from 'react';
import { motion } from 'framer-motion';
import { Landmark, BookOpen, Receipt, FileStack, ArrowRight, AlertOctagon, Sparkles } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import CursorSpotlight from '../components/CursorSpotlight';

const sources = [
  { id: 'bank', label: 'Bank Statement', icon: Landmark },
  { id: 'gl', label: 'General Ledger', icon: BookOpen },
  { id: 'ar', label: 'Accounts Receivable', icon: Receipt },
  { id: 'ap', label: 'Accounts Payable', icon: FileStack },
];

const exceptions = [
  { id: 'e1', ref: 'FI-88213', desc: 'Payment received has no matching invoice reference in AR', severity: 'High' },
  { id: 'e2', ref: 'AP-33021', desc: 'Possible duplicate vendor payment — two postings within days of each other', severity: 'High' },
  { id: 'e3', ref: 'GL-90144', desc: 'Bank charge posted to suspense, no GL mapping found', severity: 'Medium' },
  { id: 'e4', ref: 'FI-88401', desc: 'FX revaluation variance on a USD equipment settlement', severity: 'Medium' },
];

export default function Reconciliation() {
  const [uploaded, setUploaded] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const toggle = (id: string) => {
    if (uploaded.includes(id)) return;
    const next = [...uploaded, id];
    setUploaded(next);
    if (next.length === sources.length) {
      setProcessing(true);
      setTimeout(() => { setProcessing(false); setDone(true); }, 1800);
    }
  };

  return (
    <div className="px-6 lg:px-10 py-10 max-w-[1100px] mx-auto relative">
      <CursorSpotlight />
      <div className="mb-8">
        <div className="text-[11px] uppercase tracking-[0.16em] text-[var(--efi-accent-rose)]/80 font-mono mb-2">Reconciliation Intelligence</div>
        <h1 className="font-display text-2xl sm:text-3xl font-medium text-[var(--efi-ink-0)]">Designed so only exceptions reach you</h1>
        <p className="text-[11.5px] text-[var(--efi-ink-2)] mt-3">Illustrative walkthrough — upload simulates the matching process on example data.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {sources.map((s, i) => {
          const Icon = s.icon;
          const isUp = uploaded.includes(s.id);
          return (
            <GlassCard key={s.id} delay={i * 0.06} onClick={() => toggle(s.id)} className={`p-5 text-center ${isUp ? 'border-cyan-400/40' : ''}`}>
              <div className={`w-11 h-11 mx-auto rounded-xl flex items-center justify-center mb-3 ${isUp ? 'bg-cyan-400/15 text-[var(--efi-accent-cyan)]' : 'efi-glass text-[var(--efi-ink-1)]'}`}>
                <Icon size={18} />
              </div>
              <div className="text-[12.5px] text-[var(--efi-ink-0)] font-medium">{s.label}</div>
              <div className="text-[10.5px] font-mono mt-1.5 text-[var(--efi-ink-2)]">{isUp ? 'Uploaded' : 'Click to upload'}</div>
            </GlassCard>
          );
        })}
      </div>

      {uploaded.length > 0 && (
        <div className="flex justify-center mb-8">
          <ArrowRight size={18} className="text-[var(--efi-ink-2)] rotate-90" />
        </div>
      )}

      {processing && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-[var(--efi-accent-cyan)] text-[13px] font-mono">
            <Sparkles size={14} className="animate-pulse" /> TiAuto Finance Intelligence is matching transactions across all four sources…
          </div>
        </motion.div>
      )}

      {done && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-[var(--efi-accent-rose)] text-[13px] font-medium">
              <AlertOctagon size={16} /> {exceptions.length} exceptions found — the large majority of transactions matched automatically
            </div>
          </div>
          <div className="space-y-3">
            {exceptions.map((e, i) => (
              <GlassCard key={e.id} delay={i * 0.06} className="p-5 flex items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-[11px] text-[var(--efi-ink-2)] mb-1">{e.ref}</div>
                  <div className="text-[14px] text-[var(--efi-ink-0)]">{e.desc}</div>
                </div>
                <span className={`shrink-0 text-[10.5px] font-mono px-2.5 py-1 rounded-full border ${e.severity === 'High' ? 'text-[var(--efi-accent-rose)] bg-rose-400/10 border-rose-400/30' : 'text-[var(--efi-accent-amber)] bg-amber-400/10 border-amber-400/30'}`}>
                  {e.severity}
                </span>
              </GlassCard>
            ))}
          </div>
        </motion.div>
      )}

      {uploaded.length === 0 && (
        <div className="text-center text-[13px] text-[var(--efi-ink-2)] mt-4">Upload all four sources to run reconciliation.</div>
      )}
    </div>
  );
}
