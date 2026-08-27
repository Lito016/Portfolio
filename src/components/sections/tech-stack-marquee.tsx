'use client';

import { techStackItems } from '@/data/skills';

/** Scrolling tech stack marquee with glassmorphic styling */
export function TechStackMarquee() {
  const doubled = [...techStackItems, ...techStackItems];

  return (
    <section className="relative overflow-hidden py-6 sm:py-7">
      {/* Top and bottom gradient borders */}
      <div className="absolute top-0 left-0 right-0 gradient-line" />
      <div className="absolute bottom-0 left-0 right-0 gradient-line" />

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--background)] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--background)] to-transparent z-10" />

      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {doubled.map((tech, i) => (
            <span
              key={`${tech.name}-${i}`}
              className="inline-flex items-center gap-2 mx-3 px-4 py-2 rounded-full glass-card text-sm font-medium text-muted-foreground"
            >
              <span
                className="w-2.5 h-2.5 rounded-full shadow-sm"
                style={{
                  backgroundColor: tech.color,
                  boxShadow: `0 0 8px ${tech.color}40`,
                }}
              />
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
