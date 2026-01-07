'use client'

import { Badge } from '@heroui/badge'
import { Button } from '@heroui/button'
import { Bell } from 'lucide-react'

export const NotificationButton = () => {
  return (
    <Button isIconOnly size='sm' variant='light' radius='full'>
      <Badge color='danger' size='sm' isDot content='5' shape='circle'>
        <Bell size={16} className='text-default-500' />
      </Badge>
    </Button>
  )
}
