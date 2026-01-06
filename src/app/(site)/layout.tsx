import WebsiteLayout from '@/components/layout/website'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <WebsiteLayout>{children}</WebsiteLayout>
}

export default Layout
