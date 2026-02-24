export type Role = 'admin' | 'client';
export type ContentStatus = 'draft' | 'published';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: Role;
  created_at: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image_url: string | null;
  content: string;
  tags: string[];
  status: ContentStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface NewsletterEdition {
  id: string;
  edition_number: number;
  title: string;
  slug: string;
  excerpt: string;
  cover_image_url: string | null;
  content: string;
  members_only: boolean;
  status: ContentStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}
