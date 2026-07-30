import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Compass, Volume2, VolumeX } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { tourSteps } from '../data/tourSteps';
import { useVoiceResponse } from '../hooks/useVoiceResponse';
import { useVoiceResponsePref } from '../hooks/useVoiceResponsePref';
import type { ScreenId } from '../data/nav';

interface GuidedTourProps {
  stepIndex: number;
  onStepChange: (index: number) => void;
  onNavigate: (id: ScreenId) => void;
  onClose: () => void;
}

export default function GuidedTour({ stepIndex, onStepChange, onNavigate, onClose }: GuidedTourProps) {
  const step = tourSteps[stepIndex];
  const isLast = stepIndex === tourSteps.length - 1;
  const isFirst = stepIndex === 0;

  const voiceResponse = useVoiceResponse();
  const { enabled: voiceOn, toggle: toggleVoice } = useVoiceResponsePref();

  useEffect(() => {
    onNavigate(step.screen);
    if (voiceOn) voiceResponse.speak(step.message);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIndex]);

  useEffect(() => () => { voiceResponse.stop(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const next = () => {
    if (isLast) { onClose(); return; }
    onStepChange(stepIndex + 1);
  };
  const back = () => {
    if (!isFirst) onStepChange(stepIndex - 1);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-5 right-5 z-40 w-[92%] max-w-[380px]"
      >
        <div className="efi-glass-strong rounded-2xl p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)]">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-[var(--efi-accent-cyan)] font-mono">
              <Compass size={13} /> Guided Tour · {stepIndex + 1} of {tourSteps.length}
            </div>
            <button onClick={onClose} className="text-[var(--efi-ink-2)] hover:text-[var(--efi-ink-0)] shrink-0">
              <X size={16} />
            </button>
          </div>

          <div className="font-display text-[16px] font-medium text-[var(--efi-ink-0)] mb-2">{step.title}</div>
          <p className="text-[13px] text-[var(--efi-ink-1)] leading-relaxed mb-4">{step.message}</p>

          <div className="flex items-center gap-1.5 mb-4">
            {tourSteps.map((s, i) => (
              <span
                key={s.screen}
                className={`h-1 rounded-full transition-all duration-300 ${i === stepIndex ? 'w-6 bg-[var(--efi-accent-cyan)]' : i < stepIndex ? 'w-1.5 bg-[var(--efi-accent-cyan)]/50' : 'w-1.5 bg-white/15'}`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between gap-2">
            <button
              onClick={toggleVoice}
              title={voiceOn ? 'Narration on' : 'Narration off'}
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${voiceOn ? 'text-[var(--efi-accent-cyan)] bg-cyan-400/10' : 'efi-glass text-[var(--efi-ink-2)]'}`}
            >
              {voiceOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={back}
                disabled={isFirst}
                className="w-8 h-8 rounded-full efi-glass flex items-center justify-center text-[var(--efi-ink-1)] disabled:opacity-30 hover:efi-glass-strong transition-colors"
              >
                <ChevronLeft size={15} />
              </button>
              <MagneticButton
                onClick={next}
                className="px-4 py-2 rounded-full bg-[var(--efi-accent-cyan)]/15 border border-[var(--efi-accent-cyan)]/30 text-[var(--efi-accent-cyan)] text-[12.5px] font-medium flex items-center gap-1.5"
                strength={8}
              >
                {isLast ? 'Finish' : 'Next'} {!isLast && <ChevronRight size={13} />}
              </MagneticButton>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
