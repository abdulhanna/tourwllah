const DEFAULT_PHONE = '91XXXXXXXXXX'

export function buildWhatsAppMessage(pkg) {
  const highlights = (pkg.highlights || [])
    .slice(0, 3)
    .map(h => `✔ ${h}`)
    .join('\n')

  return `🌸 Himalayan Holidays 🌸

📍 ${pkg.title}
🗓 ${pkg.duration}${pkg.price ? `\n💰 ${pkg.price}` : ''}

✨ Highlights:
${highlights}

Reply YES for full itinerary!`
}

export function openWhatsApp(pkg, phone = DEFAULT_PHONE) {
  const text = encodeURIComponent(buildWhatsAppMessage(pkg))
  window.open(`https://wa.me/${phone}?text=${text}`, '_blank', 'noopener,noreferrer')
}

export function openWhatsAppGeneral(message = '') {
  const text = encodeURIComponent(
    message || '🌸 Hi! I am interested in a tour package from Himalayan Holidays. Please share details.'
  )
  window.open(`https://wa.me/${DEFAULT_PHONE}?text=${text}`, '_blank', 'noopener,noreferrer')
}

export function buildWhatsAppURL(pkg, phone = DEFAULT_PHONE) {
  const text = encodeURIComponent(buildWhatsAppMessage(pkg))
  return `https://wa.me/${phone}?text=${text}`
}
