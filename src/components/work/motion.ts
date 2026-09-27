'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Capability + ScrollTrigger layer contract (ADR-3.5 / R-2 / FR-18):
 * useFineCapability gates scrub/pin layers to expanded-band fine pointers;
 * useScrollTriggerLayer guarantees the gsap.context reverts on capability
 * loss and unmount, so pin spacers can never leak into the static layout.
 */
export function useFineCapability(): boolean {
  const reduced = useReducedMotion();
  const [fine, setFine] = useState(false);
  useLayoutEffect(() => {
    const mq = window.matchMedia(
      '(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    );
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return reduced === false && fine;
}

/**
 * Motion builders receive the mounted root element; they never touch refs.
 * `build` must be referentially stable across re-renders (inline arrow over
 * static props): a changed build rebuilds the whole GSAP layer.
 */
type BuildFn = (root: HTMLElement) => void;

export function useScrollTriggerLayer(fine: boolean, build: BuildFn) {
  const rootRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = rootRef.current;
    if (!el || !fine) return;
    const ctx = gsap.context(() => {
      build(el);
    }, el);
    return () => {
      ctx.revert();
    };
  }, [fine, build]);

  return rootRef;
}
