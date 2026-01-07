import ServerProvider from '@/components/wrappers/server-providers'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { webConfig } from '@/config/web'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: {
    template: `%s | ${webConfig?.seo?.name}`,
    default: webConfig?.seo?.name
  },
  description: webConfig?.seo?.description
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <ServerProvider>{children}</ServerProvider>
      </body>
    </html>
  )
}
