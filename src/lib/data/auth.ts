import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function getSessionProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { user: null, profile: null };

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();

  return { user, profile };
}

export async function requireAuth() {
  const session = await getSessionProfile();
  if (!session.user) redirect('/login');
  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  if (session.profile?.role !== 'admin') redirect('/app');
  return session;
}
