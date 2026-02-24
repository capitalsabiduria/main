-- Enable required extensions
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'client' check (role in ('admin', 'client')),
  created_at timestamptz not null default now()
);

create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  cover_image_url text,
  content text not null,
  tags text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.newsletter_editions (
  id uuid primary key default gen_random_uuid(),
  edition_number int not null,
  title text not null,
  slug text not null unique,
  excerpt text not null,
  cover_image_url text,
  content text not null,
  members_only boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger blogs_touch_updated_at
before update on public.blogs
for each row execute function public.touch_updated_at();

create trigger newsletter_touch_updated_at
before update on public.newsletter_editions
for each row execute function public.touch_updated_at();

alter table public.profiles enable row level security;
alter table public.blogs enable row level security;
alter table public.newsletter_editions enable row level security;
alter table public.leads enable row level security;

-- profiles policies
create policy "profiles_self_read" on public.profiles for select using (auth.uid() = id);
create policy "profiles_self_update" on public.profiles for update using (auth.uid() = id);
create policy "profiles_admin_all" on public.profiles for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- blogs policies
create policy "blogs_public_published" on public.blogs for select using (status = 'published');
create policy "blogs_admin_all" on public.blogs for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- newsletter policies
create policy "newsletter_public_published_open" on public.newsletter_editions
for select using (status = 'published' and members_only = false);

create policy "newsletter_auth_published_all" on public.newsletter_editions
for select using (auth.role() = 'authenticated' and status = 'published');

create policy "newsletter_admin_all" on public.newsletter_editions for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- leads policies
create policy "leads_insert_anyone" on public.leads for insert with check (true);
create policy "leads_admin_read" on public.leads for select using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- profile bootstrap trigger
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
