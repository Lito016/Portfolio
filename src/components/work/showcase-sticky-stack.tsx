import {
  ShowcaseGhostIndex,
  ShowcaseImage,
  ShowcaseIndexLabel,
  ShowcaseLinks,
  ShowcaseTech,
} from '@/components/work/showcase-ui';
import type { FeaturedProject } from '@/data/projects';

/**
 * Showcase variant 04 (ADR-3.5): CSS sticky visual column with a pure-CSS
 * fan-out of the project's real screenshots — deliberately no ScrollTrigger
 * pin (pinning budget: exactly one GSAP pin on the page). Compact band
 * renders a plain stacked grid; from the medium band the visual is sticky
 * and layered; the fan spreads on hover for fine pointers (globals.css).
 */
export function ShowcaseStickyStack({ project, index }: { project: FeaturedProject; index: number }) {
  const shots = (project.caseStudy.screenshots?.length ? project.caseStudy.screenshots : [project.image]).filter(
    (src): src is string => Boolean(src),
  );
  if (shots.length === 0) {
    // Data without visuals still renders the editorial text column.
    shots.push(project.image);
  }
  const cells = [0, 1, 2, 3].map((i) => shots[i % shots.length]).filter(Boolean);
  const rows: Array<Array<string>> = [cells.slice(0, 2), cells.slice(2, 4)];
  return (
    <article data-showcase="sticky-stack" aria-labelledby={`work-${project.slug}`} className="border-t border-[var(--rule)] py-[clamp(48px,8vw,96px)]">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
        <div>
          <ShowcaseIndexLabel index={index} />
          <ShowcaseGhostIndex index={index} className="mt-2 hidden text-[clamp(64px,8vw,128px)] lg:block" />
          <h3
            id={`work-${project.slug}`}
            className="mt-4 font-medium tracking-[-0.02em] text-[var(--ink)] text-[clamp(2rem,3.5vw,3.5rem)] leading-none"
          >
            {project.name}
          </h3>
          <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-[var(--ink-3)] line-clamp-2">
            {project.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <ShowcaseTech project={project} />
            <ShowcaseLinks project={project} />
          </div>
        </div>

        {/* One DOM, two renders: stacked grid (compact) → sticky layered fan (medium+). */}
        <div className="stack-fan md:sticky md:top-[120px]">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            {rows.map((row, r) => (
              <div key={`row-${r}`} className="contents">
                {row.map((src, c) => (
                  <div key={`cell-${r}-${c}`} className="fan-slot">
                    <div className="fan-item" data-fan-order={r * 2 + c}>
                      <ShowcaseImage project={project} src={src} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
