import { CommonListArgs, ListResponse } from '@/types/api'
import { sleep } from '@/utils'
import { PROJECTS_DATA } from './data'
import { Project } from './types'

export const fetchProjectList = async (args?: CommonListArgs): Promise<ListResponse<Project[]>> => {
  await sleep(2000)

  if (args) {
  }

  return { data: { data: PROJECTS_DATA, payload: 0 }, message: 'success', status: true, statusCode: 200 }
}
