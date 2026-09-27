import { siteConfig } from '@/config/site';
import { education } from '@/data/education';

const socialLinks = [
  { label: 'GitHub', href: siteConfig.github, external: true },
  { label: 'LinkedIn', href: siteConfig.linkedin, external: true },
  { label: 'Email', href: siteConfig.email, external: false },
] as const;

/** Minimal footer (FR-15): name, © YEAR, location, social links. Inverse panel per ADR-3.7. */
export function Footer() {
  const location = education[0]?.location ?? 'Philippines';

  return (
    <footer className="bg-[var(--inverse-bg)] text-[var(--inverse-fg)]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-y-6 px-[var(--gutter)] py-12">
        <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.08em]">
          {siteConfig.displayName}
        </p>
        <p className="text-sm text-[var(--inverse-muted)]">
          &copy; {new Date().getFullYear()} &middot; {location}
        </p>
        <nav className="flex items-center gap-6" aria-label="Social links">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="inline-flex min-h-11 items-center text-sm text-[var(--inverse-link)] underline-offset-4 transition-colors hover:text-[var(--inverse-fg)] hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
