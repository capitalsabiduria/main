import Link from 'next/link';
import { requireAdmin } from '@/lib/data/auth';

export default async function AdminHome() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl text-brandNavy">Admin CMS</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Link href="/admin/blog" className="rounded-2xl border border-slate-200 p-6 shadow-premium">
          <h2 className="font-display text-2xl text-brandNavy">Manage Blog</h2>
          <p className="mt-2 text-slate-600">Create, update and remove blog posts.</p>
        </Link>
        <Link href="/admin/newsletter" className="rounded-2xl border border-slate-200 p-6 shadow-premium">
          <h2 className="font-display text-2xl text-brandNavy">Manage Newsletter</h2>
          <p className="mt-2 text-slate-600">Publish Money Talks India editions.</p>
        </Link>
      </div>
    </div>
  );
}
