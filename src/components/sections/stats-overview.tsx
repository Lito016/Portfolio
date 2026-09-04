'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, GitFork, BookOpen, GitCommit } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

interface StatsOverviewProps {
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  totalCommits: number;
}

/** GitHub stats overview */
export function StatsOverview({ totalStars, totalForks, totalRepos, totalCommits }: StatsOverviewProps) {
  const stats = [
    { label: 'Repositories', value: totalRepos, icon: BookOpen },
    { label: 'Total Stars', value: totalStars, icon: Star },
    { label: 'Total Forks', value: totalForks, icon: GitFork },
    { label: 'Commits', value: totalCommits, icon: GitCommit },
  ].filter((s) => s.value > 0);

  return (
    <section aria-labelledby="stats-heading" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-2 text-[13px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
            GitHub
          </p>
          <h2 id="stats-heading" className="text-2xl font-semibold tracking-tight">
            Open-Source Activity
          </h2>
        </motion.div>
        {stats.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-5"
                >
                  <stat.icon className="h-4 w-4 mb-3 text-muted-foreground" aria-hidden="true" />
                  <div className="text-2xl font-semibold tracking-tight">{formatNumber(stat.value)}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href="/stats"
                className="text-sm text-muted-foreground hover:text-[var(--foreground)] transition-colors"
              >
                View full statistics &rarr;
              </Link>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">No open-source activity to display yet.</p>
        )}
      </div>
    </section>
  );
}
