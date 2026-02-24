import { deleteNewsletter, upsertNewsletter } from '@/app/actions/cms';
import { requireAdmin } from '@/lib/data/auth';
import { createClient } from '@/lib/supabase/server';

export default async function AdminNewsletterPage() {
  await requireAdmin();
  const supabase = await createClient();
  const { data: issues } = await supabase.from('newsletter_editions').select('*').order('updated_at', { ascending: false });

  return (
    <div className="space-y-8">
      <h1 className="font-display text-4xl text-brandNavy">Newsletter CMS</h1>
      <form action={upsertNewsletter} className="space-y-3 rounded-2xl border border-slate-200 p-6">
        <h2 className="font-display text-2xl text-brandNavy">Create / Update Edition</h2>
        <input name="id" placeholder="ID (leave blank for new)" />
        <input name="edition_number" type="number" placeholder="Edition number" required />
        <input name="title" placeholder="Title" required />
        <input name="slug" placeholder="Slug" required />
        <input name="excerpt" placeholder="Excerpt" required />
        <input name="cover_image_url" placeholder="Cover image URL" />
        <label className="flex items-center gap-2"><input name="members_only" type="checkbox" className="h-4 w-4" /> Members-only</label>
        <select name="status" defaultValue="draft"><option value="draft">Draft</option><option value="published">Published</option></select>
        <textarea name="content" rows={10} placeholder="Markdown content" required />
        <button className="bg-brandNavy text-white">Save Edition</button>
      </form>

      <div className="space-y-3">
        {(issues ?? []).map((issue) => (
          <div key={issue.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
            <div><p className="font-medium">{issue.title}</p><p className="text-sm text-slate-500">/{issue.slug} · {issue.status} · {issue.members_only ? 'Members' : 'Public'}</p></div>
            <form action={deleteNewsletter}><input type="hidden" name="id" value={issue.id} /><button className="bg-red-100 text-red-700">Delete</button></form>
          </div>
        ))}
      </div>
    </div>
  );
}
