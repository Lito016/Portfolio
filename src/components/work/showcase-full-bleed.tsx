import {
  ShowcaseGhostIndex,
  ShowcaseIndexLabel,
  ShowcaseLinks,
  ShowcaseTech,
} from '@/components/work/showcase-ui';
import { FullBleedMedia } from '@/components/work/full-bleed-media';
import type { FeaturedProject } from '@/data/projects';

/**
 * Showcase variant 02 (ADR-3.5): full-bleed clip-path wipe + decorative
 * parallax. Static composition under reduced motion and coarse pointers.
 */
export function ShowcaseFullBleed({ project, index }: { project: FeaturedProject; index: number }) {
  const shot = project.image || project.caseStudy.screenshots?.[0] || '';
  return (
    <article data-showcase="full-bleed" aria-labelledby={`work-${project.slug}`} className="border-t border-[var(--rule)] py-[clamp(48px,8vw,96px)]">
      <div className="grid items-end gap-6 lg:grid-cols-[minmax(0,7ch)_minmax(0,1fr)]">
        <div className="relative hidden lg:block">
          <ShowcaseGhostIndex index={index} className="absolute -top-[0.6em] left-0 text-[clamp(48px,6vw,88px)]" />
          <ShowcaseIndexLabel index={index} />
        </div>
        <div>
          <div className="lg:hidden">
            <ShowcaseIndexLabel index={index} />
          </div>
          <h3
            id={`work-${project.slug}`}
            className="mt-2 font-medium tracking-[-0.02em] text-[var(--ink)] text-[clamp(2rem,3.5vw,3.5rem)] leading-none lg:mt-0"
          >
            {project.name}
          </h3>
          <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-[var(--ink-3)] line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>

      <FullBleedMedia project={project} shot={shot} />

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <ShowcaseTech project={project} />
        <ShowcaseLinks project={project} />
      </div>
    </article>
  );
}
