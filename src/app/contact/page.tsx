import { submitLead } from '@/app/actions/cms';

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ success?: string }> }) {
  const params = await searchParams;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-4xl text-brandNavy">Contact</h1>
      {params.success && <p className="mt-3 rounded-xl bg-green-50 p-3 text-green-800">Thanks! Our team will contact you shortly.</p>}
      <form action={submitLead} className="mt-8 space-y-4 rounded-2xl border border-slate-200 p-6">
        <input name="name" placeholder="Name" required />
        <input name="email" type="email" placeholder="Email" required />
        <input name="phone" placeholder="Phone" required />
        <textarea name="message" rows={5} placeholder="How can we help?" required />
        <button className="bg-brandNavy text-white hover:bg-brandGold hover:text-brandNavy">Submit</button>
      </form>
    </div>
  );
}
