export function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "커피박 재활용",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "description": "커피찌꺼기를 활용한 친환경 재활용 솔루션",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "010-7356-2482",
      "contactType": "customer service",
      "email": "mastice@naver.com",
      "areaServed": "KR",
      "availableLanguage": ["Korean"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "송호1길 59",
      "addressLocality": "안산시",
      "addressRegion": "경기도",
      "addressCountry": "KR"
    }
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "커피박 재활용",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}

