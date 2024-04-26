'use client'

import { Orders } from '@/components'
import { useSelector } from 'react-redux'

export default function Page() {
  const { user } = useSelector(state => state.auth)

  return (
    <>
      <Orders />
    </>
  )
}
