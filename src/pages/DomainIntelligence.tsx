import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Layers, Landmark, RadioTower, ShieldAlert, ShoppingCart, Presentation, Sparkles, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import AnimatedRing from '../components/AnimatedRing';
import { domainHealth } from '../data/domainData';
import type { ScreenId } from '../data/nav';
import CursorSpotlight from '../components/CursorSpotlight';

const trendIcon = { up: TrendingUp, down: TrendingDown, flat: Minus };
const trendColor = { up: '#10B981', down: '#FB7185', flat: '#8B9BB4' };

interface DomainIntelligenceProps {
  onNavigate: (id: ScreenId) => void;
}

const domains: { id: ScreenId; label: string; icon: typeof Wallet; color: string; blurb: string }[] = [
  { id: 'working-capital', label: 'Working Capital Intelligence', icon: Wallet, color: 'var(--efi-blue)', blurb: 'AR, AP, cash conversion' },
  { id: 'financial-close', label: 'Financial Close Intelligence', icon: Layers, color: 'var(--efi-amber)', blurb: 'Close orchestration, variance' },
  { id: 'cashbooks', label: 'Cashbooks & Store Banking', icon: Landmark, color: 'var(--efi-violet)', blurb: 'Banking, deposits, allocations' },
  { id: 'capital', label: 'Payments & Automation', icon: RadioTower, color: 'var(--efi-blue)', blurb: 'Payment runs, controls, automation' },
  { id: 'reconciliation', label: 'Revenue Assurance Intelligence', icon: ShieldAlert, color: 'var(--efi-rose)', blurb: 'Billing integrity, leakage' },
  { id: 'operating-model', label: 'Procurement Intelligence', icon: ShoppingCart, color: 'var(--efi-mint)', blurb: 'Supplier & payment files, sourcing, spend' },
  { id: 'board-reporting', label: 'Board Intelligence', icon: Presentation, color: 'var(--efi-cyan)', blurb: 'Executive narrative' },
];

export default function DomainIntelligence({ onNavigate }: DomainIntelligenceProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const radius = 270;
  const positions = useMemo(() => domains.map((d, i) => {
    const angle = (i / domains.length) * Math.PI * 2 - Math.PI / 2;
    return { id: d.id, x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
  }), []);

  return (
    <div className="px-6 lg:px-10 py-10 max-w-[1400px] mx-auto relative">
      <CursorSpotlight />
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-[var(--efi-accent-cyan)]/80 text-[12px] font-mono mb-3">
          <Sparkles size={13} /> Domain Intelligence
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-medium text-[var(--efi-ink-0)]">Every domain, orbiting one source of truth</h1>
        <p className="text-[var(--efi-ink-1)] text-sm mt-2">Select a domain to zoom into its intelligence.</p>
      </div>

      <div className="relative flex items-center justify-center" style={{ height: 640 }}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="-360 -330 720 660">
          {positions.map((p) => (
            <line key={p.id} x1={0} y1={0} x2={p.x} y2={p.y} stroke="rgba(150,190,255,0.18)" strokeWidth={1} />
          ))}
        </svg>

        <div className="absolute z-10 w-[150px] h-[150px] rounded-full flex flex-col items-center justify-center text-center px-3 efi-float"
          style={{
            background: 'radial-gradient(circle at 32% 28%, rgba(120,180,255,0.55), rgba(15,22,40,0.92) 72%)',
            border: '1px solid rgba(150,200,255,0.45)',
            boxShadow: '0 0 90px -12px rgba(52,216,255,0.55)',
          }}
        >
          <div className="font-display text-[12px] font-medium text-white leading-tight">TiAuto Finance</div>
          <div className="font-display text-[12px] font-medium efi-text-gradient-cinematic leading-tight">Intelligence Core</div>
        </div>

        {domains.map((d, i) => {
          const p = positions[i];
          const isHover = hovered === d.id;
          const Icon = d.icon;
          return (
            <motion.button
              key={d.id}
              onClick={() => onNavigate(d.id)}
              onMouseEnter={() => setHovered(d.id)}
              onMouseLeave={() => setHovered(null)}
              className="absolute z-10"
              style={{ left: '50%', top: '50%' }}
              initial={{ x: p.x - 70, y: p.y - 55, opacity: 0 }}
              animate={{ x: p.x - 70, y: p.y - 55, opacity: 1, scale: isHover ? 1.06 : 1 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <div
                className="w-[152px] rounded-2xl efi-glass-strong p-4 text-center transition-shadow"
                style={{ boxShadow: isHover ? `0 0 40px -8px ${d.color}99` : 'none' }}
              >
                <div className="w-10 h-10 mx-auto rounded-xl flex items-center justify-center mb-2.5" style={{ background: `${d.color}22`, color: d.color }}>
                  <Icon size={18} />
                </div>
                <div className="font-display text-[12px] font-medium text-[var(--efi-ink-0)] leading-tight">{d.label}</div>
                <div className="font-mono text-[9.5px] text-[var(--efi-ink-2)] mt-1.5 mb-3">{d.blurb}</div>
                {domainHealth[d.id] && (() => {
                  const h = domainHealth[d.id];
                  const TIcon = trendIcon[h.trend];
                  return (
                    <div className="flex items-center justify-center gap-2 pt-2 border-t border-white/5">
                      <AnimatedRing value={h.score} size={38} strokeWidth={4} color={d.color} delay={0.3 + i * 0.05} />
                      <TIcon size={12} style={{ color: trendColor[h.trend] }} />
                    </div>
                  );
                })()}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
