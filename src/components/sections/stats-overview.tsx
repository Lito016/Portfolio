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
  ];

  return (
    <section aria-labelledby="stats-heading" className="py-20 bg-[var(--muted)]/30">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 id="stats-heading" className="text-2xl font-bold tracking-tight">Open-Source Activity</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            From my GitHub repositories and contributions
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 text-center"
            >
              <stat.icon className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
              <div className="text-2xl font-bold">{formatNumber(stat.value)}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/stats"
            className="text-sm text-muted-foreground hover:text-[var(--foreground)] transition-colors"
          >
            View full statistics &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
