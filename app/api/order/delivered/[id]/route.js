import { NextResponse } from 'next/server'

import Order from '@/models/Order'
import auth from '@/middleware/auth'
import db from '@/lib/db'
import sendError from '@/utils/sendError'

const deliveredOrder = auth(async (req, { params }) => {
  try {
    const { id } = params

    await db.connect()
    await Order.findByIdAndUpdate(
      { _id: id },
      {
        paid: true,
        dateOfPayment: new Date().toISOString(),
        method: '在线付款',
        delivered: true,
      }
    )
    await db.disconnect()

    return NextResponse.json(
      {
        msg: '已经通过确认',
        paid: true,
        dateOfPayment: new Date().toISOString(),
        method: '在线付款',
        delivered: true,
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    return sendError(500, error.message)
  }
})

export const PATCH = deliveredOrder