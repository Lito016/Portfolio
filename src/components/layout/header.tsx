'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Settings } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { cn } from '@/lib/utils';
import { mainNavItems } from '@/config/navigation';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { ThemeDrawer } from '@/components/shared/theme-drawer';
import { siteConfig } from '@/config/site';

/** Main site header */
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [themeDrawerOpen, setThemeDrawerOpen] = useState(false);
  const pathname = usePathname();
  const mobileNavRef = useRef<HTMLElement>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);

  const closeThemeDrawer = () => {
    setThemeDrawerOpen(false);
    window.requestAnimationFrame(() => settingsButtonRef.current?.focus());
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus trap for mobile navigation
  useEffect(() => {
    if (!mobileOpen || !mobileNavRef.current) return;

    const nav = mobileNavRef.current;
    const focusableElements = nav.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    // Focus first element when menu opens
    firstFocusable?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    nav.addEventListener('keydown', handleKeyDown);
    return () => nav.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-[var(--border)] bg-[var(--background)]/95'
          : 'bg-transparent'
      )}
      style={{ backdropFilter: scrolled ? 'blur(20px)' : 'none' }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg group">
          <SiGithub className="h-6 w-6 text-[var(--foreground)] group-hover:text-muted-foreground transition-colors" />
          <span className="font-mono text-sm tracking-tight">{siteConfig.displayName}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'px-3 py-2 text-sm font-medium rounded-full transition-all duration-200',
                pathname === item.href
                  ? 'bg-[var(--accent)] text-[var(--accent-foreground)] shadow-sm'
                  : 'text-muted-foreground hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]'
              )}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            ref={settingsButtonRef}
            onClick={() => setThemeDrawerOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent transition-colors"
            aria-label="Theme settings"
          >
            <Settings className="h-4 w-4" />
          </button>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-[var(--accent)] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            ref={mobileNavRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-[var(--border)] overflow-hidden bg-[var(--background)]"
            aria-label="Mobile navigation"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'px-4 py-3 text-sm font-medium rounded-full transition-all duration-200',
                    pathname === item.href
                      ? 'bg-[var(--accent)] text-[var(--accent-foreground)]'
                      : 'text-muted-foreground hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]'
                  )}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <ThemeDrawer open={themeDrawerOpen} onClose={closeThemeDrawer} />
    </header>
  );
}
