'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { AnchorLink } from '@/components/shared/anchor-link';
import { siteConfig } from '@/config/site';
import { HeroCanvas } from '@/components/hero/hero-canvas';
import { ScrollIndicator } from '@/components/hero/scroll-indicator';
import {
  EASE_EXPO_OUT,
  HERO_BG_DURATION_MS,
  HERO_LINES_DELAY_MS,
  HERO_LINE_DURATION_MS,
  HERO_LINE_STAGGER_MS,
  HERO_META_DELAY_MS,
  HERO_VISUAL_DELAY_MS,
  HERO_VISUAL_DURATION_MS,
} from '@/config/hero-timeline';

/** Staged hero load sequence (FR-03); timeline constants shared with the header
 * nav stage in src/config/hero-timeline.ts. Text renders fully in server HTML;
 * these wrappers only animate whole lines (ADR-3.2). */
export function HeroMotion({
  lines,
  valueLine,
  location,
  building,
}: {
  lines: string[];
  valueLine: string;
  location: string;
  building: string;
}) {
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    // Verification hook: epoch of the sequence mount (before staged animations start).
    if (startRef.current === null) {
      startRef.current = performance.now();
      document.documentElement.setAttribute('data-hero-seq-start', String(Math.round(startRef.current)));
    }
  }, []);

  return (
    <div className="relative z-10 mx-auto flex min-h-[85vh] w-full max-w-[var(--content-wide)] flex-col px-[var(--gutter)]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: HERO_BG_DURATION_MS / 1000, ease: EASE_EXPO_OUT }}
        className="grid flex-1 content-center gap-10 pt-[calc(var(--nav-h)+40px)]"
      >
        <div>
          <p className="label-mono mb-6">
            {siteConfig.displayName} · {location}
          </p>
          <h1 className="text-[clamp(3.5rem,9vw,9.25rem)] leading-[0.88] tracking-[-0.035em] text-[var(--ink)]">
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
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none relative h-[38vh] max-h-[480px] min-h-[260px] overflow-hidden"
        >
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: HERO_VISUAL_DURATION_MS / 1000,
              delay: HERO_VISUAL_DELAY_MS / 1000,
              ease: EASE_EXPO_OUT,
            }}
          >
            <HeroCanvas />
          </motion.div>
        </div>

        <motion.div
          data-hero-meta
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: HERO_META_DELAY_MS / 1000, ease: EASE_EXPO_OUT }}
        >
          <p className="max-w-2xl text-lg leading-relaxed text-[var(--ink-3)] sm:text-xl">{valueLine}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <AnchorLink
              href="#work"
              className="inline-flex min-h-[44px] items-center rounded-lg bg-[var(--accent-deep)] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              View Projects
            </AnchorLink>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-lg border border-[var(--rule)] bg-[var(--surface)] px-6 py-2.5 text-sm font-medium text-[var(--ink-2)] transition-colors hover:border-[var(--ink-muted)]"
            >
              GitHub
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2">
            <a
              href={siteConfig.email}
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)] transition-colors hover:text-[var(--accent-deep)]"
            >
              {siteConfig.email.replace('mailto:', '')}
            </a>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
              Now building: {building}
            </span>
          </div>
        </motion.div>
      </motion.div>
      <ScrollIndicator />
    </div>
  );
}
