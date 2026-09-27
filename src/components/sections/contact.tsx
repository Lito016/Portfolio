import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { Reveal } from '@/components/shared/reveal';

/**
 * Contact close (FR-14/REQ-14): the single tonal inversion (ADR-3.7).
 * Oversized display statement + three direct anchors whose hrefs are the
 * siteConfig values verbatim (W19/W26) + one large pill CTA (mailto).
 * ADR-3.9: no form, no endpoint — static anchors only.
 */
const contactLinks = [
  { label: 'Email', href: siteConfig.email, external: false },
  { label: 'LinkedIn', href: siteConfig.linkedin, external: true },
  { label: 'GitHub', href: siteConfig.github, external: true },
] as const;

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="on-ink bg-[var(--inverse-bg)] px-[var(--gutter)] py-[clamp(64px,10vw,140px)] text-[var(--inverse-fg)]"
    >
      <div className="mx-auto w-full max-w-[var(--content-wide)]">
        <Reveal>
          <p className="label-mono">Contact</p>
          <h2
            id="contact-heading"
            className="mt-6 max-w-[16ch] font-medium leading-[0.9] tracking-[-0.03em] text-[clamp(2.5rem,7vw,7rem)]"
          >
            LET&rsquo;S BUILD SOMETHING.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-3">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="contact-link inline-flex min-h-11 items-center text-[15px] font-medium text-[var(--inverse-link)] underline-offset-4"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href={siteConfig.email}
            className="cta-pill mt-10 inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--inverse-fg)] px-7 py-3 text-[15px] font-medium text-[var(--ink)]"
          >
            Start a conversation
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
