import type { Metadata } from 'next';
import { StatsPageClient } from './stats-client';

export const metadata: Metadata = { title: 'GitHub Statistics', description: 'Contribution data, language breakdown, and repository stats from my GitHub account' };

export default function StatsPage() { return (<>
      <h1 className="sr-only">GitHub Statistics</h1>
      <StatsPageClient />
    </>); }
