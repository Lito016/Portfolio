'use client';

import { useEffect, useState } from 'react';
import { useMotionValue, useScroll, useTransform } from 'framer-motion';
import type { RefObject } from 'react';

/**
 * Scroll-progress hook: returns a 0→1 value representing how far `ref` has
 * travelled through the viewport. 0 = element just entering bottom, 1 = element
 * just exiting top. Respects prefers-reduced-motion (returns 1 = fully visible).
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  return scrollYProgress;
}

/**
 * Maps scroll progress within an element to an arbitrary output range.
 * Clamps to [0, 1] within the element's viewport traversal.
 */
export function useScrollMap(
  ref: RefObject<HTMLElement | null>,
  inputRange: number[],
  outputRange: number[],
) {
  const progress = useScrollProgress(ref);
  return useTransform(progress, inputRange, outputRange);
}

/**
 * Mount-detection hook: returns true once the component has mounted client-side.
 * Avoids SSR hydration mismatches for scroll-dependent UI.
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return mounted;
}

/**
 * Smooth spring-based scroll progress for parallax effects.
 * Returns a MotionValue that springs toward the raw scroll progress.
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  distance: number,
) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const smoothed = useMotionValue(0);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      smoothed.set(v * distance);
    });
    return unsub;
  }, [scrollYProgress, smoothed, distance]);

  return useTransform(smoothed, (v) => v);
}
