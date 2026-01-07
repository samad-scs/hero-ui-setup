'use client'

import { MoonIcon } from '@/components/ui/moon'
import { SunIcon } from '@/components/ui/sun'
import { Button } from '@heroui/button'
import { useTheme } from 'next-themes'

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button isIconOnly size='sm' variant='light' radius='full' onPress={handleThemeToggle}>
      {theme === 'dark' ? <SunIcon size={16} /> : <MoonIcon size={16} />}
    </Button>
  )
}
