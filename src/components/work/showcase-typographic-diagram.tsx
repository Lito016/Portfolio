import {
  ShowcaseGhostIndex,
  ShowcaseImage,
  ShowcaseIndexLabel,
  ShowcaseLinks,
  ShowcaseTech,
} from '@/components/work/showcase-ui';
import { DiagramScrubLayer } from '@/components/work/diagram-scrub-layer';
import type { FeaturedProject } from '@/data/projects';

/**
 * Showcase variant 03 (ADR-3.5 / FR-09 / W28): experimental typographic
 * composition. Vision's visual is its architecture workflow rendered as a
 * labeled system diagram — never presented as a product screenshot.
 * Ghost numeral + diagram carry a scrub treatment on fine pointers only.
 */
export function ShowcaseTypographicDiagram({ project, index }: { project: FeaturedProject; index: number }) {
  const steps = project.caseStudy.workflow ?? [];
  return (
    <article data-showcase="typographic-diagram" aria-labelledby={`work-${project.slug}`} className="border-t border-[var(--rule)] py-[clamp(48px,8vw,96px)]">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,9ch)_minmax(0,1fr)] lg:gap-16">
        <div className="relative">
          <ShowcaseGhostIndex index={index} className="ghost-scrub block text-[clamp(88px,12vw,192px)]" />
          <ShowcaseIndexLabel index={index} />
        </div>
        <div>
          <h3
            id={`work-${project.slug}`}
            className="font-medium tracking-[-0.02em] text-[var(--ink)] text-[clamp(2rem,3.5vw,3.5rem)] leading-none"
          >
            {project.name}
          </h3>
          <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-[var(--ink-3)] line-clamp-2">
            {project.description}
          </p>

          <figure className="diagram-scrub mt-10 border border-[var(--rule)] bg-[var(--surface)] p-6 sm:p-8" style={{ borderRadius: 8 }}>
            <figcaption className="label-mono mb-6">System diagram · pipeline</figcaption>
            {project.image ? (
              <div
                className="mb-6 overflow-hidden border border-[var(--rule-deep)] bg-[var(--surface-sunk)]"
                style={{ aspectRatio: '16 / 8.6', borderRadius: 8 }}
              >
                <ShowcaseImage project={project} src={project.image} />
              </div>
            ) : null}
            {steps.length > 0 ? (
              <ol className="flex flex-wrap items-stretch gap-y-4" aria-label={`${project.name} processing pipeline`}>
                {steps.map((step, i) => (
                  <li key={step.id} role="presentation" className="flex items-stretch">
                    <div className="flex min-w-[132px] max-w-[180px] flex-col justify-center border border-[var(--rule-deep)] bg-[var(--bg-canvas)] px-3 py-2" style={{ borderRadius: 8 }}>
                      <span className="text-[13px] font-medium leading-tight text-[var(--ink-2)]">{step.label}</span>
                      {step.detail ? <span className="mt-0.5 font-mono text-[11px] leading-tight text-[var(--ink-muted)]">{step.detail}</span> : null}
                    </div>
                    {i < steps.length - 1 ? (
                      <span aria-hidden="true" className="flex items-center px-1.5 font-mono text-[13px] text-[var(--accent)]">
                        →
                      </span>
                    ) : null}
                  </li>
                ))}
              </ol>
            ) : null}
            {project.caseStudy.architectureNote ? (
              <p className="mt-6 border-t border-[var(--rule-deep)] pt-4 text-[13px] leading-relaxed text-[var(--ink-muted)]">
                {project.caseStudy.architectureNote}
              </p>
            ) : null}
          </figure>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <ShowcaseTech project={project} />
            <ShowcaseLinks project={project} />
          </div>
        </div>
      </div>
      <DiagramScrubLayer />
    </article>
  );
}
