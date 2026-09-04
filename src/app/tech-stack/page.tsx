'use client';

import { motion } from 'framer-motion';
import { PageTransition } from '@/components/shared/page-transition';
import { SectionHeading } from '@/components/shared/section-heading';
import { techStackItems } from '@/data/skills';

export default function TechStackPage() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16 md:py-20 max-w-5xl">
        <SectionHeading
          title="Tech Stack"
          description="Tools and frameworks in my regular rotation"
          align="center"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {techStackItems.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className="glass-card rounded-xl p-4 text-center hover:border-primary/50 transition-colors"
            >
              <div
                className="w-3 h-3 rounded-full mx-auto mb-2"
                style={{ backgroundColor: tech.color }}
              />
              <p className="text-sm font-medium">{tech.name}</p>
              <p className="text-xs text-muted-foreground capitalize mt-0.5">{tech.category}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
