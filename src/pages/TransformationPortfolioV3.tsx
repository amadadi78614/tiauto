import { motion } from 'framer-motion';
import { Bot, CheckCircle2, Clock3, FileCog, Workflow } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import CursorSpotlight from '../components/CursorSpotlight';
import { transformationProjectsJune } from '../data/juneMbrData';

const pacingStyle: Record<string,string> = { ahead:'text-emerald-300', 'on-track':'text-cyan-300', behind:'text-amber-300' };
const pacingBar: Record<string,string> = { ahead:'bg-gradient-to-r from-emerald-400 to-cyan-400', 'on-track':'bg-gradient-to-r from-blue-400 to-cyan-400', behind:'bg-gradient-to-r from-amber-400 to-rose-400' };

export default function TransformationPortfolioV3(){
  return <div className="px-6 lg:px-10 py-10 max-w-[1200px] mx-auto relative">
    <CursorSpotlight/>
    <div className="mb-8"><div className="text-[11px] uppercase tracking-[0.16em] text-blue-300/80 font-mono mb-2">Transformation Portfolio · June 2026</div><h1 className="font-display text-2xl sm:text-3xl text-[var(--efi-ink-0)]">Turn the finance pipeline into measurable operational value</h1><p className="text-[12px] text-[var(--efi-ink-2)] mt-3">13 initiatives completed, 2 in progress and 5 in the pipeline or parked. This page focuses on the projects requiring executive attention.</p></div>

    <div className="grid grid-cols-3 gap-4 mb-8">
      <GlassCard className="p-5"><CheckCircle2 className="text-emerald-300"/><div className="font-display text-3xl text-[var(--efi-ink-0)] mt-3">13</div><div className="text-[11px] text-[var(--efi-ink-2)]">Completed</div></GlassCard>
      <GlassCard className="p-5"><Workflow className="text-cyan-300"/><div className="font-display text-3xl text-[var(--efi-ink-0)] mt-3">2</div><div className="text-[11px] text-[var(--efi-ink-2)]">In progress</div></GlassCard>
      <GlassCard className="p-5"><Clock3 className="text-amber-300"/><div className="font-display text-3xl text-[var(--efi-ink-0)] mt-3">5</div><div className="text-[11px] text-[var(--efi-ink-2)]">Pipeline / parked</div></GlassCard>
    </div>

    <div className="space-y-4">{transformationProjectsJune.map((p,i)=><GlassCard key={p.id} delay={i*.06} className="p-6"><div className="flex items-start justify-between gap-4 flex-wrap"><div className="flex gap-3"><div className="w-10 h-10 rounded-xl efi-glass-strong flex items-center justify-center text-blue-300">{p.id==='p32'?<Bot size={18}/>:<FileCog size={18}/>}</div><div><div className="text-[15px] text-[var(--efi-ink-0)] font-medium">{p.name}</div><div className="text-[11px] text-[var(--efi-ink-2)] font-mono mt-1">{p.phase} · {p.depreciationStart}</div></div></div><div className={`text-[11px] font-mono ${pacingStyle[p.pacing]}`}>{p.pacingNote}</div></div><div className="h-2 rounded-full bg-white/5 overflow-hidden mt-5"><motion.div initial={{width:0}} animate={{width:`${p.progress}%`}} transition={{duration:1,delay:.15+i*.05}} className={`h-full ${pacingBar[p.pacing]}`}/></div></GlassCard>)}</div>

    <GlassCard strong className="p-6 mt-8"><div className="text-[11px] uppercase tracking-wide text-amber-300 mb-3">Decision required</div><p className="text-[14px] text-[var(--efi-ink-0)] leading-relaxed">The highest-value immediate intervention is Project 32: payment posting and upload automation. Phase 1 is complete, but Python conversion and SI report installation remain unresolved. Assign named owners and dates before treating the estimated 32-hour saving as committed value.</p></GlassCard>
  </div>
}
