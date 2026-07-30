// Global "Voice Response" preference — mirrors utils/sound.ts's pattern.
// Off by default; persisted so the sidebar toggle and the Ask screen toggle stay in sync.

let enabled = false;
const listeners = new Set<(enabled: boolean) => void>();

export function isVoiceResponseEnabled() {
  return enabled;
}

export function setVoiceResponseEnabled(value: boolean) {
  enabled = value;
  if (typeof window !== 'undefined') {
    try { window.localStorage.setItem('efi-voice-response-enabled', value ? '1' : '0'); } catch { /* ignore */ }
  }
  listeners.forEach((l) => l(enabled));
}

export function initVoiceResponsePreference() {
  if (typeof window === 'undefined') return;
  try {
    enabled = window.localStorage.getItem('efi-voice-response-enabled') === '1';
  } catch {
    enabled = false;
  }
}

export function onVoiceResponsePreferenceChange(cb: (enabled: boolean) => void) {
  listeners.add(cb);
  return () => { listeners.delete(cb); };
}
