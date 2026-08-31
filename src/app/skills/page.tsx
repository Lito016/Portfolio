'use client';

import { motion } from 'framer-motion';
import { PageTransition, StaggerContainer, StaggerItem } from '@/components/shared/page-transition';
import { SectionHeading } from '@/components/shared/section-heading';
import { skillCategories } from '@/data/skills';
import { Code, Layers, Brain, Wrench, Database } from 'lucide-react';
import * as Si from 'react-icons/si';

/** Map icon name strings to their react-icons components */
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  SiHtml5: Si.SiHtml5,
  SiJavascript: Si.SiJavascript,
  SiTypescript: Si.SiTypescript,
  SiPython: Si.SiPython,
  SiPhp: Si.SiPhp,
  SiMysql: Si.SiMysql,
  SiReact: Si.SiReact,
  SiNextdotjs: Si.SiNextdotjs,
  SiNodedotjs: Si.SiNodedotjs,
  SiTailwindcss: Si.SiTailwindcss,
  SiFramer: Si.SiFramer,
  SiPostgresql: Si.SiPostgresql,
  SiMongodb: Si.SiMongodb,
  SiFirebase: Si.SiFirebase,
  SiGit: Si.SiGit,
  SiDocker: Si.SiDocker,
  SiVercel: Si.SiVercel,
  SiCloudflare: Si.SiCloudflare,
};

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Languages: Code,
  'Frameworks & Libraries': Layers,
  'AI & Machine Learning': Brain,
  'Tools & Platforms': Wrench,
  Databases: Database,
  'Databases & Backend': Database,
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

                  <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-30px' }}
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.04 } },
                    }}
                  >
                    {category.skills.map((skill) => {
                      const SkillIcon = skill.icon ? iconMap[skill.icon] : null;
                      return (
                        <motion.div
                          key={skill.name}
                          variants={{
                            hidden: { opacity: 0, scale: 0.85 },
                            visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
                          }}
                          className="flex items-center gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--accent)]/50 px-3 py-2.5"
                        >
                          {SkillIcon && (
                            <SkillIcon className="h-5 w-5 shrink-0 text-[var(--accent-foreground)]" />
                          )}
                          <span className="text-sm font-medium text-[var(--foreground)] truncate">
                            {skill.name}
                          </span>
                        </motion.div>
                      );
                    })}
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
