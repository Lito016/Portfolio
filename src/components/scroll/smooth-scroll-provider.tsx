'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

/** Fixed-nav clearance for programmatic scrolls (FR-02 bar height + breathing room). */
export const NAV_OFFSET = 80;

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
    // Reduced motion: Lenis is never constructed; native anchors and scroll remain (FR-18).
    if (reduced.matches) return;

    gsap.registerPlugin(ScrollTrigger);

    // Anchors are intercepted in-app (header/CTAs call scrollTo below); Lenis's
    // built-in anchors mode double-scrolls against the native hash jump.
    const lenis = new Lenis();
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    void document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh);

    return () => {
      window.removeEventListener('load', refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo: ScrollTo = (target, opts) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset: -NAV_OFFSET, ...opts });
      return;
    }
    // No-JS-parity fallback path (reduced motion): instant native jump.
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el instanceof HTMLElement) {
      const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top, behavior: 'auto' });
    }
  };

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
