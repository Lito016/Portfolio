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

/** Recent GitHub activity feed with glassmorphic timeline */
export function RecentActivity({ events }: { events: GitHubEvent[] }) {
  const filteredEvents = events.slice(0, 5);

  return (
    <section>
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold tracking-tight">
            <span className="gradient-text">Recent Activity</span>
          </h2>
          <p className="mt-2 text-muted-foreground">
            Latest contributions on GitHub
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical gradient timeline */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--gradient-start)] via-[var(--gradient-end)] to-transparent opacity-30 hidden md:block" />

          <div className="space-y-3">
            {filteredEvents.map((event, i) => {
              const Icon = eventIcons[event.type] || GitCommit;
              const label = eventLabels[event.type] || 'contributed to';

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 md:pl-14"
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-4 w-5 h-5 rounded-full items-center justify-center bg-[var(--glass)] border border-[var(--glass-border)]">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]" />
                  </div>

                  <div className="flex-1 flex items-center gap-3 glass-card-hover rounded-xl p-4">
                    {/* Icon badge */}
                    <div className="shrink-0 rounded-full p-2.5 bg-gradient-to-br from-[var(--gradient-start)]/10 to-[var(--gradient-end)]/10 border border-[var(--glass-border)]">
                      <Icon className="h-4 w-4 text-[var(--gradient-start)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium">{label}</span>{' '}
                        <a
                          href={`https://github.com/${event.repo.name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--gradient-start)] hover:text-[var(--gradient-end)] transition-colors font-medium"
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
        </div>

        {filteredEvents.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No recent activity to display.
          </p>
        )}
    </section>
  );
}
