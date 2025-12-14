import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '커피박 재활용 - Coffee Grounds Recycling',
    short_name: '커피박 재활용',
    description: '커피찌꺼기를 활용한 친환경 재활용 솔루션',
    start_url: '/',
    display: 'standalone',
    background_color: '#faf7f2',
    theme_color: '#654321',
    orientation: 'portrait',
    icons: [
      // 아이콘 파일이 생성되면 아래 주석을 해제하세요
      // {
      //   src: '/icon-192.png',
      //   sizes: '192x192',
      //   type: 'image/png',
      //   purpose: 'any maskable',
      // },
      // {
      //   src: '/icon-512.png',
      //   sizes: '512x512',
      //   type: 'image/png',
      //   purpose: 'any maskable',
      // },
    ],
    categories: ['environment', 'shopping', 'business'],
    lang: 'ko',
    dir: 'ltr',
  }
}

