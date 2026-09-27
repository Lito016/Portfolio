'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollCrossLeaf } from '@/components/shared/scroll-cross-leaf';

/** First-viewport scroll cue (FR-06): hairline track with a travelling tick,
 * at most 2 loops, decorative (aria-hidden). Hidden once the user scrolls. */
export function ScrollIndicator() {
  const [scrolled, setScrolled] = useState(false);

  return (
    <>
      <ScrollCrossLeaf startPx={40} onCross={setScrolled} />
      {scrolled ? null : (
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
      )}
    </>
  );
}
