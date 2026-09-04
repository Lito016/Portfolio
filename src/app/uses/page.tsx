'use client';

import { motion } from 'framer-motion';
import { PageTransition } from '@/components/shared/page-transition';
import { SectionHeading } from '@/components/shared/section-heading';
import { usesItems } from '@/data/uses';

export default function UsesPage() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16 md:py-20 max-w-4xl">
        <SectionHeading title="Uses" description="Hardware, software, and config I use daily" align="center" />
        <div className="space-y-8">
          {usesItems.map((cat, i) => (
            <motion.div key={cat.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <h3 className="text-lg font-semibold mb-3">{cat.category}</h3>
              <div className="space-y-2">
                {cat.items.map((item) => (
                  <div key={item.name} className="flex items-start gap-3 glass-card rounded-xl p-4">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">Link</a>}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
