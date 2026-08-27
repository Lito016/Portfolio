'use client';

import { PageTransition } from '@/components/shared/page-transition';
import { SectionHeading } from '@/components/shared/section-heading';
import { generateContributionCalendar, calculateStreaks } from '@/lib/github/stats';
import { formatNumber } from '@/lib/utils';
import { useMemo } from 'react';

const levelColors = ['bg-muted', 'bg-primary/25', 'bg-primary/50', 'bg-primary/75', 'bg-primary'];

export default function ContributionsPage() {
  const calendar = useMemo(() => generateContributionCalendar(), []);
  const streaks = useMemo(() => calculateStreaks(calendar), [calendar]);

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16 md:py-20 max-w-6xl">
        <SectionHeading title="Contributions" description={`${formatNumber(calendar.totalContributions)} contributions in the last year`} align="center" />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8 max-w-md mx-auto">
          <div className="text-center"><div className="text-2xl font-bold">{formatNumber(calendar.totalContributions)}</div><div className="text-xs text-muted-foreground">Total</div></div>
          <div className="text-center"><div className="text-2xl font-bold">{streaks.current}</div><div className="text-xs text-muted-foreground">Current Streak</div></div>
          <div className="text-center"><div className="text-2xl font-bold">{streaks.longest}</div><div className="text-xs text-muted-foreground">Longest Streak</div></div>
        </div>

        {/* Contribution graph */}
        <div className="glass-card rounded-xl p-4 overflow-x-auto">
          <div className="flex gap-[3px] min-w-fit">
            {calendar.weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.days.map((day) => (
                  <div
                    key={day.date}
                    className={`w-3 h-3 rounded-sm ${levelColors[day.level]} transition-colors`}
                    title={`${day.count} contributions on ${day.date}`}
                  />
                ))}
              </div>
            ))}
          </div>
          {/* Legend */}
          <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground justify-end">
            <span>Less</span>
            {levelColors.map((c, i) => (
              <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
