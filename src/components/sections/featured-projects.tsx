'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { hostedProjects } from '@/data/projects';
const homepageProjects = hostedProjects.slice(0, 3);

/** Featured projects section */
export function FeaturedProjects() {
  return (
    <section id="featured-projects" aria-labelledby="featured-heading" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-2 text-[13px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
            Work
          </p>
          <h2 id="featured-heading" className="text-2xl font-semibold tracking-tight">
            Projects
          </h2>
          <p className="mt-2 text-muted-foreground max-w-lg">
            Projects I&apos;ve built
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {homepageProjects.map((project, i) => (
            <motion.a
              key={project.url}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] transition-colors hover:border-[var(--foreground)]/20"
            >
              {/* Screenshot preview */}
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.name} preview`}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  sizes="33vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">Project 0{i + 1}</p>
                    <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                      {project.name}
                    </h3>
                  </div>
                  <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-[var(--foreground)]" aria-hidden="true" />
                </div>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 border-t border-[var(--border)] pt-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-[var(--muted)] px-2 py-0.5 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="ml-auto flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-[var(--foreground)]">
                    View <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-medium transition-colors hover:border-[var(--foreground)]/20"
          >
            View all projects
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
