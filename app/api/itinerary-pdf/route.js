import puppeteer from 'puppeteer'
import { buildItineraryPdfHtml } from '@/lib/itinerary-pdf-template'
import { getItineraryBackgroundDataUri } from '@/lib/itinerary-pdf-background'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function POST(request) {
  let data
  try {
    data = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!data?.title || !Array.isArray(data?.days)) {
    return Response.json({ error: 'Missing title or days in payload' }, { status: 400 })
  }

  const html = buildItineraryPdfHtml(data, {
    backgroundDataUri: getItineraryBackgroundDataUri(),
  })
  const filename = (data.filename || 'tripcart-itinerary.pdf').replace(/[^\w.\-]/g, '_')

  let browser
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    })
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'load', timeout: 45000 })
    await page.emulateMediaType('print')
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    })
    await browser.close()
    browser = null

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    if (browser) await browser.close().catch(() => {})
    console.error('itinerary-pdf error:', err)
    return Response.json(
      { error: 'Failed to generate PDF. Ensure Puppeteer/Chromium is available on the server.' },
      { status: 500 }
    )
  }
}
