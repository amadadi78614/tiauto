import { motion } from 'framer-motion';
import { BrainCircuit, CheckCircle2, Landmark, Layers, Presentation, RadioTower, ScanSearch, ShieldAlert, Wallet } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import CursorSpotlight from '../components/CursorSpotlight';
import { specialistsJune } from '../data/juneMbrData';

const iconMap: Record<string, typeof Wallet> = { wallet: Wallet, landmark: Landmark, layers: Layers, 'radio-tower': RadioTower, 'shield-alert': ShieldAlert, 'scan-search': ScanSearch, presentation: Presentation, 'brain-circuit': BrainCircuit, coins: Landmark };

export default function AgentMissionControlV3(){
  const agents = specialistsJune.filter(a=>a.id!=='orchestrator');
  return <div className="px-6 lg:px-10 py-10 max-w-[1300px] mx-auto relative">
    <CursorSpotlight/>
    <div className="text-center mb-9"><div className="inline-flex items-center gap-2 text-cyan-300/80 text-[12px] font-mono mb-3"><BrainCircuit size={14}/> Agent Mission Control · June 2026</div><h1 className="font-display text-2xl sm:text-3xl text-[var(--efi-ink-0)]">Eight TiAuto finance agents. One executive recommendation.</h1><p className="text-[13px] text-[var(--efi-ink-2)] mt-3 max-w-2xl mx-auto">The orchestrator combines collections, store banking, AP, cashbooks, reconciliation, close and transformation signals into a single decision view for Charl.</p></div>

    <GlassCard strong className="p-7 mb-7 text-center"><motion.div animate={{scale:[1,1.03,1]}} transition={{duration:2,repeat:Infinity}} className="w-20 h-20 rounded-full mx-auto flex items-center justify-center bg-cyan-400/10 border border-cyan-300/30 shadow-[0_0_60px_-12px_rgba(34,211,238,.7)]"><BrainCircuit size={30} className="text-cyan-300"/></motion.div><div className="font-display text-lg text-[var(--efi-ink-0)] mt-4">Finance Intelligence Orchestrator</div><div className="text-[11px] text-emerald-300 mt-1">Monitoring June MBR priorities</div></GlassCard>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{agents.map((a,i)=>{const Icon=iconMap[a.icon]||BrainCircuit;return <GlassCard key={a.id} delay={i*.05} className="p-5"><div className="flex items-start justify-between"><div className="w-10 h-10 rounded-xl efi-glass-strong flex items-center justify-center text-cyan-300"><Icon size={18}/></div><CheckCircle2 size={15} className="text-emerald-300"/></div><div className="font-display text-[15px] text-[var(--efi-ink-0)] mt-4">{a.name}</div><div className="text-[11px] text-[var(--efi-ink-2)] mt-1">{a.domain}</div><div className="mt-4 space-y-1">{a.systems.slice(0,3).map(s=><div key={s} className="text-[10px] text-[var(--efi-ink-1)] flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-cyan-300"/>{s}</div>)}</div></GlassCard>})}</div>

    <GlassCard strong className="p-6 mt-8"><div className="text-[11px] uppercase tracking-wide text-cyan-300 mb-3">Current synthesis</div><p className="text-[14px] text-[var(--efi-ink-0)] leading-relaxed">Controls are healthy: month/year-end was on time, reconciliation coverage is 100%, and all critical SLAs were achieved. The agents recommend three immediate missions: contain DSO movement through Top 30 Fleet action, clear the R5.3m not-banked population by store, and unblock payment automation dependencies.</p></GlassCard>
  </div>
}
