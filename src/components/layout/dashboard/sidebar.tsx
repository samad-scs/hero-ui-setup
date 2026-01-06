'use client'

// ** React and Core Library Imports
import React from 'react'

// ** Next.js and Internationalization Imports
import { usePathname } from 'next/navigation'

// ** UI Library Imports
import { Avatar } from '@heroui/avatar'
import { Button } from '@heroui/button'
import { Listbox, ListboxItem, ListboxSection } from '@heroui/listbox'
import { ScrollShadow } from '@heroui/scroll-shadow'
import { cn } from '@heroui/theme'

// ** Third-Party Library Imports
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  Users
} from 'lucide-react'

// ** Custom Component Imports
// (None individually for now, using inline for simplicity or will extract if needed)

export const SidebarContext = React.createContext<{
  collapsed: boolean
  setCollapsed: (v: boolean) => void
  isMobile: boolean
  setMobileOpen: (v: boolean) => void
}>({
  collapsed: false,
  setCollapsed: () => {},
  isMobile: false,
  setMobileOpen: () => {}
})

export function Sidebar({
  className,
  isMobile,
  mobileOpen
}: {
  className?: string
  isMobile?: boolean
  mobileOpen?: boolean
  setMobileOpen?: (open: boolean) => void
}) {
  const [collapsed, setCollapsed] = React.useState(false)
  const pathname = usePathname()

  const toggleCollapse = () => setCollapsed(!collapsed)

  const sidebarWidth = collapsed ? 'w-[80px]' : 'w-[280px]'

  const menuItems = [
    {
      title: 'Main',
      items: [
        { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
        { key: 'analytics', label: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
        { key: 'team', label: 'Team', icon: Users, href: '/dashboard/team' }
      ]
    },
    {
      title: 'Management',
      items: [
        { key: 'projects', label: 'Projects', icon: FileText, href: '/dashboard/projects' },
        { key: 'billing', label: 'Billing', icon: CreditCard, href: '/dashboard/billing' },
        { key: 'settings', label: 'Settings', icon: Settings, href: '/dashboard/settings' }
      ]
    }
  ]

  const content = (
    <div className='bg-background border-divider text-foreground flex h-full flex-col border-r'>
      {/* Header / Logo */}
      <div
        className={cn(
          'border-divider flex h-16 items-center border-b px-4',
          collapsed ? 'justify-center' : 'justify-between'
        )}
      >
        <div className='flex items-center gap-2 text-xl font-bold'>
          <div className='bg-primary/10 text-primary flex size-8 items-center justify-center rounded-lg'>
            <Home size={20} />
          </div>
          {!collapsed && <span>Acme Corp</span>}
        </div>
      </div>

      {/* Main Content (Navigation) */}
      <ScrollShadow className='flex-1 py-4'>
        <div className='flex flex-col gap-6 px-3'>
          {menuItems.map(section => (
            <Listbox
              key={section.title}
              variant='flat'
              aria-label={section.title}
              classNames={{
                list: 'gap-1'
              }}
            >
              <ListboxSection title={!collapsed ? section.title : undefined} showDivider={!collapsed}>
                {section.items.map(item => (
                  <ListboxItem
                    key={item.key}
                    href={item.href}
                    startContent={
                      <item.icon
                        size={20}
                        className={cn('text-default-500', pathname === item.href && 'text-primary')}
                      />
                    }
                    className={cn(
                      pathname === item.href ? 'bg-primary/10 text-primary' : 'text-default-600',
                      collapsed && 'justify-center px-0'
                    )}
                    textValue={item.label}
                  >
                    {!collapsed && <span className='text-sm font-medium'>{item.label}</span>}
                  </ListboxItem>
                ))}
              </ListboxSection>
            </Listbox>
          ))}
        </div>
      </ScrollShadow>

      {/* Footer / User Profile */}
      <div className='border-divider border-t p-4'>
        <div className={cn('flex items-center gap-3', collapsed ? 'justify-center' : '')}>
          <Avatar isBordered size='sm' src='https://i.pravatar.cc/150?u=a042581f4e29026704d' />
          {!collapsed && (
            <div className='flex flex-col'>
              <span className='text-small font-bold'>Jane Doe</span>
              <span className='text-tiny text-default-500'>Admin</span>
            </div>
          )}
          {!collapsed && (
            <Button isIconOnly variant='light' size='sm' className='ml-auto'>
              <LogOut size={18} />
            </Button>
          )}
        </div>
      </div>

      {/* Desktop Collapse Toggle */}
      {!isMobile && (
        <div className='absolute top-20 -right-3'>
          <Button
            isIconOnly
            size='sm'
            variant='solid'
            color='primary'
            radius='full'
            className='h-6 w-6 min-w-6 shadow-md'
            onPress={toggleCollapse}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </Button>
        </div>
      )}
    </div>
  )

  if (isMobile) {
    // For mobile drawer implementation, this component might just return the content style,
    // but usually the sidebar wrapper handles the fixed positioning or drawer logic.
    // We'll define a simpler mobile view or assume parent handles the Drawer overlay.
    return (
      <div
        className={cn(
          'bg-background fixed inset-y-0 left-0 z-50 w-64 shadow-xl transition-transform',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
          className
        )}
      >
        {content}
      </div>
    )
  }

  return (
    <aside
      className={cn(
        'transition-width sticky top-0 hidden h-screen flex-col duration-300 md:flex',
        sidebarWidth,
        className
      )}
    >
      {content}
    </aside>
  )
}
