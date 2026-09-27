'use client';

import Link from 'next/link';
import { AlertTriangle, Home } from 'lucide-react';

/** Segment-level error boundary (app/error.tsx): renders inside the root
 * layout, so it must NOT redefine <html>/<body> (that is global-error's job per
 * the bundled Next 16 error.md convention) and uses the stable `retry` prop.
 * Current token vocabulary; destructive role reserved for this page (canvas law). */
export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] text-center px-4 bg-[var(--bg-canvas)] text-[var(--ink)]">
      <div className="max-w-md">
        <div className="bg-[var(--surface-sunk)] p-4 mb-4 mx-auto w-fit"><AlertTriangle className="h-8 w-8 text-destructive" aria-hidden="true" /></div>
        <h2 className="text-xl font-bold">Something went wrong</h2>
        <p className="mt-2 text-[var(--ink-muted)]">{error.message || 'An unexpected error occurred.'}</p>
        <div className="flex items-center justify-center gap-3 mt-6">
          <button onClick={() => retry()} className="inline-flex min-h-11 items-center gap-2 px-4 py-2 text-sm rounded-[8px] bg-[var(--accent-deep)] text-[var(--surface)] hover:opacity-90 transition-opacity">Try again</button>
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 px-4 py-2 text-sm rounded-[8px] border border-[var(--rule)] text-[var(--ink)] hover:bg-[var(--surface-sunk)] transition-colors">
            <Home className="h-4 w-4" aria-hidden="true" />Home
          </Link>
        </div>
      </div>
    </div>
  );
}
