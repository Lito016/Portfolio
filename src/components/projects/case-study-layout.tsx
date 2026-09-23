import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import type { HostedProject } from '@/data/projects';
import { FlowDiagram } from '@/components/projects/flow-diagram';

export interface CaseStudyLayoutProps {
  project: HostedProject;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section aria-label={title} className="mt-10">
      <h2 className="mb-3 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Prose({ text }: { text: string }) {
  return <p className="leading-relaxed text-muted-foreground">{text}</p>;
}

/**
 * Case-study renderer: a missing data field omits its section entirely —
 * no filler for absent facts (REQ-10). Diagrams share the FlowDiagram
 * primitive; metrics carry whitelist traceability in data, not on screen.
 */
export function CaseStudyLayout({ project }: CaseStudyLayoutProps) {
  if (!project.featured) return null;
  const cs = project.caseStudy;

  const primaryLink = project.url !== '';
  const otherLinks = project.links.filter((link) => link.url !== project.url);

  return (
    <article className="container mx-auto max-w-4xl px-4 py-16 md:py-20">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to Projects
      </Link>

      <header className="mb-4">
        <p className="mb-2 text-[13px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
          Case Study
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{project.name}</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-[var(--muted)] px-2 py-0.5 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {cs.screenshots && cs.screenshots.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {cs.screenshots.map((src) => (
            <div
              key={src}
              className="relative aspect-video w-full overflow-hidden rounded-xl border border-[var(--border)]"
            >
              <Image
                src={src}
                alt={`${project.name} screenshot`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      )}

      <Section title="Overview">
        <Prose text={cs.overview} />
      </Section>
      <Section title="Problem">
        <Prose text={cs.problem} />
      </Section>
      {cs.users && (
        <Section title="Users">
          <Prose text={cs.users} />
        </Section>
      )}
      <Section title="Solution">
        <Prose text={cs.solution} />
      </Section>
      {cs.workflow && cs.workflow.length > 0 && (
        <Section title="Core Workflow">
          <FlowDiagram kind="workflow" title={`${project.name} core workflow`} steps={cs.workflow} />
        </Section>
      )}
      {cs.architecture.length > 0 && (
        <Section title="Architecture">
          <FlowDiagram kind="architecture" title={`${project.name} architecture`} groups={cs.architecture} />
          {cs.architectureNote && (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{cs.architectureNote}</p>
          )}
        </Section>
      )}
      {cs.features && cs.features.length > 0 && (
        <Section title="Major Features">
          <dl className="space-y-3">
            {cs.features.map((feature) => (
              <div key={feature.name}>
                <dt className="text-sm font-medium">{feature.name}</dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </Section>
      )}
      {cs.challenges && cs.challenges.length > 0 && (
        <Section title="Engineering Challenges">
          <ul className="space-y-4">
            {cs.challenges.map((challenge) => (
              <li key={challenge.problem}>
                <p className="text-sm font-medium">{challenge.problem}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{challenge.resolution}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}
      {cs.decisions && cs.decisions.length > 0 && (
        <Section title="Technical Decisions">
          <ul className="space-y-4">
            {cs.decisions.map((decision) => (
              <li key={decision.choice}>
                <p className="text-sm font-medium">{decision.choice}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{decision.rationale}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}
      {cs.dataDesign && (
        <Section title="Data Design">
          <Prose text={cs.dataDesign} />
        </Section>
      )}
      {cs.testing && (
        <Section title="Testing">
          <Prose text={cs.testing} />
        </Section>
      )}
      {cs.security && (
        <Section title="Security">
          <Prose text={cs.security} />
        </Section>
      )}
      {cs.metrics.length > 0 && (
        <Section title="Metrics">
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {cs.metrics.map((metric) => (
              <div
                key={`${metric.value}-${metric.label}`}
                className="flex flex-col rounded-lg border border-[var(--border)] bg-[var(--card)] p-4"
              >
                <dt className="order-2 mt-1 text-xs text-muted-foreground">{metric.label}</dt>
                <dd className="order-1 text-2xl font-semibold tabular-nums tracking-tight text-[var(--primary)]">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      )}
      {(primaryLink || otherLinks.length > 0) && (
        <Section title="Links">
          <div className="flex flex-wrap gap-3">
            {primaryLink && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Visit {project.name}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
            {otherLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-5 py-2.5 text-sm font-medium transition-colors hover:border-[var(--foreground)]/20"
              >
                {link.label}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </Section>
      )}
    </article>
  );
}
