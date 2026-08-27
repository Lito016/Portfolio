'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SiGithub } from 'react-icons/si';
import { Bot, Mail, Heart, Globe } from 'lucide-react';
import { siteConfig } from '@/config/site';

/** Site footer with darker glassmorphic styling */
export function Footer() {
  const currentYear = new Date().getFullYear();
  const [mascotWalk, setMascotWalk] = useState(0);

  return (
    <footer className="relative overflow-hidden border-t border-[var(--border)]">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <div className="h-full bg-gradient-to-r from-transparent via-[var(--gradient-start)] to-transparent opacity-20" />
      </div>

      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-2 gradient-text">{siteConfig.displayName}</h3>
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
                  className="text-sm text-muted-foreground hover:text-[var(--gradient-start)] transition-colors"
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
                className="p-2.5 rounded-full glass-card-hover"
                aria-label="GitHub profile"
              >
                <SiGithub className="h-5 w-5 text-[var(--gradient-start)]" />
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full glass-card-hover"
                aria-label="LinkedIn profile"
              >
                <Globe className="h-5 w-5 text-[var(--gradient-start)]" />
              </a>
              <a
                href={siteConfig.email}
                className="p-2.5 rounded-full glass-card-hover"
                aria-label="Send email"
              >
                <Mail className="h-5 w-5 text-[var(--gradient-start)]" />
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
              className="gradient-text cursor-pointer font-medium focus-visible:rounded-sm"
              onClick={() => setMascotWalk((walk) => walk + 1)}
              aria-label={`${siteConfig.displayName}: send the footer mascot for a walk`}
              title="Psst... click me"
            >
              {siteConfig.displayName}
            </button>{' '}
            &copy; {currentYear}
          </p>
        </div>
      </div>

      {mascotWalk > 0 && (
        <div
          key={mascotWalk}
          className="footer-shimeji"
          onAnimationEnd={(event) => {
            if (event.animationName === 'footer-shimeji-walk') setMascotWalk(0);
          }}
          aria-hidden="true"
        >
          <span className="footer-shimeji-body">
            <Bot />
          </span>
          <span className="footer-shimeji-shadow" />
        </div>
      )}
    </footer>
  );
}
