import Image from 'next/image';
import type { FeaturedProject, HostedProjectBase, ProjectLink } from '@/data/projects';

/**
 * Shared showcase primitives (REQ-07 numeral law, ADR-3.5).
 * Server-safe: no hooks, no motion. The ghost numeral is aria-hidden
 * decorative tone; FR-07 index legibility is carried by the readable
 * mono label beside it in every variant.
 */

export function indexText(index: number): string {
  return String(index + 1).padStart(2, '0');
}

/** Readable mono index label — always present, never the ghost alone. */
export function ShowcaseIndexLabel({ index }: { index: number }) {
  return (
    <span className="label-mono" data-index-label={indexText(index)}>
      Project {indexText(index)}
    </span>
  );
}

/** Display-scale ghost numeral: decorative only (finding 1). */
export function ShowcaseGhostIndex({ index, className }: { index: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      data-ghost-index={indexText(index)}
      className={`pointer-events-none select-none font-mono leading-none text-[var(--rule-deep)] ${className ?? ''}`}
    >
      {indexText(index)}
    </span>
  );
}

/** Mono tech line — never a badge cloud (FR-12 carry-in). */
export function ShowcaseTech({ project }: { project: HostedProjectBase }) {
  return (
    <p className="label-mono" data-showcase-tech>
      {project.tags.join(', ')}
    </p>
  );
}

/** Live/GitHub anchors only when the data carries a URL — dead anchors forbidden. */
export function ShowcaseLinks({ project }: { project: HostedProjectBase }) {
  const hrefs: ProjectLink[] = [];
  for (const link of project.links) hrefs.push(link);
  if (project.url && !hrefs.some((h) => h.url === project.url)) {
    hrefs.unshift({ label: 'Live Demo', url: project.url });
  }
  if (hrefs.length === 0) return null;
  return (
    <span className="inline-flex items-center gap-6">
      {hrefs.map((href) => (
        <a
          key={href.url}
          href={href.url}
          target={href.url.startsWith('http') ? '_blank' : undefined}
          rel="noopener noreferrer"
          className="showcase-link text-sm text-[var(--accent-deep)]"
          data-showcase-link
        >
          {href.label}
        </a>
      ))}
    </span>
  );
}

/** Below-fold lazy image in a sunk aspect-ratio placeholder (NFR-01, finding F3). */
export function ShowcaseImage({
  project,
  src,
  alt,
  className,
}: {
  project: FeaturedProject;
  src: string;
  /** W28: visuals that must not read as product screenshots pass an explicit alt. */
  alt?: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt ?? `${project.name} interface visual`}
      width={1440}
      height={900}
      loading="lazy"
      className={`h-full w-full object-cover ${className ?? ''}`}
      data-showcase-img={project.slug}
    />
  );
}
