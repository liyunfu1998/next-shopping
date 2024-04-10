import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

import db from '@/lib/db'
import User from '@/models/User'
import sendError from '@/utils/sendError'
import { createAccessToken, createRefreshToken } from '@/utils/generateToken'

export async function POST(req) {
  try {
    await db.connect()
    const { email, password } = await req.json()

    const user = await User.findOne({ email })

    if (!user) return sendError(400, '找不到此电子邮件的应用程序')

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) return sendError(400, '电子邮件地址或密码不正确')

    const access_token = createAccessToken({ id: user._id })
    const refresh_token = createRefreshToken({ id: user._id })

    return NextResponse.json(
      {
        msg: '登录成功',
        data: {
          refresh_token,
          access_token,
          user: {
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            root: user.root,
          },
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.log('====error====', error.message)
    return sendError(500, error.message)
  }
}
