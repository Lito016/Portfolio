'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Viewport-entry reveal (FR-11: motion optional, content never motion-gated —
 * the full text ships in server HTML; this only fades it in once). Under
 * reduced motion the floor is opacity <=200ms only (canvas reveal law).
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: reduce ? 0.15 : 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
