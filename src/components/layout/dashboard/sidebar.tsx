'use client'

// ** React and Core Library Imports
import React, { createContext, useContext, useState, ReactNode } from 'react'

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
  Users,
  Menu
} from 'lucide-react'

// ** Custom Component Imports
import { ThemeSwitcher } from '@/components/custom/theme-switcher'

// -- Context --
interface SidebarContextProps {
  collapsed: boolean
  setCollapsed: (v: boolean) => void
  mobileOpen: boolean
  setMobileOpen: (v: boolean) => void
}

const SidebarContext = createContext<SidebarContextProps>({
  collapsed: false,
  setCollapsed: () => {},
  mobileOpen: false,
  setMobileOpen: () => {}
})

export const useSidebar = () => useContext(SidebarContext)

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, mobileOpen, setMobileOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}

// -- Components --

export const SidebarTrigger = ({ className }: { className?: string }) => {
  const { setMobileOpen } = useSidebar()

  return (
    <Button isIconOnly variant='light' className={className} onPress={() => setMobileOpen(true)}>
      <Menu size={20} />
    </Button>
  )
}

export function Sidebar({ className }: { className?: string }) {
  const { collapsed, setCollapsed, mobileOpen, setMobileOpen } = useSidebar()
  const pathname = usePathname()

  const toggleCollapse = () => setCollapsed(!collapsed)

  // Reduced width for minimized feel
  const sidebarWidth = collapsed ? 'w-[70px]' : 'w-[260px]'

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
    <div className='bg-sidebar text-sidebar-foreground relative flex h-full flex-col'>
      {/* Background Noise for texture */}
      <div
        className='pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay'
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      />

      {/* Header / Logo */}
      <div
        className={cn(
          'border-sidebar-border/50 z-10 flex h-16 items-center border-b px-4',
          collapsed ? 'justify-center' : 'justify-between'
        )}
      >
        <div className='flex items-center gap-3 font-bold'>
          <div className='bg-sidebar-primary text-sidebar-primary-foreground shadow-sidebar-primary/20 flex size-8 items-center justify-center rounded-lg shadow-md'>
            <Home size={18} />
          </div>
          {!collapsed && <span className='text-sm tracking-wide whitespace-nowrap'>Acme Corp</span>}
        </div>
      </div>

      {/* Main Content (Navigation) */}
      <ScrollShadow className='z-10 flex-1 py-4'>
        <div className={cn('flex flex-col gap-1', collapsed ? 'px-2' : 'px-3')}>
          {menuItems.map(section => (
            <Listbox
              key={section.title}
              variant='flat'
              aria-label={section.title}
              classNames={{
                list: 'gap-1'
              }}
            >
              <ListboxSection
                title={!collapsed ? section.title : undefined}
                showDivider={!collapsed}
                className='mb-0'
                classNames={{
                  heading: 'text-sidebar-foreground/50 text-[10px] uppercase font-bold tracking-wider mb-2 pl-1',
                  divider: 'bg-sidebar-border/50 my-2'
                }}
              >
                {section.items.map(item => {
                  const isActive = pathname === item.href

                  return (
                    <ListboxItem
                      key={item.key}
                      href={item.href}
                      textValue={item.label}
                      startContent={null} // We handle icon manually to ensure centering in collapsed state
                      className={cn(
                        'group relative overflow-hidden transition-all duration-200',

                        // Reduced padding and height
                        'h-9 py-0',
                        collapsed ? 'mx-auto w-9 justify-center rounded-lg px-0' : 'rounded-md px-2',
                        isActive
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm'
                          : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                      )}
                    >
                      <div className={cn('flex h-full w-full items-center', collapsed ? 'justify-center' : 'gap-3')}>
                        <item.icon
                          size={18}
                          className={cn(
                            'shrink-0 transition-transform duration-200',
                            isActive
                              ? 'text-sidebar-primary'
                              : 'text-sidebar-foreground/60 group-hover:text-sidebar-foreground',
                            collapsed && isActive && 'scale-110'
                          )}
                        />

                        {!collapsed && <span className={cn('flex-1 truncate text-xs font-medium')}>{item.label}</span>}

                        {/* Active Indicator (Glow/Bar) */}
                        {isActive && !collapsed && (
                          <div className='bg-sidebar-primary h-1.5 w-1.5 rounded-full shadow-[0_0_8px_rgba(var(--sidebar-primary),0.6)]' />
                        )}
                      </div>
                    </ListboxItem>
                  )
                })}
              </ListboxSection>
            </Listbox>
          ))}
        </div>
      </ScrollShadow>

      {/* Footer / User Profile & Theme Switcher */}
      <div className='border-sidebar-border/50 bg-sidebar/50 z-10 border-t p-3 backdrop-blur-sm'>
        {!collapsed && (
          <div className='mb-3 flex items-center justify-between px-1'>
            <span className='text-sidebar-foreground/50 text-[10px] font-medium tracking-wider uppercase'>Theme</span>
            <div className='origin-right scale-75'>
              <ThemeSwitcher />
            </div>
          </div>
        )}
        {collapsed && (
          <div className='mb-3 flex justify-center'>
            <div className='scale-75'>
              <ThemeSwitcher />
            </div>
          </div>
        )}

        <div
          className={cn(
            'border-sidebar-border/40 bg-sidebar-accent/10 hover:bg-sidebar-accent/20 flex cursor-pointer items-center gap-3 rounded-lg border p-1.5 transition-colors',
            collapsed ? 'justify-center border-none bg-transparent p-1 hover:bg-transparent' : ''
          )}
        >
          <Avatar
            isBordered
            size='sm'
            src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
            className={cn('ring-sidebar h-7 w-7 ring-2', collapsed ? 'h-8 w-8' : '')}
          />
          {!collapsed && (
            <div className='flex flex-col overflow-hidden'>
              <span className='truncate text-xs font-bold'>Jane Doe</span>
              <span className='text-sidebar-foreground/60 truncate text-[10px]'>jane@acme.com</span>
            </div>
          )}
          {!collapsed && (
            <Button isIconOnly variant='light' size='sm' className='text-sidebar-foreground/50 ml-auto'>
              <LogOut size={16} />
            </Button>
          )}
        </div>
      </div>

      {/* Desktop Collapse Toggle */}
      <div className='absolute top-20 -right-3 z-20 hidden md:block'>
        <Button
          isIconOnly
          size='sm'
          variant='shadow'
          className='bg-sidebar-primary text-sidebar-primary-foreground border-sidebar hover:bg-sidebar-primary/90 h-6 w-6 min-w-6 border-2 shadow-md'
          radius='full'
          onPress={toggleCollapse}
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </Button>
      </div>
    </div>
  )

  // Mobile Drawer Wrapper
  return (
    <>
      {/* Mobile Drawer */}
      <div
        className={cn(
          'bg-sidebar fixed inset-y-0 left-0 z-50 w-[260px] shadow-2xl transition-transform duration-300 ease-in-out md:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {content}
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'border-sidebar-border sticky top-0 hidden h-screen flex-col border-r transition-all duration-300 ease-in-out md:flex',
          sidebarWidth,
          className
        )}
      >
        {content}
      </aside>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] md:hidden'
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  )
}
