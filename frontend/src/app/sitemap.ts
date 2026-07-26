import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bhramastra.in';
  
  const routes = [
    '',
    '/about',
    '/services',
    '/news',
    '/contact',
    '/research',
    '/insights',
    '/pricing',
    '/privacy',
    '/terms',
    '/risk',
    '/disclaimer'
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
