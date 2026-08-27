'use client';

import { useState } from 'react';
import { Bot, Globe2, Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import { teamMembers } from '@/data/team';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

function WirePattern({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 240 240" fill="none" aria-hidden="true">
      {Array.from({ length: 11 }, (_, index) => (
        <ellipse
          key={index}
          cx="120"
          cy="120"
          rx={34 + index * 9}
          ry={92 - index * 3}
          transform={`rotate(${index * 4 - 20} 120 120)`}
          stroke="currentColor"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

/** Responsive, data-driven team identity banner. */
export function Hero() {
  const [activeMemberId, setActiveMemberId] = useState(teamMembers[0]?.id ?? '');
  const member = teamMembers.find(({ id }) => id === activeMemberId) ?? teamMembers[0];

  if (!member) return null;

  return (
    <section className="relative pb-12 pt-2 sm:pb-16" aria-labelledby="team-member-name">
      <div className="team-banner">
        <div className="team-banner-shape team-banner-shape-one" aria-hidden="true" />
        <div className="team-banner-shape team-banner-shape-two" aria-hidden="true" />
        <div className="team-banner-shape team-banner-shape-three" aria-hidden="true" />
        <div className="team-banner-glow" aria-hidden="true" />
        <WirePattern className="team-banner-wire -left-24 -top-24 sm:-left-16 sm:-top-20" />
        <WirePattern className="team-banner-wire -bottom-28 -right-24 rotate-12 sm:-right-14" />

        {teamMembers.length > 1 && (
          <label className="absolute right-5 top-5 z-20 text-xs text-[var(--team-banner-muted)] sm:right-8 sm:top-7">
            <span className="sr-only">Choose a team member</span>
            <select
              value={member.id}
              onChange={(event) => setActiveMemberId(event.target.value)}
              className="rounded-full border border-[var(--team-banner-border)] bg-[var(--team-banner-surface)] px-3 py-2 text-sm text-[var(--team-banner-foreground)] backdrop-blur-md"
              aria-label="Choose a team member"
            >
              {teamMembers.map(({ id, name }) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
          </label>
        )}

        <div className="relative z-10 grid h-full min-h-[28rem] items-center gap-7 px-7 py-9 sm:min-h-[30rem] sm:px-12 lg:min-h-0 lg:grid-cols-[minmax(0,1.55fr)_minmax(20rem,0.85fr)] lg:gap-14 lg:px-[9vw] lg:py-8">
          <div className="min-w-0">
            <h1 id="team-member-name" className="text-balance text-3xl font-semibold tracking-tight text-[var(--team-banner-foreground)] sm:text-5xl lg:text-6xl 2xl:text-7xl">
              {member.name}
            </h1>
            <p className="mt-3 font-mono text-xs font-semibold uppercase leading-relaxed tracking-[0.1em] text-[var(--team-banner-muted)] sm:text-sm lg:text-base">
              {member.role}
            </p>
            <div className="mt-3 h-1 w-36 rounded-full bg-[var(--team-banner-foreground)] sm:w-56" aria-hidden="true" />
          </div>

          <div className="min-w-0 lg:border-l-2 lg:border-[var(--team-banner-border-strong)] lg:pl-14">
            <div className="mb-6 flex items-center gap-3 text-lg font-medium text-[var(--team-banner-foreground)] sm:text-xl lg:absolute lg:right-[8vw] lg:top-8">
              <Bot className="h-8 w-8" aria-hidden="true" />
              <span>{member.handle}</span>
            </div>

            <address className="space-y-5 not-italic text-[var(--team-banner-foreground)]">
              {member.phone && member.phoneLabel && (
                <a className="team-contact-link" href={member.phone}>
                  <Phone aria-hidden="true" />
                  <span>{member.phoneLabel}</span>
                </a>
              )}
              {member.email && (
                <a className="team-contact-link" href={member.email}>
                  <Mail aria-hidden="true" />
                  <span>{member.email.replace('mailto:', '')}</span>
                </a>
              )}
              {member.linkedin && (
                <a className="team-contact-link" href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <Globe2 aria-hidden="true" />
                  <span>LinkedIn</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
              {member.website && member.websiteLabel && (
                <a className="team-contact-link" href={member.website} target="_blank" rel="noopener noreferrer">
                  <Globe2 aria-hidden="true" />
                  <span>{member.websiteLabel}</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </address>
          </div>
        </div>
      </div>

      <div className="relative z-20 mx-auto mt-5 flex w-full max-w-6xl items-center gap-4 px-5 sm:mt-6 sm:gap-6 sm:px-8">
        {member.profileImage && (
          <div className="relative shrink-0">
            <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-[var(--background)] bg-[var(--background)] shadow-2xl sm:h-32 sm:w-32">
              <Image
                key={member.profileImage}
                src={`${basePath}${member.profileImage}`}
                alt={`${member.name} profile picture`}
                width={128}
                height={128}
                preload
                className="h-full w-full object-cover"
              />
            </div>
            {member.availability && (
              <span
                className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-4 border-[var(--background)] bg-emerald-400 sm:bottom-2 sm:right-2 sm:h-6 sm:w-6"
                role="img"
                aria-label={member.availability}
              />
            )}
          </div>
        )}

        {member.bio && (
          <div className="glass-card min-w-0 flex-1 rounded-2xl px-4 py-4 sm:px-6 sm:py-5">
            {member.availability && (
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-500 dark:text-emerald-400">
                {member.availability}
              </p>
            )}
            <p className="text-sm leading-relaxed text-[var(--foreground)]/75 sm:text-base">
              {member.bio}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
