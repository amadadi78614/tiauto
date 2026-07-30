import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Presentation, Sparkles } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import CursorSpotlight from '../components/CursorSpotlight';
import MagneticButton from '../components/MagneticButton';

const sections = [
  { id: 'summary', title: 'Executive Summary', body: 'TiAuto Finance remained operationally stable in May. Month-end closed on time and reconciliation coverage reached 100%, while collections and store banking exceptions require focused action.' },
  { id: 'highlights', title: 'Financial Highlights', body: 'DSO closed at 33 days. Collections reached R63m against a R68m target. Accounts Payable captured 264 payments and critical service levels were achieved.' },
  { id: 'wc', title: 'Working Capital', body: 'The main working-capital gap is concentrated in named exceptions rather than broad deterioration. Continental has R345k outstanding and ABSA Fleet has R114k requiring allocation support.' },
  { id: 'cash', title: 'Cashbooks & Store Banking', body: 'R8.5m across 495 cash and card-drop transactions was not reflected as banked at month-end. Store-level ageing and ownership are required.' },
  { id: 'payments', title: 'Payments & Automation', body: 'The payment automation is developed, but Python conversion and the SI report installation remain dependencies before full production use.' },
  { id: 'risks', title: 'Risks', body: 'The immediate risks are delayed recovery of the R5m collection gap, unresolved store banking exceptions and slippage in automation dependencies.' },
  { id: 'actions', title: 'Recommended Actions', body: 'Escalate Continental and ABSA Fleet, clear the oldest store banking exceptions, protect the AP payment timetable and confirm owners and dates for the remaining automation dependencies.' },
];

export default function BoardReporting() {
  const [generating, setGenerating] = useState(false);
  const [visible, setVisible] = useState(0);
  const start = () => {
    setGenerating(true); setVisible(0);
    sections.forEach((_, i) => setTimeout(() => setVisible((v) => Math.max(v, i + 1)), 700 + i * 550));
  };
  return (
    <div className="px-6 lg:px-10 py-10 max-w-[900px] mx-auto relative">
      <CursorSpotlight />
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-[var(--efi-accent-cyan)]/80 text-[12px] font-mono mb-3"><Presentation size={13} /> Executive Board Reporting</div>
        <h1 className="font-display text-2xl sm:text-3xl font-medium text-[var(--efi-ink-0)]">Prepare TiAuto Board Summary</h1>
        <p className="text-[11.5px] text-[var(--efi-ink-2)] mt-3 max-w-md mx-auto">Illustrative narrative generated from the May 2026 MBR for editorial review.</p>
        {!generating && <MagneticButton onClick={start} className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full efi-glass-strong efi-glow-cyan text-[13px] font-medium" strength={10}><Sparkles size={15} className="text-[var(--efi-accent-cyan)]" /> Generate board narrative</MagneticButton>}
      </div>
      <div className="space-y-4">
        {generating && sections.map((s, i) => <AnimatePresence key={s.id}>{visible > i && <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}><GlassCard className="p-6"><div className="text-[11px] uppercase tracking-wide text-[var(--efi-accent-cyan)] font-medium mb-2">{s.title}</div><p className="text-[14px] text-[var(--efi-ink-0)] leading-relaxed">{s.body}</p></GlassCard></motion.div>}</AnimatePresence>)}
      </div>
      {generating && visible === sections.length && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-8"><MagneticButton className="px-6 py-3 rounded-full efi-glass text-[13px] text-[var(--efi-ink-0)]" strength={10}>Export draft to Board Pack</MagneticButton></motion.div>}
    </div>
  );
}
