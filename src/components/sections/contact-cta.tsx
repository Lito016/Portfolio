'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, ArrowRight } from 'lucide-react';

/** Contact call-to-action with gradient background and glass card */
export function ContactCTA() {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="glow-orb glow-orb-purple w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          {/* Top gradient line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--gradient-start)] to-transparent" />

          <div className="relative z-10">
            <div className="inline-flex p-3 rounded-full bg-gradient-to-br from-[var(--gradient-start)]/10 to-[var(--gradient-end)]/10 border border-[var(--glass-border)] mb-4">
              <Mail className="h-8 w-8 text-[var(--gradient-start)]" style={{ filter: 'var(--drop-shadow)' }} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              <span className="gradient-text">Let&apos;s Work Together</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Have a project in mind or want to collaborate? I&apos;m always open to
              discussing new opportunities and ideas.
            </p>
            <Link
              href="/contact"
              className="btn-gradient inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm"
            >
              Get in Touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
