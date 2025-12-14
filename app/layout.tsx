import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { OrderProvider } from "@/contexts/OrderContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { StructuredData } from "./structured-data";

export const metadata: Metadata = {
  title: {
    default: "커피박 재활용 - Coffee Grounds Recycling",
    template: "%s | 커피박 재활용"
  },
  description: "커피찌꺼기를 활용한 친환경 재활용 솔루션. 마스티체와 함께하는 커피박 페인트 제품 및 재활용 정보를 제공합니다.",
  keywords: ["커피박", "재활용", "친환경", "페인트", "마스티체", "커피찌꺼기", "인테리어", "eco-friendly"],
  authors: [{ name: "Coffee Grounds Recycling" }],
  creator: "Coffee Grounds Recycling",
  publisher: "Coffee Grounds Recycling",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    title: "커피박 재활용 - Coffee Grounds Recycling",
    description: "커피찌꺼기를 활용한 친환경 재활용 솔루션",
    siteName: "커피박 재활용",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "커피박 재활용",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "커피박 재활용 - Coffee Grounds Recycling",
    description: "커피찌꺼기를 활용한 친환경 재활용 솔루션",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#654321" />
        <StructuredData />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const savedTheme = localStorage.getItem("theme");
                if (savedTheme === "dark") {
                  document.documentElement.classList.add("dark");
                } else if (savedTheme === "light") {
                  document.documentElement.classList.remove("dark");
                } else {
                  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                  if (systemPrefersDark) {
                    document.documentElement.classList.add("dark");
                  }
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased touch-pan-y">
        <ThemeProvider>
          <ToastProvider>
            <CartProvider>
              <OrderProvider>
                {children}
              </OrderProvider>
            </CartProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

