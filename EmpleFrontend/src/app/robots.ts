import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://emple.in';

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/resources/', '/jobs/', '/tutorials/'],
      disallow: ['/admin/', '/user/', '/auth/', '/dashboard/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
