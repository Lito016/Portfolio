'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { cn } from '@/lib/utils';
import { mainNavItems } from '@/config/navigation';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { siteConfig } from '@/config/site';

/** Main site header */
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
          ? 'border-b border-[var(--border)] bg-[var(--background)]/95'
          : 'bg-transparent'
      )}
      style={{ backdropFilter: scrolled ? 'blur(20px)' : 'none' }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold text-sm group">
          <SiGithub className="h-5 w-5 text-[var(--foreground)] group-hover:text-muted-foreground transition-colors" />
          <span className="font-mono tracking-tight">{siteConfig.displayName}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative px-3.5 py-2 text-[13px] font-medium transition-colors duration-200',
                pathname === item.href
                  ? 'text-[var(--foreground)]'
                  : 'text-muted-foreground hover:text-[var(--foreground)]'
              )}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.title}
              {pathname === item.href && (
                <span className="absolute bottom-0 left-3.5 right-3.5 h-[1.5px] rounded-full bg-[var(--foreground)]" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            className="md:hidden cursor-pointer p-2 rounded-md hover:bg-[var(--muted)] transition-colors"
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
            <div className="container mx-auto px-4 py-3 flex flex-col gap-0.5">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'px-4 py-2.5 text-sm font-medium rounded-md transition-colors',
                    pathname === item.href
                      ? 'bg-[var(--muted)] text-[var(--foreground)]'
                      : 'text-muted-foreground hover:text-[var(--foreground)] hover:bg-[var(--muted)]'
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

    </header>
  );
}
