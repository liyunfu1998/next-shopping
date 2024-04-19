import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

import db from '@/lib/db'
import User from '@/models/User'
import sendError from '@/utils/sendError'
import { createAccessToken, createRefreshToken } from '@/utils/generateToken'

export async function POST(req, { params }) {
  try {
    await await db.connect()
    const { name, email, password, address, mobile } = await req.json()

    const user = await User.findOne({ email })

    if (user) return sendError(400, '该账户已存在')

    const hashPassword = await bcrypt.hash(password, 12)
    const newUser = new User({ name, email, password: hashPassword, address, mobile })
    await newUser.save()
    await db.disconnect()

    const access_token = createAccessToken({ id: newUser._id })
    const refresh_token = createRefreshToken({ id: newUser._id })

    return NextResponse.json(
      {
        msg: '注册成功',
        data: {
          refresh_token,
          access_token,
          user: {
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            avatar: newUser.avatar,
            root: newUser.root,
            mobile: newUser.mobile,
            address: newUser.address,
          },
        },
      },
      {
        status: 201,
      }
    )
  } catch (error) {
    return sendError(500, error.message)
  }
}
