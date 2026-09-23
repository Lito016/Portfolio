import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { featuredProjects } from '@/data/projects';
import { CaseStudyLayout } from '@/components/projects/case-study-layout';
import { PageTransition } from '@/components/shared/page-transition';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return featuredProjects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = featuredProjects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Case Study`,
    description: project.caseStudy.overview,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = featuredProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <PageTransition>
      <CaseStudyLayout project={project} />
    </PageTransition>
  );
}
