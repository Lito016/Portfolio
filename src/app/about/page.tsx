import type { Metadata } from 'next';
import { AboutPageClient } from './about-client';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Manolito Almaden Jr. - AI Solution Developer',
};

export default function AboutPage() {
  return (
    <>
      <h1 className="sr-only">About</h1>
      <AboutPageClient />
    </>
  );
}
