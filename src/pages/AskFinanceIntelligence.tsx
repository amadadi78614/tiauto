import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Send, Mic, MicOff, CircleCheck, Compass, Lightbulb, ListChecks, Gauge,
  FileQuestion, Gavel, ChevronRight, Volume2, Pause, Play, Square, RotateCcw, RefreshCcw, BarChart3,
  BrainCircuit, Users, Share2, Zap, Brain, ShieldCheck, SkipForward, TrendingUp,
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import ConfidenceGauge from '../components/ConfidenceGauge';
import InsightVisuals from '../components/InsightVisuals';
import CursorSpotlight from '../components/CursorSpotlight';
import MagneticButton from '../components/MagneticButton';
import { pickLeadIn } from '../utils/phrasing';
import { matchIntent, fallbackResponse, presetQuestions, type AskIntentResponse } from '../data/askIntents';
import { useVoiceInput } from '../hooks/useVoiceInput';
import { useVoiceResponse } from '../hooks/useVoiceResponse';
import { useSound } from '../hooks/useSound';
import { useVoiceResponsePref } from '../hooks/useVoiceResponsePref';
import { playClick, playProcessing, playRecommendationReady } from '../utils/sound';

function useTypewriter(text: string, active: boolean, speed = 12) {
  const [out, setOut] = useState('');
  useEffect(() => {
    if (!active) { setOut(''); return; }
    setOut('');
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, active, speed]);
  return out;
}

type SpecialistState = 'pending' | 'analysing' | 'complete';
type Phase = 'idle' | 'understanding' | 'activating' | 'retrieval' | 'reasoning' | 'recommendation';

const phaseCopy: Record<Phase, string> = {
  idle: '',
  understanding: 'Understanding the question…',
  activating: 'Activating specialists…',
  retrieval: 'Consulting the knowledge graph…',
  reasoning: 'Reasoning across specialist findings…',
  recommendation: '',
};

const phaseSteps: { id: Phase; label: string; icon: typeof BrainCircuit }[] = [
  { id: 'understanding', label: 'Understanding', icon: BrainCircuit },
  { id: 'activating', label: 'Activating specialists', icon: Users },
  { id: 'retrieval', label: 'Knowledge retrieval', icon: Share2 },
  { id: 'reasoning', label: 'Reasoning', icon: Zap },
];
const phaseOrder: Phase[] = ['understanding', 'activating', 'retrieval', 'reasoning', 'recommendation'];

export default function AskFinanceIntelligence() {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [response, setResponse] = useState<AskIntentResponse | null>(null);
  const [unmatched, setUnmatched] = useState(false);
  const [specialistStates, setSpecialistStates] = useState<SpecialistState[]>([]);
  const responseRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { enabled: soundOn } = useSound();
  const voiceInput = useVoiceInput();
  const voiceResponse = useVoiceResponse();
  const { enabled: voiceResponseOn, toggle: toggleVoiceResponse } = useVoiceResponsePref();

  const situation = useTypewriter(response?.situation ?? '', phase === 'reasoning', 11);
  const skippedRef = useRef(false);

  // Drive the phase sequence once a question is submitted
  useEffect(() => {
    if (!submitted) return;
    skippedRef.current = false;
    if (unmatched) { setPhase('recommendation'); return; }
    setPhase('understanding');
    if (soundOn) playProcessing();
    const t1 = setTimeout(() => { if (!skippedRef.current) setPhase('activating'); }, 750);
    const t2 = setTimeout(() => { if (!skippedRef.current) setPhase('retrieval'); }, 750 + 1250);
    const t3 = setTimeout(() => { if (!skippedRef.current) setPhase('reasoning'); }, 750 + 1250 + 950);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submittedQuery, submitted]);

  const skipAnimation = () => {
    skippedRef.current = true;
    setPhase('recommendation');
  };

  useEffect(() => {
    if (!response) return;
    setSpecialistStates(response.specialists.map(() => 'pending'));
    response.specialists.forEach((_, i) => {
      setTimeout(() => setSpecialistStates((prev) => prev.map((s, idx) => (idx === i ? 'analysing' : s))), 250 + i * 240);
      setTimeout(() => setSpecialistStates((prev) => prev.map((s, idx) => (idx === i ? 'complete' : s))), 1600 + i * 240);
    });
  }, [response]);

  useEffect(() => {
    if (phase === 'reasoning' && response && situation.length === response.situation.length) {
      const t = setTimeout(() => setPhase('recommendation'), 300);
      return () => clearTimeout(t);
    }
  }, [phase, situation, response]);

  useEffect(() => {
    if (phase === 'recommendation' && response && soundOn) playRecommendationReady();
    if (phase === 'recommendation' && response && voiceResponseOn) {
      const summary = `${response.situation} The recommended action is ${response.recommendation} The decision required is ${response.decisionRequired}`;
      voiceResponse.speak(summary);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => {
    if (phase !== 'idle') responseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [submittedQuery]);

  const submit = (q: string) => {
    if (!q.trim()) return;
    voiceResponse.stop();
    const matched = matchIntent(q);
    setSubmittedQuery(q);
    setQuery('');
    setResponse(matched);
    setUnmatched(!matched);
    setSubmitted(true);
    setPhase('idle');
    if (soundOn) playClick();
  };

  const askAnother = () => {
    voiceResponse.stop();
    setSubmitted(false);
    setResponse(null);
    setUnmatched(false);
    setPhase('idle');
    setSubmittedQuery('');
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleMic = () => {
    if (!voiceInput.supported) return;
    voiceInput.start((text) => { setQuery(text); submit(text); });
  };

  const waveBars = useMemo(() => Array.from({ length: 32 }, (_, i) => i), []);
  const showResults = phase === 'recommendation';

  return (
    <div className="px-6 lg:px-10 py-10 max-w-[1300px] mx-auto min-h-[80vh] pb-28 relative">
      <CursorSpotlight />
      <div className="flex items-center gap-2 text-[12px] text-[var(--efi-ink-2)] mb-6">
        <span>TiAuto Finance Intelligence</span>
        <ChevronRight size={12} />
        <span className="text-[var(--efi-ink-0)]">Ask Finance Intelligence</span>
      </div>

      <div className="text-center mb-7">
        <div className="inline-flex items-center gap-2 text-[var(--efi-accent-cyan)]/80 text-[12px] font-mono mb-3">
          <Sparkles size={13} /> Ask Finance Intelligence
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-medium text-[var(--efi-ink-0)]">Ask Finance Intelligence</h1>
        <p className="text-[var(--efi-ink-1)] text-[14.5px] mt-3 max-w-lg mx-auto">
          Ask any finance question. Intelligence specialists will analyse and respond.
        </p>
        <p className="text-[11px] text-[var(--efi-ink-2)] mt-2">
          Illustrative demonstration · target-state data sources
        </p>
      </div>

      {/* Persistent question input — always available, never hidden after a response */}
      <motion.div layout className="mb-8 max-w-[820px] mx-auto">
        <div className="relative">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit(query)}
            placeholder={voiceInput.listening ? 'Listening…' : submitted ? 'Ask another question…' : 'Why is working capital under pressure?'}
            className="w-full efi-glass-strong rounded-2xl py-5 pl-6 pr-28 text-[15px] text-[var(--efi-ink-0)] placeholder:text-[var(--efi-ink-2)] outline-none focus:border-cyan-500/50 transition-colors"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button
              onClick={handleMic}
              title={voiceInput.supported ? 'Ask by voice' : 'Voice input is not supported in this browser'}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${voiceInput.listening ? 'text-white bg-rose-500 efi-listen-pulse' : 'efi-glass text-[var(--efi-ink-1)] hover:efi-glass-strong hover:text-[var(--efi-ink-0)]'} ${!voiceInput.supported ? 'opacity-40 cursor-not-allowed' : ''}`}
              disabled={!voiceInput.supported}
            >
              {voiceInput.listening ? <MicOff size={16} /> : <Mic size={16} />}
            </button>
            <MagneticButton
              onClick={() => submit(query)}
              className="w-10 h-10 rounded-full efi-glass flex items-center justify-center text-[var(--efi-accent-cyan)] hover:efi-glass-strong transition-colors efi-send-pulse"
              strength={10}
            >
              <Send size={16} />
            </MagneticButton>
          </div>
        </div>

        {/* Waveform */}
        <div className="flex items-end justify-center gap-[3px] h-7 mt-3">
          {waveBars.map((i) => (
            <motion.span
              key={i}
              className={`w-[3px] rounded-full ${voiceInput.listening ? 'bg-rose-400' : 'bg-cyan-400/30'}`}
              animate={voiceInput.listening ? { height: [4, 18, 6, 24, 4] } : { height: 4 }}
              transition={voiceInput.listening ? { duration: 0.9 + (i % 5) * 0.08, repeat: Infinity, ease: 'easeInOut', delay: i * 0.02 } : { duration: 0.3 }}
            />
          ))}
        </div>

        {!voiceInput.supported && (
          <p className="text-center text-[11px] text-[var(--efi-ink-2)] mt-2">Voice input is not supported in this browser.</p>
        )}

        <div className="flex flex-wrap gap-2 mt-5 justify-center">
          {presetQuestions.map((s) => (
            <button key={s} onClick={() => submit(s)} className="text-[12px] px-3.5 py-2 rounded-full efi-glass hover:efi-glass-strong text-[var(--efi-ink-1)] hover:text-[var(--efi-ink-0)] transition-colors">
              {s}
            </button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {submitted && (
          <motion.div ref={responseRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">
            <div className="space-y-5 min-w-0">
              <GlassCard className="p-4 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full efi-glass-strong flex items-center justify-center text-[11px] font-display shrink-0">CFO</div>
                  <div className="text-[14px] text-[var(--efi-ink-0)] truncate">{submittedQuery}</div>
                </div>
                <button onClick={askAnother} className="flex items-center gap-1.5 text-[12px] px-3 py-1.5 rounded-full efi-glass hover:efi-glass-strong text-[var(--efi-accent-cyan)] shrink-0 transition-colors">
                  <RefreshCcw size={12} /> Ask another question
                </button>
              </GlassCard>

              {!unmatched && phase !== 'idle' && phase !== 'recommendation' && (
                <GlassCard className="p-5">
                  <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
                    <div className="flex items-center gap-2 text-[12.5px] text-[var(--efi-accent-cyan)]/90 font-mono">
                      <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.4, repeat: Infinity }}>
                        {phaseCopy[phase]}
                      </motion.span>
                    </div>
                    <button
                      onClick={skipAnimation}
                      className="flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 rounded-full efi-glass hover:efi-glass-strong text-[var(--efi-ink-2)] hover:text-[var(--efi-ink-0)] transition-colors"
                    >
                      <SkipForward size={11} /> Skip animation
                    </button>
                  </div>
                  <div className="flex items-center justify-between max-w-md">
                    {phaseSteps.map((step, i) => {
                      const StepIcon = step.icon;
                      const currentIdx = phaseOrder.indexOf(phase);
                      const stepIdx = phaseOrder.indexOf(step.id);
                      const isDone = stepIdx < currentIdx;
                      const isActive = stepIdx === currentIdx;
                      return (
                        <div key={step.id} className="flex items-center">
                          <div className="flex flex-col items-center gap-1.5">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                                isDone ? 'bg-emerald-400/15 text-[var(--efi-accent-emerald)]' : isActive ? 'bg-cyan-400/15 text-[var(--efi-accent-cyan)]' : 'bg-white/5 text-[var(--efi-ink-2)]'
                              }`}
                            >
                              {isDone ? <CircleCheck size={15} /> : <StepIcon size={14} className={isActive ? 'animate-pulse' : ''} />}
                            </div>
                            <span className="text-[9px] text-[var(--efi-ink-2)] font-mono text-center w-16 leading-tight">{step.label}</span>
                          </div>
                          {i < phaseSteps.length - 1 && (
                            <div className={`w-8 h-[1.5px] mx-1 mb-4 transition-colors duration-500 ${isDone ? 'bg-emerald-400/40' : 'bg-white/10'}`} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </GlassCard>
              )}

              {unmatched && phase === 'recommendation' && (
                <GlassCard strong className="p-6">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-[var(--efi-accent-amber)] font-medium mb-3">
                    <Compass size={14} /> Area not recognised
                  </div>
                  <p className="text-[14.5px] text-[var(--efi-ink-0)] leading-relaxed">{fallbackResponse}</p>
                </GlassCard>
              )}

              {!unmatched && response && (phase === 'reasoning' || phase === 'recommendation') && (
                <GlassCard strong className="p-6">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-[var(--efi-accent-cyan)] font-medium mb-3">
                    <Compass size={14} /> Situation
                  </div>
                  <p className="text-[12px] text-[var(--efi-ink-2)] italic mb-2">{pickLeadIn('situation', submittedQuery)}</p>
                  <p className="text-[15px] text-[var(--efi-ink-0)] leading-relaxed">
                    {phase === 'recommendation' ? response.situation : situation}
                    {phase === 'reasoning' && situation.length < response.situation.length && <span className="inline-block w-[2px] h-4 bg-cyan-500 ml-0.5 align-middle animate-pulse" />}
                  </p>
                </GlassCard>
              )}

              {!unmatched && response && showResults && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <GlassCard className="p-6" delay={0.05}>
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-[var(--efi-accent-blue)] font-medium mb-3">
                        <ListChecks size={14} /> Evidence Reviewed
                      </div>
                      <p className="text-[12px] text-[var(--efi-ink-2)] italic mb-2.5">{pickLeadIn('evidence', submittedQuery)}</p>
                      <ul className="space-y-2.5">
                        {response.evidence.map((e, i) => (
                          <motion.li key={e} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.1 }} className="flex items-start gap-2.5 text-[13px] text-[var(--efi-ink-1)]">
                            <CircleCheck size={14} className="text-[var(--efi-accent-blue)] mt-0.5 shrink-0" />
                            {e}
                          </motion.li>
                        ))}
                      </ul>
                    </GlassCard>

                    <GlassCard className="p-6" delay={0.08}>
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-[var(--efi-accent-violet)] font-medium mb-3">
                        <Brain size={14} /> Reasoning Summary
                      </div>
                      <p className="text-[13.5px] text-[var(--efi-ink-0)] leading-relaxed">{response.reasoningSummary}</p>
                    </GlassCard>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <GlassCard className="p-6" delay={0.15}>
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-[var(--efi-accent-emerald)] font-medium mb-3">
                        <Lightbulb size={14} /> Recommendation
                      </div>
                      <p className="text-[12px] text-[var(--efi-ink-2)] italic mb-2">{pickLeadIn('recommendation', submittedQuery)}</p>
                      <p className="text-[14px] text-[var(--efi-ink-0)] leading-relaxed">{response.recommendation}</p>
                    </GlassCard>

                    <GlassCard className="p-6" delay={0.2}>
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-[var(--efi-accent-amber)] font-medium mb-3">
                        <Gavel size={14} /> Decision Required
                      </div>
                      <p className="text-[12px] text-[var(--efi-ink-2)] italic mb-2">{pickLeadIn('decision', submittedQuery)}</p>
                      <p className="text-[14px] text-[var(--efi-ink-0)] leading-relaxed">{response.decisionRequired}</p>
                    </GlassCard>
                  </div>

                  <GlassCard className="p-6" delay={0.25}>
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-[var(--efi-ink-2)] font-medium mb-3">
                      <Gauge size={13} /> Suggested Next Actions
                    </div>
                    <div className="space-y-2">
                      {response.actions.map((a, i) => (
                        <motion.div key={a} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.1 }} className="flex items-center justify-between px-4 py-2.5 rounded-xl efi-glass text-[13px] gap-3">
                          <span className="text-[var(--efi-ink-0)]">{a}</span>
                          <button className="text-[var(--efi-accent-cyan)] text-[11px] px-2.5 py-1 rounded-full efi-glass-strong shrink-0">Assign</button>
                        </motion.div>
                      ))}
                    </div>
                  </GlassCard>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <GlassCard className="p-6" delay={0.28}>
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-[var(--efi-ink-2)] font-medium mb-3">
                        <FileQuestion size={14} /> Data Required for Validation
                      </div>
                      <ul className="space-y-2">
                        {response.dataRequired.map((d) => (
                          <li key={d} className="text-[13px] text-[var(--efi-ink-1)] flex items-start gap-2.5">
                            <span className="w-1 h-1 rounded-full bg-[var(--efi-ink-2)] mt-1.5 shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </GlassCard>

                    <GlassCard className="p-6" delay={0.3}>
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-[var(--efi-accent-cyan)] font-medium mb-3">
                        <TrendingUp size={14} /> Business Impact
                      </div>
                      <p className="text-[13.5px] text-[var(--efi-ink-0)] leading-relaxed">{response.businessImpact}</p>
                    </GlassCard>
                  </div>

                  <GlassCard className="p-6" delay={0.32}>
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-[var(--efi-ink-2)] font-medium mb-3">
                      <BarChart3 size={14} /> Finance Insight
                    </div>
                    <InsightVisuals data={response.chartData} accent="#38BDF8" />
                  </GlassCard>

                  <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl efi-glass text-[12px] text-[var(--efi-ink-1)]">
                    <ShieldCheck size={14} className="text-[var(--efi-accent-amber)] shrink-0" />
                    Human validation required before any action is taken on this recommendation.
                  </div>
                </>
              )}
            </div>

            {/* Right panel: Specialists, Confidence gauge, Voice controls */}
            {!unmatched && response && (
              <div className="space-y-4 lg:sticky lg:top-24">
                <GlassCard strong delay={0.1} className="p-5">
                  <div className="text-[11px] uppercase tracking-wide text-[var(--efi-ink-2)] font-medium mb-4">Specialists Activated</div>
                  <div className="space-y-3">
                    {response.specialists.map((s, i) => {
                      const state = specialistStates[i] ?? 'pending';
                      return (
                        <div key={s.name} className="flex items-start gap-3">
                          <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${state === 'complete' ? 'bg-emerald-500' : state === 'analysing' ? 'bg-cyan-400 animate-pulse' : 'bg-white/20'}`} />
                          <div className="min-w-0">
                            <div className="text-[12.5px] text-[var(--efi-ink-0)] font-medium leading-tight">{s.name}</div>
                            <div className="text-[11px] text-[var(--efi-ink-2)] mt-0.5 leading-tight">{s.task}</div>
                            <div className={`text-[10px] font-mono mt-1 ${state === 'complete' ? 'text-[var(--efi-accent-emerald)]' : state === 'analysing' ? 'text-[var(--efi-accent-cyan)]' : 'text-[var(--efi-ink-2)]'}`}>
                              {state === 'complete' ? 'Complete' : state === 'analysing' ? 'Analysing' : 'Pending'}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </GlassCard>

                {showResults && (
                  <GlassCard strong delay={0.15} className="p-5 flex flex-col items-center">
                    <ConfidenceGauge score={response.confidenceScore} />
                    <div className="text-[11px] text-[var(--efi-ink-2)] text-center mt-2 leading-relaxed">{response.confidence}</div>
                  </GlassCard>
                )}

                <GlassCard strong delay={0.2} className="p-5">
                  <label className="flex items-center justify-between gap-2.5 text-[12.5px] text-[var(--efi-ink-0)] cursor-pointer select-none mb-3">
                    <span className="flex items-center gap-2">
                      <Volume2 size={14} className="text-[var(--efi-ink-2)]" /> Voice Response
                    </span>
                    <span
                      onClick={toggleVoiceResponse}
                      className={`w-9 h-5 rounded-full relative transition-colors ${voiceResponseOn ? 'bg-cyan-500' : 'bg-white/10'}`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${voiceResponseOn ? 'translate-x-[18px]' : 'left-0.5'}`} />
                    </span>
                  </label>
                  {voiceResponse.supported ? (
                    <div className="flex items-center gap-2 justify-center">
                      {voiceResponse.speaking && !voiceResponse.paused && (
                        <button onClick={voiceResponse.pause} className="w-8 h-8 rounded-full efi-glass flex items-center justify-center text-[var(--efi-ink-0)] hover:efi-glass-strong"><Pause size={13} /></button>
                      )}
                      {voiceResponse.paused && (
                        <button onClick={voiceResponse.resume} className="w-8 h-8 rounded-full efi-glass flex items-center justify-center text-[var(--efi-ink-0)] hover:efi-glass-strong"><Play size={13} /></button>
                      )}
                      {voiceResponse.speaking && (
                        <button onClick={voiceResponse.stop} className="w-8 h-8 rounded-full efi-glass flex items-center justify-center text-[var(--efi-ink-0)] hover:efi-glass-strong"><Square size={12} /></button>
                      )}
                      <button onClick={voiceResponse.repeat} className="w-8 h-8 rounded-full efi-glass flex items-center justify-center text-[var(--efi-ink-0)] hover:efi-glass-strong"><RotateCcw size={13} /></button>
                    </div>
                  ) : (
                    <span className="text-[11px] text-[var(--efi-ink-2)]">Voice response is not supported in this browser.</span>
                  )}
                </GlassCard>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky bottom audio / voice status bar */}
      <AnimatePresence>
        {(voiceInput.listening || voiceResponse.speaking || voiceResponse.paused) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-[560px]"
          >
            <div className="efi-glass-strong rounded-2xl px-5 py-3.5 flex items-center gap-4 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.35)]">
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${voiceInput.listening ? 'bg-rose-500 efi-listen-pulse' : voiceResponse.speaking ? 'bg-cyan-500 animate-pulse' : 'bg-amber-500'}`} />
              <div className="flex-1 min-w-0">
                <div className="text-[12.5px] text-[var(--efi-ink-0)] font-medium truncate">
                  {voiceInput.listening ? 'Listening…' : voiceResponse.speaking ? 'Speaking executive summary…' : 'Voice output paused'}
                </div>
                <div className="flex items-end gap-[2px] h-4 mt-1">
                  {waveBars.slice(0, 20).map((i) => (
                    <motion.span
                      key={i}
                      className={`w-[2.5px] rounded-full ${voiceInput.listening ? 'bg-rose-400' : 'bg-cyan-400'}`}
                      animate={(voiceInput.listening || voiceResponse.speaking) ? { height: [3, 12, 5, 15, 3] } : { height: 3 }}
                      transition={{ duration: 0.8 + (i % 4) * 0.07, repeat: Infinity, ease: 'easeInOut', delay: i * 0.02 }}
                    />
                  ))}
                </div>
              </div>
              {voiceResponse.supported && (voiceResponse.speaking || voiceResponse.paused) && (
                <div className="flex items-center gap-1.5 shrink-0">
                  {voiceResponse.speaking && !voiceResponse.paused && (
                    <button onClick={voiceResponse.pause} className="w-8 h-8 rounded-full efi-glass flex items-center justify-center text-[var(--efi-ink-0)]"><Pause size={13} /></button>
                  )}
                  {voiceResponse.paused && (
                    <button onClick={voiceResponse.resume} className="w-8 h-8 rounded-full efi-glass flex items-center justify-center text-[var(--efi-ink-0)]"><Play size={13} /></button>
                  )}
                  <button onClick={voiceResponse.stop} className="w-8 h-8 rounded-full efi-glass flex items-center justify-center text-[var(--efi-ink-0)]"><Square size={12} /></button>
                  <button onClick={voiceResponse.repeat} className="w-8 h-8 rounded-full efi-glass flex items-center justify-center text-[var(--efi-ink-0)]"><RotateCcw size={13} /></button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
