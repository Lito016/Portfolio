'use client';

import Link from 'next/link';
import { Mail, ArrowRight } from 'lucide-react';

/** Contact call-to-action */
export function ContactCTA() {
  return (
    <section id="contact-cta" className="py-20">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 md:p-12 text-center">
          <div className="inline-flex p-3 rounded-full bg-[var(--accent)] mb-4">
            <Mail className="h-8 w-8 text-[var(--foreground)]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Let&apos;s Work Together
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Have a project in mind or want to collaborate? I&apos;m always open to
            discussing new opportunities and ideas.
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
