'use client'

export default function ItineraryBuilder({ itinerary, onChange }) {
  const addDay = () => {
    onChange([...itinerary, { day: itinerary.length + 1, title: '', description: '' }])
  }

  const removeDay = (idx) => {
    const updated = itinerary.filter((_, i) => i !== idx).map((d, i) => ({ ...d, day: i + 1 }))
    onChange(updated)
  }

  const updateDay = (idx, field, value) => {
    const updated = itinerary.map((d, i) => i === idx ? { ...d, [field]: value } : d)
    onChange(updated)
  }

  return (
    <div className="space-y-3">
      {itinerary.map((day, idx) => (
        <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-brand text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
              {day.day}
            </div>
            <input
              type="text"
              placeholder={`Day ${day.day} Title (e.g. Arrival in Srinagar)`}
              value={day.title}
              onChange={e => updateDay(idx, 'title', e.target.value)}
              className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
            />
            <button
              type="button"
              onClick={() => removeDay(idx)}
              className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              aria-label="Remove day"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <textarea
            placeholder="Description of the day's activities..."
            value={day.description}
            onChange={e => updateDay(idx, 'description', e.target.value)}
            rows={2}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand resize-none"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addDay}
        className="w-full py-3 border-2 border-dashed border-brand/40 rounded-xl text-brand text-sm font-semibold hover:border-brand hover:bg-teal-50 transition-all cursor-pointer"
      >
        + Add Day {itinerary.length + 1}
      </button>
    </div>
  )
}
