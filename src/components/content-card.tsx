import Link from 'next/link';

interface ContentCardProps {
  href: string;
  title: string;
  excerpt: string;
  meta: string;
  badge?: string;
}

export function ContentCard({ href, title, excerpt, meta, badge }: ContentCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-premium transition hover:-translate-y-1 hover:border-brandGold"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-wide text-slate-500">{meta}</p>
        {badge && <span className="rounded-full bg-brandNavy px-3 py-1 text-xs text-white">{badge}</span>}
      </div>
      <h3 className="font-display text-2xl text-brandNavy transition group-hover:text-brandGold">{title}</h3>
      <p className="mt-3 text-slate-600">{excerpt}</p>
    </Link>
  );
}
