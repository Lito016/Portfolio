'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFineCapability, useScrollTriggerLayer } from '@/components/work/motion';

/**
 * Variant 01 motion layer: the single GSAP pin of the page (ADR-3.5).
 * Built only under (min-width:1024px) and (pointer:fine); renders zero DOM.
 * Hold distance is measured geometry, never a guessed range: the frame
 * pins from article-top-under-nav until the text column (metadata
 * reveal) or the article itself has scrolled past it. The media scrub-
 * scales 1→1.025 across exactly that range (transform-only, overflow-
 * hidden wrapper). Exposes data via [data-pin-distance] for evidence.
 * ctx.revert() restores the static layout (FR-18).
 */
export function PinBrowserLayer() {
  const fine = useFineCapability();
  const rootRef = useScrollTriggerLayer(fine, (root) => {
    const article = root.closest('article');
    const pin = article?.querySelector<HTMLElement>('[data-pin-target]');
    const media = article?.querySelector<HTMLElement>('[data-pin-media]');
    const text = article?.querySelector<HTMLElement>('[data-pin-text]');
    if (!article || !pin || !media || !text) return;
    const img = media.querySelector('img') ?? media;

    const distance = () => {
      const hold = Math.max(
        text.offsetHeight - pin.offsetHeight,
        article.offsetHeight - (window.innerHeight - 112),
      );
      const d = Math.round(Math.max(0, hold));
      article.dataset.pinDistance = String(d);
      return d;
    };

    if (distance() <= 0) {
      // Geometry leaves no hold at this viewport: scrub-only fallback, still transform-only.
      gsap.fromTo(img, { scale: 1 }, {
        scale: 1.025,
        ease: 'none',
        scrollTrigger: { trigger: article, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
      });
      return;
    }

    const range = {
      trigger: article,
      start: 'top 112px',
      end: () => `+=${distance()}`,
      invalidateOnRefresh: true,
    };
    ScrollTrigger.create({ ...range, pin, pinSpacing: false, anticipatePin: 1 });
    gsap.fromTo(img, { scale: 1 }, { scale: 1.025, ease: 'none', scrollTrigger: { ...range, scrub: true } });
  });
  return <span ref={rootRef} hidden />;
}
