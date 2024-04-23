import { NextResponse } from 'next/server'
import { setJson } from './set-json'

export function errorHandler(error) {
  if (typeof error === 'string') {
    const is404 = error.toLowerCase().endsWith('not found')
    const status = is404 ? 404 : 400
    return NextResponse.json(setJson({ message: error, code: status }), { status })
  }

  if (error.name === 'JsonWebTokenError') {
    return NextResponse.json(
      setJson({
        message: 'Unauthorized',
        code: 401,
      }),
      { status: 401 }
    )
  }

  return NextResponse.json(
    setJson({
      message: error.message,
      code: '500',
    }),
    { status: 500 }
  )
}
