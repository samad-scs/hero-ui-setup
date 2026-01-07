'use client'

import { useEffect, useState } from 'react'

export const useScrolled = (threshold = 10) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    // Check on mount (in case user reloads mid-page)
    handleScroll()

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolled
}
