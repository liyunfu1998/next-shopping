import bcrypt from 'bcrypt'

import User from '@/models/User'
import { auth, db } from '@/helpers'

const getAll = async () => {
  await db.connect()
  const users = await User.find().select('-password')
  await db.disconnect()
  return users
}

const update = async (id, params) => {
  await db.connect()
  const user = await User.findById(id)

  if (!user) throw '用户不存在'

  Object.assign(user, params)

  await user.save()
  await db.disconnect()
  return user
}

const create = async params => {
  const { name, email, password } = params
  await db.connect()
  if (await User.findOne({ email })) {
    throw 'email "' + email + '" 账户已存在'
  }
  const hashPassword = await bcrypt.hash(password, 12)
  const newUser = new User({ name, email, password: hashPassword })
  await newUser.save()
  await db.disconnect()

  return newUser
}

const authenticate = async ({ email, password } = {}) => {
  await db.connect()
  const user = await User.findOne({ email })
  if (!user) {
    throw '找不到此电子邮件的应用程序'
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw '电子邮件地址或密码不正确'
  }
  const token = auth.createAccessToken({ id: user._id })
  await db.disconnect()
  return {
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
      root: user.root,
    },
    token,
  }
}

const updateRole = async (id, role) => {
  await db.connect()
  const user = await User.findById(id)
  if (!user) throw '用户不存在'
  await User.findByIdAndUpdate({ _id: id }, { role })
  await db.disconnect()
}

const _delete = async id => {
  await db.connect()
  const user = await User.findById(id)
  if (!user) throw '用户不存在'
  await User.findByIdAndDelete(id)
  await db.disconnect()
}

const resetPassword = async (id, password) => {
  const hashPassword = await bcrypt.hash(password, 12)
  await db.connect()
  const user = await User.findById(id)
  if (!user) throw '用户不存在'
  await User.findByIdAndUpdate({ _id: id }, { password: hashPassword })
  await db.disconnect()
}

const getById = async id => {
  try {
    await db.connect()
    const user = await User.findById(id)
    await db.disconnect()
    return user
  } catch {
    throw 'User Not Found'
  }
}

export const userRepo = {
  create,
  authenticate,
  getAll,
  getById,
  update,
  delete: _delete,
  updateRole,
  resetPassword,
}
