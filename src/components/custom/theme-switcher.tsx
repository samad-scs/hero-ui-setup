// app/components/ThemeSwitcher.tsx
'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { MoonIcon } from '../ui/moon'
import { SunIcon } from '../ui/sun'

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button className='rounded-full border p-2' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
    </button>
  )
}
