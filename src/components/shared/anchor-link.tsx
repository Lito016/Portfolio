'use client';

import { type MouseEvent, type ReactNode } from 'react';
import { useSmoothScroll } from '@/components/scroll/smooth-scroll-provider';

/** In-page anchor that routes navigation through Lenis (native href stays the fallback). */
export function AnchorLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const scrollTo = useSmoothScroll();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    scrollTo(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
