import { deleteBlog, upsertBlog } from '@/app/actions/cms';
import { requireAdmin } from '@/lib/data/auth';
import { createClient } from '@/lib/supabase/server';

export default async function AdminBlogPage() {
  await requireAdmin();
  const supabase = await createClient();
  const { data: blogs } = await supabase.from('blogs').select('*').order('updated_at', { ascending: false });

  return (
    <div className="space-y-8">
      <h1 className="font-display text-4xl text-brandNavy">Blog CMS</h1>
      <form action={upsertBlog} className="space-y-3 rounded-2xl border border-slate-200 p-6">
        <h2 className="font-display text-2xl text-brandNavy">Create / Update Post</h2>
        <input name="id" placeholder="ID (leave blank for new)" />
        <input name="title" placeholder="Title" required />
        <input name="slug" placeholder="Slug" required />
        <input name="excerpt" placeholder="Excerpt" required />
        <input name="cover_image_url" placeholder="Cover image URL" />
        <input name="tags" placeholder="Tags comma separated" />
        <select name="status" defaultValue="draft"><option value="draft">Draft</option><option value="published">Published</option></select>
        <textarea name="content" rows={10} placeholder="Markdown content" required />
        <button className="bg-brandNavy text-white">Save Post</button>
      </form>

      <div className="space-y-3">
        {(blogs ?? []).map((blog) => (
          <div key={blog.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
            <div><p className="font-medium">{blog.title}</p><p className="text-sm text-slate-500">/{blog.slug} · {blog.status}</p></div>
            <form action={deleteBlog}><input type="hidden" name="id" value={blog.id} /><button className="bg-red-100 text-red-700">Delete</button></form>
          </div>
        ))}
      </div>
    </div>
  );
}
