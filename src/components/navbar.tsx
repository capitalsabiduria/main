import Link from 'next/link';
import { getSessionProfile } from '@/lib/data/auth';

const links = [
  ['About', '/about'],
  ['Services', '/services'],
  ['Blog', '/blog'],
  ['Newsletter', '/newsletter'],
  ['Contact', '/contact'],
];

export async function Navbar() {
  const { user, profile } = await getSessionProfile();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl font-bold text-brandNavy">
          Sabiduria <span className="text-brandGold">Capital</span>
        </Link>
        <div className="hidden items-center gap-5 text-sm md:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="transition hover:text-brandGold">
              {label}
            </Link>
          ))}
          {user ? (
            <>
              <Link href="/app" className="rounded-full bg-brandNavy px-4 py-2 text-white transition hover:bg-brandGold">
                Library
              </Link>
              {profile?.role === 'admin' && (
                <Link href="/admin" className="rounded-full border border-brandNavy px-4 py-2 text-brandNavy">
                  Admin
                </Link>
              )}
            </>
          ) : (
            <Link href="/login" className="rounded-full bg-brandNavy px-4 py-2 text-white transition hover:bg-brandGold">
              Client Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
