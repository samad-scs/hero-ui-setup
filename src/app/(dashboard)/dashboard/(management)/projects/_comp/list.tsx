'use client'

import React, { useMemo, useState } from 'react'
import { DataTable, DataTableColumn } from '@/components/custom/data-table'
import { fetchProjectList } from '@/services/modules/project'
import { Project } from '@/services/modules/project/types'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/dropdown'
import { Chip, ChipProps } from '@heroui/chip'
import { Pagination as PaginationType } from '@/types/api'

// Icons
const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden='true'
    fill='none'
    focusable='false'
    height='1em'
    role='presentation'
    viewBox='0 0 24 24'
    width='1em'
    {...props}
  >
    <g fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5}>
      <path d='M6 12h12' />
      <path d='M12 18V6' />
    </g>
  </svg>
)

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden='true'
    fill='none'
    focusable='false'
    height='1em'
    role='presentation'
    viewBox='0 0 24 24'
    width='1em'
    {...props}
  >
    <path
      d='M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
    />
    <path d='M22 22L20 20' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' />
  </svg>
)

const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden='true'
    fill='none'
    focusable='false'
    height='1em'
    role='presentation'
    viewBox='0 0 24 24'
    width='1em'
    {...props}
  >
    <path
      d='m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeMiterlimit={10}
      strokeWidth={1.5}
    />
  </svg>
)

const VerticalDotsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden='true'
    fill='none'
    focusable='false'
    height='24'
    role='presentation'
    viewBox='0 0 24 24'
    width='24'
    {...props}
  >
    <path
      d='M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'
      fill='currentColor'
    />
  </svg>
)

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
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size='sm' variant='light'>
                  <VerticalDotsIcon className='text-default-300' />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key='view'>View</DropdownItem>
                <DropdownItem key='edit'>Edit</DropdownItem>
                <DropdownItem key='delete' className='text-danger' color='danger'>
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
            startContent={<SearchIcon />}
            value={search}
            onClear={handleClearSearch}
            onValueChange={handleSearchChange}
          />
          <div className='flex gap-3'>
            <Dropdown>
              <DropdownTrigger className='hidden sm:flex'>
                <Button endContent={<ChevronDownIcon className='text-small' />} variant='flat'>
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
            <Button color='primary' endContent={<PlusIcon />}>
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
