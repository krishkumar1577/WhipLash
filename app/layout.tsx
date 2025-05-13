import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "./navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SpotifyMatch - Find Your Perfect Match Through Music",
  description:
    "Connect with people who share your musical taste. Swipe on profiles, match with compatible users, and start conversations that flow naturally.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Navigation />
        </ThemeProvider>
      </body>
    </html>
  )
}
