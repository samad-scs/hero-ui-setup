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
  isLoading = false,
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
    return getKeyValue(item, columnKey)
  }

  return (
    <div className='flex flex-col gap-4'>
      <Table
        aria-label='Data Table'
        isHeaderSticky
        bottomContent={
          totalPages > 1 ? (
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
          ) : null
        }
        classNames={{
          wrapper: 'max-h-[600px]'
        }}
        sortDescriptor={sortDescriptor} // We handle sorting from parent if needed, but passing undefined here to controlled sort might be tricky. Let's see if we need controlled state locally.
        // Actually, if we want controlled sorting from props, we should pass `sortDescriptor` prop.
        // But the requirements said "we need UI capabilities for sorting... As we will sort data directly from backend api".
        // So we need to accept a `sortDescriptor` prop ideally to match the API state.
        // For now I'll adding `sortDescriptor` to props in next edit if needed, or just let Table handle the visual state via onSortChange.
        // Wait, to show the arrow, Table needs `sortDescriptor` prop.
        // I will add it to the interface implicitly or explicitly.
        // For now, I will start with this structure.
        selectedKeys={selectionMode !== 'none' ? undefined : new Set([])} // If uncontrolled, undefined is fine? No, if we want `onSelectionChange`, we usually utilize `selectedKeys`.
        // Let's assume the parent controls selection if they care about valid values.
        // Reuse selection logic from reference?
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
          items={isLoading ? [] : data} // If loading, show empty list to trigger loadingContent? Or just keep data?
          // If we pass empty array, it shows emptyContent.
          // HeroUI Table has `isLoading` prop on TableBody? No, it has `loadingContent` and `loadingState`.
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
    </div>
  )
}
