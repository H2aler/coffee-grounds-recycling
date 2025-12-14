import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const basePath = process.env.GITHUB_ACTIONS === 'true' ? '/coffee-grounds-recycling' : ''
  const fullBaseUrl = baseUrl + basePath
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${fullBaseUrl}/sitemap.xml`,
  }
}

