import { ContentCard } from '@/components/content-card';
import { getPublishedBlogs } from '@/lib/data/content';
import { formatDate } from '@/lib/utils';

export default async function BlogIndexPage() {
  const blogs = await getPublishedBlogs();

  return (
    <div>
      <h1 className="font-display text-4xl text-brandNavy">Blog</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {blogs.map((blog) => (
          <ContentCard key={blog.id} href={`/blog/${blog.slug}`} title={blog.title} excerpt={blog.excerpt} meta={formatDate(blog.published_at)} />
        ))}
      </div>
    </div>
  );
}
