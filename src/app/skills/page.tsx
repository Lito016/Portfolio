import type { Metadata } from 'next';
import SkillsPageClient from './skills-client';

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'Engineering skills organized by domain: languages, frontend, backend, databases, AI & ML, infrastructure, and tooling.',
};

export default function SkillsPage() {
  return (
    <>
      <h1 className="sr-only">Skills</h1>
      <SkillsPageClient />
    </>
  );
}
