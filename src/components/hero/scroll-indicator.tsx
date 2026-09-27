'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** First-viewport scroll cue (FR-06): hairline track with a travelling tick,
 * at most 2 loops, decorative (aria-hidden). Hidden once the user scrolls. */
export function ScrollIndicator() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const trigger = ScrollTrigger.create({
      start: '40px top',
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });
    return () => trigger.kill();
  }, []);

  if (scrolled) return null;

  return (
    <div data-scroll-indicator aria-hidden="true" className="absolute inset-x-0 bottom-6 flex justify-center">
      <div className="relative h-12 w-px overflow-hidden bg-[var(--rule)]">
        <motion.span
          className="absolute inset-x-0 top-0 h-4 bg-[var(--ink-muted)]"
          initial={{ y: '-100%' }}
          animate={{ y: '300%' }}
          transition={{ duration: 1.1, ease: [0.165, 0.84, 0.44, 1], repeat: 1 }}
        />
      </div>
    </div>
  );
}
