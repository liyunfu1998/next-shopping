import { NextResponse } from 'next/server'

import { errorHandler, jwtMiddleware, validateMiddleware, identityMiddleware } from '@/helpers/api'

function isPublicPath(req) {
  const publicPaths = ['POST:/api/auth/login', 'POST:/api/auth/register', 'POST:/api/auth/logout']

  return publicPaths.includes(`${req.method}:${req.nextUrl.pathname}`)
}
export function apiHandler(handler, { identity, schema, isJwt } = {}) {
  return async (req, ...args) => {
    try {
      const json = await req.json()
      req.json = () => json
    } catch {}

    try {
      if (!isPublicPath(req)) {
        await jwtMiddleware(req, isJwt)
        await identityMiddleware(req, identity)
        await validateMiddleware(req, schema)
      }
      const responseBody = await handler(req, ...args)

      return NextResponse.json(responseBody || {})
    } catch (err) {
      console.log('global error handler', err)
      return errorHandler(err)
    }
  }
}
