import { requireAuth } from '@/lib/data/auth';
import { ContentCard } from '@/components/content-card';
import { createClient } from '@/lib/supabase/server';

export default async function ClientLibraryPage() {
  await requireAuth();
  const supabase = await createClient();

  const [{ data: blogs }, { data: newsletters }] = await Promise.all([
    supabase.from('blogs').select('*').eq('status', 'published').order('published_at', { ascending: false }),
    supabase.from('newsletter_editions').select('*').eq('status', 'published').order('published_at', { ascending: false }),
  ]);

  return (
    <div className="space-y-12">
      <h1 className="font-display text-4xl text-brandNavy">Client Library</h1>
      <section>
        <h2 className="font-display text-2xl text-brandNavy">Blogs</h2>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          {(blogs ?? []).map((blog) => <ContentCard key={blog.id} href={`/blog/${blog.slug}`} title={blog.title} excerpt={blog.excerpt} meta="Published" />)}
        </div>
      </section>
      <section>
        <h2 className="font-display text-2xl text-brandNavy">Money Talks India</h2>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          {(newsletters ?? []).map((issue) => <ContentCard key={issue.id} href={`/newsletter/${issue.slug}`} title={issue.title} excerpt={issue.excerpt} meta={`Edition ${issue.edition_number}`} badge={issue.members_only ? 'Members' : undefined} />)}
        </div>
      </section>
    </div>
  );
}
