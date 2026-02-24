import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl text-center">
      <p className="text-brandGold">404</p>
      <h1 className="font-display text-5xl text-brandNavy">Page not found</h1>
      <p className="mt-3 text-slate-600">The page may have moved, or the link is no longer active.</p>
      <Link href="/" className="mt-6 inline-block rounded-full bg-brandNavy px-5 py-3 text-white">Back home</Link>
    </div>
  );
}
