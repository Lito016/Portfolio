'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Search } from 'lucide-react';
import { PageTransition } from '@/components/shared/page-transition';
import { SectionHeading } from '@/components/shared/section-heading';
import { EmptyState } from '@/components/shared/empty-state';
import { hostedProjects } from '@/data/projects';

export function ProjectsPageClient() {
  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState('All');

  const tags = useMemo(() => {
    const tagSet = new Set(hostedProjects.flatMap((p) => p.tags));
    return ['All', ...Array.from(tagSet).sort()];
  }, []);

  const filtered = useMemo(() => {
    return hostedProjects.filter((project) => {
      const matchesSearch =
        search === '' ||
        project.name.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase());
      const matchesTag = tagFilter === 'All' || project.tags.includes(tagFilter);
      return matchesSearch && matchesTag;
    });
  }, [search, tagFilter]);

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16 md:py-20 max-w-6xl">
        <SectionHeading
          title="Projects"
          description={`${hostedProjects.length} project${hostedProjects.length !== 1 ? 's' : ''} built and maintained`}
          align="center"
        />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg glass-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="px-4 py-2 rounded-lg glass-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Filter by technology"
          >
            {tags.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <EmptyState title="No projects found" description="Try adjusting your search or filter." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((project, i) => (
              <motion.a
                key={project.url}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group block rounded-xl glass-card-hover relative overflow-hidden"
              >
                {/* Screenshot preview */}
                <div className="relative h-40 w-full overflow-hidden rounded-t-xl border-b border-border/30">
                  <Image
                    src={project.image}
                    alt={`${project.name} preview`}
                    fill
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </div>
                <div className="relative z-10 p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-sm group-hover:text-[var(--gradient-start)] transition-colors truncate">
                      {project.name}
                    </h3>
                    <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 group-hover:text-[var(--gradient-start)] transition-colors" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-xs font-medium bg-[var(--muted)] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="ml-auto text-xs text-[var(--gradient-start)] font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {project.url.includes('github.com') ? 'View on GitHub' : 'Visit Live Site'}
                      <ExternalLink className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
