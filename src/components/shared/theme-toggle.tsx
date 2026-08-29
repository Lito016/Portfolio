'use client';

import { useTheme } from '@/components/theme-provider';
import { useSyncExternalStore, useCallback } from 'react';
import { Moon, Sun } from 'lucide-react';

const emptySubscribe = () => () => {};

/** Dark/light mode toggle button */
export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const toggleTheme = useCallback(() => {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    const apply = () => {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(nextTheme);
      document.documentElement.style.colorScheme = nextTheme;
      setTheme(nextTheme);
    };

    if (document.startViewTransition) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  }, [currentTheme, setTheme]);

  if (!mounted) {
    return <div className="h-9 w-9" aria-hidden="true" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent transition-colors"
      aria-label={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {currentTheme === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}
