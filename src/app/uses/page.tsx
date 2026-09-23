import type { Metadata } from 'next';
import { UsesPageClient } from './uses-client';

export const metadata: Metadata = {
  title: 'Uses',
  description: 'Hardware, software, and config I use daily.',
};

export default function UsesPage() {
  return <UsesPageClient />;
}
