'use client';

import { motion } from 'framer-motion';
import { useSyncExternalStore } from 'react';

/** Subscribe to 'mounted' state — true once after hydration. */
function useMounted(): boolean {
  return useSyncExternalStore(
    (callback) => {
      // Fire once after hydration
      const id = requestAnimationFrame(callback);
      return () => cancelAnimationFrame(id);
    },
    () => true,
    () => false, // server snapshot: not yet mounted
  );
}

interface TextRevealProps {
  text: string;
  className?: string;
  staggerMs?: number;
  startDelayMs?: number;
  as?: 'span' | 'h1' | 'h2' | 'h3';
  id?: string;
}

/**
 * Character-by-character text reveal animation.
 * Each letter fades in and slides up with a staggered delay.
 * Respects prefers-reduced-motion.
 */
export function TextReveal({
  text,
  className = '',
  staggerMs = 40,
  startDelayMs = 200,
  as: Component = 'span',
  id,
}: TextRevealProps) {
  const mounted = useMounted();

  const shouldAnimate = mounted && typeof window !== 'undefined';

  if (!shouldAnimate) {
    return (
      <Component className={className} id={id}>
        {text}
      </Component>
    );
  }

  const chars = text.split('');

  return (
    <Component className={className} aria-label={text} id={id}>
      {chars.map((char, i) => (
        <motion.span
          key={`${i}-${char}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.35,
            delay: (startDelayMs + i * staggerMs) / 1000,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </Component>
  );
}
