import z from 'zod'

import { setJson, apiHandler } from '@/helpers/api'
import { productRepo } from '@/helpers'

const getProduct = apiHandler(async (req, { params }) => {
  const { id } = params
  const result = await productRepo.getById(id)
  return setJson({
    data: result,
  })
})

const updateProduct = apiHandler(
  async (req, { params }) => {
    const { id } = params
    const body = await req.json()
    await productRepo.update(id, body)
    return setJson({
      message: '更新产品成功',
    })
  },
  {
    isJwt: true,
    identity: 'admin',
    schema: z.object({
      title: z.string(),
      price: z.number(),
      inStock: z.number(),
      description: z.string(),
      content: z.string(),
      category: z.string(),
      images: z.array(z.string()),
    }),
  }
)

const deleteProduct = apiHandler(
  async (req, { params }) => {
    const { id } = params
    await productRepo.delete(id)
    return setJson({
      message: '删除产品成功',
    })
  },
  {
    isJwt: true,
    identity: 'admin',
  }
)

export const GET = getProduct
export const PUT = updateProduct
export const DELETE = deleteProduct
