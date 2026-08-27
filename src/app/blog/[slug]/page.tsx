import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { blogPosts, blogContent } from '@/data/blog';
import { PageTransition } from '@/components/shared/page-transition';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  const content = blogContent[slug];

  if (!post || !content) notFound();

  return (
    <PageTransition>
      <article className="container mx-auto px-4 py-16 md:py-20 max-w-3xl">
        <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">{post.title}</h1>
          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{formatDate(post.date)}</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{post.readingTime} min read</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-4">
            {post.tags.map((tag) => (<span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{tag}</span>))}
          </div>
        </header>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {content.split('\n').map((line, i) => {
            if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold mt-8 mb-4">{line.slice(2)}</h1>;
            if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold mt-6 mb-3">{line.slice(3)}</h2>;
            if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold mt-4 mb-2">{line.slice(4)}</h3>;
            if (line.startsWith('- ')) return <li key={i} className="ml-4 text-muted-foreground">{line.slice(2)}</li>;
            if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ')) return <li key={i} className="ml-4 text-muted-foreground list-decimal">{line.slice(3)}</li>;
            if (line.startsWith('| ')) return null;
            if (line.trim() === '') return <br key={i} />;
            return <p key={i} className="text-muted-foreground leading-relaxed">{line}</p>;
          })}
        </div>
      </article>
    </PageTransition>
  );
}
