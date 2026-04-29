'use client'

import { openWhatsApp } from '@/lib/whatsapp'
import { downloadPackagePDF } from '@/lib/pdf'
import { useState } from 'react'

export default function PackagePreview({ pkg }) {
  const [pdfLoading, setPdfLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const isEmpty = !pkg.title && !pkg.destination

  const handlePDF = async () => {
    setPdfLoading(true)
    try {
      await downloadPackagePDF('package-preview-print', `${pkg.title || 'itinerary'}.pdf`)
    } finally {
      setPdfLoading(false)
    }
  }

  const handleCopy = () => {
    const text = buildPlainText(pkg)
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isEmpty) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400">
        <span className="text-5xl mb-4">🏔</span>
        <p className="font-medium text-slate-500">Start filling the form</p>
        <p className="text-sm mt-1">Your live itinerary preview will appear here</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Action buttons */}
      <div className="flex flex-wrap gap-2 mb-4 p-1">
        <button
          onClick={() => openWhatsApp(pkg)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-green-500 text-white text-xs font-semibold px-3 py-2.5 rounded-lg hover:bg-green-600 transition-colors cursor-pointer"
        >
          💬 Send on WhatsApp
        </button>
        <button
          onClick={handlePDF}
          disabled={pdfLoading}
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-amber-500 text-white text-xs font-semibold px-3 py-2.5 rounded-lg hover:bg-amber-600 transition-colors cursor-pointer disabled:opacity-50"
        >
          {pdfLoading ? '⏳ Generating...' : '📄 Download PDF'}
        </button>
        <button
          onClick={handleCopy}
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-slate-600 text-white text-xs font-semibold px-3 py-2.5 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
        >
          {copied ? '✅ Copied!' : '📋 Copy Text'}
        </button>
      </div>

      {/* Preview */}
      <div
        id="package-preview-print"
        className="flex-1 bg-white border border-slate-200 rounded-xl overflow-y-auto p-6 text-sm"
      >
        {/* Header */}
        <div className="text-center pb-5 border-b-2 border-brand mb-5">
          <p className="text-brand font-bold text-base">🏔 Himalayan Holidays</p>
          <h2 className="font-display text-xl font-bold text-slate-900 mt-1">{pkg.title || 'Package Title'}</h2>
          <div className="flex flex-wrap justify-center gap-3 mt-2 text-slate-500 text-xs">
            {pkg.destination && <span>📍 {pkg.destination}</span>}
            {pkg.duration && <span>🗓 {pkg.duration}</span>}
            {pkg.guests && <span>👥 {pkg.guests}</span>}
            {pkg.price && <span>💰 {pkg.price}</span>}
          </div>
        </div>

        {/* Itinerary */}
        {pkg.itinerary?.length > 0 && (
          <div className="mb-5">
            <h3 className="font-semibold text-brand text-xs uppercase tracking-wider mb-3">Day-by-Day Itinerary</h3>
            {pkg.itinerary.map((d, i) => (
              <div key={i} className="mb-3 pl-4 border-l-2 border-brand/30">
                <p className="font-semibold text-slate-800 text-xs">Day {d.day}: {d.title}</p>
                <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">{d.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Hotel & Transport */}
        {(pkg.hotels || pkg.transport) && (
          <div className="mb-5 p-3 bg-slate-50 rounded-lg">
            {pkg.hotels && <p className="text-xs text-slate-600"><span className="font-semibold">🏨 Hotels:</span> {pkg.hotels}</p>}
            {pkg.transport && <p className="text-xs text-slate-600 mt-1"><span className="font-semibold">🚗 Transport:</span> {pkg.transport}</p>}
          </div>
        )}

        {/* Inclusions / Exclusions */}
        {(pkg.inclusions?.length > 0 || pkg.exclusions?.length > 0) && (
          <div className="grid grid-cols-2 gap-4 mb-5">
            {pkg.inclusions?.length > 0 && (
              <div>
                <h3 className="font-semibold text-green-700 text-xs uppercase tracking-wider mb-2">✅ Inclusions</h3>
                <ul className="space-y-1">
                  {pkg.inclusions.map((item, i) => (
                    <li key={i} className="text-xs text-slate-600">• {item}</li>
                  ))}
                </ul>
              </div>
            )}
            {pkg.exclusions?.length > 0 && (
              <div>
                <h3 className="font-semibold text-red-600 text-xs uppercase tracking-wider mb-2">❌ Exclusions</h3>
                <ul className="space-y-1">
                  {pkg.exclusions.map((item, i) => (
                    <li key={i} className="text-xs text-slate-600">• {item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Notes */}
        {pkg.notes && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs font-semibold text-amber-800 mb-1">📝 Notes</p>
            <p className="text-xs text-amber-700 leading-relaxed">{pkg.notes}</p>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">Generated by Himalayan Holidays · himalayanholidays.in</p>
        </div>
      </div>
    </div>
  )
}

function buildPlainText(pkg) {
  const lines = [
    '🌸 Himalayan Holidays 🌸',
    '',
    `📍 ${pkg.title}`,
    pkg.duration ? `🗓 ${pkg.duration}` : '',
    pkg.price ? `💰 ${pkg.price}` : '',
    '',
  ]

  if (pkg.highlights?.length) {
    lines.push('✨ Highlights:')
    pkg.highlights.forEach(h => lines.push(`✔ ${h}`))
    lines.push('')
  }

  if (pkg.itinerary?.length) {
    lines.push('📅 Itinerary:')
    pkg.itinerary.forEach(d => {
      lines.push(`Day ${d.day}: ${d.title}`)
      if (d.description) lines.push(`   ${d.description}`)
    })
    lines.push('')
  }

  lines.push('Reply YES for full itinerary!')
  return lines.filter(l => l !== undefined).join('\n')
}
