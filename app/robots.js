export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/create-package', '/api/'],
      },
    ],
    sitemap: 'https://tripcartholidays.com/sitemap.xml',
  }
}
