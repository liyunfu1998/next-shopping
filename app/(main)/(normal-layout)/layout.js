'use client'

import { Navbar } from '@/components'
import { useRefreshToken } from '@/hooks'

export default function Layout({ children }) {
  useRefreshToken()
  return (
    <>
      <Navbar />
      {children}
      <footer>footer</footer>
    </>
  )
}
