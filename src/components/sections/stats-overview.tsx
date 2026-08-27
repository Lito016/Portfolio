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

/** GitHub stats overview with glassmorphic cards */
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
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-hover rounded-xl p-5 text-center relative overflow-hidden group"
            >
              {/* Gradient accent line at top */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] opacity-60 group-hover:opacity-100 transition-opacity" />

              <stat.icon className="h-5 w-5 mx-auto mb-2 text-[var(--gradient-start)]" style={{ filter: 'var(--drop-shadow)' }} />
              <div className="text-2xl font-bold gradient-text">{formatNumber(stat.value)}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
