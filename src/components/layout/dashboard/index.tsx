'use client'

// ** React and Core Library Imports
import React from 'react'

// ** Custom Component Imports
import { Sidebar, SidebarProvider } from './sidebar'
import { AppBar } from './app-bar'
import { cn } from '@/lib/utils'
import { themeConfig } from '@/config/themeConfig'

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-default-50 flex w-full'>
      {/* Sidebar which handles its own mobile/desktop state via context */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className={cn(
          'mx-auto flex max-w-[1500px] flex-1 flex-col',
          themeConfig.contentWidth === 'compact' ? 'max-w-[1500px]' : 'max-w-full'
        )}
      >
        <AppBar />

        <main className='flex-1 overflow-auto' style={{ paddingInline: `${themeConfig.layoutPadding}px` }}>
          {children}
        </main>
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
