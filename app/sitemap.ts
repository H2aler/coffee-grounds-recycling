import { MetadataRoute } from 'next'
import { products } from '@/utils/products'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const basePath = process.env.GITHUB_ACTIONS === 'true' ? '/coffee-grounds-recycling' : ''
  const fullBaseUrl = baseUrl + basePath
  
  // 정적 페이지
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: fullBaseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${fullBaseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${fullBaseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${fullBaseUrl}/cart`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${fullBaseUrl}/detail`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // 동적 제품 페이지
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${fullBaseUrl}/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticPages, ...productPages]
}

