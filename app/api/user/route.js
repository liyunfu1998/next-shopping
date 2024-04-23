import z from 'zod'

import { userRepo } from '@/helpers'
import { apiHandler, setJson } from '@/helpers/api'

const getUsers = apiHandler(
  async req => {
    const result = await userRepo.getAll()
    return setJson({
      data: result,
    })
  },
  {
    identity: 'admin',
  }
)

const updateInfo = apiHandler(
  async req => {
    const userId = req.headers.get('userId')
    const body = await req.json()
    const result = await userRepo.update(userId, body)
    return setJson({
      data: result,
    })
  },
  {
    schema: z.object({
      name: z.string(),
    }),
  }
)

export const GET = getUsers
export const PATCH = updateInfo
