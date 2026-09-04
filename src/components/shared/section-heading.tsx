'use client';

import { motion } from 'framer-motion';

/** Animated section heading with consistent styling */
export function SectionHeading({
  title,
  description,
  align = 'left',
}: {
  title: string;
  description?: string;
  align?: 'left' | 'center';
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`section-heading mb-10 ${align === 'center' ? 'text-center' : ''}`}
    >
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {description && (
        <p className="mt-2 text-muted-foreground">{description}</p>
      )}
    </motion.div>
  );
}
