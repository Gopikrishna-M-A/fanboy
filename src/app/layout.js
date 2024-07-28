import AuthProvider from "@/components/AuthProvider"
import "./globals.css"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { CartProvider } from "../contexts/cart"

export const metadata = {
  title: "Fanboy Jerseys | Where Fan's Meets a Fan",
  description: "Discover authentic sports jerseys for true fans. Wide selection of teams and players. High-quality",
  keywords: "sports jerseys, fan merchandise, authentic jerseys, official team gear, jerseys, football, jersey, soccer",
  author: "Fanboy Jerseys",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  charset: "UTF-8",
  language: "English",
  revisitAfter: "7 days",
  openGraph: {
    type: 'website',
    url: 'https://www.fanboyjerseys.store',
    title: "Fanboy Jerseys | Where Fan's Meets a Fan",
    description: 'Discover authentic sports jerseys for true fans. Wide selection of teams and players.',
    images: [
      {
        url: 'https://fanboy-jerseys-images.s3.eu-north-1.amazonaws.com/logo-foot.jpeg',
        width: 1200,
        height: 630,
        alt: 'Fanboy Jerseys Collection',
      },
    ],
  },
  social: {
    instagram: 'https://www.instagram.com/fnbyjrsy',
  },
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/icons/safari-pinned-tab.svg", color: "#ff0000" },
    ],
  },
  themeColor: "#ff0000",
  other: {
    "msapplication-TileColor": "#00a300",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning >
        <AuthProvider>
          <CartProvider>
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
