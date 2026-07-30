import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Coins, Landmark, Layers, RadioTower, ShieldAlert, Presentation, BrainCircuit, CheckCircle2, FileSearch, ScanSearch, ListChecks, Zap, Share2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import CursorSpotlight from '../components/CursorSpotlight';
import { specialists, askExample, askResponse } from '../data/domainData';

const icons: Record<string, typeof Wallet> = {
  'brain-circuit': BrainCircuit,
  wallet: Wallet,
  coins: Coins,
  landmark: Landmark,
  layers: Layers,
  'radio-tower': RadioTower,
  'shield-alert': ShieldAlert,
  presentation: Presentation,
  'scan-search': ScanSearch,
};

type Status = 'idle' | 'waiting' | 'activating' | 'reviewing' | 'checking' | 'consulting' | 'returning' | 'completed';
const statusLabel: Record<Status, string> = {
  idle: 'Idle',
  waiting: 'Waiting',
  activating: 'Activating',
  reviewing: 'Reviewing data',
  checking: 'Checking business rules',
  consulting: 'Consulting knowledge',
  returning: 'Returning finding',
  completed: 'Complete',
};
const statusIcon: Record<Status, typeof FileSearch> = {
  idle: FileSearch,
  waiting: FileSearch,
  activating: Zap,
  reviewing: FileSearch,
  checking: ListChecks,
  consulting: Share2,
  returning: ListChecks,
  completed: CheckCircle2,
};

const orbiters = specialists.filter((s) => s.id !== 'orchestrator');
const orchestrator = specialists.find((s) => s.id === 'orchestrator')!;

const consultPairs: { from: string; to: string; message: string }[] = [
  { from: 'board', to: 'wc', message: 'Board Reporting is confirming working capital commentary' },
  { from: 'close', to: 'capital', message: 'Financial Close is cross-checking capitalisation postings' },
  { from: 'cashbooks', to: 'cash', message: 'Cashbooks is validating banked deposits and allocations' },
  { from: 'revenue', to: 'wc', message: 'Revenue Assurance is checking billing-to-collections impact' },
];

export default function AgentMissionControl() {
  const [phase, setPhase] = useState<'question' | 'awaken' | 'working' | 'synthesis' | 'result'>('question');
  const [statuses, setStatuses] = useState<Record<string, Status>>(() =>
    Object.fromEntries(orbiters.map((o) => [o.id, 'idle' as Status]))
  );
  const [awakened, setAwakened] = useState<string[]>([]);
  const [consultIndex, setConsultIndex] = useState<number | null>(null);

  const radius = 300;
  const positions = useMemo(() => {
    return orbiters.map((o, i) => {
      const angle = (i / orbiters.length) * Math.PI * 2 - Math.PI / 2;
      return { id: o.id, x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
    });
  }, [orbiters.length]);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('awaken'), 2600);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase !== 'awaken') return;
    orbiters.forEach((o, i) => {
      setTimeout(() => {
        setAwakened((prev) => [...prev, o.id]);
        setStatuses((prev) => ({ ...prev, [o.id]: 'waiting' }));
      }, i * 420);
    });
    const t2 = setTimeout(() => setPhase('working'), orbiters.length * 420 + 800);
    return () => clearTimeout(t2);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'working') return;
    const sequence: Status[] = ['activating', 'reviewing', 'checking', 'consulting', 'returning', 'completed'];
    const timers: ReturnType<typeof setTimeout>[] = [];
    orbiters.forEach((o, idx) => {
      sequence.forEach((s, si) => {
        timers.push(setTimeout(() => {
          setStatuses((prev) => ({ ...prev, [o.id]: s }));
        }, idx * 260 + si * 780 + 300));
      });
    });
    const t3 = setTimeout(() => setPhase('synthesis'), orbiters.length * 260 + sequence.length * 780 + 900);
    timers.push(t3 as unknown as ReturnType<typeof setTimeout>);
    const t4 = setTimeout(() => setPhase('result'), orbiters.length * 260 + sequence.length * 780 + 2500);
    timers.push(t4);
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'synthesis') { setConsultIndex(null); return; }
    let i = 0;
    setConsultIndex(0);
    const id = setInterval(() => {
      i = (i + 1) % consultPairs.length;
      setConsultIndex(i);
    }, 950);
    return () => clearInterval(id);
  }, [phase]);

  const allCompleted = orbiters.every((o) => statuses[o.id] === 'completed');

  return (
    <div className="px-6 lg:px-10 py-10 max-w-[1400px] mx-auto relative">
      <CursorSpotlight />
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 text-[var(--efi-accent-cyan)]/80 text-[12px] font-mono mb-3">
          <BrainCircuit size={13} /> Agent Mission Control
        </div>
        <AnimatePresence mode="wait">
          <motion.h1 key={phase} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="font-display text-2xl sm:text-3xl font-medium text-[var(--efi-ink-0)]">
            {phase === 'question' && `“${askExample}”`}
            {phase === 'awaken' && 'Breaking the question into specialist investigations…'}
            {phase === 'working' && 'Each specialist is reviewing its area of the business'}
            {phase === 'synthesis' && 'Findings are being returned to the Finance Intelligence Orchestrator'}
            {phase === 'result' && 'Executive recommendation ready'}
          </motion.h1>
        </AnimatePresence>
        <p className="text-[13px] text-[var(--efi-ink-2)] max-w-xl mx-auto mt-3">
          One executive question is broken into specialist investigations. Each specialist reviews its area
          and returns findings to the Finance Intelligence Orchestrator, which synthesises a single recommendation.
        </p>
        <AnimatePresence mode="wait">
          {phase === 'synthesis' && consultIndex !== null && (
            <motion.div
              key={consultIndex}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 mt-4 px-3.5 py-1.5 rounded-full efi-glass text-[11.5px] text-[var(--efi-accent-violet)] font-mono"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              {consultPairs[consultIndex].message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative flex items-center justify-center overflow-visible" style={{ height: 700 }}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="-380 -350 760 700">
          {positions.map((p) => {
            const isActive = phase === 'working' || phase === 'synthesis' || phase === 'result';
            return (
              <motion.line
                key={p.id}
                x1={0} y1={0} x2={p.x} y2={p.y}
                stroke="url(#lineGrad)"
                strokeWidth={1}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: awakened.includes(p.id) ? 1 : 0, opacity: awakened.includes(p.id) ? (isActive ? 0.55 : 0.25) : 0 }}
                transition={{ duration: 0.8 }}
              />
            );
          })}
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#34D8FF" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#34D8FF" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          {(phase === 'working' || phase === 'synthesis') && positions.map((p, i) => (
            <motion.circle
              key={`particle-${p.id}`}
              r={2.4}
              fill="#7CE8FF"
              initial={{ cx: p.x, cy: p.y, opacity: 0 }}
              animate={{ cx: [p.x, 0], cy: [p.y, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.25, ease: 'easeIn' }}
            />
          ))}

          {/* Agent-to-agent consultation line */}
          {phase === 'synthesis' && consultIndex !== null && (() => {
            const pair = consultPairs[consultIndex];
            const fromPos = positions.find((p) => p.id === pair.from);
            const toPos = positions.find((p) => p.id === pair.to);
            if (!fromPos || !toPos) return null;
            return (
              <g key={consultIndex}>
                <motion.line
                  x1={fromPos.x} y1={fromPos.y} x2={toPos.x} y2={toPos.y}
                  stroke="#A78BFA"
                  strokeWidth={1.4}
                  strokeDasharray="4 4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.circle
                  r={3}
                  fill="#C4B5FD"
                  initial={{ cx: fromPos.x, cy: fromPos.y, opacity: 0 }}
                  animate={{ cx: [fromPos.x, toPos.x], cy: [fromPos.y, toPos.y], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 0.9, ease: 'easeInOut' }}
                />
              </g>
            );
          })()}
        </svg>

        {/* Orchestrator core */}
        <motion.div
          className="absolute z-10 flex flex-col items-center justify-center rounded-full"
          style={{ width: 148, height: 148 }}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div
            className="w-full h-full rounded-full flex flex-col items-center justify-center text-center px-3 efi-float"
            style={{
              background: 'radial-gradient(circle at 32% 28%, rgba(120,180,255,0.55), rgba(15,22,40,0.92) 72%)',
              border: '1px solid rgba(150,200,255,0.45)',
              boxShadow: phase === 'result' ? '0 0 100px -10px rgba(52,216,255,0.7)' : '0 0 70px -14px rgba(52,216,255,0.45)',
            }}
          >
            <BrainCircuit size={20} className="text-cyan-200 mb-1.5" />
            <div className="font-display text-[10.5px] font-medium text-white leading-tight">{orchestrator.name}</div>
            <div className="font-mono text-[8px] text-cyan-200/80 mt-1">{phase === 'question' ? 'Standing by' : allCompleted ? 'Synthesising' : 'Active'}</div>
          </div>
          {(phase === 'awaken' || phase === 'working') && [0, 0.8].map((d) => (
            <span key={d} className="efi-pulse-ring absolute inset-0 rounded-full border border-cyan-300/40" style={{ animationDelay: `${d}s` }} />
          ))}
        </motion.div>

        {/* Specialist nodes */}
        {orbiters.map((o, i) => {
          const p = positions[i];
          const isAwake = awakened.includes(o.id);
          const status = statuses[o.id];
          const Icon = icons[o.icon];
          const StatusIcon = statusIcon[status];
          const activePair = phase === 'synthesis' && consultIndex !== null ? consultPairs[consultIndex] : null;
          const isConsulting = activePair ? (activePair.from === o.id || activePair.to === o.id) : false;
          return (
            <motion.div
              key={o.id}
              className="absolute z-10"
              style={{ left: '50%', top: '50%' }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.6 }}
              animate={isAwake ? { x: p.x - 62, y: p.y - 62, opacity: 1, scale: isConsulting ? 1.05 : 1 } : { x: -62, y: -62, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="w-[124px] rounded-2xl efi-glass-strong p-3 text-center relative transition-shadow duration-300"
                style={{
                  boxShadow: isConsulting
                    ? '0 0 34px -6px rgba(167,139,250,0.85)'
                    : status !== 'idle' && status !== 'completed' ? `0 0 30px -6px ${o.color}88` : status === 'completed' ? '0 0 30px -8px rgba(52,211,153,0.5)' : 'none',
                  borderColor: isConsulting ? 'rgba(167,139,250,0.6)' : undefined,
                }}
              >
                <div className="w-9 h-9 mx-auto rounded-xl flex items-center justify-center mb-2" style={{ background: `${o.color}22`, color: o.color }}>
                  <Icon size={16} />
                </div>
                <div className="font-display text-[10.5px] font-medium text-[var(--efi-ink-0)] leading-tight">{o.name}</div>
                <div className="font-mono text-[8.5px] text-[var(--efi-ink-2)] mt-1 leading-tight">{o.domain}</div>
                <div className={`mt-2 inline-flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-full ${isConsulting ? 'text-[var(--efi-accent-violet)] bg-violet-400/15' : status === 'completed' ? 'text-[var(--efi-accent-emerald)] bg-emerald-400/10' : status === 'idle' || status === 'waiting' ? 'text-[var(--efi-ink-2)] bg-white/5' : 'text-[var(--efi-accent-cyan)] bg-cyan-400/10'}`}>
                  <StatusIcon size={9} className={status === 'checking' || status === 'returning' ? 'animate-pulse' : ''} />
                  {isConsulting ? 'Consulting' : statusLabel[status]}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {phase === 'result' && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <GlassCard strong className="p-6 max-w-3xl mx-auto">
              <div className="text-[11px] uppercase tracking-wide text-[var(--efi-accent-emerald)] font-medium mb-3">Executive Recommendation</div>
              <p className="text-[15px] text-[var(--efi-ink-0)] leading-relaxed">{askResponse.recommendation}</p>
              <div className="mt-4 pt-4 border-t border-[var(--efi-border)] flex items-center justify-between flex-wrap gap-2">
                <span className="font-mono text-[11px] text-[var(--efi-ink-2)]">Synthesised from {orbiters.length} specialists · {askResponse.confidence}</span>
                <button className="text-[12px] px-4 py-2 rounded-full efi-glass hover:efi-glass-strong text-[var(--efi-ink-0)] transition-colors">View full analysis</button>
              </div>
              <div className="mt-3 text-[11px] text-[var(--efi-ink-2)]">
                Simulated executive response based on illustrative data — not sourced from live TiAuto systems.
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
