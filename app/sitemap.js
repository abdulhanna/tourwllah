import { BLOGS } from '@/data/blogs'
import { DESTINATIONS } from '@/data/destinations'
import { TREKS } from '@/data/treks'
import { LEH_PACKAGES, LEH_HEADER_IMAGE } from '@/data/leh-packages'

const BASE = 'https://tripcartholidays.com'

export default function sitemap() {
  const staticRoutes = [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      images: [{ url: DESTINATIONS[0].heroImage, title: 'Tripcart Holidays — Best Tour Packages in India' }],
    },
    {
      url: `${BASE}/kashmir-tour-package`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [
        { url: DESTINATIONS.find(d => d.slug === 'kashmir').heroImage, title: 'Kashmir Tour Package' },
        { url: DESTINATIONS.find(d => d.slug === 'kashmir').cardImage, title: 'Kashmir — Dal Lake' },
      ],
    },
    {
      url: `${BASE}/manali-tour-package`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [
        { url: DESTINATIONS.find(d => d.slug === 'manali').heroImage, title: 'Manali Tour Package' },
        { url: DESTINATIONS.find(d => d.slug === 'manali').cardImage, title: 'Manali — Rohtang Pass' },
      ],
    },
    {
      url: `${BASE}/rajasthan-tour-package`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [
        { url: DESTINATIONS.find(d => d.slug === 'rajasthan').heroImage, title: 'Rajasthan Tour Package' },
        { url: DESTINATIONS.find(d => d.slug === 'rajasthan').cardImage, title: 'Rajasthan — Forts and Palaces' },
      ],
    },
    {
      url: `${BASE}/north-east-tour-package`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [
        { url: DESTINATIONS.find(d => d.slug === 'north-east').heroImage, title: 'North East Tour Package' },
        { url: DESTINATIONS.find(d => d.slug === 'north-east').cardImage, title: 'Meghalaya — Dawki River' },
      ],
    },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/packages`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    {
      url: `${BASE}/treks`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
      images: [{ url: TREKS[0].heroImage, title: 'Himalayan Treks — Tripcart Holidays' }],
    },
    {
      url: `${BASE}/leh-ladakh`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      images: [{ url: `${BASE}${LEH_HEADER_IMAGE}`, title: 'Leh Ladakh Packages — Tripcart Holidays' }],
    },
  ]

  const lehRoutes = LEH_PACKAGES.map(p => ({
    url: `${BASE}/leh-ladakh/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.88,
    images: [{ url: p.heroImage, title: p.title }],
  }))

  const trekRoutes = TREKS.map(t => ({
    url: `${BASE}/treks/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
    images: [{ url: t.heroImage, title: t.title }],
  }))

  const blogRoutes = BLOGS.map(b => ({
    url: `${BASE}/blog/${b.slug}`,
    lastModified: new Date(b.dateModified || b.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
    images: [{ url: b.heroImage, title: b.title }],
  }))

  return [...staticRoutes, ...trekRoutes, ...lehRoutes, ...blogRoutes]
}
