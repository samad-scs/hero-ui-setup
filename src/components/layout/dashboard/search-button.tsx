'use client'

import { Button } from '@heroui/button'
import { Search } from 'lucide-react'

export const SearchButton = () => {
  return (
    <Button isIconOnly size='sm' variant='light' radius='full'>
      <Search size={16} className='text-default-500' />
    </Button>
  )
}
