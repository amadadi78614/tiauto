import { motion } from 'framer-motion';
import { ArrowRight, FileText, Gavel, Landmark, Layers, RadioTower, ShieldAlert, Sparkles, Wallet } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import AnimatedRing from '../components/AnimatedRing';
import CursorSpotlight from '../components/CursorSpotlight';
import type { ScreenId } from '../data/nav';
import { executivePrioritiesJune, kpiRingsJune, recommendedActionsJune } from '../data/juneMbrData';

const icons: Record<string, typeof Wallet> = { wallet: Wallet, layers: Layers, landmark: Landmark, 'radio-tower': RadioTower, 'shield-alert': ShieldAlert };
const severity: Record<string, string> = {
  critical: 'text-rose-300 bg-rose-400/10 border-rose-400/30',
  elevated: 'text-amber-300 bg-amber-400/10 border-amber-400/30',
  watch: 'text-cyan-300 bg-cyan-400/10 border-cyan-400/30',
};

export default function CommandCentreV3({ onNavigate }: { onNavigate: (id: ScreenId) => void }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  return <div className="px-6 lg:px-10 py-10 max-w-[1400px] mx-auto relative">
    <CursorSpotlight />
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
      <div className="flex items-center gap-2 text-cyan-300/80 text-[12px] font-mono mb-3"><Sparkles size={13}/> June 2026 MBR Intelligence · 30 July 2026</div>
      <h1 className="font-display text-3xl sm:text-4xl font-medium text-[var(--efi-ink-0)]">{greeting} Charl. Here is what needs your attention.</h1>
      <p className="text-[13px] text-[var(--efi-ink-2)] mt-2">Month/year-end closed on time with no issues. Controls remain strong; working-capital and store-banking exceptions need focused action.</p>
    </motion.div>

    <GlassCard strong className="mt-8 p-7 relative z-10">
      <div className="text-[11px] uppercase tracking-[0.16em] text-[var(--efi-ink-2)] mb-6">TiAuto Finance Health · June 2026</div>
      <div className="flex flex-wrap justify-center sm:justify-between gap-y-10 gap-x-5">{kpiRingsJune.map((k, i) => <div key={k.id} className="pb-5"><AnimatedRing value={k.value} color={k.color} label={k.label} sublabel={k.sublabel} delay={i * .1}/></div>)}</div>
    </GlassCard>

    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">{[
      ['R401m','BIO approvals','Creditors R197m · Transfers R180m'], ['R117m','Card deposits','3,031 transactions'], ['R6.2m','Cash deposits','2,068 transactions'], ['99.93%','Cashbook accuracy','Above 98% SLA'],
    ].map(([v,l,s]) => <GlassCard key={l} className="p-5"><div className="font-display text-2xl text-[var(--efi-ink-0)]">{v}</div><div className="text-[12px] text-cyan-300 mt-1">{l}</div><div className="text-[10.5px] text-[var(--efi-ink-2)] mt-1">{s}</div></GlassCard>)}</div>

    <div className="mt-10 relative z-10">
      <div className="flex items-center justify-between mb-4"><div className="text-[11px] uppercase tracking-[0.16em] text-[var(--efi-ink-2)]">Today's Executive Priorities</div><div className="flex items-center gap-2 text-[11px] text-rose-300"><Gavel size={14}/> 2 require immediate intervention</div></div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {executivePrioritiesJune.map((p, i) => { const Icon = icons[p.icon] || ShieldAlert; return <GlassCard key={p.id} delay={i * .05} className="p-6"><div className="flex justify-between mb-4"><div className="w-10 h-10 rounded-xl efi-glass-strong flex items-center justify-center text-cyan-300"><Icon size={18}/></div><span className={`text-[10px] px-2 py-1 rounded-full border uppercase ${severity[p.severity]}`}>{p.severity}</span></div><div className="text-[11px] font-mono text-[var(--efi-ink-2)]">{p.domain}</div><div className="font-display text-[15px] text-[var(--efi-ink-0)] mt-2">{p.title}</div><p className="text-[12.5px] text-[var(--efi-ink-1)] leading-relaxed mt-2">{p.detail}</p><div className="mt-4 pt-3 border-t border-[var(--efi-border)] text-[12px] text-amber-300">{p.indicator}</div></GlassCard> })}
        <GlassCard onClick={() => onNavigate('ask')} className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 flex flex-col justify-center"><Sparkles className="text-cyan-300"/><div className="font-display text-[17px] mt-4 text-[var(--efi-ink-0)]">Ask Charl AI</div><p className="text-[12.5px] text-[var(--efi-ink-1)] mt-2">Ask why DSO moved, which stores carry banking risk, or which initiative should be accelerated.</p><span className="text-cyan-300 text-[12px] mt-4 flex items-center gap-1">Open Finance Intelligence <ArrowRight size={13}/></span></GlassCard>
      </div>
    </div>

    <div className="mt-10 relative z-10"><div className="text-[11px] uppercase tracking-[0.16em] text-[var(--efi-ink-2)] mb-4">Recommended Decisions</div><div className="space-y-3">{recommendedActionsJune.map((a,i)=><GlassCard key={a.id} className="p-5 flex items-center justify-between gap-4 flex-wrap"><div className="flex gap-4"><div className="text-cyan-300 font-mono">0{i+1}</div><div><div className="text-[14px] text-[var(--efi-ink-0)]">{a.title}</div><div className="text-[11px] text-[var(--efi-ink-2)] mt-1">{a.owner} · {a.eta}</div></div></div><div className="text-[11px] text-emerald-300">Confidence {a.confidence}%</div></GlassCard>)}</div></div>

    <div className="mt-8 grid md:grid-cols-3 gap-4 relative z-10">
      <GlassCard onClick={()=>onNavigate('cashbooks')} className="p-5"><Landmark className="text-violet-300"/><div className="mt-3 text-[14px] text-[var(--efi-ink-0)]">Cashbooks & Store Banking</div><div className="text-[11px] text-[var(--efi-ink-2)] mt-1">R5.3m not banked · store ranking · fees</div></GlassCard>
      <GlassCard onClick={()=>onNavigate('capital')} className="p-5"><RadioTower className="text-blue-300"/><div className="mt-3 text-[14px] text-[var(--efi-ink-0)]">Transformation Portfolio</div><div className="text-[11px] text-[var(--efi-ink-2)] mt-1">13 complete · 2 in progress · 5 pipeline</div></GlassCard>
      <GlassCard onClick={()=>onNavigate('briefing')} className="p-5"><FileText className="text-amber-300"/><div className="mt-3 text-[14px] text-[var(--efi-ink-0)]">June Executive Briefing</div><div className="text-[11px] text-[var(--efi-ink-2)] mt-1">Board-ready narrative and decisions</div></GlassCard>
    </div>
  </div>;
}
