import type { Metadata } from 'next';
import { fetchEvents } from '@/lib/github/api';
import { RecentActivity } from '@/components/sections/recent-activity';
import { PageTransition } from '@/components/shared/page-transition';
import { SectionHeading } from '@/components/shared/section-heading';

export const metadata: Metadata = { title: 'Activity', description: 'My recent GitHub activity' };

export default async function ActivityPage() {
  const events = await fetchEvents(1, 30).catch(() => []);
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16 md:py-20 max-w-4xl">
        <SectionHeading title="GitHub Activity" description="My recent contributions and events" align="center" />
        <RecentActivity events={events} />
      </div>
    </PageTransition>
  );
}
