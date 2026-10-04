'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Profile image with subtle parallax: the image shifts upward as the user
 * scrolls down, creating depth separation from the text column. The effect
 * is disabled under prefers-reduced-motion.
 */
export function ParallaxProfileImage() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Image moves up by 40px as section scrolls out of view
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -40]);
  // Subtle scale-down as it exits (0.98 at the end)
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 0.96]);
  // Slight rotation for organic feel
  const rotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -2]);

  return (
    <div ref={ref} className="shrink-0">
      <motion.div
        className="relative h-[200px] w-[200px] overflow-hidden rounded-2xl md:h-[240px] md:w-[240px]"
        style={{ y, scale, rotate }}
      >
        <Image
          src="/profile.png"
          alt=""
          fill
          className="object-cover object-[center_15%]"
          priority
          sizes="240px"
        />
      </motion.div>
    </div>
  );
}
