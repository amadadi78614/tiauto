// Day/night theme preference. Applies a `data-theme` attribute to <html>,
// which the CSS variable overrides in index.css key off. Defaults to dark
// (Executive Midnight) to match the cinematic Landing/Story intro.

export type Theme = 'dark' | 'light';

let theme: Theme = 'dark';
const listeners = new Set<(theme: Theme) => void>();

function apply(t: Theme) {
  if (typeof document === 'undefined') return;
  if (t === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

export function getTheme() {
  return theme;
}

export function setTheme(t: Theme) {
  theme = t;
  apply(t);
  if (typeof window !== 'undefined') {
    try { window.localStorage.setItem('efi-theme', t); } catch { /* ignore */ }
  }
  listeners.forEach((l) => l(theme));
}

export function initTheme() {
  if (typeof window === 'undefined') return;
  try {
    const stored = window.localStorage.getItem('efi-theme');
    theme = stored === 'light' ? 'light' : 'dark';
  } catch {
    theme = 'dark';
  }
  apply(theme);
}

export function onThemeChange(cb: (theme: Theme) => void) {
  listeners.add(cb);
  return () => { listeners.delete(cb); };
}
