import type { Metadata } from 'next';
import { AchievementsPageClient } from './achievements-client';

export const metadata: Metadata = {
  title: 'Achievements',
  description: 'Things I am proud of across my projects and learning.',
};

export default function AchievementsPage() {
  return <AchievementsPageClient />;
}
