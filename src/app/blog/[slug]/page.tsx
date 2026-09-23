import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { blogPosts, blogContent } from '@/data/blog';
import { PageTransition } from '@/components/shared/page-transition';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

/** Parse inline markdown: bold, italic, code, links */
function parseInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyIdx = 0;

  while (remaining.length > 0) {
    // Bold: **text**
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    // Italic: *text*
    const italicMatch = remaining.match(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/);
    // Code: `text`
    const codeMatch = remaining.match(/`([^`]+)`/);
    // Link: [text](url)
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

    // Find earliest match
    const matches = [
      boldMatch ? { type: 'bold', match: boldMatch, index: boldMatch.index! } : null,
      italicMatch && (!boldMatch || italicMatch.index! < boldMatch.index!) ? { type: 'italic', match: italicMatch, index: italicMatch.index! } : null,
      codeMatch ? { type: 'code', match: codeMatch, index: codeMatch.index! } : null,
      linkMatch ? { type: 'link', match: linkMatch, index: linkMatch.index! } : null,
    ].filter(Boolean).sort((a, b) => a!.index - b!.index);

    if (matches.length === 0) {
      parts.push(remaining);
      break;
    }

    const first = matches[0]!;
    if (first.index > 0) {
      parts.push(remaining.slice(0, first.index));
    }

    if (first.type === 'bold') {
      parts.push(<strong key={keyIdx++}>{first.match![1]}</strong>);
      remaining = remaining.slice(first.index! + first.match![0].length);
    } else if (first.type === 'italic') {
      parts.push(<em key={keyIdx++}>{first.match![1]}</em>);
      remaining = remaining.slice(first.index! + first.match![0].length);
    } else if (first.type === 'code') {
      parts.push(<code key={keyIdx++} className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">{first.match![1]}</code>);
      remaining = remaining.slice(first.index! + first.match![0].length);
    } else if (first.type === 'link') {
      parts.push(<a key={keyIdx++} href={first.match![2]} className="text-primary hover:underline">{first.match![1]}</a>);
      remaining = remaining.slice(first.index! + first.match![0].length);
    }
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

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
            if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold mt-8 mb-4">{parseInline(line.slice(2))}</h1>;
            if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold mt-6 mb-3">{parseInline(line.slice(3))}</h2>;
            if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold mt-4 mb-2">{parseInline(line.slice(4))}</h3>;
            if (line.startsWith('- ')) return <li key={i} className="ml-4 text-muted-foreground list-disc">{parseInline(line.slice(2))}</li>;
            if (/^\d+\.\s/.test(line)) return <li key={i} className="ml-4 text-muted-foreground list-decimal">{parseInline(line.replace(/^\d+\.\s/, ''))}</li>;
            if (line.startsWith('| ') && line.endsWith(' |')) {
              const cells = line.slice(2, -2).split(' | ').map(c => c.trim());
              if (cells.every(c => /^[-:]+$/.test(c))) return null; // separator row
              return (
                <div key={i} className="flex gap-4 border-b border-border/50 py-1.5 text-sm">
                  {cells.map((cell, j) => <span key={j} className="flex-1 text-muted-foreground">{parseInline(cell)}</span>)}
                </div>
              );
            }
            if (line.trim() === '') return <br key={i} />;
            return <p key={i} className="text-muted-foreground leading-relaxed">{parseInline(line)}</p>;
          })}
        </div>
      </article>
    </PageTransition>
  );
}
