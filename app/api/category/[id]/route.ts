import z from 'zod'
import { setJson, apiHandler } from '@/helpers/api'
import { categoryRepo } from '@/helpers'

const deleteCategory = apiHandler(async (req, { params }) => {
  const { id } = params
  await categoryRepo.delete(id)

  return setJson(
    {
      message: '删除分类成功',
    },
    {
      isJwt: true,
      identity: 'admin',
    }
  )
})

const updateCategory = apiHandler(
  async (req, { params }) => {
    const { id } = params
    const { name } = await req.json()
    await categoryRepo.update(id, { name })
    return setJson({
      message: '更新成功',
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

export const DELETE = deleteCategory
export const PUT = updateCategory
