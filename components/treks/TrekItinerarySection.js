export default function TrekItinerarySection({ itinerary }) {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-brand font-semibold text-sm uppercase tracking-wider mb-2">Detail Itinerary</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Day-by-Day Trek Plan
          </h2>
          <p className="text-slate-500">Altitudes, trek distances and drive legs for each day</p>
        </div>

        <div className="relative">
          <div
            className="absolute left-5 top-5 bottom-5 w-0.5 bg-gradient-to-b from-brand via-brand/40 to-brand/10"
            aria-hidden="true"
          />
          <div className="space-y-5">
            {itinerary.map((item, idx) => (
              <div key={idx} className="flex gap-5 group">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-brand text-white font-bold text-sm flex items-center justify-center z-10 shadow-md ring-4 ring-slate-50">
                    {item.day}
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-brand/30 transition-all">
                  <span className="text-xs text-brand font-semibold uppercase tracking-wider">
                    Day {item.day}
                  </span>
                  <h3 className="font-semibold text-slate-900 text-base mt-1 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{item.description}</p>
                  <dl className="flex flex-wrap gap-2">
                    {item.altitudeStart && (
                      <MetaChip label="From" value={item.altitudeStart} />
                    )}
                    {item.altitudeHigh && (
                      <MetaChip label="Summit" value={item.altitudeHigh} />
                    )}
                    {item.altitudeVisit && (
                      <MetaChip label="Visit" value={item.altitudeVisit} />
                    )}
                    {item.altitudeEnd && (
                      <MetaChip label="Camp" value={item.altitudeEnd} />
                    )}
                    {item.trekDistance && (
                      <MetaChip label="Trek" value={item.trekDistance} />
                    )}
                    {item.driveDistance && (
                      <MetaChip label="Drive" value={item.driveDistance} />
                    )}
                  </dl>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function MetaChip({ label, value }) {
  return (
    <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md">
      <span className="text-slate-400 font-medium">{label}:</span>
      <span className="font-semibold">{value}</span>
    </div>
  )
}
