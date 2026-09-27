'use client';

import Link from 'next/link';
import { AlertTriangle, Home } from 'lucide-react';

/** Global error boundary — current token vocabulary; destructive role reserved for this page (canvas token law). */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html><body>
      <div className="flex flex-col items-center justify-center min-h-[100dvh] text-center px-4 bg-[var(--bg-canvas)] text-[var(--ink)]">
        <div className="max-w-md">
          <div className="bg-[var(--surface-sunk)] p-4 mb-4 mx-auto w-fit"><AlertTriangle className="h-8 w-8 text-destructive" aria-hidden="true" /></div>
          <h2 className="text-xl font-bold">Something went wrong</h2>
          <p className="mt-2 text-[var(--ink-muted)]">{error.message || 'An unexpected error occurred.'}</p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <button onClick={reset} className="inline-flex min-h-11 items-center gap-2 px-4 py-2 text-sm rounded-[8px] bg-[var(--accent-deep)] text-white hover:opacity-90 transition-opacity">Try again</button>
            <Link href="/" className="inline-flex min-h-11 items-center gap-2 px-4 py-2 text-sm rounded-[8px] border border-[var(--rule)] text-[var(--ink)] hover:bg-[var(--surface-sunk)] transition-colors">
              <Home className="h-4 w-4" aria-hidden="true" />Home
            </Link>
          </div>
        </div>
      </div>
    </body></html>
  );
}
