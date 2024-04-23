'use server'

import Users from '@/models/User'
import db from '@/lib/db'

export async function inquireSomeoneUser(id) {
  try {
    db.connect()
    // const user = await Users.findOne({ _id: id })
    db.disconnect()
    return user
  } catch (error) {
    console.error('inquireSomeoneUser Error:', error)
    throw new Error('Failed to inquire someone of users.')
  }
}
