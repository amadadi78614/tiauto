import { useEffect, useState } from 'react';
import {
  isVoiceResponseEnabled, setVoiceResponseEnabled,
  onVoiceResponsePreferenceChange, initVoiceResponsePreference,
} from '../utils/voicePref';

let initialised = false;

export function useVoiceResponsePref() {
  const [enabled, setEnabled] = useState(() => {
    if (!initialised) { initVoiceResponsePreference(); initialised = true; }
    return isVoiceResponseEnabled();
  });

  useEffect(() => {
    const unsubscribe = onVoiceResponsePreferenceChange(setEnabled);
    return unsubscribe;
  }, []);

  return {
    enabled,
    toggle: () => setVoiceResponseEnabled(!isVoiceResponseEnabled()),
    set: setVoiceResponseEnabled,
  };
}
