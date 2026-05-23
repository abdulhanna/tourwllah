const BRAND_PHONE = '+91 70040 15511'

function escapeHtml(str) {
  if (str == null) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function listItems(items, empty = '—') {
  if (!items?.length) return `<li>${empty}</li>`
  return items.map(i => `<li>${escapeHtml(i)}</li>`).join('')
}

function dayBlocks(days) {
  if (!days?.length) {
    return `<div class="day-container"><p>No itinerary days added yet.</p></div>`
  }
  return days
    .map(
      day => `
    <div class="day-container">
      <div class="day-title">Day ${escapeHtml(day.day)}: ${escapeHtml(day.title)}</div>
      ${day.details ? `<div class="day-details">${escapeHtml(day.details)}</div>` : ''}
      <p style="margin:0;">${escapeHtml(day.description)}</p>
    </div>`
    )
    .join('')
}

function pricingTable(rows) {
  if (!rows?.length) return ''
  return `
    <div class="section-title">Exclusive Package Pricing</div>
    <table class="pricing-table">
      <thead>
        <tr>
          <th>Travel Style Variant</th>
          <th>Special Price (Per Person)</th>
        </tr>
      </thead>
      <tbody>
        ${rows
          .map(
            r => `
          <tr>
            <td><strong>${escapeHtml(r.label)}</strong></td>
            <td><strong>${escapeHtml(r.price)}</strong></td>
          </tr>`
          )
          .join('')}
      </tbody>
    </table>
    ${rows[0]?.note ? `<p class="pricing-note">${escapeHtml(rows[0].note)}</p>` : ''}
  `
}

function metaRows(rows) {
  if (!rows?.length) return ''
  const pairs = []
  for (let i = 0; i < rows.length; i += 2) {
    pairs.push([rows[i], rows[i + 1]])
  }
  return `
    <table class="meta-info-table">
      ${pairs
        .map(
          ([a, b]) => `
        <tr>
          <td>${a ? escapeHtml(a) : ''}</td>
          <td>${b ? escapeHtml(b) : ''}</td>
        </tr>`
        )
        .join('')}
    </table>
  `
}

/**
 * @param {object} data - Normalized itinerary PDF payload
 * @param {{ baseUrl?: string }} options
 */
export function buildItineraryPdfHtml(data, options = {}) {
  const backgroundDataUri = options.backgroundDataUri || null
  const bgCss = backgroundDataUri
    ? `url('${backgroundDataUri}')`
    : 'linear-gradient(160deg, #e8f4f8 0%, #f5ebe0 45%, #dce8ef 100%)'

  const subtitle = data.subtitle || `Crafted by Tripcart Holidays | ${data.duration || ''}`
  const page2Title = data.page2Title || 'The Tripcart Holidays Promise'
  const page2Subtitle = data.page2Subtitle || 'Premium Inclusions, Ground Guidelines & Scheduling Details'

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(data.title)} — Tripcart Holidays</title>
  <style>
    * { box-sizing: border-box; }
    @page {
      size: A4;
      margin: 0;
    }
  html, body {
      margin: 0;
      padding: 0;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #1a202c;
      line-height: 1.55;
      font-size: 10.5pt;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    /* Chromium/Puppeteer ignores @page backgrounds — fixed layer repeats on each printed page */
    .pdf-page-bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      background-image: ${bgCss};
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .pdf-content {
      position: relative;
      z-index: 1;
      padding: 20mm 15mm 22mm 15mm;
    }
    .pdf-footer {
      position: fixed;
      bottom: 8mm;
      left: 15mm;
      right: 15mm;
      z-index: 2;
      display: flex;
      justify-content: space-between;
      font-size: 9.5pt;
      color: #2c3e50;
      font-weight: bold;
      pointer-events: none;
    }
    h1, h2, h3, h4 { margin-top: 0; }
    .header-banner {
      margin: 0 -15mm 25px -15mm;
      padding: 40px 15mm;
      background: linear-gradient(135deg, rgba(214, 90, 49, 0.92) 0%, rgba(239, 153, 97, 0.92) 100%);
      color: #ffffff;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
      text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
    }
    .header-banner h1 {
      color: #ffffff;
      margin: 0 0 6px 0;
      font-size: 24pt;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 800;
    }
    .header-banner .subtitle {
      font-size: 13pt;
      color: #ffffff;
      margin: 0;
      font-weight: 400;
      opacity: 0.95;
      letter-spacing: 0.5px;
    }
    .meta-info-table {
      width: 100%;
      margin-bottom: 25px;
      border-collapse: separate;
      border-spacing: 0;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    }
    .meta-info-table td {
      padding: 14px 18px;
      background-color: rgba(255, 255, 255, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.5);
      font-size: 10.5pt;
      color: #2d3748;
    }
    .section-title {
      font-size: 15pt;
      font-weight: bold;
      color: #8c3a1e;
      border-left: 6px solid #d65a31;
      padding-left: 14px;
      margin-top: 35px;
      margin-bottom: 18px;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      page-break-after: avoid;
    }
    .day-container {
      background-color: rgba(255, 255, 255, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.6);
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
      page-break-inside: avoid;
    }
    .day-title {
      font-size: 13pt;
      font-weight: bold;
      color: #d65a31;
      margin-bottom: 6px;
    }
    .day-details {
      font-style: italic;
      font-size: 10pt;
      color: #4a5568;
      margin-bottom: 12px;
      font-weight: bold;
      border-left: 2px solid #5a738e;
      padding-left: 8px;
    }
    .split-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    .split-table td { width: 50%; vertical-align: top; padding: 0 12px; }
    .split-table td:first-child { padding-left: 0; }
    .split-table td:last-child { padding-right: 0; }
    .list-box {
      background-color: rgba(255, 255, 255, 0.88);
      border: 1px solid rgba(255, 255, 255, 0.6);
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.04);
      min-height: 180px;
    }
    .list-box-title {
      font-weight: bold;
      font-size: 11.5pt;
      color: #8c3a1e;
      margin-bottom: 14px;
      border-bottom: 2.5px solid #d65a31;
      padding-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .list-box ul { margin: 0; padding-left: 18px; }
    .list-box li { margin-bottom: 9px; font-size: 10pt; color: #2d3748; }
    .pricing-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      margin-top: 12px;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0,0,0,0.05);
    }
    .pricing-table th {
      background: linear-gradient(135deg, #d65a31 0%, #ef9961 100%);
      color: white;
      text-align: left;
      padding: 14px 18px;
      font-size: 10.5pt;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .pricing-table td {
      padding: 14px 18px;
      border-bottom: 1px solid rgba(255,255,255,0.5);
      border-right: 1px solid rgba(255,255,255,0.5);
      font-size: 10pt;
      background-color: rgba(255, 255, 255, 0.82);
    }
    .pricing-table tr:last-child td { border-bottom: none; }
    .pricing-note {
      font-size: 10pt;
      color: #4a5568;
      margin-top: 10px;
      font-weight: bold;
      padding-left: 5px;
    }
    .contact-box {
      background: linear-gradient(135deg, #d65a31 0%, #ef9961 100%);
      color: #ffffff;
      padding: 22px;
      border-radius: 12px;
      text-align: center;
      margin-top: 35px;
      font-size: 11pt;
      box-shadow: 0 6px 20px rgba(214, 90, 49, 0.3);
      page-break-inside: avoid;
    }
    .contact-box strong {
      font-size: 14pt;
      letter-spacing: 0.5px;
      display: inline-block;
      margin-bottom: 6px;
    }
    .info-notes {
      background-color: rgba(255, 246, 230, 0.9);
      border-left: 5px solid #d65a31;
      padding: 20px;
      border-radius: 0 10px 10px 0;
      margin-top: 15px;
      font-size: 10pt;
      color: #2d3748;
      box-shadow: 0 4px 10px rgba(0,0,0,0.03);
    }
    .info-notes ul { margin: 0; padding-left: 18px; }
    .info-notes li { margin-bottom: 7px; }
    .batch-box {
      font-size: 10.5pt;
      background: rgba(255,255,255,0.8);
      padding: 15px;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.5);
      margin-bottom: 25px;
      line-height: 1.7;
    }
    .page-break { page-break-before: always; }
  </style>
</head>
<body>
  <div class="pdf-page-bg" aria-hidden="true"></div>
  <div class="pdf-footer">
    <span>Tripcart Holidays | Custom Tour Itinerary</span>
  </div>
  <div class="pdf-content">
  <div class="header-banner">
    <h1>${escapeHtml(data.title)}</h1>
    <div class="subtitle">${escapeHtml(subtitle)}</div>
  </div>

  ${metaRows(data.metaRows)}

  <div class="section-title">The Curated Timeline</div>
  ${dayBlocks(data.days)}

  ${pricingTable(data.pricing)}

  ${data.pricingFootnote ? `<p class="pricing-note">${escapeHtml(data.pricingFootnote)}</p>` : ''}

  <div class="page-break"></div>

  <div class="header-banner" style="padding: 22px 15mm;">
    <h1>${escapeHtml(page2Title)}</h1>
    <div class="subtitle">${escapeHtml(page2Subtitle)}</div>
  </div>

  <table class="split-table">
    <tr>
      <td>
        <div class="list-box">
          <div class="list-box-title" style="color: #2e7d32; border-bottom-color: #2e7d32;">What's 100% Covered</div>
          <ul>${listItems(data.inclusions)}</ul>
        </div>
      </td>
      <td>
        <div class="list-box">
          <div class="list-box-title" style="color: #c62828; border-bottom-color: #c62828;">What's Not Covered</div>
          <ul>${listItems(data.exclusions)}</ul>
        </div>
      </td>
    </tr>
  </table>

  ${
    data.notes?.length
      ? `
  <div class="section-title">Vital Ground Regulations & Notes</div>
  <div class="info-notes"><ul>${listItems(data.notes)}</ul></div>`
      : ''
  }

  ${
    data.groupDates
      ? `
  <div class="section-title">Scheduled Batch Departures</div>
  <p class="batch-box">${escapeHtml(data.groupDates)}</p>`
      : ''
  }

  <div class="contact-box">
    <strong>Book Your Seat Today with Tripcart Holidays</strong><br>
    <span style="font-size: 14pt; font-weight: bold; letter-spacing: 0.8px;">Hotline Support: ${BRAND_PHONE}</span><br>
    <span style="font-size: 10.5pt; opacity: 0.9;">Connect with our holiday curators for customized upgrades &amp; direct corporate slots.</span>
  </div>
  </div>
</body>
</html>`
}

export { BRAND_PHONE }
