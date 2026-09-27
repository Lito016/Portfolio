import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-[1440px] flex-col items-center justify-center px-[var(--gutter)] py-24 text-center">
      <p className="label-mono">404</p>
      <h1 className="mt-4 text-3xl font-normal tracking-[-0.02em] text-[var(--ink)]">
        This page is not part of the site.
      </h1>
      <p className="mt-3 text-[var(--ink-muted)]">
        Everything lives on one page now.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-11 items-center rounded-full bg-[var(--accent-deep)] px-6 text-sm text-white"
      >
        Back to the top
      </Link>
    </section>
  );
}
