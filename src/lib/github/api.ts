import { GITHUB_API, GITHUB_USERNAME } from '@/config/site';
import type {
  GitHubUser,
  GitHubRepo,
  GitHubEvent,
  LanguageStats,
} from '@/lib/types';

const CACHE_REVALIDAL_SECONDS = 3600; // 1 hour

interface FetchOptions {
  revalidate?: number | false;
}

/** Core GitHub API fetcher with caching and retry logic */
async function githubFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { revalidate = CACHE_REVALIDAL_SECONDS } = options;

  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': GITHUB_USERNAME,
  };

  // Optional token for higher rate limits
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = endpoint.startsWith('http') ? endpoint : `${GITHUB_API}${endpoint}`;

  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        headers,
        next: revalidate !== false ? { revalidate } : undefined,
        cache: revalidate === false ? 'no-store' : undefined,
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `GitHub API error: ${response.status} ${response.statusText} - ${errorBody}`
        );
      }

      return response.json() as Promise<T>;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      // Don't retry on 4xx client errors
      if (lastError.message.includes('GitHub API error: 4')) {
        throw lastError;
      }
      // Wait before retry (exponential backoff: 1s, 2s, 4s)
      if (attempt < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
      }
    }
  }

  throw lastError ?? new Error('GitHub API request failed');
}

/** Fetch GitHub user profile */
export async function fetchGitHubUser(): Promise<GitHubUser> {
  return githubFetch<GitHubUser>(`/users/${GITHUB_USERNAME}`);
}

/** Fetch all public repositories */
export async function fetchRepos(): Promise<GitHubRepo[]> {
  const repos = await githubFetch<GitHubRepo[]>(
    `/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=owner`
  );
  return repos.filter((r) => !r.fork);
}

/** Fetch pinned repositories (via GraphQL-like approach using events) */
export async function fetchPinnedRepos(): Promise<GitHubRepo[]> {
  // GitHub REST API doesn't have a pinned repos endpoint
  // We'll use the top repos by stars as a proxy
  const repos = await fetchRepos();
  return repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);
}

/** Fetch recent events/activity */
export async function fetchEvents(
  page = 1,
  perPage = 20
): Promise<GitHubEvent[]> {
  return githubFetch<GitHubEvent[]>(
    `/users/${GITHUB_USERNAME}/events/public?page=${page}&per_page=${perPage}`
  );
}

/** Fetch repository languages */
export async function fetchRepoLanguages(
  repoName: string
): Promise<LanguageStats> {
  return githubFetch<LanguageStats>(
    `/repos/${GITHUB_USERNAME}/${repoName}/languages`
  );
}

/** Fetch all languages across all repos */
export async function fetchAllLanguages(): Promise<LanguageStats> {
  const repos = await fetchRepos();
  const totalLanguages: LanguageStats = {};

  const languagePromises = repos.map(async (repo) => {
    try {
      const langs = await fetchRepoLanguages(repo.name);
      return langs;
    } catch {
      return {};
    }
  });

  const allLangs = await Promise.all(languagePromises);

  for (const langs of allLangs) {
    for (const [lang, bytes] of Object.entries(langs)) {
      totalLanguages[lang] = (totalLanguages[lang] || 0) + bytes;
    }
  }

  return totalLanguages;
}

/** Fetch a single repository */
export async function fetchRepo(repoName: string): Promise<GitHubRepo> {
  return githubFetch<GitHubRepo>(`/repos/${GITHUB_USERNAME}/${repoName}`);
}
