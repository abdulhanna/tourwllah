/** Map app package shapes to unified PDF payload */

function dayDetails(day) {
  const parts = []
  if (day.trekDistance) parts.push(`Trek: ${day.trekDistance}`)
  if (day.driveDistance) parts.push(`Drive: ${day.driveDistance}`)
  if (day.altitudeHigh) parts.push(`Summit: ${day.altitudeHigh}`)
  if (day.altitudeEnd) parts.push(`Overnight: ${day.altitudeEnd}`)
  if (day.altitudeVisit) parts.push(`Visit: ${day.altitudeVisit}`)
  return parts.length ? parts.join(' • ') : ''
}

export function packageToPdfData(pkg) {
  return {
    title: pkg.title,
    subtitle: `Crafted by Tripcart Holidays | ${pkg.duration || ''} · ${pkg.destination || ''}`,
    duration: pkg.duration,
    metaRows: [
      `Trip Duration: ${pkg.duration || '—'}`,
      `Destination: ${pkg.destination || '—'}`,
      pkg.dates ? `Travel Dates: ${pkg.dates}` : 'Travel Dates: Flexible / On request',
      pkg.guests ? `Group Size: ${pkg.guests}` : `Price: ${pkg.price || 'Enquire on WhatsApp'}`,
      pkg.hotels ? `Accommodation: ${typeof pkg.hotels === 'string' ? pkg.hotels.slice(0, 80) + '…' : 'As per package'}` : '',
      pkg.transport ? `Transport: ${pkg.transport}` : '',
    ].filter(Boolean),
    days: (pkg.itinerary || []).map(d => ({
      day: d.day,
      title: d.title,
      description: d.description,
      details: dayDetails(d),
    })),
    pricing: pkg.price
      ? [{ label: 'Package rate', price: pkg.price }]
      : [],
    inclusions: pkg.inclusions || [],
    exclusions: pkg.exclusions || [],
    notes: pkg.notes ? [pkg.notes] : [],
    filename: `${slugify(pkg.title)}-itinerary.pdf`,
  }
}

export function trekToPdfData(trek) {
  return {
    title: trek.title,
    subtitle: `Crafted by Tripcart Holidays | ${trek.duration} · ${trek.location}`,
    duration: trek.duration,
    metaRows: [
      `Trip Duration: ${trek.duration}`,
      `Route: ${trek.startPoint} → ${trek.endPoint}`,
      `Max Altitude: ${trek.maxAltitude}`,
      `Trek Distance: ${trek.trekDistance}`,
      `Difficulty: ${trek.difficulty}`,
      `Best Season: ${trek.season}`,
    ],
    days: (trek.itinerary || []).map(d => ({
      day: d.day,
      title: d.title,
      description: d.description,
      details: dayDetails(d),
    })),
    pricing: trek.price ? [{ label: 'Package', price: trek.price }] : [],
    inclusions: trek.inclusions || [],
    exclusions: trek.exclusions || [],
    notes: [
      trek.notes,
      ...(trek.cancellationPolicy || []).slice(0, 2),
    ].filter(Boolean),
    filename: `${trek.slug}-itinerary.pdf`,
  }
}

export function lehPackageToPdfData(pkg) {
  const pricing = (pkg.pricingTiers || []).map(t => ({
    label: t.label,
    price: t.price,
  }))

  const notes = [
    pkg.notes,
    ...(pkg.cancellationPolicy || []),
    ...(pkg.paymentPolicy || []),
  ].filter(Boolean)

  return {
    title: pkg.title,
    subtitle: `Crafted by Tripcart Holidays | ${pkg.duration} · ${pkg.route}`,
    duration: pkg.duration,
    metaRows: [
      `Trip Duration: ${pkg.duration}`,
      `Route Matrix: ${pkg.route}`,
      `Season: ${pkg.season}`,
      `Starting Price: ${pkg.price}`,
      pkg.packageType === 'bike'
        ? 'Vehicle: Royal Enfield Himalayan 411 CC (bike option)'
        : 'Vehicle: Private Xylo / Ertiga / Tempo Traveller',
      pkg.hotels && typeof pkg.hotels === 'string' ? `Stays: ${pkg.hotels}` : '',
    ].filter(Boolean),
    days: (pkg.itinerary || []).map(d => ({
      day: d.day,
      title: d.title,
      description: d.description,
      details: '',
    })),
    pricing,
    pricingFootnote: pkg.packageType === 'bike'
      ? 'Optional: Double sharing upgrade & single occupancy charges apply — enquire on WhatsApp.'
      : 'Deluxe & Super Deluxe hotel categories available. Rates vary by group size.',
    inclusions: pkg.inclusions || [],
    exclusions: pkg.exclusions || [],
    notes,
    groupDates: pkg.groupDates || null,
    filename: `${pkg.slug}-itinerary.pdf`,
  }
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    || 'itinerary'
}
