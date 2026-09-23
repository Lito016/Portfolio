'use client';

import Link from 'next/link';
import { AlertTriangle, Home } from 'lucide-react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html><body>
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-[var(--background)] text-[var(--foreground)]">
        <div className="max-w-md">
          <div className="rounded-full bg-destructive/10 p-4 mb-4 mx-auto w-fit"><AlertTriangle className="h-8 w-8 text-destructive" /></div>
          <h2 className="text-xl font-bold">Something went wrong</h2>
          <p className="text-muted-foreground mt-2">{error.message || 'An unexpected error occurred.'}</p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <button onClick={reset} className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">Try again</button>
            <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-md border border-[var(--border)] hover:bg-[var(--muted)] transition-colors">
              <Home className="h-4 w-4" />Home
            </Link>
          </div>
        </div>
      </div>
    </body></html>
  );
}
