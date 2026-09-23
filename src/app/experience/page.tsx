import type { Metadata } from 'next';
import { ExperiencePageClient } from './experience-client';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Where I have worked and what I shipped.',
};

export default function ExperiencePage() {
  return <ExperiencePageClient />;
}
