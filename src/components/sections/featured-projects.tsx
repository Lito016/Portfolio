'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { hostedProjects } from '@/data/projects';

const homepageProjects = hostedProjects.slice(0, 3);

/** Featured projects section */
export function FeaturedProjects() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight">
            Live Applications
          </h2>
          <p className="mt-2 text-muted-foreground">
            Hosted projects I&apos;ve built and deployed
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
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
              className={`group relative block overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition-colors hover:border-[var(--foreground)]/20 ${i === 0 ? 'lg:col-span-12' : 'lg:col-span-6'}`}
            >
              <div className="p-6 sm:p-8">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">Case study · 0{i + 1}</p>
                    <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                      {project.name}
                    </h3>
                  </div>
                  <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-[var(--foreground)]" />
                </div>
                {project.caseStudy && (
                  <dl className={`grid gap-4 ${i === 0 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2'}`}>
                    <div>
                      <dt className="mb-1 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">Problem</dt>
                      <dd className="text-sm text-muted-foreground">{project.caseStudy.problem}</dd>
                    </div>
                    <div>
                      <dt className="mb-1 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">Approach</dt>
                      <dd className="text-sm text-muted-foreground">{project.caseStudy.approach}</dd>
                    </div>
                    <div>
                      <dt className="mb-1 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">Solution</dt>
                      <dd className="text-sm text-muted-foreground">{project.caseStudy.solution}</dd>
                    </div>
                    <div>
                      <dt className="mb-1 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">Result</dt>
                      <dd className="text-sm text-muted-foreground">{project.caseStudy.result}</dd>
                    </div>
                  </dl>
                )}
                <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-[var(--border)] pt-5">
                  <span className="mr-1 text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">Technology</span>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-xs font-medium text-[var(--accent-foreground)]"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-muted-foreground transition-colors group-hover:text-[var(--foreground)]">
                    Explore live <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-5 py-2.5 text-sm font-medium transition-colors hover:border-[var(--foreground)]/20"
          >
            View all projects
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
