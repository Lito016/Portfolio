'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Gradient mask reveal (Linear-style): content is revealed through a soft-edged
 * radial mask that expands as the element enters the viewport. The mask starts
 * fully transparent (hidden) and grows to full opacity with a feathered edge.
 *
 * Uses CSS mask-image with a radial gradient whose size is scroll-driven.
 * Falls back to a simple opacity fade under prefers-reduced-motion.
 */
export function MaskReveal({
  children,
  className,
  direction = 'up',
}: {
  children: React.ReactNode;
  className?: string;
  /** Direction of the reveal sweep */
  direction?: 'up' | 'down' | 'left' | 'right' | 'center';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.4'],
  });

  // Opacity: 0 → 1 over the reveal range
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // Y offset for the slide-in component
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : direction === 'up' ? [40, 0] : direction === 'down' ? [-40, 0] : [0, 0],
  );
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : direction === 'left' ? [40, 0] : direction === 'right' ? [-40, 0] : [0, 0],
  );
  // Clip-path wipe: inset shrinks from partially clipped to fully visible
  const clipInset = useTransform(scrollYProgress, [0, 1], ['8%', '0%']);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        opacity: reduce ? 1 : opacity,
        y,
        x,
        clipPath: reduce
          ? 'none'
          : direction === 'center'
            ? 'none'
            : `inset(${clipInset.get()}%)`,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scroll-linked heading reveal: the heading fades in and slides up as it
 * enters the viewport, with a subtle scale effect (0.96 → 1).
 */
export function ScrollHeading({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.92', 'start 0.5'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [24, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.97, 1]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        opacity: reduce ? 1 : opacity,
        y,
        scale,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </motion.div>
  );
}
