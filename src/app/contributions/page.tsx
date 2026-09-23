import type { Metadata } from 'next';
import { ContributionsPageClient } from './contributions-client';

export const metadata: Metadata = {
  title: 'Contributions',
  description: 'Illustrative contribution graph built from sample data, not live GitHub activity.',
};

export default function ContributionsPage() {
  return <ContributionsPageClient />;
}
