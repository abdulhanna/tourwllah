'use client'

import { useState } from 'react'
import { downloadItineraryPDF } from '@/lib/itinerary-pdf'

export default function DownloadItineraryPDFButton({
  pdfData,
  label = 'Download PDF Itinerary',
  className = '',
  variant = 'primary',
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const baseClass =
    variant === 'outline'
      ? 'inline-flex items-center justify-center gap-2 border-2 border-brand text-brand px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-brand hover:text-white transition-colors disabled:opacity-50 cursor-pointer'
      : 'inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-colors disabled:opacity-50 cursor-pointer'

  async function handleClick() {
    if (!pdfData?.days?.length) {
      setError('No itinerary days to export.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      await downloadItineraryPDF(pdfData)
    } catch (e) {
      setError(e.message || 'PDF download failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={baseClass}
        aria-busy={loading}
      >
        {loading ? '⏳ Generating PDF…' : `📄 ${label}`}
      </button>
      {error && (
        <p className="text-red-600 text-xs mt-2" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
