import { BadgeCheck, Building2, CreditCard, Landmark, Store } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import CursorSpotlight from '../components/CursorSpotlight';

const topValue = [
  ['Polokwane','R830,390.70'],['Umhlanga','R827,721.90'],['Alberton','R695,818.40'],['Fordsburg','R666,075.10'],['Boksburg','R473,189.20'],
];
const topVolume = [['Polokwane','261'],['Alberton','217'],['Umhlanga','207'],['N1 City','143'],['Boksburg','141']];

export default function CashbooksBankingV3(){
  return <div className="px-6 lg:px-10 py-10 max-w-[1250px] mx-auto relative">
    <CursorSpotlight/>
    <div className="mb-8"><div className="text-[11px] uppercase tracking-[0.16em] text-violet-300/80 font-mono mb-2">Cashbooks & Store Banking · June 2026</div><h1 className="font-display text-2xl sm:text-3xl text-[var(--efi-ink-0)]">See every deposit, fee, journal and banking exception</h1><p className="text-[12px] text-[var(--efi-ink-2)] mt-3">Grounded in the June MBR. Figures are demonstration data until connected to live Sage and bank feeds.</p></div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {[
        ['R6.2m','Cash deposits','2,068 transactions',Landmark],
        ['R117m','Card deposits','3,031 transactions',CreditCard],
        ['R5.3m','Not banked','468 exceptions',Store],
        ['99.93%','Processing accuracy','98% SLA target',BadgeCheck],
      ].map(([v,l,s,I])=>{const Icon=I as typeof Landmark;return <GlassCard key={String(l)} className="p-5"><Icon size={18} className="text-violet-300"/><div className="font-display text-2xl text-[var(--efi-ink-0)] mt-3">{String(v)}</div><div className="text-[12px] text-violet-200 mt-1">{String(l)}</div><div className="text-[10.5px] text-[var(--efi-ink-2)] mt-1">{String(s)}</div></GlassCard>})}
    </div>

    <div className="grid lg:grid-cols-2 gap-5 mb-8">
      <GlassCard className="p-6"><div className="flex items-center gap-2 text-[14px] text-[var(--efi-ink-0)] mb-5"><Building2 size={16} className="text-cyan-300"/> Top five stores by cash value</div><div className="space-y-3">{topValue.map(([s,v],i)=><div key={s} className="flex items-center justify-between border-b border-white/5 pb-3"><div className="flex items-center gap-3"><span className="font-mono text-[10px] text-cyan-300">0{i+1}</span><span className="text-[13px] text-[var(--efi-ink-1)]">{s}</span></div><span className="font-mono text-[12px] text-[var(--efi-ink-0)]">{v}</span></div>)}</div></GlassCard>
      <GlassCard className="p-6"><div className="flex items-center gap-2 text-[14px] text-[var(--efi-ink-0)] mb-5"><Store size={16} className="text-amber-300"/> Top five stores by cash volume</div><div className="space-y-3">{topVolume.map(([s,v],i)=><div key={s} className="flex items-center justify-between border-b border-white/5 pb-3"><div className="flex items-center gap-3"><span className="font-mono text-[10px] text-amber-300">0{i+1}</span><span className="text-[13px] text-[var(--efi-ink-1)]">{s}</span></div><span className="font-mono text-[12px] text-[var(--efi-ink-0)]">{v}</span></div>)}</div></GlassCard>
    </div>

    <div className="grid md:grid-cols-3 gap-4 mb-8">
      <GlassCard className="p-5"><div className="text-[11px] text-[var(--efi-ink-2)] uppercase">Bank charges</div><div className="font-display text-xl text-[var(--efi-ink-0)] mt-2">R134k</div><div className="text-[11px] text-amber-300 mt-1">2.16% of cash deposits</div></GlassCard>
      <GlassCard className="p-5"><div className="text-[11px] text-[var(--efi-ink-2)] uppercase">Merchant fees</div><div className="font-display text-xl text-[var(--efi-ink-0)] mt-2">R1.6m</div><div className="text-[11px] text-amber-300 mt-1">1.41% of card deposits</div></GlassCard>
      <GlassCard className="p-5"><div className="text-[11px] text-[var(--efi-ink-2)] uppercase">Cashbook journals</div><div className="font-display text-xl text-[var(--efi-ink-0)] mt-2">191</div><div className="text-[11px] text-emerald-300 mt-1">28 bank accounts</div></GlassCard>
    </div>

    <GlassCard strong className="p-6"><div className="text-[11px] uppercase tracking-wide text-rose-300 mb-3">Charl AI recommendation</div><p className="text-[14px] text-[var(--efi-ink-0)] leading-relaxed">Treat the R5.3m not-banked population as a store control mission, not a month-end statistic. Age every exception, rank stores by value and frequency, assign accountable owners, and connect recurring-journal automation to bank-charge and PayJustNow evidence.</p></GlassCard>
  </div>
}
