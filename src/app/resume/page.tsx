'use client';

import { motion } from 'framer-motion';
import { PageTransition } from '@/components/shared/page-transition';
import { SectionHeading } from '@/components/shared/section-heading';
import { experiences } from '@/data/experience';
import { education } from '@/data/education';
import { certifications } from '@/data/certifications';
import { skillCategories } from '@/data/skills';
import { Briefcase, GraduationCap, Award, Code } from 'lucide-react';

export default function ResumePage() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16 md:py-20 max-w-4xl">
        <SectionHeading title="Resume" description="Professional experience, education, and skills" align="center" />
        <div className="space-y-10">
          <section>
            <h2 className="flex items-center gap-2 text-xl font-semibold mb-4"><Briefcase className="h-5 w-5 text-primary" />Experience</h2>
            <div className="space-y-4">
              {experiences.map((exp, i) => (
                <motion.div key={exp.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-xl p-5">
                  <h3 className="font-semibold">{exp.role}</h3>
                  <p className="text-sm text-primary">{exp.company}</p>
                  <p className="text-xs text-muted-foreground">{exp.startDate} - {exp.endDate}</p>
                  <ul className="text-sm text-muted-foreground mt-2 list-disc list-inside space-y-1">{exp.description.map((d, j) => (<li key={j}>{d}</li>))}</ul>
                </motion.div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="flex items-center gap-2 text-xl font-semibold mb-4"><GraduationCap className="h-5 w-5 text-primary" />Education</h2>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <motion.div key={edu.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-xl p-5">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-sm text-primary">{edu.school}</p>
                  <p className="text-xs text-muted-foreground">{edu.startDate} - {edu.endDate}</p>
                </motion.div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="flex items-center gap-2 text-xl font-semibold mb-4"><Award className="h-5 w-5 text-primary" />Certifications</h2>
            <div className="space-y-4">
              {certifications.map((cert, i) => (
                <motion.div key={cert.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-xl p-5">
                  <h3 className="font-semibold">{cert.name}</h3>
                  <p className="text-sm text-primary">{cert.issuer}</p>
                  <p className="text-xs text-muted-foreground">{cert.date}</p>
                </motion.div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="flex items-center gap-2 text-xl font-semibold mb-4"><Code className="h-5 w-5 text-primary" />Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skillCategories.flatMap((cat) => cat.skills).map((skill, i) => (
                <motion.span key={skill.name} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.02 }}
                  className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}
