import { featuredProjects, otherProjects } from '@/data/projects';
import type { FeaturedProject } from '@/data/projects';
import { ShowcasePinnedBrowser } from '@/components/work/showcase-pinned-browser';
import { ShowcaseFullBleed } from '@/components/work/showcase-full-bleed';
import { ShowcaseTypographicDiagram } from '@/components/work/showcase-typographic-diagram';
import { ShowcaseStickyStack } from '@/components/work/showcase-sticky-stack';
import { SecondaryRow } from '@/components/work/secondary-row';

/**
 * Work section (FR-07…FR-10, FR-16): four editorial showcase variants
 * assigned positionally (ADR-3.5, index % 4). Adding a data entry renders
 * another showcase through the same primitives — zero component edits.
 */
function variantFor(index: number) {
  switch (index % 4) {
    case 0:
      return ShowcasePinnedBrowser;
    case 1:
      return ShowcaseFullBleed;
    case 2:
      return ShowcaseTypographicDiagram;
    default:
      return ShowcaseStickyStack;
  }
}

export function Work() {
  return (
    <section aria-labelledby="work-heading" className="px-[var(--gutter)]">
      <div className="mx-auto w-full max-w-[var(--content-wide)]">
      <header className="grid items-end gap-4 pt-[clamp(48px,8vw,96px)] lg:grid-cols-[minmax(0,7ch)_minmax(0,1fr)]">
        <p className="label-mono">Work</p>
        <div>
          <h2
            id="work-heading"
            className="font-medium tracking-[-0.02em] text-[var(--ink)] text-[clamp(2.5rem,5vw,4.5rem)] leading-none"
          >
            Selected work
          </h2>
          <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-[var(--ink-muted)]">
            Systems that run operations — designed, built, tested, and deployed end to end.
          </p>
        </div>
      </header>

      {featuredProjects.map((project: FeaturedProject, index: number) => {
        const Variant = variantFor(index);
        return <Variant key={project.slug} project={project} index={index} />;
      })}

      <SecondaryRow items={otherProjects} />
      </div>
    </section>
  );
}
