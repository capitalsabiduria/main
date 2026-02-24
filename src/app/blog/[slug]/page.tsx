import { notFound } from 'next/navigation';
import { MarkdownArticle } from '@/components/markdown-article';
import { calculateReadingTime, formatDate } from '@/lib/utils';
import { createClient } from '@/lib/supabase/server';

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!post) notFound();

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-500">{formatDate(post.published_at)} • {calculateReadingTime(post.content)} min read</p>
      <h1 className="font-display text-5xl text-brandNavy">{post.title}</h1>
      <MarkdownArticle content={post.content} />
    </div>
  );
}
