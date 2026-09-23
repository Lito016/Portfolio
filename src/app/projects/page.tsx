import type { Metadata } from 'next';
import { ProjectsPageClient } from './projects-client';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Projects I\'ve built and shipped — from AI integrations to full-stack applications',
};

export default function ProjectsPage() {
  return (
    <>
      <h1 className="sr-only">Projects</h1>
      <ProjectsPageClient />
    </>
  );
}
