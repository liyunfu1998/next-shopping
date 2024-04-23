import z from 'zod'

import { userRepo } from '@/helpers'
import { apiHandler, setJson } from '@/helpers/api'

const resetPassword = apiHandler(
  async (req, res) => {
    const userId = req.headers.get('userId')
    const { password } = await req.json()
    await userRepo.resetPassword(userId, password)

    return setJson({
      message: '密码更新成功',
    })
  },
  {
    schema: z.object({
      password: z.string().min(6),
    }),
  }
)

export const PATCH = resetPassword
