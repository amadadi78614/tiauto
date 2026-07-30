import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Sparkles, Radar, Orbit, Wallet, Layers, ScanSearch, RadioTower, Landmark, Presentation, Share2, Workflow, Map, ChevronRight, FileText, Volume2, VolumeX, Mic, Sun, Moon, TrendingUp, Compass, Pin, PinOff, ChevronsRight } from 'lucide-react';
import type { ReactNode } from 'react';
import type { ScreenId } from '../data/nav';
import { navItems } from '../data/nav';
import { useSound } from '../hooks/useSound';
import { useVoiceResponsePref } from '../hooks/useVoiceResponsePref';
import { useThemePref } from '../hooks/useThemePref';
import { playClick, playTransition } from '../utils/sound';
import GuidedTour from './GuidedTour';

const icons: Record<ScreenId, ReactNode> = {
  landing: <Sparkles size={17} />,
  story: <Sparkles size={17} />,
  'command-centre': <LayoutGrid size={17} />,
  briefing: <FileText size={17} />,
  ask: <Radar size={17} />,
  'mission-control': <Orbit size={17} />,
  'domain-intelligence': <Orbit size={17} />,
  'working-capital': <Wallet size={17} />,
  'financial-close': <Layers size={17} />,
  reconciliation: <ScanSearch size={17} />,
  capital: <RadioTower size={17} />,
  cashbooks: <Landmark size={17} />,
  'board-reporting': <Presentation size={17} />,
  'knowledge-graph': <Share2 size={17} />,
  'operating-model': <Workflow size={17} />,
  roadmap: <Map size={17} />,
};

interface AppShellProps {
  active: ScreenId;
  onNavigate: (id: ScreenId) => void;
  children: ReactNode;
}

const groups = ['Executive', 'Intelligence', 'Domains', 'Platform'];

export default function AppShell({ active, onNavigate, children }: AppShellProps) {
  const activeLabel = navItems.find((n) => n.id === active)?.label ?? 'TiAuto Finance Intelligence';
  const { enabled: soundOn, toggle: toggleSound } = useSound();
  const { enabled: voiceOn, toggle: toggleVoice } = useVoiceResponsePref();
  const { isLight, toggle: toggleTheme } = useThemePref();
  const [tourActive, setTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [pinned, setPinned] = useState(true);
  const [hovered, setHovered] = useState(false);
  const sidebarVisible = pinned || hovered;

  const navigate = (id: ScreenId) => {
    if (soundOn) playTransition();
    onNavigate(id);
  };

  const SidebarContent = (
    <>
      <div className="flex items-center gap-2 mb-5">
        <button onClick={() => navigate('command-centre')} className="flex-1 flex items-center gap-2.5 px-2.5 group min-w-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center shrink-0 shadow-[0_6px_20px_-6px_rgba(56,189,248,0.55)]">
            <Sparkles size={16} className="text-white" />
          </div>
          <div className="text-left min-w-0">
            <div className="font-display text-[13px] font-semibold tracking-wide leading-tight text-[var(--efi-ink-0)] truncate">TiAuto Finance</div>
            <div className="font-display text-[13px] font-semibold tracking-wide leading-tight efi-text-gradient truncate">Intelligence</div>
          </div>
        </button>
        <button
          onClick={() => setPinned((v) => !v)}
          title={pinned ? 'Unpin sidebar (auto-hide)' : 'Pin sidebar open'}
          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${pinned ? 'text-[var(--efi-accent-cyan)] bg-cyan-400/10' : 'text-[var(--efi-ink-2)] hover:text-[var(--efi-ink-0)] hover:bg-white/[0.05]'}`}
        >
          {pinned ? <Pin size={13} /> : <PinOff size={13} />}
        </button>
        {!pinned && (
          <button
            onClick={() => setHovered(false)}
            title="Close sidebar"
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-[var(--efi-ink-2)] hover:text-[var(--efi-ink-0)] hover:bg-white/[0.05] transition-colors"
          >
            <ChevronRight size={14} className="rotate-180" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto efi-scrollbar-none space-y-3">
        {groups.map((group) => {
          const items = navItems.filter((n) => n.group === group);
          if (items.length === 0) return null;
          return (
            <div key={group}>
              <div className="px-3 mb-2 text-[10px] uppercase tracking-[0.2em] text-sky-200/50 font-semibold">{group}</div>
              <div className="space-y-1">
                {items.map((item) => {
                  const isActive = item.id === active;
                  return (
                    <button
                      key={item.id}
                      onClick={() => navigate(item.id)}
                      onMouseEnter={() => soundOn && playClick()}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all relative group ${
                        isActive
                          ? 'text-[var(--efi-ink-0)] bg-sky-400/[0.1] border border-sky-300/25 shadow-[0_0_26px_-8px_rgba(56,189,248,0.55)]'
                          : 'text-[var(--efi-ink-1)] border border-transparent hover:text-[var(--efi-ink-0)] hover:bg-white/[0.05] hover:border-white/10'
                      }`}
                    >
                      {isActive && (
                        <motion.span layoutId="nav-active-dot" className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-sky-300 shadow-[0_0_10px_3px_rgba(56,189,248,0.75)]" />
                      )}
                      <span className={isActive ? 'text-sky-300' : 'text-[var(--efi-ink-2)] group-hover:text-sky-300'}>{icons[item.id]}</span>
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      <div className="px-1 pt-4 mt-2 border-t border-[var(--efi-border)] space-y-2">
        <button
          onClick={toggleSound}
          className={`w-full flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl text-[12.5px] font-medium transition-colors border ${soundOn ? 'text-sky-300 bg-sky-400/10 border-sky-300/25' : 'text-[var(--efi-ink-1)] border-white/10 hover:bg-white/[0.05]'}`}
        >
          <span className="flex items-center gap-2.5">
            {soundOn ? <Volume2 size={14} /> : <VolumeX size={14} className="text-[var(--efi-ink-2)]" />}
            Experience Sound
          </span>
          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${soundOn ? 'bg-sky-400/15 text-sky-300' : 'bg-white/5 text-[var(--efi-ink-2)]'}`}>{soundOn ? 'ON' : 'OFF'}</span>
        </button>
        <button
          onClick={toggleVoice}
          className={`w-full flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl text-[12.5px] font-medium transition-colors border ${voiceOn ? 'text-sky-300 bg-sky-400/10 border-sky-300/25' : 'text-[var(--efi-ink-1)] border-white/10 hover:bg-white/[0.05]'}`}
        >
          <span className="flex items-center gap-2.5">
            <Mic size={14} className={voiceOn ? '' : 'text-[var(--efi-ink-2)]'} />
            Voice Response
          </span>
          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${voiceOn ? 'bg-sky-400/15 text-sky-300' : 'bg-white/5 text-[var(--efi-ink-2)]'}`}>{voiceOn ? 'ON' : 'OFF'}</span>
        </button>
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl text-[12.5px] font-medium transition-colors border ${isLight ? 'text-[var(--efi-accent-amber)] bg-amber-400/10 border-amber-300/25' : 'text-[var(--efi-ink-1)] border-white/10 hover:bg-white/[0.05]'}`}
        >
          <span className="flex items-center gap-2.5">
            {isLight ? <Sun size={14} /> : <Moon size={14} className="text-[var(--efi-ink-2)]" />}
            Appearance
          </span>
          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${isLight ? 'bg-amber-400/15 text-[var(--efi-accent-amber)]' : 'bg-white/5 text-[var(--efi-ink-2)]'}`}>{isLight ? 'Day' : 'Night'}</span>
        </button>

        <button
          onClick={() => { setTourStep(0); setTourActive(true); }}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[12.5px] font-medium transition-colors border text-[var(--efi-accent-cyan)] bg-cyan-400/10 border-cyan-300/25 hover:bg-cyan-400/15"
        >
          <Compass size={14} />
          Start Guided Tour
        </button>

        <div className="pt-3 px-2">
          <div className="text-[10.5px] text-[var(--efi-ink-2)] font-mono">WNS × TiAuto Finance Operations</div>
          <div className="text-[10.5px] text-[var(--efi-ink-2)] font-mono">TiAuto Finance Intelligence</div>
          <div className="text-[10.5px] text-[var(--efi-ink-2)] font-mono">Concept Demonstrator · v2.0.0</div>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen w-full efi-app-canvas flex text-[var(--efi-ink-0)]">
      {/* Invisible edge-trigger strip — hovering here reveals the sidebar */}
      {!sidebarVisible && (
        <div
          className="fixed left-0 top-0 h-screen w-4 z-40"
          onMouseEnter={() => setHovered(true)}
          onClick={() => setHovered(true)}
        />
      )}

      {/* Subtle hint that a hidden menu lives here */}
      {!sidebarVisible && (
        <div className="fixed left-1.5 top-1/2 -translate-y-1/2 z-30 text-[var(--efi-ink-2)]/50 pointer-events-none">
          <ChevronsRight size={16} />
        </div>
      )}

      {/* Sidebar — hover-reveal overlay, or pinned open */}
      <motion.aside
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial={false}
        animate={{ x: sidebarVisible ? 0 : '-100%' }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 top-0 flex flex-col w-[292px] py-4 px-3.5 h-screen bg-[var(--efi-chrome-bg)] border-r border-[var(--efi-border)] overflow-x-hidden z-40 shadow-[8px_0_30px_-12px_rgba(0,0,0,0.4)]"
      >
        {SidebarContent}
      </motion.aside>

      {/* Main */}
      <div className={`flex-1 min-w-0 flex flex-col relative transition-[margin] duration-300 ${pinned ? 'ml-[292px]' : 'ml-0'}`}>
        {/* CHANGED FROM 'fixed' TO 'absolute' TO FIX SIDEBAR VISIBILITY */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 efi-app-canvas" />
          <div className="efi-aurora-a absolute -top-40 -left-20 w-[560px] h-[560px] rounded-full blur-[110px]" style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.16), transparent 70%)' }} />
          <div className="efi-aurora-b absolute top-1/3 right-0 w-[520px] h-[520px] rounded-full blur-[120px]" style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.13), transparent 70%)' }} />
          <div className="efi-aurora-c absolute bottom-0 left-1/3 w-[480px] h-[480px] rounded-full blur-[100px]" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.10), transparent 70%)' }} />
          <div className="efi-grain absolute inset-0" />
        </div>

        <header className="sticky top-0 z-20 backdrop-blur-xl bg-[var(--efi-chrome-bg-soft)] border-b border-[var(--efi-border)] px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-2 text-[13px] text-[var(--efi-ink-2)] min-w-0">
              <span className="hidden sm:inline">TiAuto Finance Intelligence</span>
              <ChevronRight size={13} className="hidden sm:inline" />
              <span className="text-[var(--efi-ink-0)] font-medium truncate">{activeLabel}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full efi-glass text-[11px] font-mono text-[var(--efi-accent-emerald)]">
              <TrendingUp size={12} />
              ZAR/USD 18.42
              <span className="text-[var(--efi-ink-2)]">illustrative</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-300/25 text-[11px] font-mono text-[var(--efi-accent-amber)]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Illustrative demonstration · target-state data sources
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center text-[11px] font-display text-white shadow-[0_4px_16px_-4px_rgba(56,189,248,0.55)]">CFO</div>
          </div>
        </header>

        <main className="relative z-10 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 18, scale: 0.995, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {!tourActive && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { setTourStep(0); setTourActive(true); }}
          className="fixed bottom-5 right-5 z-30 w-12 h-12 rounded-full efi-glass-strong efi-glow-cyan flex items-center justify-center text-[var(--efi-accent-cyan)]"
          title="Start guided tour"
        >
          <Compass size={20} />
        </motion.button>
      )}

      {tourActive && (
        <GuidedTour
          stepIndex={tourStep}
          onStepChange={setTourStep}
          onNavigate={navigate}
          onClose={() => setTourActive(false)}
        />
      )}
    </div>

  );
}