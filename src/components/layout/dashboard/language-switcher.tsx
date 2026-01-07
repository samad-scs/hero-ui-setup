'use client'

import { Button } from '@heroui/button'
import { Languages } from 'lucide-react'

export const LanguageSwitcher = () => {
  return (
    <Button isIconOnly size='sm' variant='light' radius='full'>
      <Languages size={16} className='text-default-500' />
    </Button>
  )
}
