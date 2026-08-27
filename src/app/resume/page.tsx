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
  Award,
  Code2,
  Trophy,
  Mail,
  Phone,
  Globe,
  MapPin,
  Printer,
} from 'lucide-react';
import { SiGithub } from 'react-icons/si';

const member = teamMembers[0];

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
                  IT Graduate &nbsp;|&nbsp; Web &amp; Mobile Developer &nbsp;|&nbsp; Office Staff
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  Galimuyod, Ilocos Sur
                </p>
              </div>

              <div className="space-y-1.5 text-sm">
                <a
                  href="mailto:manolitoalmadenjr@gmail.com"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  manolitoalmadenjr@gmail.com
                </a>
                <a
                  href="tel:+639275345229"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  09275345229
                </a>
                <a
                  href="https://github.com/Lito016"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <SiGithub className="h-3.5 w-3.5 shrink-0" />
                  github.com/Lito016
                </a>
                <a
                  href="https://linkedin.com/in/manolito-almaden-jr-a54a6634a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Globe className="h-3.5 w-3.5 shrink-0" />
                  linkedin.com/in/manolito-almaden-jr-a54a6634a
                </a>
              </div>
            </div>

            {/* Objective */}
            <div className="mt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Objective
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                A motivated and detail-oriented Bachelor of Science in Information Technology
                graduate seeking an office staff or IT support role where I can apply my web and
                mobile development skills, technical expertise, and dedication to contribute to
                organizational goals.
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
                    <p>{exp.startDate} &ndash; {exp.endDate}</p>
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

          {/* ── Technical Skills (Marquee) ── */}
          <Section icon={<Code2 className="h-4.5 w-4.5" />} title="Technical Skills">
            <ResumeSkillsMarquee />
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

/* ── Resume skills marquee ── */
const resumeTechStack = [
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'JavaScript', color: '#f1e05a' },
  { name: 'Python', color: '#3572A5' },
  { name: 'React', color: '#61dafb' },
  { name: 'Next.js', color: '#000000' },
  { name: 'Node.js', color: '#339933' },
  { name: 'Tailwind CSS', color: '#06b6d4' },
  { name: 'Framer Motion', color: '#0055ff' },
];

function TechPill({ tech }: { tech: (typeof resumeTechStack)[number] }) {
  return (
    <span className="mx-2.5 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm font-medium text-muted-foreground">
      <span
        className="h-2.5 w-2.5 shrink-0 rounded-full"
        style={{
          backgroundColor: tech.color,
          boxShadow: `0 0 8px ${tech.color}40`,
        }}
      />
      {tech.name}
    </span>
  );
}

function ResumeSkillsMarquee() {
  return (
    <div className="relative overflow-hidden rounded-xl py-3">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-r from-[var(--glass)] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-l from-[var(--glass)] to-transparent" />

      {/* Scrolling row — framer-motion driven */}
      <motion.div
        className="flex w-max whitespace-nowrap"
        animate={{ x: ['0', '-50%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
            duration: 20,
          },
        }}
        style={{ willChange: 'transform' }}
      >
        {resumeTechStack.map((tech) => (
          <TechPill key={`a-${tech.name}`} tech={tech} />
        ))}
        {resumeTechStack.map((tech) => (
          <TechPill key={`b-${tech.name}`} tech={tech} />
        ))}
      </motion.div>

      {/* Print-only fallback: static list */}
      <div className="hidden print:flex print:flex-wrap print:gap-2">
        {resumeTechStack.map((tech) => (
          <span
            key={tech.name}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-xs font-medium"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: tech.color }}
            />
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  );
}
