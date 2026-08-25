'use client';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Star, GitFork, BookOpen, GitCommit, GitPullRequest, AlertCircle } from 'lucide-react';
import { PageTransition } from '@/components/shared/page-transition';
import { SectionHeading } from '@/components/shared/section-heading';
import { CardGridSkeleton } from '@/components/shared/loading-skeleton';
import { formatNumber, getLanguageColor } from '@/lib/utils';
import { computeGitHubStats, generateContributionCalendar, calculateStreaks } from '@/lib/github/stats';

export function StatsPageClient() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['github-stats'],
    queryFn: async () => {
      const s = await computeGitHubStats();
      const calendar = generateContributionCalendar();
      const streaks = calculateStreaks(calendar);
      return { ...s, contributionGraph: calendar, currentStreak: streaks.current, longestStreak: streaks.longest };
    },
  });

  if (isLoading || !stats) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <CardGridSkeleton count={4} />
      </div>
    );
  }

  const statCards = [
    { label: 'Repositories', value: stats.totalRepos, icon: BookOpen },
    { label: 'Total Stars', value: stats.totalStars, icon: Star },
    { label: 'Total Forks', value: stats.totalForks, icon: GitFork },
    { label: 'Commits', value: stats.totalCommits, icon: GitCommit },
    { label: 'Pull Requests', value: stats.totalPRs, icon: GitPullRequest },
    { label: 'Issues', value: stats.totalIssues, icon: AlertCircle },
  ];

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
        <SectionHeading title="GitHub Statistics" description="Overview of my GitHub activity" align="center" />

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {statCards.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-lg border bg-card p-5 text-center">
              <stat.icon className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
              <div className="text-2xl font-bold">{formatNumber(stat.value)}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Language distribution */}
        {stats.topLanguages.length > 0 && (
          <>
            <SectionHeading title="Language Distribution" />
            <div className="rounded-lg border bg-card p-6 mb-12">
              <div className="space-y-3">
                {stats.topLanguages.map((lang) => (
                  <div key={lang.name} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: getLanguageColor(lang.name) }} />
                        {lang.name}
                      </span>
                      <span className="text-muted-foreground">{lang.percentage.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${lang.percentage}%` }} viewport={{ once: true }}
                        transition={{ duration: 0.8 }} className="h-full rounded-full" style={{ backgroundColor: getLanguageColor(lang.name) }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Streaks */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-lg border bg-card p-6 text-center">
            <div className="text-3xl font-bold text-primary">{stats.currentStreak}</div>
            <div className="text-sm text-muted-foreground mt-1">Current Streak (days)</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="rounded-lg border bg-card p-6 text-center">
            <div className="text-3xl font-bold text-primary">{stats.longestStreak}</div>
            <div className="text-sm text-muted-foreground mt-1">Longest Streak (days)</div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
