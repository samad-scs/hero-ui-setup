'use client'

// ** React and Core Library Imports
import React, { useState } from 'react'

// ** UI Library Imports
import { Button } from '@heroui/button'

// ** Third-Party Library Imports
import { Menu } from 'lucide-react'

// ** Custom Component Imports
import { Sidebar } from './sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className='bg-content1 flex h-screen'>
      {/* Sidebar - Desktop & Mobile */}
      <Sidebar isMobile={false} className='border-default-200 hidden border-r md:flex' />
      <Sidebar
        isMobile={true}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        className='border-default-200 border-r md:hidden'
      />

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden'
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className='flex flex-1 flex-col overflow-hidden'>
        {/* Mobile Header for Menu Toggle */}
        <header className='border-default-200 bg-background flex h-16 items-center border-b px-4 md:hidden'>
          <Button isIconOnly variant='light' onPress={() => setMobileOpen(true)}>
            <Menu size={24} />
          </Button>
          <span className='text-large ml-2 font-bold'>Acme Corp</span>
        </header>

        <main className='bg-content1/50 flex-1 overflow-auto p-6'>{children}</main>
      </div>
    </div>
  )
}
