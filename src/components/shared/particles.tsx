'use client';

import { useMemo } from 'react';
import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { Particles } from '@tsparticles/react';
import type { ISourceOptions } from '@tsparticles/engine';

const emptySubscribe = () => () => {};

/** Connected-dots particle background — adapts to dark/light mode */
export function ParticlesBackground() {
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const options = useMemo<ISourceOptions>(() => {
    const isDark = resolvedTheme === 'dark';
    return {
      fullScreen: { enable: false },
      fpsLimit: 60,
      particles: {
        color: { value: isDark ? '#60a5fa' : '#3b82f6' },
        links: {
          enable: true,
          color: isDark ? '#60a5fa' : '#3b82f6',
          distance: 150,
          opacity: isDark ? 0.15 : 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.8,
          direction: 'none',
          outModes: { default: 'bounce' },
        },
        number: {
          density: { enable: true, area: 900 },
          value: 60,
        },
        opacity: {
          value: { min: isDark ? 0.05 : 0.1, max: isDark ? 0.2 : 0.3 },
          animation: { enable: true, speed: 0.5, sync: false },
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'grab' },
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
