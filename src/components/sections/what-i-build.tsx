'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Bot, Video } from 'lucide-react';
import type { ProjectCategory, WhatIBuildCategory } from '@/data/projects';

const categoryIcons: Record<ProjectCategory, React.ComponentType<{ className?: string }>> = {
  'business-systems': Building2,
  'ai-developer-tools': Bot,
  'computer-vision-automation': Video,
};

export interface WhatIBuildProps {
  items: WhatIBuildCategory[];
}

/** Homepage capability categories; each card links to its /projects anchor (finding 4). */
export function WhatIBuild({ items }: WhatIBuildProps) {
  return (
    <section id="what-i-build" aria-labelledby="what-i-build-heading" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-2 text-[13px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
            Capabilities
          </p>
          <h2 id="what-i-build-heading" className="text-2xl font-semibold tracking-tight">
            What I Build
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {items.map((item, i) => {
            const Icon = categoryIcons[item.category];
            return (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group flex h-full min-w-0 flex-col rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 transition-colors hover:border-[var(--foreground)]/20"
              >
                <div className="mb-4 rounded-md bg-primary/10 p-2">
                  <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-base font-semibold tracking-tight">{item.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{item.blurb}</p>
                <ul className="mt-auto flex flex-wrap gap-2" aria-label={`${item.title} examples`}>
                  {item.examples.map((example) => (
                    <li
                      key={example}
                      className="rounded-md bg-[var(--muted)] px-2 py-0.5 text-xs font-medium text-muted-foreground"
                    >
                      {example}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/projects#cat-${item.category}`}
                  className="mt-5 inline-flex w-fit items-center gap-1 text-sm font-medium text-[var(--primary)] transition-opacity hover:opacity-80"
                >
                  See projects
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
