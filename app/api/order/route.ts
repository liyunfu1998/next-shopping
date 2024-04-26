import z from 'zod'

import { setJson, apiHandler } from '@/helpers/api'
import { orderRepo } from '@/helpers'

const getOrders = apiHandler(
  async req => {
    const userId = req.headers.get('userId')
    const role = req.headers.get('userRole')
    const result = await orderRepo.getAll(userId, role)
    return setJson({
      data: result,
    })
  },
  {
    isJwt: true,
  }
)

const createOrder = apiHandler(
  async req => {
    const userId = req.headers.get('userId')
    const body = await req.json()
    await orderRepo.create(userId, body)
    return setJson({
      message: '创建订单成功',
    })
  },
  {
    isJwt: true,
    schema: z.object({
      address: z.string(),
      mobile: z.string(),
      cart: z.array(z.string()),
      total: z.number(),
    }),
  }
)

export const GET = getOrders
export const POST = createOrder
