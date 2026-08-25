import type { GitHubRepo, LanguageStats, GitHubStats, ContributionCalendar } from '@/lib/types';
import { fetchRepos, fetchAllLanguages, fetchEvents } from './api';

/** Compute aggregate GitHub statistics */
export async function computeGitHubStats(): Promise<GitHubStats> {
  const [repos, languageStats, events] = await Promise.all([
    fetchRepos(),
    fetchAllLanguages(),
    fetchEvents(1, 100),
  ]);

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);

  // Count commits from PushEvents
  const totalCommits = events
    .filter((e) => e.type === 'PushEvent')
    .reduce((sum, e) => {
      const payload = e.payload as { commits?: unknown[] };
      return sum + (payload.commits?.length || 0);
    }, 0);

  // Count PRs from PullRequestEvents
  const totalPRs = events.filter(
    (e) => e.type === 'PullRequestEvent'
  ).length;

  // Count issues from IssuesEvents
  const totalIssues = events.filter(
    (e) => e.type === 'IssuesEvent'
  ).length;

  // Calculate top languages
  const totalBytes = Object.values(languageStats).reduce(
    (sum, bytes) => sum + bytes,
    0
  );

  const topLanguages = Object.entries(languageStats)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: totalBytes > 0 ? (bytes / totalBytes) * 100 : 0,
    }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 10);

  return {
    totalStars,
    totalForks,
    totalRepos: repos.length,
    totalCommits,
    totalPRs,
    totalIssues,
    languageStats,
    topLanguages,
    contributionGraph: null, // Filled separately
    currentStreak: 0, // Computed from contribution data
    longestStreak: 0,
  };
}

/** Get top repositories sorted by stars */
export async function getTopRepos(limit = 6): Promise<GitHubRepo[]> {
  const repos = await fetchRepos();
  return repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, limit);
}

/** Get recently updated repositories */
export async function getRecentRepos(limit = 6): Promise<GitHubRepo[]> {
  const repos = await fetchRepos();
  return repos
    .sort(
      (a, b) =>
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
    )
    .slice(0, limit);
}

/** Get language percentage breakdown for a single repo */
export function computeLanguagePercentages(
  languages: LanguageStats
): { name: string; percentage: number; bytes: number }[] {
  const total = Object.values(languages).reduce((s, b) => s + b, 0);
  if (total === 0) return [];

  return Object.entries(languages)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: (bytes / total) * 100,
    }))
    .sort((a, b) => b.bytes - a.bytes);
}

/** Generate mock contribution data for display */
export function generateContributionCalendar(): ContributionCalendar {
  const weeks: ContributionCalendar['weeks'] = [];
  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() - 364);

  // Align to start of week (Sunday)
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const currentDate = new Date(startDate);
  let totalContributions = 0;

  while (currentDate <= now) {
    const week: ContributionCalendar['weeks'][0] = { days: [] };

    for (let day = 0; day < 7; day++) {
      if (currentDate <= now) {
        // Generate realistic contribution pattern
        const dayOfWeek = currentDate.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const random = Math.random();

        let count = 0;
        let level: 0 | 1 | 2 | 3 | 4 = 0;

        if (!isWeekend) {
          if (random > 0.3) {
            count = Math.floor(Math.random() * 8) + 1;
            level = count > 6 ? 4 : count > 4 ? 3 : count > 2 ? 2 : 1;
          }
        } else {
          if (random > 0.7) {
            count = Math.floor(Math.random() * 3) + 1;
            level = count > 2 ? 2 : 1;
          }
        }

        totalContributions += count;

        week.days.push({
          date: currentDate.toISOString().split('T')[0],
          count,
          level,
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    weeks.push(week);
  }

  return { totalContributions, weeks };
}

/** Calculate streaks from contribution data */
export function calculateStreaks(
  calendar: ContributionCalendar
): { current: number; longest: number } {
  const allDays = calendar.weeks.flatMap((w) => w.days);
  let current = 0;
  let longest = 0;
  let tempStreak = 0;

  // Calculate current streak (from most recent day backwards)
  for (let i = allDays.length - 1; i >= 0; i--) {
    if (allDays[i].count > 0) {
      current++;
    } else {
      break;
    }
  }

  // Calculate longest streak
  for (const day of allDays) {
    if (day.count > 0) {
      tempStreak++;
      longest = Math.max(longest, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  return { current, longest };
}
