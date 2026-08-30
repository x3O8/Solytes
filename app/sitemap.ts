import type { MetadataRoute } from 'next';
import { products } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = 'https://solytes-solar.kprasadkodoth.chatgpt.site';
  const routes = [
    '',
    '/products',
    '/projects',
    '/calculator',
    '/gallery',
    '/about',
    '/contact',
  ];
  return [
    ...routes.map((route) => ({
      url: `${origin}${route}`,
      lastModified: new Date(),
      changeFrequency:
        route === '' ? ('weekly' as const) : ('monthly' as const),
      priority: route === '' ? 1 : 0.8,
    })),
    ...products.map((product) => ({
      url: `${origin}/products/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
