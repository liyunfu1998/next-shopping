import { auth } from '@/helpers'

async function jwtMiddleware(req) {
  if (isPublicPath(req)) {
    return
  }

  const id = auth.verifyToken(req)
  req.headers.set('userId', id)
}

function isPublicPath(req) {
  const publicPaths = ['POST:/api/auth/login', 'POST:/api/auth/logout', 'POST:/api/auth/register']
  return publicPaths.includes(`${req.method}:${req.nextUrl.pathname}`)
}
