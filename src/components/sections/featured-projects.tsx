'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { featuredProjects } from '@/data/projects';
import { ProjectCard } from '@/components/projects/project-card';

/** Featured projects section — flag-driven, shared card markup. */
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
            Featured Projects
          </h2>
          <p className="mt-2 max-w-lg text-muted-foreground">
            Systems I designed and shipped end to end
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="min-w-0"
            >
              <ProjectCard project={project} variant="featured" />
            </motion.div>
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
