import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import StickyWhatsApp from '@/components/layout/StickyWhatsApp'

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

const OG_IMAGE = 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&q=80&auto=format&fit=crop'

export const metadata = {
  title: {
    default: 'Himalayan Holidays | Best Tour Packages in India',
    template: '%s | Himalayan Holidays',
  },
  description:
    'Book Kashmir, Manali & Rajasthan tour packages. Himalayan Holidays offers customized itineraries with best prices. Chat on WhatsApp for instant quotes.',
  keywords: ['Kashmir tour package', 'Manali tour package', 'Rajasthan tour package', 'Himalayan Holidays', 'India travel'],
  metadataBase: new URL('https://himalayanholidays.in'),
  alternates: { canonical: 'https://himalayanholidays.in' },
  openGraph: {
    type: 'website',
    siteName: 'Himalayan Holidays',
    title: 'Himalayan Holidays | Best Tour Packages in India',
    description: 'Book Kashmir, Manali & Rajasthan tour packages with Himalayan Holidays.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Himalayan Holidays — Best Tour Packages in India' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Himalayan Holidays | Best Tour Packages in India',
    description: 'Book Kashmir, Manali & Rajasthan tour packages with Himalayan Holidays.',
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Himalayan Holidays',
  url: 'https://himalayanholidays.in',
  description: 'Best tour packages to Kashmir, Manali & Rajasthan. Customized holidays, houseboat stays, adventure trips and cultural tours across India.',
  telephone: '+91XXXXXXXXXX',
  email: 'info@himalayanholidays.in',
  address: { '@type': 'PostalAddress', addressCountry: 'IN' },
  sameAs: ['https://wa.me/91XXXXXXXXXX'],
  logo: { '@type': 'ImageObject', url: 'https://himalayanholidays.in/og-image.jpg' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', bestRating: '5', reviewCount: '1900' },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Himalayan Holidays',
  url: 'https://himalayanholidays.in',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: 'https://himalayanholidays.in/blog?q={search_term_string}' },
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
