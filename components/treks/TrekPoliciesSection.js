export default function TrekPoliciesSection({
  paymentPolicy,
  documentsRequired,
  cancellationPolicy,
}) {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-slate-900 text-center mb-10">
          Booking & Policies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PolicyCard title="Payment" icon="💳" items={paymentPolicy} />
          <PolicyCard title="Documents Required" icon="📄" items={documentsRequired} />
          <PolicyCard title="Cancellation Policy" icon="📋" items={cancellationPolicy} />
        </div>
      </div>
    </section>
  )
}

function PolicyCard({ title, icon, items }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h3 className="font-semibold text-slate-900 text-lg mb-4 flex items-center gap-2">
        <span aria-hidden="true">{icon}</span> {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-slate-600 leading-relaxed flex gap-2">
            <span className="text-brand flex-shrink-0">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
