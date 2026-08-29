'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { themes, THEME_STORAGE_KEY } from '@/config/themes';
import { cn } from '@/lib/utils';

interface ThemeDrawerProps {
  open: boolean;
  onClose: () => void;
}

/** Side drawer for switching visual themes */
export function ThemeDrawer({ open, onClose }: ThemeDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [activeTheme, setActiveTheme] = useState(() =>
    typeof document === 'undefined'
      ? 'default'
      : document.documentElement.getAttribute('data-theme') || 'default'
  );

  useEffect(() => {
    if (!open) return;
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !drawerRef.current) return;

      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input, select, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const selectTheme = (themeId: string) => {
    const apply = () => {
      if (themeId === 'default') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', themeId);
      }
      localStorage.setItem(THEME_STORAGE_KEY, themeId);
      setActiveTheme(themeId);
    };

    if (document.startViewTransition) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="theme-drawer-panel fixed top-0 right-0 z-[61] h-dvh w-96 max-w-full border-l border-[var(--border)] shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Theme settings"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b-2 border-[var(--border)]">
              <h2 className="text-lg font-semibold">Themes</h2>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[var(--accent)] transition-colors"
                aria-label="Close theme settings"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Theme list */}
            <div className="theme-drawer-list px-5 py-4 flex flex-col gap-3 overflow-y-auto max-h-[calc(100dvh-73px)]">
              {themes.map((theme) => {
                const isActive = activeTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => selectTheme(theme.id)}
                    className={cn(
                      'theme-option flex w-full items-center gap-4 p-4 rounded-xl text-left transition-all duration-200',
                      isActive
                        ? 'bg-[var(--accent)] border-2 border-[var(--primary)]'
                        : 'border-2 border-transparent hover:bg-[var(--muted)]'
                    )}
                    aria-label={`Apply ${theme.name} theme`}
                    aria-pressed={isActive}
                  >
                    {/* Color preview swatch */}
                    <div
                      className="theme-option-swatch h-10 w-10 rounded-lg shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${theme.previewColors[0]}, ${theme.previewColors[1]})`,
                      }}
                    />

                    {/* Text */}
                    <div className="min-w-0">
                      <p className="font-medium text-sm">{theme.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {theme.description}
                      </p>
                    </div>
                    <span className="theme-option-check ml-auto" aria-hidden="true">
                      {isActive ? '\u2713' : ''}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
