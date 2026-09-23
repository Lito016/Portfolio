'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { teamMembers } from '@/data/team';
import { siteConfig, POSITIONING } from '@/config/site';
import { InteractiveBackground } from '@/components/shared/interactive-background';
import { TextReveal } from '@/components/shared/text-reveal';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const member = teamMembers[0];

const heroCtas = [
  { label: 'View Projects', href: '/projects', external: false, kind: 'primary' },
  { label: 'GitHub', href: siteConfig.github, external: true, kind: 'outline' },
  { label: 'Resume', href: '/resume', external: false, kind: 'ghost' },
] as const;

const ctaClasses: Record<string, string> = {
  primary:
    'rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90',
  outline:
    'rounded-lg border border-[var(--border)] bg-[var(--card)] px-5 py-2.5 text-sm font-medium transition-colors hover:border-[var(--foreground)]/20',
  ghost: 'rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-[var(--foreground)]',
};

/** Clean identity banner — Linear-inspired dark surface. */
export function Hero() {
  if (!member) return null;

  return (
    <section className="portfolio-hero" aria-labelledby="team-member-name">
      <div className="team-banner">
        {/* Interactive particle background */}
        <InteractiveBackground />
        <div className="relative z-10 mx-auto grid w-full max-w-[var(--content-wide)] items-center gap-8 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16 lg:px-12 lg:py-14">
          {/* Left: Profile */}
          <motion.div
            className="relative flex items-center justify-center lg:border-r lg:border-[var(--border)] lg:pr-10"
            style={{ minHeight: '280px' }}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {member.profileImage && (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-56 w-56 sm:h-72 sm:w-72">
                <Image
                  src={`${basePath}${member.profileImage}`}
                  alt={`${member.name} profile picture`}
                  fill
                  preload
                  className="object-cover"
                  sizes="288px"
                />
              </div>
            )}
          </motion.div>

          {/* Right: Identity */}
          <div className="min-w-0">
            <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
              {POSITIONING}
            </p>
            <TextReveal
              text={member.name}
              className="text-balance text-4xl font-semibold tracking-[-0.025em] text-[var(--foreground)] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]"
              as="h1"
              id="team-member-name"
            />
            <motion.p
              className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {member.bio}
            </motion.p>
            <motion.p
              className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
            >
              Systems that run operations — designed, built, tested, and deployed end to end.
            </motion.p>
            <motion.div
              className="mt-7 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {heroCtas.map((cta) =>
                cta.external ? (
                  <a
                    key={cta.label}
                    href={cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 ${ctaClasses[cta.kind]}`}
                  >
                    {cta.label}
                  </a>
                ) : (
                  <Link
                    key={cta.label}
                    href={cta.href}
                    className={`inline-flex items-center gap-2 ${ctaClasses[cta.kind]}`}
                  >
                    {cta.label}
                    {cta.kind === 'primary' && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                  </Link>
                )
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
