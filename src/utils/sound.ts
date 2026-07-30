// Premium, subtle UI sound effects generated entirely via the Web Audio API.
// No external audio files. All sounds are short, soft sine/triangle tones —
// designed to feel executive and understated, never game-like.

let audioCtx: AudioContext | null = null;
let enabled = false;

const listeners = new Set<(enabled: boolean) => void>();

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  if (!audioCtx) audioCtx = new AC();
  if (audioCtx.state === 'suspended') void audioCtx.resume();
  return audioCtx;
}

export function isSoundEnabled() {
  return enabled;
}

export function setSoundEnabled(value: boolean) {
  enabled = value;
  if (typeof window !== 'undefined') {
    try { window.localStorage.setItem('efi-sound-enabled', value ? '1' : '0'); } catch { /* ignore */ }
  }
  listeners.forEach((l) => l(enabled));
}

export function initSoundPreference() {
  if (typeof window === 'undefined') return;
  try {
    enabled = window.localStorage.getItem('efi-sound-enabled') === '1';
  } catch {
    enabled = false;
  }
}

export function onSoundPreferenceChange(cb: (enabled: boolean) => void) {
  listeners.add(cb);
  return () => { listeners.delete(cb); };
}

interface ToneOptions {
  freq: number;
  duration: number;
  type?: OscillatorType;
  gain?: number;
  delay?: number;
  glideTo?: number;
}

function tone({ freq, duration, type = 'sine', gain = 0.05, delay = 0, glideTo }: ToneOptions) {
  if (!enabled) return;
  const ctx = getCtx();
  if (!ctx) return;
  const start = ctx.currentTime + delay;

  const osc = ctx.createOscillator();
  const amp = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  if (glideTo) osc.frequency.linearRampToValueAtTime(glideTo, start + duration);

  amp.gain.setValueAtTime(0, start);
  amp.gain.linearRampToValueAtTime(gain, start + Math.min(0.02, duration * 0.3));
  amp.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  osc.connect(amp);
  amp.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

export function playHover() {
  tone({ freq: 1200, duration: 0.06, type: 'sine', gain: 0.02 });
}

export function playClick() {
  tone({ freq: 620, duration: 0.05, type: 'triangle', gain: 0.045 });
}

export function playTransition() {
  tone({ freq: 320, duration: 0.35, type: 'sine', gain: 0.035, glideTo: 640 });
}

export function playProcessing() {
  tone({ freq: 220, duration: 0.5, type: 'sine', gain: 0.02 });
  tone({ freq: 260, duration: 0.5, type: 'sine', gain: 0.015, delay: 0.25 });
}

export function playSuccess() {
  tone({ freq: 520, duration: 0.14, type: 'sine', gain: 0.04 });
  tone({ freq: 780, duration: 0.22, type: 'sine', gain: 0.035, delay: 0.12 });
}

export function playWarning() {
  tone({ freq: 340, duration: 0.16, type: 'triangle', gain: 0.04 });
  tone({ freq: 300, duration: 0.2, type: 'triangle', gain: 0.035, delay: 0.18 });
}

export function playRecommendationReady() {
  tone({ freq: 440, duration: 0.16, type: 'sine', gain: 0.035 });
  tone({ freq: 550, duration: 0.16, type: 'sine', gain: 0.035, delay: 0.14 });
  tone({ freq: 660, duration: 0.28, type: 'sine', gain: 0.04, delay: 0.28 });
}
