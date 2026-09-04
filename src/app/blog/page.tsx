'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { blogPosts } from '@/data/blog';
import { PageTransition } from '@/components/shared/page-transition';
import { SectionHeading } from '@/components/shared/section-heading';
import { Calendar, Clock } from 'lucide-react';

export default function BlogPage() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16 md:py-20 max-w-4xl">
        <SectionHeading title="Blog" description="Notes on things I&apos;ve learned building software" align="center" />
        <div className="space-y-6">
          {blogPosts.map((post, i) => (
            <motion.article key={post.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-6">
              <Link href={`/blog/${post.slug}`} className="group">
                <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">{post.title}</h2>
                <p className="text-sm text-muted-foreground mt-2">{post.excerpt}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readingTime}</span>
                  <div className="flex gap-1">{post.tags.map((t) => (<span key={t} className="px-2 py-0.5 rounded-full bg-muted">{t}</span>))}</div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
