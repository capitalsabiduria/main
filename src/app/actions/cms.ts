'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/data/auth';
import { createClient } from '@/lib/supabase/server';

function basePayload(formData: FormData) {
  const status = String(formData.get('status'));
  return {
    title: String(formData.get('title')),
    slug: String(formData.get('slug')),
    excerpt: String(formData.get('excerpt')),
    cover_image_url: String(formData.get('cover_image_url') || ''),
    content: String(formData.get('content')),
    tags: String(formData.get('tags') || '')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
    status,
    published_at: status === 'published' ? new Date().toISOString() : null,
  };
}

export async function upsertBlog(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const id = String(formData.get('id') || '');
  const payload = basePayload(formData);

  const query = id ? supabase.from('blogs').update(payload).eq('id', id) : supabase.from('blogs').insert(payload);
  await query;

  revalidatePath('/blog');
  revalidatePath('/admin/blog');
  redirect('/admin/blog');
}

export async function deleteBlog(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  await supabase.from('blogs').delete().eq('id', String(formData.get('id')));
  revalidatePath('/admin/blog');
}

export async function upsertNewsletter(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  const id = String(formData.get('id') || '');
  const status = String(formData.get('status'));

  const payload = {
    edition_number: Number(formData.get('edition_number')),
    title: String(formData.get('title')),
    slug: String(formData.get('slug')),
    excerpt: String(formData.get('excerpt')),
    cover_image_url: String(formData.get('cover_image_url') || ''),
    content: String(formData.get('content')),
    members_only: formData.get('members_only') === 'on',
    status,
    published_at: status === 'published' ? new Date().toISOString() : null,
  };

  const query = id
    ? supabase.from('newsletter_editions').update(payload).eq('id', id)
    : supabase.from('newsletter_editions').insert(payload);
  await query;

  revalidatePath('/newsletter');
  revalidatePath('/admin/newsletter');
  redirect('/admin/newsletter');
}

export async function deleteNewsletter(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();
  await supabase.from('newsletter_editions').delete().eq('id', String(formData.get('id')));
  revalidatePath('/admin/newsletter');
}

export async function submitLead(formData: FormData) {
  const supabase = await createClient();
  await supabase.from('leads').insert({
    name: String(formData.get('name')),
    email: String(formData.get('email')),
    phone: String(formData.get('phone')),
    message: String(formData.get('message')),
  });

  redirect('/contact?success=1');
}
