import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import StickyWhatsApp from '@/components/layout/StickyWhatsApp'
import { INSTAGRAM_URL } from '@/lib/social'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'Tripcart Holidays | Kashmir, Manali, Rajasthan & North East Tour Packages',
    template: '%s | Tripcart Holidays',
  },
  description:
    'Book customized Kashmir, Manali, Rajasthan and North East tour packages with Tripcart Holidays. Expert-guided itineraries, best prices, houseboat stays and 24x7 WhatsApp support. Get an instant quote at +91 70040 15511.',
  keywords: [
    'Tripcart Holidays',
    'India tour packages',
    'Kashmir tour package',
    'Manali tour package',
    'Rajasthan tour package',
    'North East tour package',
    'Shillong Dawki Cherrapunjee package',
    'Meghalaya tour package',
    'customized holidays India',
    'WhatsApp travel booking',
    'best tour operator India',
    'Hampta Pass trek',
    'Chandratal Lake trek',
    'Himachal trekking packages',
  ],
  authors: [{ name: 'Tripcart Holidays', url: 'https://tripcartholidays.com' }],
  creator: 'Tripcart Holidays',
  publisher: 'Tripcart Holidays',
  category: 'travel',
  applicationName: 'Tripcart Holidays',
  metadataBase: new URL('https://tripcartholidays.com'),
  alternates: { canonical: 'https://tripcartholidays.com' },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Tripcart Holidays',
    title: 'Tripcart Holidays | Best Tour Packages in India',
    description:
      'Customized Kashmir, Manali, Rajasthan and North East tour packages. Expert-guided itineraries, best prices, and 24x7 WhatsApp support.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Tripcart Holidays — Best Tour Packages in India' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tripcart Holidays | Best Tour Packages in India',
    description:
      'Customized Kashmir, Manali, Rajasthan and North East tour packages. Expert-guided itineraries, best prices, and 24x7 WhatsApp support.',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export const viewport = {
  themeColor: '#0f766e',
  width: 'device-width',
  initialScale: 1,
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Tripcart Holidays',
  url: 'https://tripcartholidays.com',
  description: 'Best tour packages to Kashmir, Manali & Rajasthan. Customized holidays, houseboat stays, adventure trips and cultural tours across India.',
  telephone: '+917004015511',
  email: 'info@tripcartholidays.com',
  address: { '@type': 'PostalAddress', addressCountry: 'IN' },
  sameAs: ['https://wa.me/917004015511', INSTAGRAM_URL],
  logo: { '@type': 'ImageObject', url: 'https://tripcartholidays.com/logo.png' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', bestRating: '5', reviewCount: '1900' },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Tripcart Holidays',
  url: 'https://tripcartholidays.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: 'https://tripcartholidays.com/blog?q={search_term_string}' },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyWhatsApp />
      </body>
    </html>
  )
}
