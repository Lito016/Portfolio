'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { MorphingParticles } from '@/components/shared/morphing-particles';

/** Contact call-to-action with morphing particle background */
export function ContactCTA() {
  return (
    <section id="contact-cta" aria-labelledby="contact-heading" className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] p-8 md:p-12">
          {/* Morphing particle blobs */}
          <MorphingParticles />
          <div className="relative z-10 max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
            <p className="mb-2 text-[13px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Contact
            </p>
            <h2 id="contact-heading" className="text-2xl font-semibold tracking-tight md:text-3xl">
              Have a project in mind?
            </h2>
            <p className="mt-3 text-muted-foreground">
              I&apos;m currently taking on new work — whether it&apos;s an AI integration,
              a full-stack build, or an open-source collaboration, let&apos;s talk.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Get in Touch
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
