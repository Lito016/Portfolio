import { experiences } from '@/data/experience';
import { Reveal } from '@/components/shared/reveal';
import { ScrollHeading } from '@/components/shared/mask-reveal';
import { formatMonthYear } from '@/lib/dates';

/**
 * Experience (FR-13/REQ-13): minimal editorial list — YEAR / ROLE / COMPANY /
 * DESCRIPTION with hairline separators and hover response. Single verified
 * entry; every element (year, months, role, company, location, technologies)
 * is read from src/data/experience.ts — nothing retyped, nothing invented.
 */
export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="section-band px-[var(--gutter)]">
      <div className="mx-auto w-full max-w-[var(--content-wide)]">
        <ScrollHeading>
          <header className="grid items-end gap-4 lg:grid-cols-[minmax(0,7ch)_minmax(0,1fr)]">
            <p className="label-mono">Career</p>
            <h2
              id="experience-heading"
              className="font-medium tracking-[-0.02em] text-[var(--ink)] text-[clamp(2.5rem,5vw,4.5rem)] leading-none"
            >
              Experience
            </h2>
          </header>
        </ScrollHeading>

        <Reveal delay={0.06}>
          <div className="mt-8 border-t border-[var(--rule)]">
            {experiences.map((item) => (
              <article
                key={item.id}
                className="secondary-row grid gap-6 border-b border-[var(--rule-deep)] px-2 py-8 md:grid-cols-[minmax(0,10ch)_minmax(0,1.2fr)_minmax(0,1.6fr)] md:gap-10"
              >
                <div>
                  <p className="font-mono text-[22px] text-[var(--ink)]">{item.startDate.slice(0, 4)}</p>
                  <p className="label-mono mt-1">
                    {formatMonthYear(item.startDate)} – {formatMonthYear(item.endDate)}
                  </p>
                </div>
                <div>
                  <h3 className="text-[17px] font-medium text-[var(--ink)]">{item.role}</h3>
                  <p className="mt-1 text-[14px] text-[var(--ink-3)]">{item.company}</p>
                  <p className="label-mono mt-2">{item.location}</p>
                </div>
                <div>
                  <ul className="space-y-2">
                    {item.description.map((line) => (
                      <li key={line} className="text-[14px] leading-relaxed text-[var(--ink-3)]">
                        {line}
                      </li>
                    ))}
                  </ul>
                  <p className="label-mono mt-4 text-[var(--ink-muted)]">{item.technologies.join(', ')}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
