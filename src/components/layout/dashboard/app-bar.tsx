'use client'

import { useScrolled } from '@/hooks/use-scrolled'
import { cn } from '@heroui/theme'

import { themeConfig } from '@/config/themeConfig'
import { NotificationButton } from './notification-button'
import { SidebarTrigger } from './sidebar'
import { ThemeToggle } from './theme-switcher'
import { UserDropdown } from './user-dropdown'

export const AppBar = () => {
  const isScrolled = useScrolled()

  return (
    <header
      className={cn(
        'sticky top-0 z-50 flex h-14 items-center justify-between border border-t-0 border-transparent transition-all duration-300 ease-in-out',
        isScrolled ? 'bg-background/80 border-border rounded-b-2xl shadow-sm backdrop-blur-md' : 'w-full bg-transparent'
      )}
      style={isScrolled ? { paddingInline: `${themeConfig.layoutPadding}px` } : undefined}
    >
      {/* Left Side: Mobile Toggle & Brand (Optional on desktop if sidebar is present) */}
      <div className='flex items-center gap-2'>
        <div className='md:hidden'>
          <SidebarTrigger />
        </div>
      </div>

      {/* Right Side: Actions */}
      <div className='relative flex items-center gap-2'>
        {/* <SearchButton /> */}
        {/* <LanguageSwitcher /> */}
        <ThemeToggle />
        <NotificationButton />
        <UserDropdown />
      </div>
    </header>
  )
}
