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
        'sticky top-0 z-20 flex h-12 w-full items-center justify-between transition-all duration-300',
        isScrolled ? 'border-divider bg-background/80 border-b backdrop-blur-md' : 'bg-transparent'
      )}
      style={{ paddingInline: `${themeConfig.layoutPadding}px` }}
    >
      {/* Left Side: Mobile Toggle & Brand (Optional on desktop if sidebar is present) */}
      <div className='flex items-center gap-2'>
        <div className='md:hidden'>
          <SidebarTrigger />
        </div>
      </div>

      {/* Right Side: Actions */}
      <div className='flex items-center gap-2'>
        {/* <SearchButton /> */}
        {/* <LanguageSwitcher /> */}
        <ThemeToggle />
        <NotificationButton />
        <UserDropdown />
      </div>
    </header>
  )
}
