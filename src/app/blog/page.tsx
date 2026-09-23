import type { Metadata } from 'next';
import { BlogPageClient } from './blog-client';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes on things I have learned building software.',
};

export default function BlogPage() {
  return <BlogPageClient />;
}
