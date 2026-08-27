'use client';

import { motion } from 'framer-motion';
import { PageTransition } from '@/components/shared/page-transition';
import { SectionHeading } from '@/components/shared/section-heading';
import { nowData } from '@/data/now';
import { Wrench, BookOpen, Brain, Lightbulb } from 'lucide-react';

export default function NowPage() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16 md:py-20 max-w-3xl">
        <SectionHeading title="/now" description={`Last updated: ${nowData.lastUpdated}`} align="center" />
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2"><Wrench className="h-5 w-5 text-primary" /><h3 className="font-semibold">Building</h3></div>
            <p className="text-muted-foreground">{nowData.building}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2"><BookOpen className="h-5 w-5 text-primary" /><h3 className="font-semibold">Learning</h3></div>
            <div className="flex flex-wrap gap-1">{nowData.learning.map((l) => (<span key={l} className="text-sm px-3 py-1 rounded-full bg-muted">{l}</span>))}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2"><Brain className="h-5 w-5 text-primary" /><h3 className="font-semibold">Exploring</h3></div>
            <p className="text-muted-foreground">{nowData.exploring}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2"><Lightbulb className="h-5 w-5 text-primary" /><h3 className="font-semibold">Thinking About</h3></div>
            <p className="text-muted-foreground">{nowData.thinkingAbout}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-xl p-6">
            <h3 className="font-semibold mb-2">Currently Working On</h3>
            <ul className="space-y-1">{nowData.workingOn.map((w, i) => (<li key={i} className="text-sm text-muted-foreground flex gap-2"><span className="text-primary">&bull;</span>{w}</li>))}</ul>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
