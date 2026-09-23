import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import type { HostedProject } from '@/data/projects';

export interface ProjectCardProps {
  project: HostedProject;
  /** featured: highlights + case-study CTA; compact: image + tags + links */
  variant: 'featured' | 'compact';
}

/**
 * One card markup source for homepage Featured, /projects, and category groups.
 * Rules (review findings 2): parent keys by `project.slug` (never url); empty
 * `image` renders the text-only variant (next/image throws on src=''); links
 * only render when a verified URL exists — no dead anchors or icons.
 */
export function ProjectCard({ project, variant }: ProjectCardProps) {
  const hasPrimaryLink = project.url !== '';

  return (
    <div
      className={
        variant === 'featured'
          ? 'group relative flex h-full flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] transition-colors hover:border-[var(--foreground)]/20'
          : 'group relative block h-full overflow-hidden rounded-xl glass-card-hover'
      }
    >
      {project.image !== '' && (
        <div
          className={
            variant === 'featured'
              ? 'relative aspect-video w-full overflow-hidden'
              : 'relative h-40 w-full overflow-hidden border-b border-border/30'
          }
        >
          <Image
            src={project.image}
            alt={`${project.name} preview`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes={
              variant === 'featured'
                ? '(max-width: 768px) 100vw, 33vw'
                : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            }
          />
        </div>
      )}
      <div className="relative z-10 flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-start justify-between gap-4">
          <h3 className="text-base font-semibold tracking-tight sm:text-lg">
            {project.name}
          </h3>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {variant === 'featured' && project.highlights.length > 0 && (
          <ul className="mb-4 space-y-1.5">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
              >
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--primary)]" />
                {highlight}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-[var(--border)] pt-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-[var(--muted)] px-2 py-0.5 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          <span className="ml-auto flex flex-wrap items-center justify-end gap-2">
            {hasPrimaryLink && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-[var(--foreground)]"
              >
                {project.url.includes('github.com') ? 'GitHub' : 'Visit'}
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            )}
            {project.links
              .filter((link) => link.url !== project.url)
              .map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-[var(--foreground)]"
                >
                  {link.label}
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              ))}
            {variant === 'featured' && project.featured && (
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1 text-xs font-medium text-[var(--primary)] transition-opacity hover:opacity-80"
              >
                View Case Study
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
