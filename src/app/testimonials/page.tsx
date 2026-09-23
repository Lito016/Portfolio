import type { Metadata } from 'next';
import { TestimonialsPageClient } from './testimonials-client';

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'Feedback from people I have worked with.',
};

export default function TestimonialsPage() {
  return <TestimonialsPageClient />;
}
