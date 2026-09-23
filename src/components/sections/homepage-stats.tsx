'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchRepos, fetchEvents } from '@/lib/github/api';
import { StatsOverview } from './stats-overview';

/** Client component that fetches GitHub stats for the homepage */
export function HomePageStats() {
  const { data } = useQuery({
    queryKey: ['homepage-stats'],
    queryFn: async () => {
      const [repos, events] = await Promise.all([
        fetchRepos(),
        fetchEvents(1, 100),
      ]);

      const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
      const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);
      const totalCommits = events
        .filter((e) => e.type === 'PushEvent')
        .reduce((sum, e) => {
          const payload = e.payload as { commits?: unknown[] };
          return sum + (payload.commits?.length || 0);
        }, 0);

      return {
        totalStars,
        totalForks,
        totalRepos: repos.length,
        totalCommits,
      };
    },
  });

  if (!data) return null;

  return <StatsOverview {...data} />;
}
