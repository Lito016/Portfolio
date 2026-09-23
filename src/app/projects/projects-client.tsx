'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { PageTransition } from '@/components/shared/page-transition';
import { SectionHeading } from '@/components/shared/section-heading';
import { EmptyState } from '@/components/shared/empty-state';
import { ProjectCard } from '@/components/projects/project-card';
import {
  hostedProjects,
  featuredProjects,
  otherProjects,
  categoryLabels,
  type ProjectCategory,
} from '@/data/projects';

const categoryOrder: ProjectCategory[] = [
  'business-systems',
  'ai-developer-tools',
  'computer-vision-automation',
];

export function ProjectsPageClient() {
  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState('All');

  const tags = useMemo(() => {
    const tagSet = new Set(hostedProjects.flatMap((p) => p.tags));
    return ['All', ...Array.from(tagSet).sort()];
  }, []);

  const matches = useMemo(() => {
    const needle = search.toLowerCase();
    return (project: (typeof hostedProjects)[number]) =>
      (needle === '' ||
        project.name.toLowerCase().includes(needle) ||
        project.description.toLowerCase().includes(needle)) &&
      (tagFilter === 'All' || project.tags.includes(tagFilter));
  }, [search, tagFilter]);

  const visibleFeatured = featuredProjects.filter(matches);
  const visibleOther = otherProjects.filter(matches);
  const totalVisible = visibleFeatured.length + visibleOther.length;

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
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search projects..."
              aria-label="Search projects"
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

        {totalVisible === 0 ? (
          <EmptyState title="No projects found" description="Try adjusting your search or filter." />
        ) : (
          <div className="space-y-14">
            {visibleFeatured.length > 0 && (
              <section aria-labelledby="featured-projects-heading">
                <h2 id="featured-projects-heading" className="mb-6 text-xl font-semibold tracking-tight">
                  Featured Projects
                </h2>
                <div className="space-y-10">
                  {categoryOrder.map((category) => {
                    const group = visibleFeatured.filter((p) => p.category === category);
                    if (group.length === 0) return null;
                    return (
                      <div key={category} id={`cat-${category}`} className="scroll-mt-24">
                        <h3 className="mb-4 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                          {categoryLabels[category]}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {group.map((project, i) => (
                            <motion.div
                              key={project.slug}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="min-w-0"
                            >
                              <ProjectCard project={project} variant="featured" />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {visibleOther.length > 0 && (
              <section aria-labelledby="other-projects-heading">
                <h2 id="other-projects-heading" className="mb-6 text-xl font-semibold tracking-tight">
                  Other Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {visibleOther.map((project, i) => (
                    <motion.div
                      key={project.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="min-w-0"
                    >
                      <ProjectCard project={project} variant="compact" />
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
