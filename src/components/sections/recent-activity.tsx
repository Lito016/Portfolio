'use client';

import { motion } from 'framer-motion';
import { GitCommit, GitPullRequest, Star, AlertCircle, GitFork } from 'lucide-react';
import { formatRelativeDate } from '@/lib/utils';
import type { GitHubEvent } from '@/lib/types';

const eventIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  PushEvent: GitCommit,
  PullRequestEvent: GitPullRequest,
  WatchEvent: Star,
  IssuesEvent: AlertCircle,
  ForkEvent: GitFork,
};

const eventLabels: Record<string, string> = {
  PushEvent: 'pushed to',
  PullRequestEvent: 'opened a PR in',
  WatchEvent: 'starred',
  IssuesEvent: 'opened an issue in',
  ForkEvent: 'forked',
};

/** Recent GitHub activity feed */
export function RecentActivity({ events }: { events: GitHubEvent[] }) {
  const filteredEvents = events.slice(0, 5);

  return (
    <section>
      <div className="mb-8">
        <p className="mb-2 text-[13px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
          GitHub
        </p>
        <h2 className="text-2xl font-semibold tracking-tight">
          Recent Activity
        </h2>
        <p className="mt-2 text-muted-foreground">
          Latest contributions on GitHub
        </p>
      </div>

      <div className="space-y-3">
        {filteredEvents.map((event, i) => {
          const Icon = eventIcons[event.type] || GitCommit;
          const label = eventLabels[event.type] || 'contributed to';

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4"
            >
              <div className="flex-1 flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--card)] p-3.5">
                <div className="shrink-0 rounded-md bg-[var(--muted)] p-2">
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{label}</span>{' '}
                    <a
                      href={`https://github.com/${event.repo.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--foreground)] transition-colors font-medium"
                    >
                      {event.repo.name}
                    </a>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatRelativeDate(event.created_at)}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          No recent activity to display.
        </p>
      )}
    </section>
  );
}
