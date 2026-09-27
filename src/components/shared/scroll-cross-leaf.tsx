'use client';

import { memo, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Zero-DOM GSAP leaf (§10: one component, one animation library).
 * Owns a ScrollTrigger past a scroll-pixel start and reports the crossing. */
export const ScrollCrossLeaf = memo(function ScrollCrossLeaf({
  startPx,
  onCross,
}: {
  startPx: number;
  onCross: (past: boolean) => void;
}) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const trigger = ScrollTrigger.create({
      start: `${startPx}px top`,
      onEnter: () => onCross(true),
      onLeaveBack: () => onCross(false),
    });
    return () => trigger.kill();
  }, [startPx, onCross]);
  return null;
});
