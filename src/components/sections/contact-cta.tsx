'use client';

import Link from 'next/link';
import { Mail, ArrowRight } from 'lucide-react';

/** Contact call-to-action */
export function ContactCTA() {
  return (
    <section id="contact-cta" aria-labelledby="contact-heading" className="py-20">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 md:p-12 text-center">
          <div className="inline-flex p-3 rounded-full bg-[var(--accent)] mb-4">
            <Mail className="h-8 w-8 text-[var(--foreground)]" aria-hidden="true" />
          </div>
          <h2 id="contact-heading" className="text-2xl md:text-3xl font-bold mb-3">
            Have a project in mind?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            I&apos;m currently taking on new work — whether it&apos;s an AI integration,
            a full-stack build, or an open-source collaboration, let&apos;s talk.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--foreground)] text-[var(--background)] font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Get in Touch
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
