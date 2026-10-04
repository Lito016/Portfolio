'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { AnchorLink } from '@/components/shared/anchor-link';
import { siteConfig } from '@/config/site';
import { ScrollIndicator } from '@/components/hero/scroll-indicator';
import {
  EASE_EXPO_OUT,
  HERO_BG_DURATION_MS,
  HERO_LINES_DELAY_MS,
  HERO_LINE_DURATION_MS,
  HERO_LINE_STAGGER_MS,
  HERO_META_DELAY_MS,
} from '@/config/hero-timeline';

/** Staged hero load sequence (FR-03). Text renders in server HTML; these
 *  wrappers only animate whole lines (ADR-3.2). */
export function HeroMotion({
  lines,
  valueLine,
  location,
}: {
  lines: string[];
  valueLine: string;
  location: string;
}) {
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (startRef.current === null) {
      startRef.current = performance.now();
      document.documentElement.setAttribute('data-hero-seq-start', String(Math.round(startRef.current)));
    }
  }, []);

  return (
    <div className="relative z-10 flex flex-col">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: HERO_BG_DURATION_MS / 1000, ease: EASE_EXPO_OUT }}
        className="flex flex-col gap-6"
      >
        {/* Name + location label */}
        <motion.p
          className="label-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1, ease: EASE_EXPO_OUT }}
        >
          {siteConfig.displayName} &middot; {location}
        </motion.p>

        {/* Display heading — staged line reveals */}
        <h1 className="text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.9] tracking-[-0.035em] font-normal text-[var(--ink)]">
          {lines.map((line, i) => (
            <motion.span
              key={line}
              data-hero-line={i === lines.length - 1 ? '' : undefined}
              className="block"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: (HERO_LINES_DELAY_MS + i * HERO_LINE_STAGGER_MS) / 1000,
                duration: HERO_LINE_DURATION_MS / 1000,
                ease: EASE_EXPO_OUT,
              }}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        {/* Value line + CTAs */}
        <motion.div
          data-hero-meta
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: HERO_META_DELAY_MS / 1000, ease: EASE_EXPO_OUT }}
        >
          <p className="max-w-lg text-base leading-relaxed text-[var(--ink-3)] sm:text-lg">{valueLine}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <AnchorLink
              href="#work"
              className="inline-flex min-h-[44px] items-center rounded-full bg-[var(--accent-deep)] px-5 py-2.5 text-sm font-medium text-[var(--surface)] transition-opacity hover:opacity-90"
            >
              View Projects
            </AnchorLink>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-full border border-[var(--rule)] bg-[var(--surface)] px-5 py-2.5 text-sm font-medium text-[var(--ink-2)] transition-colors hover:border-[var(--ink-muted)]"
            >
              GitHub
            </a>
          </div>
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </div>
  );
}
