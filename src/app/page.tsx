import Link from 'next/link';
import { getPublishedBlogs, getPublishedNewsletters } from '@/lib/data/content';
import { ContentCard } from '@/components/content-card';
import { formatDate } from '@/lib/utils';

export default async function HomePage() {
  const blogs = (await getPublishedBlogs()).slice(0, 3);
  const newsletters = (await getPublishedNewsletters()).slice(0, 3);

  return (
    <div className="space-y-16">
      <section className="rounded-3xl bg-brandNavy p-10 text-white shadow-premium">
        <p className="text-brandGold">Boutique Indian Wealth Management</p>
        <h1 className="mt-3 max-w-2xl font-display text-5xl">Sabiduria Capital</h1>
        <p className="mt-4 max-w-3xl text-slate-200">We partner with families, founders, and professionals to build resilient long-term wealth strategies.</p>
        <div className="mt-8 flex gap-4">
          <Link href="/services" className="rounded-full bg-brandGold px-6 py-3 font-semibold text-brandNavy">Explore Services</Link>
          <Link href="/login" className="rounded-full border border-white px-6 py-3">Client Access</Link>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl text-brandNavy">Latest Insights</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {blogs.map((blog) => (
            <ContentCard key={blog.id} href={`/blog/${blog.slug}`} title={blog.title} excerpt={blog.excerpt} meta={formatDate(blog.published_at)} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl text-brandNavy">Money Talks India</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {newsletters.map((issue) => (
            <ContentCard key={issue.id} href={`/newsletter/${issue.slug}`} title={issue.title} excerpt={issue.excerpt} meta={`Edition ${issue.edition_number}`} badge={issue.members_only ? 'Members Only' : undefined} />
          ))}
        </div>
      </section>
    </div>
  );
}
