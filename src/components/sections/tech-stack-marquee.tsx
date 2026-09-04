import { techStackItems } from '@/data/skills';

/** Scrolling tech stack marquee */
export function TechStackMarquee() {
  return (
    <section className="relative overflow-hidden border-y border-[var(--border)] py-6 sm:py-7" aria-label="Technology stack">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--background)] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--background)] to-transparent z-10" />

      <div className="tech-marquee-track flex w-max whitespace-nowrap will-change-transform">
        {[false, true].map((duplicate) => (
          <div
            key={String(duplicate)}
            className="flex shrink-0"
            aria-hidden={duplicate || undefined}
          >
            {techStackItems.map((tech) => (
              <span
                key={`${duplicate ? 'duplicate-' : ''}${tech.name}`}
                className="mx-2 inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-sm font-medium text-muted-foreground"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: tech.color }}
                />
                {tech.name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
