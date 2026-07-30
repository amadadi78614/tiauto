import { Landmark, CreditCard, Store, BadgeCheck } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SystemFlowDiagram from '../components/SystemFlowDiagram';
import CursorSpotlight from '../components/CursorSpotlight';

const exposures = [
  { label: 'Unbanked cash & card drops', value: 'R8.5m', note: '495 transactions not reflected as banked at month-end', tone: 'rose' },
  { label: 'ABSA Fleet allocations', value: 'R114k', note: 'Remittance information incomplete or ambiguous', tone: 'amber' },
  { label: 'Reconciliation coverage', value: '100%', note: 'May reconciliation coverage complete', tone: 'mint' },
];

const toneColor: Record<string, string> = {
  rose: 'text-[var(--efi-accent-rose)] bg-rose-400/10 border-rose-400/30',
  amber: 'text-[var(--efi-accent-amber)] bg-amber-400/10 border-amber-400/30',
  mint: 'text-[var(--efi-accent-emerald)] bg-emerald-400/10 border-emerald-400/30',
};

export default function CashbooksBanking() {
  return (
    <div className="px-6 lg:px-10 py-10 max-w-[1200px] mx-auto relative">
      <CursorSpotlight />
      <div className="mb-8">
        <div className="text-[11px] uppercase tracking-[0.16em] text-[var(--efi-accent-violet)]/80 font-mono mb-2">Cashbooks & Store Banking</div>
        <h1 className="font-display text-2xl sm:text-3xl font-medium text-[var(--efi-ink-0)]">Control store deposits, bank allocations and cashbook integrity</h1>
        <p className="text-[11.5px] text-[var(--efi-ink-2)] mt-3">Illustrative intelligence grounded in the TiAuto May 2026 MBR — not connected to live bank feeds.</p>
      </div>

      <div className="space-y-3 mb-8">
        {exposures.map((e, i) => (
          <GlassCard key={e.label} delay={i * 0.06} className="p-5 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg efi-glass-strong flex items-center justify-center text-[var(--efi-accent-violet)]">
                {i === 0 ? <Store size={16} /> : i === 1 ? <CreditCard size={16} /> : <BadgeCheck size={16} />}
              </div>
              <div>
                <div className="text-[14px] text-[var(--efi-ink-0)] font-medium">{e.label}</div>
                <div className="text-[12px] text-[var(--efi-ink-2)]">{e.note}</div>
              </div>
            </div>
            <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full border ${toneColor[e.tone]}`}>{e.value}</span>
          </GlassCard>
        ))}
      </div>

      <GlassCard strong className="p-6 mb-8">
        <SystemFlowDiagram
          color="var(--efi-violet)"
          centerLabel="Cashbooks & Banking Intelligence"
          centerSub="Bank statements, store deposits and allocation controls"
          sources={[
            { label: 'Bank statements', icon: Landmark },
            { label: 'Store cash & card drops', icon: Store },
            { label: 'Fleet remittances', icon: CreditCard },
          ]}
        />
      </GlassCard>

      <GlassCard className="p-6">
        <div className="text-[var(--efi-accent-emerald)] text-[11px] uppercase tracking-wide font-medium mb-3">Executive Recommendation</div>
        <p className="text-[14.5px] text-[var(--efi-ink-0)] leading-relaxed">
          Prioritise the R8.5m unbanked exposure by store and age, assign owners to the oldest exceptions, and resolve the ABSA Fleet remittance gap before the next close. The objective is simple: every store deposit visible, allocated and reconciled.
        </p>
      </GlassCard>
    </div>
  );
}
