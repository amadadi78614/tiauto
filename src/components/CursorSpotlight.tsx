import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CursorSpotlightProps {
  size?: number;
  color?: string;
}

// Purely presentational — tracks the mouse via a window listener and positions
// itself relative to its own bounding rect. Always pointer-events-none so it
// never intercepts clicks on the real content sitting above it.
export default function CursorSpotlight({ size = 480, color = 'rgba(56,189,248,0.10)' }: CursorSpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { damping: 30, stiffness: 120 });
  const sy = useSpring(y, { damping: 30, stiffness: 120 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [x, y]);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          left: sx,
          top: sy,
          x: -size / 2,
          y: -size / 2,
          background: `radial-gradient(circle, ${color}, transparent 70%)`,
        }}
      />
    </div>
  );
}
