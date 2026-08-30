import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://solytes-solar.kprasadkodoth.chatgpt.site/sitemap.xml',
  };
}
