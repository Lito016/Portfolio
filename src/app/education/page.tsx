import type { Metadata } from 'next';
import { EducationPageClient } from './education-client';

export const metadata: Metadata = {
  title: 'Education',
  description: 'Formal training and coursework.',
};

export default function EducationPage() {
  return <EducationPageClient />;
}
