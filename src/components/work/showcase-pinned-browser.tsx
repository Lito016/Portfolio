import {
  ShowcaseGhostIndex,
  ShowcaseImage,
  ShowcaseIndexLabel,
  ShowcaseLinks,
  ShowcaseTech,
} from '@/components/work/showcase-ui';
import { PinBrowserLayer } from '@/components/work/pin-browser-layer';
import type { FeaturedProject } from '@/data/projects';

/**
 * Showcase variant 01 (ADR-3.5): pinned browser preview — the single GSAP
 * pin, expanded band + fine pointer only. Scrub scale 1→1.025 transform-only
 * inside the overflow-hidden media wrapper; static everywhere else.
 */
export function ShowcasePinnedBrowser({ project, index }: { project: FeaturedProject; index: number }) {
  const shot = project.image || project.caseStudy.screenshots?.[0] || '';
  return (
    <article data-showcase="pinned-browser" aria-labelledby={`work-${project.slug}`} className="border-t border-[var(--rule)] py-[clamp(48px,8vw,96px)]">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
        <div data-pin-text>
          <ShowcaseIndexLabel index={index} />
          <ShowcaseGhostIndex index={index} className="mt-2 block text-[clamp(64px,8vw,128px)]" />
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
          {project.highlights.length > 0 ? (
            <ul className="mt-10 border-t border-[var(--rule-deep)]">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-baseline gap-3 border-b border-[var(--rule-deep)] py-3 text-[14px] text-[var(--ink-3)]"
                >
                  <span aria-hidden="true" className="font-mono text-[11px] text-[var(--accent)]">
                    +
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div>
          <div className="showcase-frame" data-pin-target>
            <div className="flex items-center border-b border-[var(--rule-deep)] px-4 py-3">
              <span className="label-mono">
                {project.name}
              </span>
            </div>
            <div className="showcase-media overflow-hidden" data-pin-media>
              {shot ? <ShowcaseImage project={project} src={shot} /> : null}
            </div>
          </div>
          <p className="label-mono mt-2 text-right">Browser preview</p>
        </div>
      </div>
      <PinBrowserLayer />
    </article>
  );
}
