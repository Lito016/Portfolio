'use client';

import { useMemo } from 'react';
import { useSyncExternalStore } from 'react';
import { useTheme } from '@/components/theme-provider';
import { Particles } from '@tsparticles/react';
import type { ISourceOptions } from '@tsparticles/engine';

const emptySubscribe = () => () => {};

/** Read a CSS custom property from :root */
function getCSSColor(prop: string): string {
  if (typeof window === 'undefined') return '#3b82f6';
  return getComputedStyle(document.documentElement).getPropertyValue(prop).trim() || '#3b82f6';
}

/** Connected-dots particle background — adapts to theme and dark/light mode */
export function ParticlesBackground() {
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const options = useMemo<ISourceOptions>(() => {
    const isDark = resolvedTheme === 'dark';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compactPointer = window.matchMedia('(max-width: 767px), (pointer: coarse)').matches;
    const primaryColor = getCSSColor('--gradient-start');
    return {
      fullScreen: { enable: false },
      fpsLimit: compactPointer ? 30 : 45,
      particles: {
        color: { value: primaryColor },
        links: {
          enable: true,
          color: primaryColor,
          distance: 150,
          opacity: isDark ? 0.15 : 0.2,
          width: 1,
        },
        move: {
          enable: !reduceMotion,
          speed: 0.55,
          direction: 'none',
          outModes: { default: 'bounce' },
        },
        number: {
          density: { enable: true, area: 900 },
          value: compactPointer ? 18 : 36,
        },
        opacity: {
          value: { min: isDark ? 0.05 : 0.1, max: isDark ? 0.2 : 0.3 },
          animation: { enable: !reduceMotion, speed: 0.35, sync: false },
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: !compactPointer && !reduceMotion, mode: 'grab' },
        },
        modes: {
          grab: { distance: 140, links: { opacity: 0.4 } },
        },
      },
      detectRetina: true,
    };
  }, [resolvedTheme]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Particles id="tsparticles" options={options} className="h-full w-full" />
    </div>
  );
}
