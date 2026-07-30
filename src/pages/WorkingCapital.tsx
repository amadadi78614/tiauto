import { Database, BarChart3, Landmark, Wallet, CreditCard, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SystemFlowDiagram from '../components/SystemFlowDiagram';
import CursorSpotlight from '../components/CursorSpotlight';

const metrics = [
  { label: 'Days Sales Outstanding', signal: 'Trending longer', direction: 'up', tone: 'rose' },
  { label: 'Days Payable Outstanding', signal: 'Trending longer', direction: 'up', tone: 'amber' },
  { label: 'Cash Conversion Cycle', signal: 'Above internal target range', direction: 'up', tone: 'rose' },
  { label: 'Receivables aged 60+ days', signal: 'Concentrated in Fleet & Corporate', direction: 'flat', tone: 'rose' },
];

const toneColor: Record<string, string> = { rose: 'text-[var(--efi-accent-rose)]', amber: 'text-[var(--efi-accent-amber)]', mint: 'text-[var(--efi-accent-emerald)]' };
const directionIcon = { up: TrendingUp, down: TrendingDown, flat: Minus };

export default function WorkingCapital() {
  return (
    <div className="px-6 lg:px-10 py-10 max-w-[1300px] mx-auto relative">
      <CursorSpotlight />
      <div className="mb-6">
        <div className="text-[11px] uppercase tracking-[0.16em] text-[var(--efi-accent-blue)]/80 font-mono mb-2">Working Capital Intelligence</div>
        <h1 className="font-display text-2xl sm:text-3xl font-medium text-[var(--efi-ink-0)]">Cash tied up in the business, explained clearly</h1>
        <p className="text-[11.5px] text-[var(--efi-ink-2)] mt-3">Illustrative indicators for demonstration — figures are directional, not sourced from live Sage or banking data.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((m, i) => {
          const Icon = directionIcon[m.direction as keyof typeof directionIcon];
          return (
            <GlassCard key={m.label} delay={i * 0.06} className="p-5">
              <div className="text-[11px] text-[var(--efi-ink-2)] font-mono mb-3">{m.label}</div>
              <div className={`flex items-center gap-2 ${toneColor[m.tone]}`}>
                <Icon size={18} />
                <span className="font-display text-[15px] text-[var(--efi-ink-0)] font-medium">{m.signal}</span>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <GlassCard strong className="p-6 mb-8">
        <SystemFlowDiagram
          color="var(--efi-blue)"
          centerLabel="Working Capital Intelligence"
          centerSub="Target-state: cross-referencing AR ageing, AP cycle time and cash forecast"
          sources={[
            { label: 'AR Ageing (Sage FI-AR)', icon: Database },
            { label: 'AP Ageing (Sage FI-AP)', icon: CreditCard },
            { label: 'Executive reporting', icon: BarChart3 },
            { label: 'Cashbook and bank position', icon: Landmark },
          ]}
        />
      </GlassCard>

      <GlassCard className="p-6">
        <div className="flex items-center gap-2 text-[var(--efi-accent-emerald)] text-[11px] uppercase tracking-wide font-medium mb-3">
          <Wallet size={14} /> Executive Recommendation
        </div>
        <p className="text-[14.5px] text-[var(--efi-ink-0)] leading-relaxed">
          Concentrate collections effort on the highest-value overdue Fleet & Corporate Accounts accounts, which represent the
          majority of receivables aged beyond the review threshold. Hold the current AP payment cycle in Accounts Payable
          steady rather than accelerating it, to protect near-term liquidity while receivables recover.
        </p>
      </GlassCard>
    </div>
  );
}
