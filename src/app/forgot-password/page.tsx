import { requestPasswordReset } from '@/app/actions/auth';

export default async function ForgotPasswordPage({ searchParams }: { searchParams: Promise<{ success?: string; error?: string }> }) {
  const params = await searchParams;

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-slate-200 p-8">
      <h1 className="font-display text-3xl text-brandNavy">Reset password</h1>
      {params.success && <p className="mt-4 rounded-lg bg-green-50 p-3 text-green-700">Reset link sent to your email.</p>}
      {params.error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-red-700">{params.error}</p>}
      <form action={requestPasswordReset} className="mt-6 space-y-4">
        <input name="email" type="email" placeholder="Email" required />
        <button className="bg-brandNavy text-white hover:bg-brandGold hover:text-brandNavy">Send reset link</button>
      </form>
    </div>
  );
}
