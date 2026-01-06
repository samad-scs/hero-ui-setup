'use client'

// ** React and Core Library Imports
import React, { createContext, ReactNode, useContext, useState } from 'react'

// ** Next.js and Internationalization Imports
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

// ** UI Library Imports
import { Avatar } from '@heroui/avatar'
import { Button } from '@heroui/button'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown'
import { ScrollShadow } from '@heroui/scroll-shadow'
import { cn } from '@heroui/theme'

// ** Third-Party Library Imports
import { ChevronLeft, ChevronRight, Home, LogOut, Menu, Moon, Sun, User } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

// ** Custom Component Imports
import { ROUTES } from '@/constants/routes'
import { MENU_ITEMS } from '@/data/menu-data'

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

  return (
    <>
      {/* Mobile Drawer */}
      <div
        className={cn(
          'bg-sidebar fixed inset-y-0 left-0 z-50 w-[260px] shadow-2xl transition-transform duration-300 ease-in-out md:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent collapsed={false} pathname={pathname} onItemClick={() => setMobileOpen(false)} />
      </div>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 70 : 260 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn('border-sidebar-border sticky top-0 hidden h-screen flex-col border-r md:flex', className)}
      >
        <SidebarContent collapsed={collapsed} pathname={pathname} toggleCollapse={toggleCollapse} />
      </motion.aside>

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

// Separate component to share content between mobile and desktop
function SidebarContent({
  collapsed,
  pathname,
  toggleCollapse,
  onItemClick
}: {
  collapsed: boolean
  pathname: string
  toggleCollapse?: () => void
  onItemClick?: () => void
}) {
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const handleAction = (key: React.Key) => {
    if (key === 'profile') {
      router.push(ROUTES.PROFILE)
      if (onItemClick) onItemClick()
    } else if (key === 'theme') {
      setTheme(theme === 'dark' ? 'light' : 'dark')
    } else if (key === 'logout') {
      // Handle Logout Logic
      console.log('Logging out...')
    }
  }

  return (
    <div className='bg-sidebar text-sidebar-foreground relative flex h-full w-full flex-col'>
      {/* Background Noise used for texture */}
      <div
        className='pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay'
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      />

      {/* Header / Logo */}
      <div
        className={cn(
          'border-sidebar-border/50 z-10 flex h-16 shrink-0 items-center border-b px-4',
          collapsed ? 'justify-center' : 'justify-between'
        )}
      >
        <div className='flex items-center gap-3 overflow-hidden font-bold'>
          <div className='bg-sidebar-primary text-sidebar-primary-foreground shadow-sidebar-primary/20 flex size-8 shrink-0 items-center justify-center rounded-lg shadow-md'>
            <Home size={18} />
          </div>

          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className='text-sm tracking-wide whitespace-nowrap'
              >
                Acme Corp
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content (Navigation) */}
      <ScrollShadow className='z-10 w-full flex-1 py-4'>
        <div className={cn('flex flex-col gap-1', collapsed ? 'px-2' : 'px-3')}>
          {MENU_ITEMS.map(section => (
            <div key={section.title} className='mb-2'>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='mb-2 px-3'
                >
                  <span className='text-sidebar-foreground/50 text-[10px] font-bold tracking-wider uppercase'>
                    {section.title}
                  </span>
                </motion.div>
              )}
              {collapsed && <div className='h-4' />} {/* Spacer for collapsed mode */}
              <div className='flex flex-col gap-0.5'>
                {section.items.map(item => {
                  const isActive = pathname === item.href

                  return (
                    <Link key={item.key} href={item.href} className='relative block' onClick={onItemClick}>
                      <div
                        className={cn(
                          'group relative flex min-h-[36px] cursor-pointer items-center transition-all duration-200',
                          collapsed ? 'mx-auto w-9 justify-center rounded-lg' : 'mx-1 rounded-md px-3',

                          // Hover state (only if not active to avoid conflict with layoutId bg)
                          !isActive &&
                            'hover:bg-sidebar-accent/50 text-sidebar-foreground/70 hover:text-sidebar-accent-foreground'
                        )}
                      >
                        {/* Active Background Animation */}
                        {isActive && (
                          <motion.div
                            layoutId='activeSidebarItem'
                            className='bg-sidebar-accent absolute inset-0 rounded-md shadow-sm'
                            initial={false}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}

                        {/* Icon */}
                        <div className='relative z-10 flex items-center justify-center'>
                          <item.icon
                            size={18}
                            className={cn(
                              'shrink-0 transition-colors duration-200',
                              isActive
                                ? 'text-sidebar-primary'
                                : 'text-sidebar-foreground/60 group-hover:text-sidebar-foreground'
                            )}
                          />
                        </div>

                        {/* Label */}
                        <AnimatePresence>
                          {!collapsed && (
                            <motion.span
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: 'auto' }}
                              exit={{ opacity: 0, width: 0 }}
                              transition={{ duration: 0.2 }}
                              className={cn(
                                'relative z-10 ml-3 overflow-hidden text-xs font-medium whitespace-nowrap',
                                isActive ? 'text-sidebar-accent-foreground' : ''
                              )}
                            >
                              {item.label}
                            </motion.span>
                          )}
                        </AnimatePresence>

                        {/* Active Indicator Dot (Collapsed only) */}
                        {isActive && collapsed && (
                          <motion.div
                            layoutId='activeDot'
                            className='bg-sidebar-primary border-sidebar absolute top-1 -right-1 h-2 w-2 rounded-full border-2'
                          />
                        )}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollShadow>

      {/* Footer / User Profile & Actions OLD */}
      <div className='border-sidebar-border/50 bg-sidebar/50 z-10 shrink-0 overflow-hidden border-t p-3 backdrop-blur-sm'>
        <Dropdown placement={collapsed ? 'right-end' : 'top-start'} offset={10}>
          <DropdownTrigger>
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
                className={cn('ring-sidebar h-7 w-7 shrink-0 ring-2', collapsed ? 'h-8 w-8' : '')}
              />

              <AnimatePresence>
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className='ml-1 flex flex-col overflow-hidden text-left'
                  >
                    <span className='truncate text-xs font-bold'>Jane Doe</span>
                    <span className='text-sidebar-foreground/60 truncate text-[10px]'>jane@acme.com</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {!collapsed && (
                <div className='text-sidebar-foreground/50 ml-auto'>
                  <ChevronRight size={16} />
                </div>
              )}
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label='User Actions' variant='flat' onAction={handleAction}>
            <DropdownItem key='profile' startContent={<User size={16} />} textValue='Profile'>
              Profile
            </DropdownItem>
            <DropdownItem
              key='theme'
              startContent={theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              textValue='Switch Theme'
            >
              Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
            </DropdownItem>
            <DropdownItem
              key='logout'
              color='danger'
              className='text-danger'
              startContent={<LogOut size={16} />}
              textValue='Logout'
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Desktop Collapse Toggle */}
      {toggleCollapse && (
        <div className='absolute top-20 -right-3 z-20 hidden md:block'>
          <Button
            isIconOnly
            size='sm'
            variant='shadow'
            className='bg-sidebar-primary text-sidebar-primary-foreground border-sidebar hover:bg-sidebar-primary/90 h-7 w-7 min-w-7 border-2 shadow-md'
            radius='full'
            onPress={toggleCollapse}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </Button>
        </div>
      )}
    </div>
  )
}
