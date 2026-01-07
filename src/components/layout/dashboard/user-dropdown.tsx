'use client'

// ** React and Core Library Imports
import React from 'react'

// ** Next.js and Internationalization Imports
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'

// ** UI Library Imports
import { Avatar } from '@heroui/avatar'
import { Listbox, ListboxItem } from '@heroui/listbox'
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover'
import { cn } from '@heroui/theme'

// ** Third-Party Library Imports
import { LogOut, User } from 'lucide-react'

// ** Custom Component Imports
import { ROUTES } from '@/constants/routes'

export const UserDropdown = () => {
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const handleAction = (key: React.Key) => {
    if (key === 'profile') {
      router.push(ROUTES.PROFILE)
    } else if (key === 'theme') {
      setTheme(theme === 'dark' ? 'light' : 'dark')
    } else if (key === 'logout') {
      router?.push(ROUTES.HOME)
    }
  }

  return (
    <Popover placement='bottom-end'>
      <PopoverTrigger>
        <div className={cn('flex cursor-pointer items-center gap-3 rounded-lg p-1.5 transition-colors')}>
          <Avatar
            isBordered
            size='sm'
            src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
            className={cn('h-7 w-7 shrink-0')}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className='p-1'>
        <Listbox aria-label='User Actions' onAction={handleAction} variant='flat' className='min-w-44'>
          <ListboxItem key='profile' startContent={<User size={16} />} textValue='Profile'>
            Profile
          </ListboxItem>
          <ListboxItem
            key='logout'
            color='danger'
            className='text-danger'
            startContent={<LogOut size={16} />}
            textValue='Logout'
          >
            Logout
          </ListboxItem>
        </Listbox>
      </PopoverContent>
    </Popover>
  )
}
