import { NextResponse } from 'next/server'

import Category from '@/models/Category'
import auth from '@/middleware/auth'
import db from '@/lib/db'
import sendError from '@/utils/sendError'

export const DELETE = auth(async (req, { params }) => {
  try {
    const { id } = params

    await db.connect()
    await Category.findByIdAndDelete(id)
    await db.disconnect()

    return NextResponse.json(
      {
        msg: '删除成功',
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    return sendError(500, error.message)
  }
})

export const PUT = auth(async (req, { params }) => {
  try {
    const { id } = params
    const { name } = await req.json()
    await db.connect()
    const newCategory = await Category.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        name,
      }
    )
    await db.disconnect()
    return NextResponse.json(
      {
        msg: '更新成功',
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    return sendError(500, error.message)
  }
})
