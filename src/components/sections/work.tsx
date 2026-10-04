import { featuredProjects, otherProjects } from '@/data/projects';
import type { FeaturedProject } from '@/data/projects';
import { FeaturedCard } from '@/components/work/featured-card';
import { SecondaryRow } from '@/components/work/secondary-row';
import { ScrollHeading } from '@/components/shared/mask-reveal';

/**
 * Work section (FR-07…FR-10, FR-16): featured projects as compact cards in a
 * 2x2 grid (single column on compact band), hairline rows for the rest.
 * Adding a data entry renders another card through the same primitive.
 */
export function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" className="section-band px-[var(--gutter)]">
      <div className="mx-auto w-full max-w-[var(--content-wide)]">
      <header className="grid items-end gap-4 lg:grid-cols-[minmax(0,7ch)_minmax(0,1fr)]">
        <ScrollHeading>
          <p className="label-mono">Work</p>
        </ScrollHeading>
        <ScrollHeading delay={60}>
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
        </ScrollHeading>
      </header>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:gap-8">
        {featuredProjects.map((project: FeaturedProject, index: number) => (
          <FeaturedCard key={project.slug} project={project} index={index} />
        ))}
      </div>

      <SecondaryRow items={otherProjects} />
      </div>
    </section>
  );
}
