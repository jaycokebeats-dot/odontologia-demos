import { MetadataRoute } from 'next';
import { TREATMENTS, BLOG_ARTICLES } from '@/data/dentisalud-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dentisaludgroup.com.ar';
  const lastModified = new Date();

  // Static routes
  const routes = [
    '',
    '/tratamientos',
    '/casos-y-testimonios',
    '/nosotros',
    '/urgencias',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Treatments
  const treatmentRoutes = TREATMENTS.map((treatment) => ({
    url: `${baseUrl}/tratamientos/${treatment.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Blog articles
  const blogRoutes = BLOG_ARTICLES.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...treatmentRoutes, ...blogRoutes];
}
