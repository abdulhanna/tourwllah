/**
 * Download a premium branded itinerary PDF via the server API.
 * @param {object} pdfData - Output from packageToPdfData / trekToPdfData / lehPackageToPdfData
 */
export async function downloadItineraryPDF(pdfData) {
  const res = await fetch('/api/itinerary-pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pdfData),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `PDF generation failed (${res.status})`)
  }

  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = pdfData.filename || 'tripcart-holidays-itinerary.pdf'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
