import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

// NOTE: Building in restricted environments (no network) fails when using
// `next/font/google` because it tries to fetch fonts at build time.
// To keep builds/dev server working offline, avoid Google Fonts here and
// rely on the Tailwind `font-sans` stack defined in globals.

export const metadata: Metadata = {
  title: "Ink Fusion Art - Create Your Perfect Tattoo Design with AI",
  description:
    "Transform your ideas into unique tattoo designs in seconds. Choose from multiple styles and preview on your skin with AR technology.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
