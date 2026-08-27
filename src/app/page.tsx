import { Hero } from '@/components/sections/hero';
import { FeaturedProjects } from '@/components/sections/featured-projects';
import { TechStackMarquee } from '@/components/sections/tech-stack-marquee';
import { StatsOverview } from '@/components/sections/stats-overview';
import { ContactCTA } from '@/components/sections/contact-cta';
import { fetchRepos } from '@/lib/github/api';
import { computeGitHubStats, generateContributionCalendar } from '@/lib/github/stats';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'AI Solution Developer - Portfolio of Manolito Almaden Jr. (Lito_016)',
};

export default async function HomePage() {
  const repos = await fetchRepos().catch(() => []);

  const stats = await computeGitHubStats().catch(() => ({
    totalStars: 0,
    totalForks: 0,
    totalRepos: repos.length,
    totalCommits: 0,
    totalPRs: 0,
    totalIssues: 0,
    languageStats: {},
    topLanguages: [],
    contributionGraph: generateContributionCalendar(),
    currentStreak: 0,
    longestStreak: 0,
  }));

  return (
    <div className="space-y-0">
      <Hero />
      <TechStackMarquee />
      <StatsOverview
        totalStars={stats.totalStars}
        totalForks={stats.totalForks}
        totalRepos={stats.totalRepos}
        totalCommits={stats.totalCommits}
      />
      <FeaturedProjects />
      <ContactCTA />
    </div>
  );
}
