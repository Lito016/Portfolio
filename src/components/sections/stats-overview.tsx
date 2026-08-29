'use client';

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
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 text-center"
            >
              <stat.icon className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
              <div className="text-2xl font-bold">{formatNumber(stat.value)}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
