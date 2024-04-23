import z from 'zod'

import { userRepo } from '@/helpers'
import { apiHandler, setJson } from '@/helpers/api'

const register = apiHandler(
  async req => {
    const body = await req.json()
    const newUser = await userRepo.create(body)
    const result = {
      name: newUser.name,
      email: newUser.email,
      mobile: newUser.mobile,
      address: newUser.address,
      role: newUser.role,
      root: newUser.root,
    }

    return setJson({
      data: result,
    })
  },
  {
    schema: z.object({
      name: z.string(),
      email: z.string(),
      password: z.string().min(6),
    }),
  }
)

export const POST = register
