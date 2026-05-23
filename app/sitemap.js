import { BLOGS } from '@/data/blogs'
import { DESTINATIONS } from '@/data/destinations'
import { TREKS } from '@/data/treks'

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
  ]

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

  return [...staticRoutes, ...trekRoutes, ...blogRoutes]
}
