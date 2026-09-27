'use client';

import gsap from 'gsap';
import { useFineCapability, useScrollTriggerLayer } from '@/components/work/motion';

/**
 * Variant 03 motion layer: ghost numeral scrub drift + gentle Ken-Burns
 * scale (1→1.02, transform-only) on the labeled diagram panel.
 * Zero DOM; reverts to the static composition below the capability line.
 */
export function DiagramScrubLayer() {
  const fine = useFineCapability();
  const rootRef = useScrollTriggerLayer(fine, (root) => {
    const article = root.closest('article');
    const ghost = article?.querySelector<HTMLElement>('.ghost-scrub');
    const diagram = article?.querySelector<HTMLElement>('.diagram-scrub');
    if (!article || !ghost || !diagram) return;
    gsap.fromTo(
      ghost,
      { y: 32 },
      { y: -32, ease: 'none', scrollTrigger: { trigger: article, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
    gsap.fromTo(
      diagram,
      { scale: 1 },
      {
        scale: 1.02,
        ease: 'none',
        scrollTrigger: { trigger: diagram, start: 'top 88%', end: 'center 42%', scrub: true },
      },
    );
  });
  return <span ref={rootRef} hidden />;
}
