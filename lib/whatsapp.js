const DEFAULT_PHONE = '917004015511'

export function buildWhatsAppMessage(pkg) {
  const highlights = (pkg.highlights || [])
    .slice(0, 3)
    .map(h => `✔ ${h}`)
    .join('\n')

  return `🌸 Tripcart Holidays 🌸

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
    message || '🌸 Hi! I am interested in a tour package from Tripcart Holidays. Please share details.'
  )
  window.open(`https://wa.me/${DEFAULT_PHONE}?text=${text}`, '_blank', 'noopener,noreferrer')
}

export function buildWhatsAppURL(pkg, phone = DEFAULT_PHONE) {
  const text = encodeURIComponent(buildWhatsAppMessage(pkg))
  return `https://wa.me/${phone}?text=${text}`
}

export function buildTrekWhatsAppMessage(trek) {
  const highlights = (trek.highlights || [])
    .slice(0, 4)
    .map(h => `✔ ${typeof h === 'string' ? h : h.label}`)
    .join('\n')

  return `🥾 Tripcart Holidays — Trek Enquiry

📍 ${trek.title}
🗓 ${trek.duration}
⛰ Max altitude: ${trek.maxAltitude}
🥾 Distance: ${trek.trekDistance}
📊 Difficulty: ${trek.difficulty}
${trek.price ? `\n💰 ${trek.price}` : ''}

✨ Highlights:
${highlights}

Please share available batch dates and pricing!`
}

export function openWhatsAppTrek(trek, phone = DEFAULT_PHONE) {
  const text = encodeURIComponent(buildTrekWhatsAppMessage(trek))
  window.open(`https://wa.me/${phone}?text=${text}`, '_blank', 'noopener,noreferrer')
}

export function buildQuoteMessage({ name, phone, destination, dates, travellers, packageTitle, message }) {
  const lines = [
    '🌸 Tripcart Holidays — Quote Request',
    '',
    `👤 ${name}`,
    `📞 ${phone}`,
  ]
  if (destination) lines.push(`📍 ${destination}`)
  const when = [dates, travellers].filter(Boolean).join(' · ')
  if (when) lines.push(`🗓 ${when}`)
  if (packageTitle) lines.push(`📦 ${packageTitle}`)
  if (message && message.trim()) lines.push(`📝 ${message.trim()}`)
  lines.push('', 'Please share the best quote & itinerary.')
  return lines.join('\n')
}

export function isValidPhone(raw) {
  if (!raw) return false
  const digits = String(raw).replace(/[\s\-()+]/g, '')
  return /^\d{7,15}$/.test(digits)
}

export function buildQuoteWhatsAppURL(data, phone = DEFAULT_PHONE) {
  const text = encodeURIComponent(buildQuoteMessage(data))
  return `https://wa.me/${phone}?text=${text}`
}

export function openWhatsAppQuote(data, phone = DEFAULT_PHONE) {
  const url = buildQuoteWhatsAppURL(data, phone)
  return window.open(url, '_blank', 'noopener,noreferrer')
}
