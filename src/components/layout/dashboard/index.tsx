'use client'

// ** React and Core Library Imports
import React from 'react'

// ** Custom Component Imports
import { themeConfig } from '@/config/themeConfig'
import { cn } from '@/lib/utils'
import { AppBar } from './app-bar'
import { Sidebar, SidebarProvider } from './sidebar'

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-background flex w-full'>
      {/* Sidebar which handles its own mobile/desktop state via context */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className={cn('mx-auto flex flex-1 flex-col')}
        style={{
          paddingInline: `${themeConfig.layoutPadding}px`,
          maxWidth: themeConfig.contentWidth === 'compact' ? `${themeConfig.compactContentWidth}px` : 'full'
        }}
      >
        <AppBar />

        <main className='mt-4 flex-1 overflow-auto'>{children}</main>
      </div>
    </div>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </SidebarProvider>
  )
}
