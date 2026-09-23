import type { Metadata } from 'next';
import ResumePageClient from './resume-client';

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Resume of Manolito Almaden Jr. — AI solution developer and full-stack systems developer: experience, projects, skills, education, and certifications.',
};

export default function ResumePage() {
  return <ResumePageClient />;
}
