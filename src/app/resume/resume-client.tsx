'use client';

import { motion } from 'framer-motion';
import { PageTransition } from '@/components/shared/page-transition';
import { experiences } from '@/data/experience';
import { education } from '@/data/education';
import { achievements } from '@/data/achievements';
import { teamMembers } from '@/data/team';
import {
  Briefcase,
  GraduationCap,
  Code2,
  Trophy,
  Mail,
  Globe,
  MapPin,
  Printer,
  Layers,
} from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { siteConfig, POSITIONING } from '@/config/site';
import { skillCategories } from '@/data/skills';
import { featuredProjects } from '@/data/projects';

const member = teamMembers[0];

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function formatResumeDate(dateStr: string): string {
  if (dateStr === 'Present') return 'Present';
  const parts = dateStr.split('-');
  if (parts.length === 2) {
    const [year, month] = parts;
    return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
  }
  return dateStr;
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: 'easeOut' as const },
  }),
};

export default function ResumePage() {
  const handlePrint = () => window.print();

  return (
    <PageTransition>
      <div className="mx-auto max-w-4xl px-4 py-10 md:py-16">
        {/* Print / Download button */}
        <div className="mb-6 flex justify-end print:hidden">
          <button
            onClick={handlePrint}
            className="btn-gradient inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white"
          >
            <Printer className="h-4 w-4" />
            Print / Save PDF
          </button>
        </div>

        {/* ─── Resume Document ─── */}
        <div className="resume-document glass-card rounded-2xl p-6 md:p-10 lg:p-12">
          {/* ── Header ── */}
          <header className="mb-8 border-b border-border pb-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {member?.name ?? 'Manolito O. Almaden Jr.'}
                </h1>
                <p className="mt-1 text-lg font-medium text-primary">
                  {POSITIONING}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  Philippines
                </p>
              </div>

              <div className="space-y-1.5 text-sm">
                <a
                  href={siteConfig.email}
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  {siteConfig.email.replace('mailto:', '')}
                </a>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <SiGithub className="h-3.5 w-3.5 shrink-0" />
                  github.com/Lito016
                </a>
                {siteConfig.linkedin && (
                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Globe className="h-3.5 w-3.5 shrink-0" />
                    {siteConfig.linkedin.replace('https://', '')}
                  </a>
                )}
              </div>
            </div>

            {/* Summary */}
            <div className="mt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Summary
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                AI solution developer and full-stack systems developer. I build
                business &amp; management systems, AI &amp; developer tools, and
                computer-vision automation — taking each system from data model
                through deployment. Focus areas: LLM integration, RAG pipelines,
                agentic workflows, MCP servers, and production web platforms.
              </p>
            </div>
          </header>

          {/* ── Education ── */}
          <Section icon={<GraduationCap className="h-4.5 w-4.5" />} title="Education">
            {education.map((edu, i) => (
              <motion.div
                key={edu.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="resume-item"
              >
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="text-base font-semibold">{edu.degree}</h3>
                    <p className="text-sm font-medium text-primary">{edu.school}</p>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    <p>{edu.startDate} &ndash; {edu.endDate}</p>
                    <p>{edu.location}</p>
                  </div>
                </div>
                {edu.description && (
                  <p className="mt-2 text-sm text-muted-foreground">{edu.description}</p>
                )}
                {edu.courses && edu.courses.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Key Coursework
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {edu.courses.map((c) => (
                        <span
                          key={c}
                          className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </Section>

          {/* ── Work Experience ── */}
          <Section icon={<Briefcase className="h-4.5 w-4.5" />} title="Work Experience">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="resume-item"
              >
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="text-base font-semibold">{exp.role}</h3>
                    <p className="text-sm font-medium text-primary">{exp.company}</p>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    <p>{formatResumeDate(exp.startDate)} &ndash; {formatResumeDate(exp.endDate)}</p>
                  </div>
                </div>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {exp.description.map((d, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-primary/8 px-2 py-0.5 text-xs font-medium text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </Section>

          {/* ── Selected Projects ── */}
          <Section icon={<Layers className="h-4.5 w-4.5" />} title="Selected Projects">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.slug}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="resume-item"
              >
                <h3 className="text-base font-semibold">{project.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{project.description}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-primary/8 px-2 py-0.5 text-xs font-medium text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </Section>

          {/* ── Technical Skills ── */}
          <Section icon={<Code2 className="h-4.5 w-4.5" />} title="Technical Skills">
            <div className="space-y-3">
              {skillCategories.map((category) => (
                <div key={category.name}>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {category.skills.map((skill) => skill.name).join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* ── Awards & Achievements ── */}
          <Section icon={<Trophy className="h-4.5 w-4.5" />} title="Awards & Achievements">
            <div className="space-y-2">
              {achievements.map((ach, i) => (
                <motion.div
                  key={ach.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex gap-3"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                  <div>
                    <p className="text-sm font-medium">{ach.title}</p>
                    <p className="text-xs text-muted-foreground">{ach.description}</p>
                  </div>
                  <span className="ml-auto shrink-0 text-xs text-muted-foreground">{ach.date}</span>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* ── References ── */}
          <div className="mt-8 border-t border-border pt-6 text-center">
            <p className="text-sm italic text-muted-foreground">
              References available upon request
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

/* ── Reusable section wrapper ── */
function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="resume-section mb-8 last:mb-0">
      <h2 className="mb-4 flex items-center gap-2 text-base font-bold uppercase tracking-wider text-primary print:text-sm">
        {icon}
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
