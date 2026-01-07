import { CommonListArgs, ListResponse, Pagination } from '@/types/api'
import { sleep } from '@/utils'
import { PROJECTS_DATA } from './data'
import { Project } from './types'

export const fetchProjectList = async (
  args?: CommonListArgs & { status?: string }
): Promise<ListResponse<Project[], { pagination: Pagination }>> => {
  await sleep(1000)

  let filteredProjects = [...PROJECTS_DATA]

  if (args) {
    if (args.search) {
      const lowerSearch = args.search.toLowerCase()
      filteredProjects = filteredProjects.filter(
        p =>
          p.name.toLowerCase().includes(lowerSearch) ||
          p.code.toLowerCase().includes(lowerSearch) ||
          p.description.toLowerCase().includes(lowerSearch)
      )
    }

    if (args.status && args.status !== 'all') {
      const statuses = args.status.split(',')
      filteredProjects = filteredProjects.filter(p => statuses.includes(p.status))
    }
  }

  const total = filteredProjects.length
  const page = args?.page || 1
  const perPage = args?.items_per_page || 10
  const start = (page - 1) * perPage
  const end = start + perPage

  const paginatedProjects = filteredProjects.slice(start, end)
  const lastPage = Math.ceil(total / perPage)

  return {
    data: {
      data: paginatedProjects,
      payload: total,
      pagination: {
        total,
        page,
        items_per_page: perPage,
        last_page: lastPage,
        from: start + 1,
        to: Math.min(end, total),
        first_page_url: '',
        next_page_url: page < lastPage ? `?page=${page + 1}` : null,
        prev_page_url: page > 1 ? `?page=${page - 1}` : null,
        links: []
      }
    },
    message: 'success',
    status: true,
    statusCode: 200
  }
}
