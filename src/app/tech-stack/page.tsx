import type { Metadata } from 'next';
import { TechStackPageClient } from './tech-stack-client';

export const metadata: Metadata = {
  title: 'Tech Stack',
  description: 'Tools and frameworks in my regular rotation.',
};

export default function TechStackPage() {
  return <TechStackPageClient />;
}
