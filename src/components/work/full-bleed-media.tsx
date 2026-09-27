'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useFineCapability } from '@/components/work/motion';
import type { FeaturedProject } from '@/data/projects';

/**
 * Variant 02 media island (ADR-3.5): right-to-left clip-path wipe tied to
 * scroll entry + decorative parallax (yPercent <=8 on an oversized layer).
 * Transform/clip only. Below the capability line the identical static
 * markup renders: no scroll wiring, no clip (FR-18). Bleed escapes the
 * content column to the shell rhythm (canvas "full-bleed media").
 */
export function FullBleedMedia({ project, shot }: { project: FeaturedProject; shot: string }) {
  const fine = useFineCapability();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 88%', 'start 20%'] });
  const clipPath = useTransform(scrollYProgress, [0, 1], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']);
  const yPercent = useTransform(scrollYProgress, [0, 1], [4, -4]);

  const image = shot ? (
    <Image
      src={shot}
      alt={`${project.name} interface visual`}
      width={1440}
      height={900}
      loading="lazy"
      className="h-full w-full object-cover"
      data-showcase-img={project.slug}
    />
  ) : null;

  if (!fine) {
    return (
      <div
        className="relative -mx-1/2 mt-10 overflow-hidden bg-[var(--surface-sunk)]"
        style={{ aspectRatio: '16 / 8.6' }}
      >
        <div className="parallax-deco absolute inset-[-6%]">{image}</div>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className="clip-wipe-target relative -mx-1/2 mt-10 overflow-hidden bg-[var(--surface-sunk)]"
      style={{ aspectRatio: '16 / 8.6', clipPath }}
    >
      <motion.div className="parallax-deco absolute inset-[-6%]" style={{ y: yPercent }}>
        {image}
      </motion.div>
    </motion.div>
  );
}
