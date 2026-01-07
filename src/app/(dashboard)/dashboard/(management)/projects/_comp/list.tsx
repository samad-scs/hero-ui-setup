'use client'

import { DataTable, DataTableColumn } from '@/components/custom/data-table'
import { ChevronDownIcon } from '@/components/ui/chevron-down'
import OptionMenu from '@/components/ui/option-menu'
import { PlusIcon } from '@/components/ui/plus'
import { SearchIcon } from '@/components/ui/search'
import { fetchProjectList } from '@/services/modules/project'
import { Project } from '@/services/modules/project/types'
import { Pagination as PaginationType } from '@/types/api'
import { Button } from '@heroui/button'
import { Chip, ChipProps } from '@heroui/chip'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown'
import { Input } from '@heroui/input'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React, { useMemo, useState } from 'react'

// Constants
const columns: DataTableColumn[] = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'NAME', uid: 'name', sortable: true },
  { name: 'CODE', uid: 'code', sortable: true },
  { name: 'STATUS', uid: 'status', sortable: true },
  { name: 'START DATE', uid: 'start_date', sortable: true },
  { name: 'END DATE', uid: 'end_date', sortable: true },
  { name: 'ACTIONS', uid: 'actions', align: 'center' }
]

const statusOptions = [
  { name: 'Active', uid: 'Active' },
  { name: 'Planning', uid: 'Planning' },
  { name: 'In Progress', uid: 'In Progress' },
  { name: 'Completed', uid: 'Completed' },
  { name: 'On Hold', uid: 'On Hold' },
  { name: 'Scheduled', uid: 'Scheduled' }
]

const statusColorMap: Record<string, ChipProps['color']> = {
  Active: 'success',
  Planning: 'primary',
  'In Progress': 'warning',
  Completed: 'secondary',
  'On Hold': 'danger',
  Scheduled: 'default'
}

export const ProjectList = () => {
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<Set<string>>(new Set(['all']))

  // Debounce search could be added here, but for now simple state
  const statusString = useMemo(() => {
    if (statusFilter.has('all')) return 'all'

    return Array.from(statusFilter).join(',')
  }, [statusFilter])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['projects', page, itemsPerPage, search, statusString],
    queryFn: () =>
      fetchProjectList({
        page,
        items_per_page: itemsPerPage,
        search,
        status: statusString
      }),
    placeholderData: keepPreviousData
  })

  const projects = data?.data?.data || []
  const pagination = data?.data?.pagination as PaginationType | undefined
  const totalRows = pagination?.total || 0

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const handleClearSearch = () => {
    setSearch('')
    setPage(1)
  }

  const onRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value))
    setPage(1)
  }

  const renderCell = (project: Project, columnKey: React.Key) => {
    const cellValue = project[columnKey as keyof Project]

    switch (columnKey) {
      case 'status':
        return (
          <Chip
            className='capitalize'
            color={statusColorMap[cellValue as string] || 'default'}
            size='sm'
            variant='flat'
          >
            {cellValue}
          </Chip>
        )
      case 'actions':
        return (
          <div className='relative flex items-center justify-center gap-2'>
            <OptionMenu options={[]} />
          </div>
        )
      default:
        return cellValue
    }
  }

  return (
    <div className='flex w-full flex-col gap-4'>
      {/* Top Controls */}
      <div className='bg-content1 rounded-large shadow-small flex flex-col gap-4 p-4'>
        <div className='flex items-end justify-between gap-3'>
          <Input
            isClearable
            className='w-full sm:max-w-[44%]'
            placeholder='Search by name, code...'
            startContent={<SearchIcon size={16} />}
            value={search}
            onClear={handleClearSearch}
            onValueChange={handleSearchChange}
          />
          <div className='flex gap-3'>
            <Dropdown>
              <DropdownTrigger className='hidden sm:flex'>
                <Button endContent={<ChevronDownIcon size={16} />} variant='flat'>
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label='Status Filter'
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode='multiple'
                onSelectionChange={keys => {
                  const set = new Set(keys as unknown as string[])
                  setStatusFilter(set)
                  setPage(1)
                }}
              >
                {statusOptions.map(status => (
                  <DropdownItem key={status.uid} className='capitalize'>
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color='primary' endContent={<PlusIcon size={16} />}>
              Add New
            </Button>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-default-400 text-small'>Total {totalRows} projects</span>
          <label className='text-default-400 text-small flex items-center'>
            Rows per page:
            <select
              className='text-default-400 text-small ml-2 bg-transparent outline-none'
              onChange={onRowsPerPageChange}
              value={itemsPerPage}
            >
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
              <option value='20'>20</option>
            </select>
          </label>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={projects}
        totalRows={totalRows}
        isLoading={isLoading || isFetching}
        pageIndex={page}
        pageSize={itemsPerPage}
        onPageChange={setPage}
        renderCell={renderCell}
        selectionMode='multiple' // Or none if not needed
        color='primary'
        uniqueKey='id'
      />
    </div>
  )
}
