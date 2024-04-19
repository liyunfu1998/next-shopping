import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

import db from '@/lib/db'
import User from '@/models/User'
import sendError from '@/utils/sendError'
import { createAccessToken } from '@/utils/generateToken'

const accessToken = async req => {
  try {
    const { value: rf_token } = req.cookies.get('refreshToken')

    if (!rf_token) return sendError(400, '无刷新token')

    const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET)

    if (!result) return sendError(400, '刷新登录异常')

    await db.connect()
    const user = await User.findById(result.id)
    if (!user) return sendError(res, 400, '此用户不存在')
    await db.disconnect()

    const access_token = createAccessToken({ id: user._id })

    return NextResponse.json(
      {
        access_token,
        refresh_token: rf_token,
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          root: user.root,
          mobile: user.mobile,
          address: user.address,
        },
      },
      { statue: 200 }
    )
  } catch (error) {
    return sendError(500, error.message)
  }
}

export const GET = accessToken
