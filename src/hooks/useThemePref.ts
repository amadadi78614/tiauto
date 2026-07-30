import { useEffect, useState } from 'react';
import { getTheme, setTheme, onThemeChange, initTheme, type Theme } from '../utils/themePref';

let initialised = false;

export function useThemePref() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (!initialised) { initTheme(); initialised = true; }
    return getTheme();
  });

  useEffect(() => {
    const unsubscribe = onThemeChange(setThemeState);
    return unsubscribe;
  }, []);

  return {
    theme,
    isLight: theme === 'light',
    toggle: () => setTheme(getTheme() === 'light' ? 'dark' : 'light'),
  };
}
