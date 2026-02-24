import { createClient } from '@/lib/supabase/server';

export async function getPublishedBlogs() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('blogs')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });
  return data ?? [];
}

export async function getPublishedNewsletters() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('newsletter_editions')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });
  return data ?? [];
}
