import z from 'zod'

import { userRepo } from '@/helpers'
import { apiHandler, setJson } from '@/helpers/api'

const updateRole = apiHandler(
  async (req, { params }) => {
    const { id } = params
    const { role } = await req.json()
    await userRepo.updateRole(id, role)
    return setJson({
      message: '更新成功',
    })
  },
  {
    schema: z.object({
      role: z.enum(['user', 'admin']),
    }),
    identity: 'root',
  }
)

const deleteUser = apiHandler(
  async (req, { params }) => {
    const { id } = params

    await userRepo.delete(id)
    return setJson({
      message: '用户信息已经删除',
    })
  },
  {
    identity: 'root',
  }
)

export const PATCH = updateRole
export const DELETE = deleteUser
