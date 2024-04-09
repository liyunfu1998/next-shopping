import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

import db from '@/lib/db'
import User from '@/models/user'
import sendError from '@/utils/sendError'

export async function POST(req, { params }) {
  try {
    await await db.connect()
    const { name, email, password } = await req.json()

    const user = await User.findOne({ email })

    if (user) return sendError(400, '该账户已存在')

    const hashPassword = await bcrypt.hash(password, 12)
    const newUser = new User({ name, email, password: hashPassword })
    await newUser.save()
    await db.disconnect()

    return NextResponse.json(
      {
        meg: '注册成功',
      },
      {
        status: 201,
      }
    )
  } catch (error) {
    return sendError(500, error.message)
  }
}
