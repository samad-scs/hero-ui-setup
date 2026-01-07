'use client'

import { Button } from '@heroui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button isIconOnly size='sm' variant='light' radius='full' onPress={handleThemeToggle}>
      {theme === 'dark' ? (
        <Sun size={16} className='text-default-500' />
      ) : (
        <Moon size={16} className='text-default-500' />
      )}
    </Button>
  )
}
