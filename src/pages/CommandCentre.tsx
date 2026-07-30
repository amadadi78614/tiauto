import { motion } from 'framer-motion';
import { Wallet, Layers, Landmark, RadioTower, ShieldAlert, ArrowRight, Sparkles, FileText, CloudSun, TrendingUp, Gavel } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import AnimatedRing from '../components/AnimatedRing';
import CursorSpotlight from '../components/CursorSpotlight';
import MagneticButton from '../components/MagneticButton';
import TrafficWidget from '../components/TrafficWidget';
import { useCountUp } from '../hooks/useCountUp';
import { executivePriorities, recommendedActions, kpiRings, type Priority } from '../data/domainData';
import type { ScreenId } from '../data/nav';

const iconMap: Record<string, typeof Wallet> = {
  wallet: Wallet,
  layers: Layers,
  landmark: Landmark,
  'radio-tower': RadioTower,
  'shield-alert': ShieldAlert,
};

const severityStyles: Record<string, string> = {
  critical: 'text-[var(--efi-accent-rose)] bg-rose-400/10 border-rose-400/30',
  elevated: 'text-[var(--efi-accent-amber)] bg-amber-400/10 border-amber-400/30',
  watch: 'text-[var(--efi-accent-cyan)] bg-cyan-400/10 border-cyan-400/30',
};

const dayTone = [
  'A quiet start to the week — worth getting ahead on the close.', // Sunday
  'New week, fresh numbers.', // Monday
  'Mid-week check-in — two priorities are worth a decision.', // Tuesday
  'Halfway through the week.', // Wednesday
  'Close cycle is picking up pace.', // Thursday
  'Good note to end the week on.', // Friday
  'Weekend — a light read before Monday.', // Saturday
];

function ConfidencePill({ value }: { value: number }) {
  const count = useCountUp(value, true, 900, 200);
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-16 h-1 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
        />
      </div>
      <span className="font-mono text-[11px] text-[var(--efi-ink-2)]">{count}%</span>
    </div>
  );
}

function PriorityGlance({ priorities }: { priorities: Priority[] }) {
  const total = useCountUp(priorities.length, true, 700, 300);
  const decisions = priorities.filter((p) => p.severity === 'critical');
  const decisionsCount = useCountUp(decisions.length, true, 700, 500);

  const scrollTo = (id: string) => {
    document.getElementById(`priority-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="flex flex-wrap items-center gap-6 mt-5 p-4 rounded-2xl efi-glass">
      <div className="flex items-center gap-3">
        <div className="text-center">
          <div className="font-display text-3xl font-semibold text-[var(--efi-ink-0)] leading-none">{total}</div>
          <div className="text-[9.5px] uppercase tracking-wide text-[var(--efi-ink-2)] mt-1">Active priorities</div>
        </div>
        <div className="flex gap-1.5">
          {priorities.map((p, i) => {
            const Icon = iconMap[p.icon];
            return (
              <motion.button
                key={p.id}
                onClick={() => scrollTo(p.id)}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.08, type: 'spring' }}
                whileHover={{ y: -3, scale: 1.08 }}
                title={p.title}
                className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-shadow ${severityStyles[p.severity]}`}
              >
                <Icon size={15} />
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="w-px h-10 bg-[var(--efi-border)] hidden sm:block" />

      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-rose-400/10 text-[var(--efi-accent-rose)] border border-rose-400/30">
          <Gavel size={15} />
        </div>
        <div>
          <div className="font-display text-lg font-semibold text-[var(--efi-ink-0)] leading-none">{decisionsCount} <span className="text-[13px] font-normal text-[var(--efi-ink-1)]">need a decision this week</span></div>
        </div>
      </div>
    </div>
  );
}

interface CommandCentreProps {
  onNavigate: (id: ScreenId) => void;
}

export default function CommandCentre({ onNavigate }: CommandCentreProps) {
  const hour = new Date().getHours();
  const day = new Date().getDay();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="px-6 lg:px-10 py-10 max-w-[1400px] mx-auto relative">
      <CursorSpotlight />
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10">
        <div className="flex items-center gap-2 text-[var(--efi-accent-cyan)]/80 text-[12px] font-mono mb-3">
          <Sparkles size={13} />
          Thursday, 09 July 2026 · Close cycle day 4 of 6
        </div>

        {/* Greeting */}
        <h1 className="font-display text-3xl sm:text-4xl font-medium text-[var(--efi-ink-0)]">
          {greeting} Charl. Hope you are well.
        </h1>
        <p className="text-[13px] text-[var(--efi-ink-2)] mt-1.5 italic">{dayTone[day]}</p>

        {/* Today strip — weather + FX, a human touch, not another KPI */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-[var(--efi-accent-cyan)]/90 mt-3 font-medium">
          <div className="flex items-center gap-2">
            <CloudSun size={16} />
            <span>TiAuto Finance Operations · May 2026 MBR intelligence</span>
          </div>
          <div className="flex items-center gap-2 text-[var(--efi-accent-emerald)]/90">
            <TrendingUp size={14} />
            <span className="font-mono text-[12.5px]">ZAR/USD 18.42 <span className="text-[var(--efi-ink-2)]">(illustrative)</span></span>
          </div>
        </div>

        <div className="mt-3">
          <TrafficWidget />
        </div>

        <PriorityGlance priorities={executivePriorities} />

        <p className="text-[11.5px] text-[var(--efi-ink-2)] mt-4">
          Illustrative demonstration content — directional, not sourced from live TiAuto systems.
        </p>
      </motion.div>

      <GlassCard strong delay={0.1} className="mt-8 p-7 relative z-10">
        <div className="text-[11px] uppercase tracking-[0.16em] text-[var(--efi-ink-2)] mb-6 font-medium">Mission Control · TiAuto Finance Health</div>
        <div className="flex flex-wrap justify-center sm:justify-between gap-y-10 gap-x-6">
          {kpiRings.map((k, i) => (
            <div key={k.id} className="pb-6">
              <AnimatedRing value={k.value} color={k.color} label={k.label} sublabel={k.sublabel} delay={i * 0.12} />
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="mt-10 relative z-10">
        <div className="text-[11px] uppercase tracking-[0.16em] text-[var(--efi-ink-2)] mb-4 font-medium">Today's Executive Priorities</div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {executivePriorities.map((p, idx) => {
            const Icon = iconMap[p.icon];
            return (
              <GlassCard key={p.id} id={`priority-${p.id}`} delay={idx * 0.06} className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl efi-glass-strong flex items-center justify-center text-[var(--efi-accent-cyan)]">
                      <Icon size={18} />
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-1 rounded-full border uppercase tracking-wide ${severityStyles[p.severity]}`}>
                      {p.severity}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-[var(--efi-ink-2)] mb-1.5">{p.domain}</div>
                  <div className="font-display text-[15px] font-medium text-[var(--efi-ink-0)] leading-snug mb-2">{p.title}</div>
                  <p className="text-[13px] text-[var(--efi-ink-1)] leading-relaxed">{p.detail}</p>
                </div>
                <div className="mt-5 pt-4 border-t border-[var(--efi-border)] flex items-center justify-between">
                  <span className="font-mono text-[12px] text-[var(--efi-accent-amber)]">{p.indicator}</span>
                  <ArrowRight size={14} className="text-[var(--efi-ink-2)]" />
                </div>
              </GlassCard>
            );
          })}

          <GlassCard delay={0.3} onClick={() => onNavigate('ask')} className="p-6 flex flex-col items-start justify-center bg-gradient-to-br from-cyan-500/10 to-blue-500/5">
            <div className="w-10 h-10 rounded-xl efi-glass-strong flex items-center justify-center text-[var(--efi-accent-cyan)] mb-4">
              <Sparkles size={18} />
            </div>
            <div className="font-display text-[15px] font-medium text-[var(--efi-ink-0)] mb-1.5">Ask Finance Intelligence</div>
            <p className="text-[13px] text-[var(--efi-ink-1)] leading-relaxed">Ask anything about the TiAuto finance position in plain language.</p>
            <span className="mt-4 text-[var(--efi-accent-cyan)] text-[13px] flex items-center gap-1.5">Open the console <ArrowRight size={13} /></span>
          </GlassCard>

          <GlassCard delay={0.36} onClick={() => onNavigate('briefing')} className="p-6 flex flex-col items-start justify-center bg-gradient-to-br from-blue-500/10 to-violet-500/5">
            <div className="w-10 h-10 rounded-xl efi-glass-strong flex items-center justify-center text-[var(--efi-accent-blue)] mb-4">
              <FileText size={18} />
            </div>
            <div className="font-display text-[15px] font-medium text-[var(--efi-ink-0)] mb-1.5">Today's Finance Briefing</div>
            <p className="text-[13px] text-[var(--efi-ink-1)] leading-relaxed">The boardroom-ready read: situation, evidence, recommendation and the decision needed.</p>
            <span className="mt-4 text-[var(--efi-accent-blue)] text-[13px] flex items-center gap-1.5">Open the briefing <ArrowRight size={13} /></span>
          </GlassCard>
        </div>
      </div>

      <div className="mt-12 relative z-10">
        <div className="text-[11px] uppercase tracking-[0.16em] text-[var(--efi-ink-2)] mb-4 font-medium">Recommended Executive Actions</div>
        <div className="space-y-3">
          {recommendedActions.map((a, idx) => (
            <GlassCard key={a.id} delay={idx * 0.05} className="p-5 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4 min-w-0">
                <div className="font-mono text-[11px] text-[var(--efi-accent-cyan)]/70 w-6 shrink-0">{String(idx + 1).padStart(2, '0')}</div>
                <div className="min-w-0">
                  <div className="text-[14px] text-[var(--efi-ink-0)] font-medium truncate">{a.title}</div>
                  <div className="text-[12px] text-[var(--efi-ink-2)] font-mono mt-0.5">{a.owner} · {a.eta}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <ConfidencePill value={a.confidence} />
                <MagneticButton className="text-[12px] px-3 py-1.5 rounded-full efi-glass hover:efi-glass-strong text-[var(--efi-ink-0)] transition-colors" strength={8}>
                  Approve
                </MagneticButton>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
