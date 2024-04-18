'use client'

import { ProfileLayout } from '@/components'
import { useRefreshToken } from '@/hooks'

export default function Layout({ children }) {
  useRefreshToken()
  return (
    <>
      <ProfileLayout>{children}</ProfileLayout>
    </>
  )
}
