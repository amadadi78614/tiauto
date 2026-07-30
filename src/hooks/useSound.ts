import { useEffect, useState } from 'react';
import { isSoundEnabled, setSoundEnabled, onSoundPreferenceChange, initSoundPreference } from '../utils/sound';

let initialised = false;

export function useSound() {
  const [enabled, setEnabled] = useState(() => {
    if (!initialised) { initSoundPreference(); initialised = true; }
    return isSoundEnabled();
  });

  useEffect(() => {
    const unsubscribe = onSoundPreferenceChange(setEnabled);
    return unsubscribe;
  }, []);

  return {
    enabled,
    toggle: () => setSoundEnabled(!isSoundEnabled()),
  };
}
