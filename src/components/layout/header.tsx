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

/** Main site header with glassmorphic navigation */
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [themeDrawerOpen, setThemeDrawerOpen] = useState(false);
  const pathname = usePathname();
  const mobileNavRef = useRef<HTMLElement>(null);

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
          ? 'glass-card border-b border-white/10 shadow-lg shadow-black/5'
          : 'bg-transparent'
      )}
      style={{ backdropFilter: scrolled ? 'blur(20px)' : 'none' }}
    >
      {/* Gradient bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px">
        <div className="h-full bg-gradient-to-r from-transparent via-[var(--gradient-start)] to-transparent opacity-30" />
      </div>

      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg group">
          <SiGithub className="h-6 w-6 text-[var(--gradient-start)] group-hover:text-[var(--gradient-end)] transition-colors" />
          <span className="gradient-text">Hello World!</span>
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
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
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
            className="md:hidden border-t border-white/10 overflow-hidden glass-card"
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
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <ThemeDrawer open={themeDrawerOpen} onClose={() => setThemeDrawerOpen(false)} />
    </header>
  );
}
