export default function manifest() {
  return {
    name: 'Tripcart Holidays | Best Tour Packages in India',
    short_name: 'Tripcart Holidays',
    description:
      'Book Kashmir, Manali, Rajasthan and North East tour packages. Customized itineraries, best prices, and WhatsApp support from Tripcart Holidays.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f9f9f9',
    theme_color: '#0f766e',
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
