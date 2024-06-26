import User from '@/models/User'
import { db } from '@/helpers'

export async function identityMiddleware(req, identity = 'user', isJwt = false) {
  if (identity === 'user' && isJwt === false) return

  const userId = req.headers.get('userId')
  db.connect()
  const user = await User.findOne({ _id: userId })
  db.disconnect()

  req.headers.set('userRole', user.role)
  req.headers.set('userRoot', user.root)

  if (identity === 'admin' && user.role !== 'admin') {
    throw new Error('Unauthorized')
  }

  if (identity === 'root' && !user.root) {
    throw new Error('Unauthorized')
  }
}
