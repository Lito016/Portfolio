import type { Metadata } from 'next';
import { PageTransition } from '@/components/shared/page-transition';
import { SectionHeading } from '@/components/shared/section-heading';
import { fetchRepos } from '@/lib/github/api';
import { Star, GitFork, ExternalLink } from 'lucide-react';
import { getLanguageColor, formatNumber } from '@/lib/utils';

export const metadata: Metadata = { title: 'Open Source', description: 'My open source contributions' };

export default async function OpenSourcePage() {
  const repos = await fetchRepos().catch(() => []);

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16 md:py-20 max-w-5xl">
        <SectionHeading title="Open Source" description="My public repositories and contributions" align="center" />
        <div className="space-y-4">
          {repos.map((repo) => (
            <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between glass-card rounded-xl p-5 hover:border-primary/50 transition-all group">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold group-hover:text-primary transition-colors truncate">{repo.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 truncate">{repo.description || 'No description'}</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground ml-4 shrink-0">
                {repo.language && <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: getLanguageColor(repo.language) }} />{repo.language}</span>}
                <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5" />{formatNumber(repo.stargazers_count)}</span>
                <span className="flex items-center gap-1"><GitFork className="h-3.5 w-3.5" />{formatNumber(repo.forks_count)}</span>
                <ExternalLink className="h-4 w-4" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
