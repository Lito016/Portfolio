'use client';

import { motion } from 'framer-motion';
import { PageTransition } from '@/components/shared/page-transition';
import { SectionHeading } from '@/components/shared/section-heading';
import { experiences } from '@/data/experience';
import { Briefcase, Calendar } from 'lucide-react';

function formatDate(dateStr: string): string {
  if (dateStr === 'Present') return 'Present';
  const [year, month] = dateStr.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function ExperiencePage() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16 md:py-20 max-w-4xl">
        <SectionHeading title="Experience" description="Where I&apos;ve worked and what I shipped" align="center" />
        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <motion.div key={exp.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold">{exp.role}</h3>
                  <p className="text-primary font-medium">{exp.company}</p>
                </div>
                <span className="text-sm text-muted-foreground flex items-center gap-1 shrink-0">
                  <Calendar className="h-3 w-3" />{formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1"><Briefcase className="h-3 w-3" />{exp.location} &middot; {exp.type}</p>
              <ul className="space-y-1 mb-4">
                {exp.description.map((d, j) => (
                  <li key={j} className="text-sm text-muted-foreground flex gap-2"><span className="text-primary mt-1">&bull;</span>{d}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1">
                {exp.technologies.map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
