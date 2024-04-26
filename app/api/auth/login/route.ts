import z from 'zod'
import { userRepo } from '@/helpers'
import { apiHandler, setJson } from '@/helpers/api'

const login = apiHandler(
  async req => {
    const body = await req.json()
    const result = await userRepo.authenticate(body)
    return setJson({
      data: result,
      message: '登录成功',
    })
  },
  {
    schema: z.object({
      email: z.string(),
      password: z.string().min(6),
    }),
  }
)

export const POST = login
