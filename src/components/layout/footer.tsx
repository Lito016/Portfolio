'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SiGithub } from 'react-icons/si';
import { Mail, Heart, Globe } from 'lucide-react';
import { siteConfig } from '@/config/site';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const SHIMEJI_WALK_START = 7;
const SHIMEJI_WALK_END = 12;

function shimejiFrameSource(frame: number) {
  return `${basePath}/shimeji/frame_${String(frame).padStart(2, '0')}.png`;
}

/** Site footer */
export function Footer() {
  const currentYear = new Date().getFullYear();
  const [mascotWalk, setMascotWalk] = useState(0);
  const [mascotFrame, setMascotFrame] = useState(SHIMEJI_WALK_START);
  const [mascotDistance, setMascotDistance] = useState(0);

  useEffect(() => {
    if (mascotWalk === 0) return;

    const frameTimer = window.setInterval(() => {
      setMascotFrame((frame) =>
        frame >= SHIMEJI_WALK_END ? SHIMEJI_WALK_START : frame + 1
      );
    }, 120);

    return () => window.clearInterval(frameTimer);
  }, [mascotWalk]);

  const startMascotWalk = () => {
    for (let frame = SHIMEJI_WALK_START; frame <= SHIMEJI_WALK_END; frame += 1) {
      const sprite = new window.Image();
      sprite.src = shimejiFrameSource(frame);
    }
    setMascotFrame(SHIMEJI_WALK_START);
    setMascotDistance(window.innerWidth + 112);
    setMascotWalk((walk) => walk + 1);
  };

  return (
    <footer className="border-t border-[var(--border)]">

      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="mb-2 text-lg font-bold">
              <button
                type="button"
                className="cursor-pointer font-bold text-[var(--foreground)] focus-visible:rounded-sm"
                onClick={startMascotWalk}
                aria-label={`${siteConfig.displayName}: play the mascot walk, then visit GitHub`}
                title="Psst... click me"
              >
                {siteConfig.displayName}
              </button>
            </h3>
            <p className="text-sm text-muted-foreground">
              AI Solution Developer building intelligent web applications and
              open-source contributions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-muted-foreground">Quick Links</h4>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation">
              {[
                { title: 'About', href: '/about' },
                { title: 'Projects', href: '/projects' },
                { title: 'Contact', href: '/contact' },
                { title: 'Resume', href: '/resume' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-[var(--foreground)] transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-muted-foreground">Connect</h4>
            <div className="flex gap-3">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-[var(--border)] transition-colors hover:border-[var(--foreground)]/20"
                aria-label="GitHub profile"
              >
                <SiGithub className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-[var(--border)] transition-colors hover:border-[var(--foreground)]/20"
                aria-label="LinkedIn profile"
              >
                <Globe className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.email}
                className="p-2.5 rounded-full border border-[var(--border)] transition-colors hover:border-[var(--foreground)]/20"
                aria-label="Send email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-8 border-t border-[var(--border)] text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            Built with <Heart className="h-3 w-3 text-red-500" fill="currentColor" /> by{' '}
            <button
              type="button"
              className="cursor-pointer font-medium text-[var(--foreground)] focus-visible:rounded-sm"
              onClick={startMascotWalk}
              aria-label={`${siteConfig.displayName}: play the mascot walk, then visit GitHub`}
              title="Psst... click me"
            >
              {siteConfig.displayName}
            </button>{' '}
            &copy; {currentYear}
          </p>
        </div>
      </div>

      {mascotWalk > 0 && (
        <motion.div
          key={mascotWalk}
          className="footer-shimeji"
          initial={{ transform: 'translate3d(-112px, 0, 0)' }}
          animate={{ transform: `translate3d(${mascotDistance}px, 0, 0)` }}
          transition={{ duration: 3.6, ease: 'linear' }}
          onAnimationComplete={() => {
            setMascotWalk(0);
            window.location.assign('https://github.com/Lito016');
          }}
          aria-hidden="true"
        >
          <span className="footer-shimeji-body">
            <Image
              src={shimejiFrameSource(mascotFrame)}
              alt=""
              width={323}
              height={278}
              unoptimized
            />
          </span>
          <span className="footer-shimeji-shadow" />
        </motion.div>
      )}
    </footer>
  );
}
