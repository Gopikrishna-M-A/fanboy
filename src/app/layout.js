import AuthProvider from "@/components/AuthProvider"
import "./globals.css"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { CartProvider } from "../contexts/cart"
import Providers from "@/contexts/Providers"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import Script from "next/script"

export const metadata = {
  title: "Fanboy Jerseys | Where Fan's Meets a Fan",
  description:
    "Discover authentic sports jerseys for true fans. Wide selection of teams and players. High-quality",
  keywords:
    "sports jerseys, fan merchandise, authentic jerseys, official team gear, jerseys, football, jersey, soccer",
  author: "Fanboy Jerseys",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  charset: "UTF-8",
  language: "English",
  revisitAfter: "7 days",
  openGraph: {
    type: "website",
    url: "https://www.fanboyjerseys.store",
    title: "Fanboy Jerseys | Where Fan's Meets a Fan",
    description:
      "Discover authentic sports jerseys for true fans. Wide selection of teams and players.",
    images: [
      {
        url: "https://fanboy-jerseys-images.s3.eu-north-1.amazonaws.com/logo-foot.jpeg",
        width: 1200,
        height: 630,
        alt: "Fanboy Jerseys Collection",
      },
    ],
  },
  social: {
    instagram: "https://www.instagram.com/fnbyjrsy",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/icons/logo-16.png", sizes: "16x16", type: "image/png" }],
  },
  other: {
    "msapplication-TileColor": "#22c55e",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <Script
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-HRBHMVN9ET'></Script>
        <Script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-HRBHMVN9ET');
          `}
        </Script>
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <AuthProvider>
            <CartProvider>
              <Header />
              {children}
              <SpeedInsights />
              <Analytics />
              <Footer />
            </CartProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}
