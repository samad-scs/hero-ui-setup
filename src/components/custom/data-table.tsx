'use client'

import React, { useMemo } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  SortDescriptor,
  Selection,
  getKeyValue
} from '@heroui/table'
import { Pagination } from '@heroui/pagination'
import { Spinner } from '@heroui/spinner'

export interface DataTableColumn {
  name: string
  uid: string
  sortable?: boolean
  align?: 'start' | 'center' | 'end'
}

export interface DataTableProps<T = unknown> {
  columns: DataTableColumn[]
  data: T[]
  totalRows: number
  isLoading?: boolean
  pageIndex: number
  pageSize: number
  emptyPlaceholder?: string

  // Actions
  onPageChange: (page: number) => void
  onSortChange?: (descriptor: SortDescriptor) => void
  onSelectionChange?: (keys: Selection) => void
  renderCell?: (item: T, columnKey: React.Key) => React.ReactNode

  // Customization
  selectionMode?: 'none' | 'single' | 'multiple'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  sortDescriptor?: SortDescriptor
  uniqueKey?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  totalRows,
  isLoading,
  pageIndex,
  pageSize,
  emptyPlaceholder = 'No data found',
  onPageChange,
  onSortChange,
  onSelectionChange,
  renderCell,
  selectionMode = 'none',
  color = 'primary',
  sortDescriptor,
  uniqueKey = 'id'
}: DataTableProps<T>) {
  const totalPages = useMemo(() => {
    return Math.ceil(totalRows / pageSize) || 1
  }, [totalRows, pageSize])

  const defaultRenderCell = (item: T, columnKey: React.Key) => {
    return getKeyValue(item, columnKey as string | number)
  }

  return (
    <div className='flex flex-col gap-4'>
      <Table
        aria-label='Data Table'
        classNames={{
          wrapper:
            'max-w-[calc(100vw-30px)] p-0 md:max-w-full overflow-x-scroll! [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
        }}
        isCompact
        sortDescriptor={sortDescriptor}
        selectedKeys={selectionMode !== 'none' ? undefined : new Set([])}
        selectionMode={selectionMode}
        color={color}
        onSelectionChange={onSelectionChange}
        onSortChange={onSortChange}
      >
        <TableHeader columns={columns}>
          {column => (
            <TableColumn key={column.uid} align={column.align || 'start'} allowsSorting={column.sortable}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={data || []}
          loadingContent={<Spinner label='Loading...' />}
          loadingState={isLoading ? 'loading' : 'idle'}
          emptyContent={emptyPlaceholder}
        >
          {item => (
            <TableRow key={item[uniqueKey]}>
              {columnKey => (
                <TableCell>{renderCell ? renderCell(item, columnKey) : defaultRenderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {totalPages > 1 ? (
        <div className='flex w-full justify-center'>
          <Pagination
            isCompact
            showControls
            showShadow
            color={color}
            page={pageIndex}
            total={totalPages}
            onChange={onPageChange}
          />
        </div>
      ) : null}
    </div>
  )
}
