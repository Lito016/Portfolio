import type { Metadata } from 'next';
import { NowPageClient } from './now-client';

export const metadata: Metadata = {
  title: 'Now',
  description: 'What I am building, learning, exploring, and thinking about right now.',
};

export default function NowPage() {
  return <NowPageClient />;
}
