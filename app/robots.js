export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/create-package', '/api/'],
      },
    ],
    sitemap: 'https://himalayanholidays.in/sitemap.xml',
  }
}
