'use client'

import { ClientLayout } from '@/components'
import { useRefreshToken } from '@/hooks'

export default function Layout({ children }) {
  useRefreshToken()
  return (
    <>
      <ClientLayout>{children}</ClientLayout>
    </>
  )
}
