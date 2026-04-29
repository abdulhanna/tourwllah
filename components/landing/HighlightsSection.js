export default function HighlightsSection({ highlights, destination }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Package Highlights
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Everything included in your {destination} experience
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {highlights.map((h, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand/30 hover:bg-teal-50/50 transition-all duration-200"
            >
              <span className="text-3xl mb-3">{h.icon}</span>
              <span className="text-sm font-medium text-slate-700 leading-tight">{h.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
