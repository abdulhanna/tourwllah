export default function LehPricingSection({ pkg }) {
  if (!pkg.pricingTiers?.length) return null

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-2">Pricing</h2>
          <p className="text-slate-500 text-sm">{pkg.priceNote}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand text-white">
                <th className="text-left px-5 py-3 font-semibold">Option</th>
                <th className="text-right px-5 py-3 font-semibold">Per Person</th>
              </tr>
            </thead>
            <tbody>
              {pkg.pricingTiers.map((tier, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="px-5 py-3 text-slate-700">{tier.label}</td>
                  <td className="px-5 py-3 text-right font-bold text-slate-900">{tier.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {pkg.hotels && typeof pkg.hotels === 'object' && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <HotelBlock title="Deluxe Hotels" text={pkg.hotels.deluxe} />
            <HotelBlock title="Super Deluxe Hotels" text={pkg.hotels.superDeluxe} />
          </div>
        )}
        {typeof pkg.hotels === 'string' && (
          <p className="mt-6 text-sm text-slate-600 text-center">
            <span className="font-semibold">Stay:</span> {pkg.hotels}
          </p>
        )}
        {pkg.groupDates && (
          <p className="mt-6 text-sm text-slate-600 bg-amber-50 border border-amber-100 rounded-xl p-4">
            <span className="font-semibold text-amber-900">Group departures:</span> {pkg.groupDates}
          </p>
        )}
      </div>
    </section>
  )
}

function HotelBlock({ title, text }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 text-sm">
      <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{text}</p>
    </div>
  )
}
