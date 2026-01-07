import { webConfig } from '@/config/web'
import { Metadata } from 'next'

type TitleTemplate = {
  default: string
  template: string
  absolute?: string
}

export interface ConstructMetadata {
  title?: string | TitleTemplate
  description?: string
  image?: string
  icons?: string
  route?: string
  manifest?: string
  noIndex?: boolean
  keywords?: string
}

export function constructMetadata({
  title = webConfig?.seo?.name,
  description = webConfig?.seo?.description,
  image = webConfig?.seo?.image,
  icons = '/favicon.ico',
  noIndex = false,
  route = '',
  manifest,
  keywords = webConfig?.seo?.keywords?.join(', ')
}: ConstructMetadata = {}): Metadata {
  return {
    title,
    description,
    keywords,
    manifest,
    openGraph: {
      title,
      type: 'website',
      countryName: 'India',
      siteName: webConfig?.seo?.name,
      url: process.env.NEXT_PUBLIC_BASE_URL + route,
      description,
      images: [
        {
          url: image,
          alt: typeof title === 'string' ? title : undefined
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: image }],
      creator: '@codentic.software'
    },
    icons,
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:6590'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    }),
    creator: 'Codentic Software',
    authors: [{ name: 'Pragnesh Patel' }]
  }
}
