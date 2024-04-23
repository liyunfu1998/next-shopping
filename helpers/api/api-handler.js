import { NextRequest, NextResponse } from 'next/server'

import { errorHandler, jwtMiddleware, validateMiddleware, identityMiddleware } from '@/helpers/api'

export function apiHandler(handler, { identity, schema } = {}) {
  return async (req, ...args) => {
    try {
      const json = await req.json()
      req.json = () => json
    } catch {}

    try {
      await jwtMiddleware(req)
      await identityMiddleware(req, identity)
      await validateMiddleware(req, schema)

      const responseBody = await handler(req, ...args)

      return NextResponse.json(responseBody || {})
    } catch (err) {
      console.log('global error handler', err)
      return errorHandler(err)
    }
  }
}
