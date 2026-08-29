'use client';

import { CustomThemeProvider } from '@/components/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useState, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { THEME_STORAGE_KEY } from '@/config/themes';

/** Application providers wrapper */
export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 60, // 1 hour
            refetchOnWindowFocus: false,
            retry: 2,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ParticlesProvider init={loadSlim}>
        <CustomThemeProvider>
          <MotionConfig
            reducedMotion="user"
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
            <ThemePersistence />
          </MotionConfig>
        </CustomThemeProvider>
      </ParticlesProvider>
    </QueryClientProvider>
  );
}

/** Syncs data-theme attribute with localStorage */
function ThemePersistence() {
  useEffect(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    const availableThemes = new Set(['neomorphism', 'brutalism', 'minimalism', 'claymorphism']);
    if (saved && availableThemes.has(saved)) {
      document.documentElement.setAttribute('data-theme', saved);
    } else if (saved && saved !== 'default') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem(THEME_STORAGE_KEY, 'default');
    }
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const current =
        document.documentElement.getAttribute('data-theme') || 'default';
      localStorage.setItem(THEME_STORAGE_KEY, current);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
