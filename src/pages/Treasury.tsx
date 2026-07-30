import { Landmark, TrendingUp, ShieldCheck, Globe } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SystemFlowDiagram from '../components/SystemFlowDiagram';
import CursorSpotlight from '../components/CursorSpotlight';

const exposures = [
  { pair: 'USD / ZAR', note: 'Equipment settlements — appears to sit outside the 60-day hedge policy window', tone: 'rose' },
  { pair: 'EUR / ZAR', note: 'Licensing renewal — within policy', tone: 'mint' },
  { pair: 'GBP / ZAR', note: 'Consulting retainer — forward cover already in place', tone: 'mint' },
];

const toneColor: Record<string, string> = { rose: 'text-[var(--efi-accent-rose)] bg-rose-400/10 border-rose-400/30', mint: 'text-[var(--efi-accent-emerald)] bg-emerald-400/10 border-emerald-400/30' };

export default function Treasury() {
  return (
    <div className="px-6 lg:px-10 py-10 max-w-[1200px] mx-auto relative">
      <CursorSpotlight />
      <div className="mb-8">
        <div className="text-[11px] uppercase tracking-[0.16em] text-[var(--efi-accent-violet)]/80 font-mono mb-2">Treasury Intelligence</div>
        <h1 className="font-display text-2xl sm:text-3xl font-medium text-[var(--efi-ink-0)]">Liquidity and currency risk, reviewed systematically</h1>
        <p className="text-[11.5px] text-[var(--efi-ink-2)] mt-3">Illustrative exposure indicators — not sourced from a live Treasury feed.</p>
      </div>

      <div className="space-y-3 mb-8">
        {exposures.map((e, i) => (
          <GlassCard key={e.pair} delay={i * 0.06} className="p-5 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg efi-glass-strong flex items-center justify-center text-[var(--efi-accent-violet)]"><Globe size={16} /></div>
              <div>
                <div className="text-[14px] text-[var(--efi-ink-0)] font-medium">{e.pair}</div>
                <div className="text-[12px] text-[var(--efi-ink-2)]">{e.note}</div>
              </div>
            </div>
            <span className={`text-[10.5px] font-mono px-2.5 py-1 rounded-full border ${toneColor[e.tone]}`}>
              {e.tone === 'rose' ? 'Action needed' : 'Within policy'}
            </span>
          </GlassCard>
        ))}
      </div>

      <GlassCard strong className="p-6 mb-8">
        <SystemFlowDiagram
          color="var(--efi-violet)"
          centerLabel="Treasury Intelligence"
          centerSub="Target-state: monitoring FX exposure against hedge policy"
          sources={[
            { label: 'Treasury reports', icon: Landmark },
            { label: 'FX exposure reports', icon: TrendingUp },
            { label: 'Cash management reports', icon: ShieldCheck },
          ]}
        />
      </GlassCard>

      <GlassCard className="p-6">
        <div className="text-[var(--efi-accent-emerald)] text-[11px] uppercase tracking-wide font-medium mb-3">Executive Recommendation</div>
        <p className="text-[14.5px] text-[var(--efi-ink-0)] leading-relaxed">
          Assess forward cover options on the equipment settlement exposure within the current policy window. Current ZAR
          volatility means an unhedged position carries meaningful downside risk through the settlement date — worth a
          Treasury review this week.
        </p>
      </GlassCard>
    </div>
  );
}
