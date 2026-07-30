import { useEffect, useState } from 'react';

export function useCountUp(target: number, active = true, duration = 1000, delay = 0) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => {
      const start = performance.now();
      const from = 0;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(from + (target - from) * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [target, active, duration, delay]);

  return value;
}
