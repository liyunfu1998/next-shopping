import { NextResponse } from 'next/server'

import Order from '@/models/order'
import auth from '@/middleware/auth'
import db from '@/lib/db'
import sendError from '@/utils/sendError'

export const GET = auth(async req => {
  try {
    const userInfo = JSON.parse(req.headers.get('userInfo'))
    let orders

    if (userInfo.role !== 'admin') {
      await db.connect()
      // 查询所有user字段等于userInfo.id的订单文档，并且对每个订单文档中的user字段进行填充操作，但填充时排除password字段。
      orders = await Order.find({ user: userInfo.id }).populate('user', '-password')
    } else {
      orders = await Order.find().populate('user', '-password')
    }

    return NextResponse.json(
      {
        orders,
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    return sendError(500, error.message)
  }
})

export const POST = auth(async req => {
  try {
    const userInfo = JSON.parse(req.headers.get('userinfo'))

    const { address, mobile, cart, total } = await req.json()
    await db.connect()

    const newOrder = new Order({
      user: userInfo.id,
      address,
      mobile,
      cart,
      total,
    })

    await newOrder.save()
    await db.disconnect()

    return NextResponse.json(
      {
        msg: '创建订单成功',
        newOrder,
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    return sendError(500, error.message)
  }
})
