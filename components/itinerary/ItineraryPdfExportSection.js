'use client'

import DownloadItineraryPDFButton from '@/components/itinerary/DownloadItineraryPDFButton'

export default function ItineraryPdfExportSection({ pdfData }) {
  if (!pdfData?.days?.length) return null

  return (
    <section className="py-10 bg-gradient-to-r from-amber-50 to-orange-50 border-y border-amber-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-slate-600 text-sm mb-4">
          Share a presentation-ready PDF with your client — branded for Tripcart Holidays.
        </p>
        <DownloadItineraryPDFButton pdfData={pdfData} label="Download Premium PDF Itinerary" />
      </div>
    </section>
  )
}
