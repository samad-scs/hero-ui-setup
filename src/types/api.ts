/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResponse<T = any> {
  data: T
  message: string
  status: boolean
  statusCode: number
}

export interface Payload {
  pagination: Pagination
}

export interface Pagination {
  first_page_url: string
  from: number
  items_per_page: number
  last_page: number
  links: Link[]
  next_page_url: any
  page: number
  prev_page_url: any
  to: number
  total: number
}

export interface Link {
  url: string
  label: any
  active?: boolean
  page?: number
}

export interface ListResponse<T = any, E extends Record<string, any> = {}> {
  data: { data: T; payload: number } & E
  message: string
  status: boolean
  statusCode: number
}

export interface CommonListArgs {
  page?: number
  items_per_page?: number
  search?: string
  field?: string
  order?: 'desc' | 'asc'
}
