import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleField from '../components/ParticleField';
import { playClick } from '../utils/sound';
import { speakWelcome } from '../utils/greet';

const words = ['Transactions', 'Decision Support', 'Analytics', 'Decision Intelligence'];

interface LandingProps {
  onEnter: () => void;
}

export default function Landing({ onEnter }: LandingProps) {
  const [stage, setStage] = useState(0); // 0..words.length-1 cycles words, then final
  const [showFinal, setShowFinal] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [particlesReady, setParticlesReady] = useState(false);

  useEffect(() => {
    const t0 = setTimeout(() => setParticlesReady(true), 800);
    let i = 0;
    const wordTimer = setInterval(() => {
      i += 1;
      if (i < words.length) {
        setStage(i);
      } else {
        clearInterval(wordTimer);
        setTimeout(() => setShowFinal(true), 1000);
        setTimeout(() => setShowCta(true), 3400);
      }
    }, 2100);
    return () => { clearInterval(wordTimer); clearTimeout(t0); };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      <div className={`absolute inset-0 transition-opacity duration-[1500ms] ${particlesReady ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 efi-bg-cinematic" />
        <ParticleField density={90} linkDistance={150} speed={0.12} />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <AnimatePresence mode="wait">
          {!showFinal ? (
            <motion.div
              key={words[stage]}
              initial={{ opacity: 0, letterSpacing: '0.3em', filter: 'blur(8px)' }}
              animate={{ opacity: 1, letterSpacing: '0.05em', filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-white/90"
            >
              {words[stage]}
            </motion.div>
          ) : (
            <motion.div
              key="final"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              {/* Added Greeting & Weather Block */}
              <div className="flex flex-col items-center gap-1.5 mb-8">
                <h1 className="text-xl sm:text-2xl font-light text-white/90">
                  Good Morning Charl. Hope you are well.
                </h1>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <span>🌤️</span>
                  <span>TiAuto Finance Operations · May 2026 MBR intelligence</span>
                </div>
              </div>

              <div className="font-display text-4xl sm:text-6xl md:text-7xl font-medium efi-text-gradient-cinematic leading-tight max-w-4xl">
                TiAuto Finance Intelligence
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 1.6 }}
                className="mt-6 text-slate-300/90 text-sm sm:text-base max-w-xl font-light"
              >
                A living intelligence layer over TiAuto's finance operations —
                built by WNS for Shared Services, Procurement, and the Executive Committee.
              </motion.p>

              <AnimatePresence>
                {showCta && (
                  <motion.button
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => { playClick(); speakWelcome(); onEnter(); }}
                    className="mt-10 group relative px-8 py-3.5 rounded-full efi-glass-cinematic efi-glow-cyan text-sm font-medium tracking-wide overflow-hidden"
                  >
                    <span className="relative z-10">Enter the Intelligence Layer</span>
                    <span className="absolute inset-0 efi-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <div className="text-[10px] tracking-[0.3em] uppercase text-white/25 font-mono">
          WNS · TiAuto Finance Operations
        </div>
        <div className="text-[10px] tracking-[0.1em] text-white/20 font-mono text-center max-w-xs">
          Prepared as a WNS TiAuto Finance Intelligence concept demonstrator
        </div>
      </div>
    </div>
  );
}