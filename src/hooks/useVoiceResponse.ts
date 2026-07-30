import { useCallback, useRef, useState } from 'react';

export function useVoiceResponse() {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const lastTextRef = useRef<string>('');

  const speak = useCallback((text: string) => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    lastTextRef.current = text;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.98;
    utterance.pitch = 0.96;
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find((v) => /en-(GB|ZA|US)/i.test(v.lang) && /female|en-GB|en-ZA/i.test(v.name)) || voices.find((v) => /en/i.test(v.lang));
    if (preferred) utterance.voice = preferred;
    utterance.onstart = () => { setSpeaking(true); setPaused(false); };
    utterance.onend = () => { setSpeaking(false); setPaused(false); };
    utterance.onerror = () => { setSpeaking(false); setPaused(false); };
    window.speechSynthesis.speak(utterance);
  }, [supported]);

  const pause = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.pause();
    setPaused(true);
  }, [supported]);

  const resume = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.resume();
    setPaused(false);
  }, [supported]);

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setPaused(false);
  }, [supported]);

  const repeat = useCallback(() => {
    if (lastTextRef.current) speak(lastTextRef.current);
  }, [speak]);

  return { supported, speaking, paused, speak, pause, resume, stop, repeat };
}
