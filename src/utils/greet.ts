// One-time spoken welcome played on entering the app, triggered by the Enter
// button click (a user gesture, so it satisfies browser autoplay policy).
// Gracefully does nothing if SpeechSynthesis isn't supported.

const GREETINGS = [
  "Hi, I'm Mo — your finance intelligence guide. Let's take a look at what's happening across the business today.",
  "Welcome. I'm Mo. I'll walk you through what finance needs your attention on today.",
  "Good morning Charl. Let’s get you up to speed on the TiAuto finance position.",
];

export function speakWelcome() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const text = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.98;
    utterance.pitch = 0.97;
    const assignVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find((v) => /en-(GB|ZA|US)/i.test(v.lang)) || voices.find((v) => /en/i.test(v.lang));
      if (preferred) utterance.voice = preferred;
      window.speechSynthesis.speak(utterance);
    };
    if (window.speechSynthesis.getVoices().length > 0) {
      assignVoice();
    } else {
      window.speechSynthesis.onvoiceschanged = assignVoice;
    }
  } catch {
    /* ignore — voice greeting is a nice-to-have, never block navigation on it */
  }
}
