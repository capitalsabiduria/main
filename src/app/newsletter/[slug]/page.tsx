import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSessionProfile } from '@/lib/data/auth';
import { createClient } from '@/lib/supabase/server';
import { calculateReadingTime } from '@/lib/utils';
import { MarkdownArticle } from '@/components/markdown-article';

export default async function NewsletterDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { user } = await getSessionProfile();

  const { data: issue } = await supabase
    .from('newsletter_editions')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!issue) notFound();

  if (issue.members_only && !user) {
    return (
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 p-8 text-center">
        <p className="text-sm uppercase tracking-wide text-brandGold">Members Only</p>
        <h1 className="mt-3 font-display text-4xl text-brandNavy">{issue.title}</h1>
        <p className="mt-4 text-slate-600">Sign in as a Sabiduria Capital client to read this full edition.</p>
        <Link href="/login" className="mt-6 inline-block rounded-full bg-brandNavy px-5 py-3 text-white">Client Login</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-500">Edition {issue.edition_number} • {calculateReadingTime(issue.content)} min read</p>
      <h1 className="font-display text-5xl text-brandNavy">{issue.title}</h1>
      <MarkdownArticle content={issue.content} />
    </div>
  );
}
