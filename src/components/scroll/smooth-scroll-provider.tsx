'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

type ScrollTo = (
  target: string | HTMLElement,
  opts?: { offset?: number; duration?: number }
) => void;

const ScrollToContext = createContext<ScrollTo | null>(null);

/** Single scroll owner (ADR-3.1): Lenis drives the page, ScrollTrigger follows. */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let cancelled = false;
    let teardown: (() => void) | null = null;

    // Reduced motion: Lenis is never constructed; native anchors and scroll remain (FR-18).
    const mount = () => {
      if (teardown || reduced.matches) return;
      gsap.registerPlugin(ScrollTrigger);

      // Anchors are intercepted in-app (header/CTAs call scrollTo below); Lenis's
      // built-in anchors mode double-scrolls against the native hash jump.
      const lenis = new Lenis();
      lenisRef.current = lenis;
      lenis.on('scroll', ScrollTrigger.update);

      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      const refresh = () => {
        if (!cancelled) ScrollTrigger.refresh();
      };
      void document.fonts.ready.then(refresh);
      window.addEventListener('load', refresh);

      teardown = () => {
        window.removeEventListener('load', refresh);
        gsap.ticker.remove(raf);
        lenis.destroy();
        lenisRef.current = null;
        teardown = null;
      };
    };

    const onChange = () => {
      if (reduced.matches) teardown?.();
      else mount();
    };

    mount();
    reduced.addEventListener('change', onChange);
    return () => {
      cancelled = true;
      reduced.removeEventListener('change', onChange);
      teardown?.();
    };
  }, []);

  const scrollTo = useCallback<ScrollTo>((target, opts) => {
    const lenis = lenisRef.current;
    if (lenis) {
      // Lenis subtracts the target's CSS scroll-margin-top itself; the provider
      // must not add an offset too (double subtraction, M8 fix). CSS owns the margin.
      lenis.scrollTo(target, opts);
      return;
    }
    // No-Lenis fallback (reduced motion): instant native jump. scrollIntoView
    // applies the same scroll-margin-top CSS, keeping both paths on one owner.
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el instanceof HTMLElement) el.scrollIntoView({ behavior: 'auto', block: 'start' });
  }, []);

  return (
    <ScrollToContext.Provider value={scrollTo}>{children}</ScrollToContext.Provider>
  );
}

/** Programmatic scroll helper; falls back to native scrolling when Lenis is off. */
export function useSmoothScroll(): ScrollTo {
  return useContext(ScrollToContext) ?? ((target) => {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el instanceof HTMLElement) el.scrollIntoView();
  });
}
