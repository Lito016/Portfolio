'use client';

import { motion } from 'framer-motion';
import { PageTransition, StaggerContainer, StaggerItem } from '@/components/shared/page-transition';
import { SectionHeading } from '@/components/shared/section-heading';
import { skillCategories } from '@/data/skills';
import { Code, Layers, Brain, Wrench, Database } from 'lucide-react';

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Languages: Code,
  'Frameworks & Libraries': Layers,
  'AI & Machine Learning': Brain,
  'Tools & Platforms': Wrench,
  Databases: Database,
};

export default function SkillsPage() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16 md:py-20 max-w-5xl">
        <SectionHeading
          title="Skills"
          description="Technologies and tools I work with"
          align="center"
        />

        <StaggerContainer className="space-y-10">
          {skillCategories.map((category) => {
            const Icon = categoryIcons[category.name] || Code;
            return (
              <StaggerItem key={category.name}>
                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="rounded-md bg-primary/10 p-2">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="rounded-full border border-[var(--border)] bg-[var(--accent)] px-3.5 py-1.5 text-sm font-medium text-[var(--accent-foreground)]"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </PageTransition>
  );
}
