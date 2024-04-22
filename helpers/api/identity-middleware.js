import User from '@/models/User'
import db from '@/lib/db'

export async function identityMiddleware(req, identity) {
  if (!identity || identity === 'user') return

  const userId = req.headers.get('userId')
  db.connect()
  const user = await User.findOne({ _id: userId })
  db.disconnect()

  if (identity === 'admin' && user.role !== 'admin') {
    throw new Error('Unauthorized')
  }

  if (identity === 'root' && !user.root) {
    throw new Error('Unauthorized')
  }

  req.headers.set('userRole', user.role)
  req.headers.set('userRoot', user.root)
}
