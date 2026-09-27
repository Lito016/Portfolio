'use client';

import { MotionConfig } from 'framer-motion';

/** Motion runtime wrapper: reduced-motion parity is a hard requirement (FR-18). */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.25, ease: [0.165, 0.84, 0.44, 1] }}
    >
      {children}
    </MotionConfig>
  );
}
