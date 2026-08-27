'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { hostedProjects } from '@/data/projects';

/** Featured projects section with glassmorphic cards — hosted live applications */
export function FeaturedProjects() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="text-3xl font-bold tracking-tight">
            <span className="gradient-text">Live Applications</span>
          </h2>
          <p className="mt-2 text-muted-foreground">
            Hosted projects I&apos;ve built and deployed
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {hostedProjects.map((project, i) => (
            <motion.a
              key={project.url}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group block rounded-xl glass-card-hover p-5 relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-sm group-hover:text-[var(--gradient-start)] transition-colors truncate">
                    {project.name}
                  </h3>
                  <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 ml-2 group-hover:text-[var(--gradient-start)] transition-colors" />
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--accent)] text-[var(--accent-foreground)]"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="ml-auto text-xs text-[var(--gradient-start)] font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Visit Live Site
                    <ExternalLink className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card-hover text-sm font-medium"
          >
            View all projects
            <ExternalLink className="h-3 w-3 text-[var(--gradient-start)]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
