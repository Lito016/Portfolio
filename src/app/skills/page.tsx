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
          description="What I reach for when building production software"
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
                      <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-semibold">{category.name}</h3>
                  </div>

                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-30px' }}
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.04 } },
                    }}
                  >
                    {category.skills.map((skill) => (
                      <motion.span
                        key={skill.name}
                        variants={{
                          hidden: { opacity: 0, scale: 0.85 },
                          visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
                        }}
                        className="rounded-md border border-[var(--border)] bg-[var(--muted)] px-3 py-1 text-sm font-medium text-muted-foreground"
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </PageTransition>
  );
}
