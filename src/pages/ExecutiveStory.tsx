import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleField from '../components/ParticleField';

const beats = [
  { k: '01', line: 'Every quarter, TiAuto generates millions of transactions across Sage, BIO, bank statements and operational trackers.' },
  { k: '02', line: 'Today, that data becomes insight weeks later — in a deck, after the moment has passed.' },
  { k: '03', line: 'TiAuto Finance Intelligence reads it as it happens, and reasons about what it means.' },
  { k: '04', line: 'Not a dashboard. A team of specialists, working continuously, on your behalf.' },
];

interface ExecutiveStoryProps {
  onComplete: () => void;
}

export default function ExecutiveStory({ onComplete }: ExecutiveStoryProps) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (i >= beats.length) {
      const t = setTimeout(onComplete, 900);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setI((v) => v + 1), 3200);
    return () => clearTimeout(t);
  }, [i, onComplete]);

  return (
    <div className="relative w-full h-screen overflow-hidden efi-bg-cinematic flex items-center justify-center">
      <ParticleField density={60} linkDistance={120} speed={0.1} />
      <button onClick={onComplete} className="absolute top-6 right-8 text-[11px] font-mono text-white/30 hover:text-white/70 transition-colors z-20">
        Skip →
      </button>
      <div className="relative z-10 max-w-3xl px-8 text-center">
        <AnimatePresence mode="wait">
          {i < beats.length && (
            <motion.div
              key={beats[i].k}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="font-mono text-xs tracking-[0.3em] text-cyan-300/70 mb-5">{beats[i].k}</div>
              <div className="font-display text-2xl sm:text-4xl font-light text-white/95 leading-snug">
                {beats[i].line}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
        {beats.map((b, idx) => (
          <span key={b.k} className={`h-1 rounded-full transition-all duration-500 ${idx <= i ? 'w-8 bg-cyan-400' : 'w-3 bg-white/15'}`} />
        ))}
      </div>
    </div>
  );
}
