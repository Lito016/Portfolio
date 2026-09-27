'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { navAnchorItems } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { AnchorLink } from '@/components/shared/anchor-link';
import { ScrollCrossLeaf } from '@/components/shared/scroll-cross-leaf';
import {
  EASE_EXPO_OUT,
  HERO_NAV_DELAY_MS,
  HERO_NAV_DURATION_MS,
} from '@/config/hero-timeline';

/** Fixed minimal navigation: name left, anchor links right (FR-02). */
export function Header() {
  const [compact, setCompact] = useState(false);

  return (
    <header
      className={
        compact
          ? 'fixed inset-x-0 top-0 z-50 border-b border-[var(--rule)] bg-[rgba(248,249,252,0.88)] backdrop-blur-md transition-colors'
          : 'fixed inset-x-0 top-0 z-50 border-b border-transparent bg-transparent transition-colors'
      }
    >
      <ScrollCrossLeaf startPx={80} onCross={setCompact} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: HERO_NAV_DELAY_MS / 1000, duration: HERO_NAV_DURATION_MS / 1000, ease: EASE_EXPO_OUT }}
        className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-[var(--gutter)]"
        style={{ height: 'var(--nav-h)' }}
      >
        <Link
          href="/"
          className="font-mono text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--ink)]"
        >
          {siteConfig.displayName}
        </Link>
        <nav className="flex items-center gap-2 sm:gap-6" aria-label="Main navigation">
          {navAnchorItems.map((item) => (
            <AnchorLink
              key={item.href}
              href={item.href}
              className="nav-link inline-flex items-center px-2 text-sm sm:px-0"
            >
              {item.title}
            </AnchorLink>
          ))}
        </nav>
      </motion.div>
    </header>
  );
}
