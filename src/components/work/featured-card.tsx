import type { FeaturedProject } from '@/data/projects';
import { Reveal } from '@/components/shared/reveal';
import {
  ShowcaseGhostIndex,
  ShowcaseImage,
  ShowcaseIndexLabel,
  ShowcaseLinks,
  ShowcaseTech,
} from '@/components/work/showcase-ui';

/** Compact featured card (2x2 grid): media frame + index law + copy + links. */
export function FeaturedCard({ project, index }: { project: FeaturedProject; index: number }) {
  return (
    <Reveal>
      <article
        data-showcase="featured-card"
        data-slug={project.slug}
        aria-labelledby={`work-${project.slug}`}
        className="showcase-frame flex h-full flex-col"
      >
        <div className="showcase-media relative">
          <ShowcaseImage project={project} src={project.image} className="absolute inset-0" />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex items-center justify-between gap-4">
            <ShowcaseIndexLabel index={index} />
            <ShowcaseGhostIndex index={index} className="text-[40px]" />
          </div>
          <h3
            id={`work-${project.slug}`}
            className="text-[22px] font-medium tracking-[-0.02em] text-[var(--ink)]"
          >
            {project.name}
          </h3>
          <p className="max-w-[56ch] text-[14px] leading-relaxed text-[var(--ink-muted)]">
            {project.description}
          </p>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-3">
            <ShowcaseTech project={project} />
            <ShowcaseLinks project={project} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}
