export default function TrekPackingSection({ packingList }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-3">Things to Pack</h2>
          <p className="text-slate-500">Essential gear for a safe and comfortable Himalayan trek</p>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {packingList.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-slate-700 bg-slate-50 border border-slate-100 rounded-lg px-4 py-3"
            >
              <span className="text-brand mt-0.5">🎒</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
