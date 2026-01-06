'use client'

// ** React and Core Library Imports
import React from 'react'

// ** Custom Component Imports
import { Sidebar, SidebarProvider, SidebarTrigger } from './sidebar'

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-default-50 flex h-screen w-full'>
      {/* Sidebar which handles its own mobile/desktop state via context */}
      <Sidebar />

      {/* Main Content Area */}
      <div className='flex flex-1 flex-col overflow-hidden'>
        {/* Mobile Header for Menu Toggle */}
        <header className='border-divider bg-background/80 sticky top-0 z-20 flex h-16 items-center justify-between border-b px-4 backdrop-blur-md md:hidden'>
          <div className='flex items-center gap-2'>
            <SidebarTrigger />
            <span className='text-large font-bold'>Acme Corp</span>
          </div>
        </header>

        <main className='flex-1 overflow-auto p-4 md:p-8'>{children}</main>
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
