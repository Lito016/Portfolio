import type { Metadata } from 'next';
import { CertificationsPageClient } from './certifications-client';

export const metadata: Metadata = {
  title: 'Certifications',
  description: 'Verified credentials and completed training programs.',
};

export default function CertificationsPage() {
  return <CertificationsPageClient />;
}
