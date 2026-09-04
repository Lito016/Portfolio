'use client';

import { motion } from 'framer-motion';
import { PageTransition } from '@/components/shared/page-transition';
import { SectionHeading } from '@/components/shared/section-heading';
import { education } from '@/data/education';
import { GraduationCap } from 'lucide-react';

function formatDate(dateStr: string): string {
  if (dateStr.includes('-')) {
    const [year, month] = dateStr.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month, 10) - 1]} ${year}`;
  }
  return dateStr;
}

export default function EducationPage() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16 md:py-20 max-w-4xl">
        <SectionHeading title="Education" description="Formal training and coursework" align="center" />
        <div className="space-y-6">
          {education.map((edu, i) => (
            <motion.div key={edu.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-md bg-primary/10 p-3"><GraduationCap className="h-6 w-6 text-primary" /></div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{edu.degree}</h3>
                  <p className="text-primary font-medium">{edu.school}</p>
                  <p className="text-sm text-muted-foreground">{edu.location} &middot; {formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                  {edu.description && <p className="text-sm text-muted-foreground mt-2">{edu.description}</p>}
                  {edu.courses && edu.courses.length > 0 && (
                    <div className="mt-3"><p className="text-sm font-medium mb-1">Key Courses:</p>
                      <div className="flex flex-wrap gap-1">{edu.courses.map((c) => (
                        <span key={c} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{c}</span>
                      ))}</div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
