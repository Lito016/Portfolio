'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useFineCapability } from '@/components/work/motion';
import type { FeaturedProject } from '@/data/projects';

/**
 * Variant 02 media island (ADR-3.5): right-to-left clip-path wipe tied to
 * scroll entry + decorative parallax (yPercent <=8 on an oversized layer).
 * Transform/clip only. The framer hooks live in FullBleedMotion, mounted
 * only above the capability line: below it the identical static markup
 * renders with no scroll wiring and no clip (FR-18) — and no useScroll
 * bound to a ref that never mounts (motion.dev hydration error). Bleed
 * escapes the content column to the shell rhythm (canvas "full-bleed media").
 */
function Shot({ project, shot }: { project: FeaturedProject; shot: string }) {
  return shot ? (
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
}

function FullBleedMotion({ project, shot }: { project: FeaturedProject; shot: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 88%', 'start 20%'] });
  const clipPath = useTransform(scrollYProgress, [0, 1], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']);
  const yPercent = useTransform(scrollYProgress, [0, 1], [4, -4]);

  return (
    <motion.div
      ref={ref}
      className="clip-wipe-target relative -mx-1/2 mt-10 overflow-hidden bg-[var(--surface-sunk)]"
      style={{ aspectRatio: '16 / 8.6', clipPath }}
    >
      <motion.div className="parallax-deco absolute inset-[-6%]" style={{ y: yPercent }}>
        <Shot project={project} shot={shot} />
      </motion.div>
    </motion.div>
  );
}

export function FullBleedMedia({ project, shot }: { project: FeaturedProject; shot: string }) {
  const fine = useFineCapability();

  if (!fine) {
    return (
      <div
        className="relative -mx-1/2 mt-10 overflow-hidden bg-[var(--surface-sunk)]"
        style={{ aspectRatio: '16 / 8.6' }}
      >
        <div className="parallax-deco absolute inset-[-6%]">
          <Shot project={project} shot={shot} />
        </div>
      </div>
    );
  }

  return <FullBleedMotion project={project} shot={shot} />;
}
