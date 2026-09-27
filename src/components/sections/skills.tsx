'use client';

import { useState } from 'react';
import { skillCategories } from '@/data/skills';
import { Reveal } from '@/components/shared/reveal';

/**
 * Skills (FR-12/REQ-12): typographic domain list, NO badge cloud. Each
 * domain line reveals its technology list on hover (fine pointer), on
 * keyboard focus, or on tap (aria-expanded toggle). The detail text always
 * ships in server HTML and stays in the a11y tree — reveal is presentation
 * only, never information-gated. Expansion timing lives in globals.css
 * (.skill-panel, <=300ms micro budget).
 */
function domainId(name: string) {
  return `skills-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

export function Skills() {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  return (
    <section id="skills" aria-labelledby="skills-heading" className="px-[var(--gutter)] pb-[clamp(48px,8vw,96px)]">
      <div className="mx-auto w-full max-w-[var(--content-wide)]">
        <Reveal>
          <header className="grid items-end gap-4 lg:grid-cols-[minmax(0,7ch)_minmax(0,1fr)]">
            <p className="label-mono">Skills</p>
            <h2
              id="skills-heading"
              className="font-medium tracking-[-0.02em] text-[var(--ink)] text-[clamp(2.5rem,5vw,4.5rem)] leading-none"
            >
              Capabilities
            </h2>
          </header>
        </Reveal>

        <Reveal delay={0.06}>
          <ul className="mt-10 border-t border-[var(--rule)]">
            {skillCategories.map((domain) => {
              const id = domainId(domain.name);
              const expanded = Boolean(open[domain.name]);
              return (
                <li
                  key={domain.name}
                  className="skill-domain border-b border-[var(--rule-deep)]"
                  data-open={expanded ? 'true' : undefined}
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={id}
                      onClick={() => setOpen((state) => ({ ...state, [domain.name]: !expanded }))}
                      className="flex w-full items-baseline justify-between gap-6 py-5 text-left"
                    >
                      <span className="font-medium tracking-[-0.01em] text-[var(--ink)] text-[clamp(1.25rem,2.2vw,1.75rem)]">
                        {domain.name}
                      </span>
                      <span aria-hidden="true" className="label-mono shrink-0">
                        {expanded ? '−' : '+'} {domain.skills.length}
                      </span>
                    </button>
                  </h3>
                  <div id={id} className="skill-panel">
                    <div className="overflow-hidden">
                      <p className="label-mono pb-5 leading-relaxed text-[var(--ink-3)]">
                        {domain.skills.map((skill) => skill.name).join(', ')}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
