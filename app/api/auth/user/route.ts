import { userRepo } from '@/helpers'
import { apiHandler, setJson } from '@/helpers/api'

const getUserInfo = apiHandler(async req => {
  const userId = req.headers.get('userId')
  const user = await userRepo.getById(userId)

  return setJson({
    data: {
      name: user.name,
      email: user.email,
      role: user.role,
      root: user.root,
    },
  })
})

export const GET = getUserInfo
