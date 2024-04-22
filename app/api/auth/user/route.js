import { NextResponse } from 'next/server'

import db from '@/lib/db'
import User from '@/models/User'
import sendError from '@/utils/sendError'
import auth from '@/middleware/auth'

const getUserInfo = auth(async req => {
  try {
    const { id: userId } = JSON.parse(req.headers.get('userInfo'))

    await db.connect()
    const user = await User.findOne({ _id: userId }).select('-password')
    await db.disconnect()

    return NextResponse.json(
      {
        user: {
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          avatar: user.avatar,
          address: user.address,
          role: user.role,
          root: user.root,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    return sendError(500, error.message)
  }
})

export const GET = getUserInfo
