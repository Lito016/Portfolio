'use client';

import { motion } from 'framer-motion';
import { techStackItems } from '@/data/skills';

/** Scrolling tech stack marquee with glassmorphic styling */
export function TechStackMarquee() {
  return (
    <section className="relative overflow-hidden py-6 sm:py-7">
      {/* Top and bottom gradient borders */}
      <div className="absolute top-0 left-0 right-0 gradient-line" />
      <div className="absolute bottom-0 left-0 right-0 gradient-line" />

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--background)] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--background)] to-transparent z-10" />

      <div className="relative">
        <motion.div
          className="flex w-max whitespace-nowrap will-change-transform"
          initial={{ x: '0%' }}
          animate={{ x: '-50%' }}
          transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
        >
          {[false, true].map((duplicate) => (
            <div
              key={String(duplicate)}
              className="flex shrink-0"
              aria-hidden={duplicate || undefined}
            >
              {techStackItems.map((tech) => (
                <span
                  key={`${duplicate ? 'duplicate-' : ''}${tech.name}`}
                  className="mx-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground glass-card"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full shadow-sm"
                    style={{
                      backgroundColor: tech.color,
                      boxShadow: `0 0 8px ${tech.color}40`,
                    }}
                  />
                  {tech.name}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
