const services = [
  ['Portfolio Advisory', 'Goal-linked, risk-balanced portfolios with ongoing rebalancing guidance.'],
  ['Retirement Planning', 'Income and corpus strategy for financially secure retirement outcomes.'],
  ['Tax-aware Investing', 'Structures and product choices to improve after-tax returns.'],
];

export default function ServicesPage() {
  return (
    <div>
      <h1 className="font-display text-4xl text-brandNavy">Services</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {services.map(([title, text]) => (
          <div key={title} className="rounded-2xl border border-slate-200 p-6 shadow-premium">
            <h2 className="font-display text-2xl text-brandNavy">{title}</h2>
            <p className="mt-3 text-slate-600">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
