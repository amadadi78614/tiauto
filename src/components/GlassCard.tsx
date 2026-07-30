import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import clsx from 'clsx';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  strong?: boolean;
  delay?: number;
  hover?: boolean;
  onClick?: () => void;
  id?: string;
}

export default function GlassCard({ children, className, strong, delay = 0, hover = true, onClick, id }: GlassCardProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hover ? { y: -4, scale: 1.01, borderColor: 'rgba(150,190,255,0.4)' } : undefined}
      whileTap={onClick ? { scale: 0.985 } : undefined}
      onClick={onClick}
      className={clsx(
        strong ? 'efi-glass-strong' : 'efi-glass',
        'rounded-2xl transition-colors duration-300',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
