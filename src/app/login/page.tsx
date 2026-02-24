import Link from 'next/link';
import { loginWithPassword } from '@/app/actions/auth';

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;

  return (
    <div className="mx-auto max-w-md rounded-3xl bg-brandNavy p-8 text-white shadow-premium">
      <p className="text-center font-display text-3xl">Sabiduria <span className="text-brandGold">Capital</span></p>
      <h1 className="mt-6 text-center font-display text-2xl">Client Login</h1>
      {params.error && <p className="mt-4 rounded-lg bg-red-500/20 p-3 text-sm">{params.error}</p>}
      <form action={loginWithPassword} className="mt-6 space-y-4">
        <input name="email" type="email" placeholder="Email" required className="text-slate-900" />
        <input name="password" type="password" placeholder="Password" required className="text-slate-900" />
        <button className="w-full bg-brandGold text-brandNavy hover:bg-white">Sign in</button>
      </form>
      <GoogleButton />
      <div className="mt-4 text-center text-sm">
        <Link href="/forgot-password" className="text-brandGold">Forgot password?</Link>
      </div>
    </div>
  );
}

function GoogleButton() {
  return (
    <form action="/auth/callback" method="get" className="mt-4">
      <input type="hidden" name="provider" value="google" />
      <button className="w-full border border-white text-white hover:bg-white hover:text-brandNavy">Continue with Google</button>
    </form>
  );
}
