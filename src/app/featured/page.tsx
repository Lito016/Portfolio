import type { Metadata } from 'next';
import { fetchRepos } from '@/lib/github/api';
import { PageTransition } from '@/components/shared/page-transition';
import { SectionHeading } from '@/components/shared/section-heading';
import { Star, GitFork, ExternalLink } from 'lucide-react';
import { getLanguageColor, formatNumber } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Featured',
  description: 'Featured and most popular projects',
};

export default async function FeaturedPage() {
  const repos = await fetchRepos().catch(() => []);
  const featured = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6);

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16 md:py-20 max-w-5xl">
        <SectionHeading title="Featured Projects" description="My most popular repositories" align="center" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((repo) => (
            <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer"
              className="group block glass-card rounded-xl p-6 hover:border-primary/50 transition-all">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{repo.name}</h3>
                <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
              </div>
              <p className="text-muted-foreground mb-4">{repo.description || 'No description'}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {repo.language && (
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: getLanguageColor(repo.language) }} />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1"><Star className="h-4 w-4" />{formatNumber(repo.stargazers_count)}</span>
                <span className="flex items-center gap-1"><GitFork className="h-4 w-4" />{formatNumber(repo.forks_count)}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
