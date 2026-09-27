import type { OtherProject } from '@/data/projects';
import { categoryLabels } from '@/data/projects';
import { ShowcaseTech } from '@/components/work/showcase-ui';

/**
 * Secondary work row (FR-07 / REQ-16): typographic hairline rows — no card
 * grid. Tech renders as a mono line, never a badge cloud (FR-12 carry-in).
 * Data-driven: any number of entries renders without component changes.
 */
export function SecondaryRow({ items }: { items: OtherProject[] }) {
  if (items.length === 0) return null;
  return (
    <div data-secondary-row className="mt-[clamp(48px,8vw,96px)]">
      <h3 className="label-mono">Also shipped</h3>
      <ul className="mt-6 border-t border-[var(--rule)]">
        {items.map((project) => (
          <li key={project.slug} className="secondary-row border-b border-[var(--rule)]">
            <div className="grid gap-2 py-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,2fr)_auto] md:items-baseline md:gap-8">
              <div>
                <span className="text-[17px] font-medium tracking-[-0.01em] text-[var(--ink)]">
                  {project.name}
                </span>
                <span className="label-mono ml-3 align-middle">{categoryLabels[project.category]}</span>
              </div>
              <p className="max-w-[56ch] text-[14px] leading-relaxed text-[var(--ink-muted)]">
                {project.description}
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 md:justify-end">
                <ShowcaseTech project={project} />
                <span className="inline-flex gap-4 whitespace-nowrap">
                  {project.url ? (
                    <a
                      href={project.url}
                      target={project.url.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="showcase-link text-sm text-[var(--accent-deep)]"
                      data-showcase-link
                    >
                      {project.links.find((l) => l.url === project.url)?.label ?? 'Live Demo'}
                    </a>
                  ) : null}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
