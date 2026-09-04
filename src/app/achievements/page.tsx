'use client';

import { motion } from 'framer-motion';
import { PageTransition } from '@/components/shared/page-transition';
import { SectionHeading } from '@/components/shared/section-heading';
import { achievements } from '@/data/achievements';
import { Trophy } from 'lucide-react';

export default function AchievementsPage() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16 md:py-20 max-w-5xl">
        <SectionHeading title="Achievements" description="Things I&apos;m proud of" align="center" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {achievements.map((a, i) => (
            <motion.div key={a.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-primary/10 p-2"><Trophy className="h-5 w-5 text-primary" /></div>
                <div><h3 className="font-semibold">{a.title}</h3><p className="text-sm text-muted-foreground mt-1">{a.description}</p><p className="text-xs text-muted-foreground mt-2">{a.date}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
