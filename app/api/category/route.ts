import z from 'zod'
import { setJson, apiHandler } from '@/helpers/api'
import { categoryRepo } from '@/helpers'

const getCategory = apiHandler(async req => {
  const result = await categoryRepo.getAll()
  return setJson({
    data: result,
  })
})

const createCategory = apiHandler(
  async req => {
    const { name } = await req.json()
    await categoryRepo.create({ name })

    return setJson({
      message: '创建分类成功',
    })
  },
  {
    isJwt: true,
    identity: 'admin',
    schema: z.object({
      name: z.string(),
    }),
  }
)

export const GET = getCategory
export const POST = createCategory
