'use client';

import { useState } from 'react';
import { Globe2, Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import { teamMembers } from '@/data/team';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** Responsive, data-driven team identity banner. */
export function Hero() {
  const [activeMemberId, setActiveMemberId] = useState(teamMembers[0]?.id ?? '');
  const member = teamMembers.find(({ id }) => id === activeMemberId) ?? teamMembers[0];

  if (!member) return null;

  return (
    <section className="relative pb-12 pt-8 sm:pb-16 sm:pt-12" aria-labelledby="team-member-name">
      <div className="team-banner">
        {teamMembers.length > 1 && (
          <label className="absolute right-5 top-5 z-20 text-xs sm:right-8 sm:top-7">
            <span className="sr-only">Choose a team member</span>
            <select
              value={member.id}
              onChange={(event) => setActiveMemberId(event.target.value)}
              className="rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--foreground)]"
              aria-label="Choose a team member"
            >
              {teamMembers.map(({ id, name }) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
          </label>
        )}

        <div className="relative z-10 grid items-center gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(20rem,0.85fr)] lg:gap-14 lg:px-[9vw] lg:py-14">
          <div className="min-w-0">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:text-sm">
              Human-centered systems · Applied intelligence
            </p>
            <h1 id="team-member-name" className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl lg:text-6xl 2xl:text-7xl">
              {member.name}
            </h1>
            <p className="mt-3 text-sm font-medium text-muted-foreground sm:text-base lg:text-lg">
              {member.role}
            </p>
          </div>

          <div className="min-w-0 lg:border-l lg:border-[var(--border)] lg:pl-14">
            <address className="space-y-3 not-italic">
              {member.phone && member.phoneLabel && (
                <a className="team-contact-link" href={member.phone}>
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <span>{member.phoneLabel}</span>
                </a>
              )}
              {member.email && (
                <a className="team-contact-link" href={member.email}>
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>{member.email.replace('mailto:', '')}</span>
                </a>
              )}
              {member.linkedin && (
                <a className="team-contact-link" href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <Globe2 className="h-4 w-4" aria-hidden="true" />
                  <span>LinkedIn</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
              {member.website && member.websiteLabel && (
                <a className="team-contact-link" href={member.website} target="_blank" rel="noopener noreferrer">
                  <Globe2 className="h-4 w-4" aria-hidden="true" />
                  <span>{member.websiteLabel}</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </address>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 flex w-full max-w-6xl items-center gap-4 px-5 sm:mt-8 sm:gap-6 sm:px-8">
        {member.profileImage && (
          <div className="relative shrink-0">
            <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-[var(--background)] sm:h-28 sm:w-28">
              <Image
                key={member.profileImage}
                src={`${basePath}${member.profileImage}`}
                alt={`${member.name} profile picture`}
                width={112}
                height={112}
                preload
                className="h-full w-full object-cover"
              />
            </div>
            {member.availability && (
              <span
                className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-3 border-[var(--background)] bg-emerald-400 sm:bottom-1 sm:right-1 sm:h-5 sm:w-5"
                role="img"
                aria-label={member.availability}
              />
            )}
          </div>
        )}

        {member.bio && (
          <div className="min-w-0 flex-1 rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-4 sm:px-6 sm:py-5">
            {member.availability && (
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-600 dark:text-emerald-400">
                {member.availability}
              </p>
            )}
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {member.bio}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
