'use client'

import React from 'react'
import { Card, CardBody } from '@heroui/card'
import { Chip } from '@heroui/chip'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@heroui/theme'

export interface StatsCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  trendLabel?: string
  description?: string
  className?: string
}

export const StatsCard = ({
  title,
  value,
  change,
  changeType = 'neutral',
  trendLabel,
  description,
  className
}: StatsCardProps) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'success'
      case 'negative':
        return 'danger'
      default:
        return 'default'
    }
  }

  const getTrendIcon = () => {
    switch (changeType) {
      case 'positive':
        return <TrendingUp size={16} />
      case 'negative':
        return <TrendingDown size={16} />
      default:
        return <Minus size={16} />
    }
  }

  return (
    <Card className={cn('bg-card border-border w-full border shadow-sm transition-all hover:shadow-md', className)}>
      <CardBody className='gap-4 p-5'>
        {/* Header: Title and Chip */}
        <div className='flex items-start justify-between'>
          <span className='text-default-500 text-sm font-medium'>{title}</span>
          {change && (
            <Chip
              variant='flat'
              color={getChangeColor()}
              size='sm'
              radius='full'
              startContent={
                changeType === 'positive' ? (
                  <TrendingUp size={12} />
                ) : changeType === 'negative' ? (
                  <TrendingDown size={12} />
                ) : undefined
              }
              classNames={{
                content: 'font-semibold px-1'
              }}
            >
              {change}
            </Chip>
          )}
        </div>

        {/* Main Value */}
        <div>
          <h3 className='text-foreground text-3xl font-bold tracking-tight'>{value}</h3>
        </div>

        {/* Footer Info */}
        {(trendLabel || description) && (
          <div className='flex flex-col gap-1'>
            {trendLabel && (
              <div
                className={cn(
                  'flex items-center gap-1.5 text-xs font-medium',
                  changeType === 'positive'
                    ? 'text-success'
                    : changeType === 'negative'
                      ? 'text-danger'
                      : 'text-default-500'
                )}
              >
                {getTrendIcon()}
                <span>{trendLabel}</span>
              </div>
            )}
            {description && <span className='text-default-400 text-xs'>{description}</span>}
          </div>
        )}
      </CardBody>
    </Card>
  )
}

export default StatsCard
