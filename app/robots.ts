import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/admin', '/d/', '/api/'],
      },
    ],
    sitemap: 'https://dentisaludgroup.com.ar/sitemap.xml',
  };
}
