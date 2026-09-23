'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md">
        <div className="rounded-full bg-[var(--muted)] p-4 mb-4 mx-auto w-fit">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-6xl font-bold text-primary/20">404</h1>
        <h2 className="text-2xl font-bold mt-4">Page Not Found</h2>
        <p className="text-muted-foreground mt-2">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-3 mt-6">
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            <Home className="h-4 w-4" />Home
          </Link>
          <button onClick={() => window.history.back()} className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-[var(--border)] text-sm font-medium hover:bg-[var(--muted)] transition-colors">
            <ArrowLeft className="h-4 w-4" />Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
