export default function ItineraryPreview({ itinerary }) {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-2">Your Journey</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Day-by-Day Itinerary
          </h2>
          <p className="text-slate-500">A carefully crafted journey for every traveller</p>
        </div>

        <div className="relative">
          {/* Connecting timeline line */}
          <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gradient-to-b from-brand via-brand/40 to-brand/10" aria-hidden="true" />

          <div className="space-y-5">
            {itinerary.map((item, idx) => (
              <div key={idx} className="flex gap-5 group">
                {/* Day badge */}
                <div className="relative flex-shrink-0 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-brand text-white font-bold text-sm flex items-center justify-center z-10 shadow-md ring-4 ring-slate-50 group-hover:ring-brand/20 transition-all">
                    {item.day}
                  </div>
                </div>

                {/* Day card */}
                <div className="flex-1 bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-brand/30 transition-all duration-200 mb-0.5">
                  <span className="text-xs text-brand font-semibold uppercase tracking-wider">Day {item.day}</span>
                  <h3 className="font-semibold text-slate-900 text-base mt-1 mb-2 leading-snug">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
