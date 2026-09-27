'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { navAnchorItems } from '@/config/navigation';
import { siteConfig } from '@/config/site';

/** Fixed minimal navigation: name left, anchor links right (FR-02). */
export function Header() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const trigger = ScrollTrigger.create({
      start: '80px top',
      onEnter: () => setCompact(true),
      onLeaveBack: () => setCompact(false),
    });
    return () => trigger.kill();
  }, []);

  return (
    <header
      className={
        compact
          ? 'fixed inset-x-0 top-0 z-50 border-b border-[var(--rule)] bg-[rgba(248,249,252,0.88)] backdrop-blur-md transition-colors'
          : 'fixed inset-x-0 top-0 z-50 border-b border-transparent bg-transparent transition-colors'
      }
    >
      <div
        className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-[var(--gutter)]"
        style={{ height: 'var(--nav-h)' }}
      >
        <Link
          href="/"
          className="font-mono text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--ink)]"
        >
          {siteConfig.displayName}
        </Link>
        <nav className="flex items-center gap-2 sm:gap-6" aria-label="Main navigation">
          {navAnchorItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link inline-flex items-center px-2 text-sm sm:px-0"
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
