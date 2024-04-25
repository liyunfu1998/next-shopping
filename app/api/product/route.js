import z from 'zod'

import { setJson, apiHandler } from '@/helpers/api'
import { productRepo } from '@/helpers'

const getProduct = apiHandler(async req => {
  const result = await productRepo.getAll()
  return setJson({
    data: result,
  })
})

const createProduct = apiHandler(
  async req => {
    const body = await req.json()
    console.log('body', body)
    await productRepo.create(body)
    return setJson({
      message: '新增产品成功',
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

export const GET = getProduct
export const POST = createProduct
