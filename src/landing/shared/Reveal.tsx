import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

/**
 * Envoltura de aparición al hacer scroll: fade + traslación leve.
 * Sutil y coherente con "lujo silencioso". Respeta prefers-reduced-motion
 * automáticamente vía Framer Motion.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'span';
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
