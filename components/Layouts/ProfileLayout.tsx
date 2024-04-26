'use client'

import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

import { ClientLayout, ProfileAside } from '@/components'
import useVerify from '@/hooks/useVerify'

export default function ProfileLayout({ children }: any) {
  const isVerify = useVerify()
  const router = useRouter()
  const { user } = useSelector((state: any) => state.user)

  if (!isVerify) {
    router.push('/')
  } else {
    return (
      <>
        <ClientLayout>
          <div className="lg:flex lg:gap-x-4 lg:px-3 lg:container lg:max-w-7xl">
            <div className="hidden lg:block">
              <ProfileAside user={user} />
            </div>
            <div className="py-4 lg:py-8 lg:border lg:border-gray-300 flex-1 lg:rounded-md lg:mt-6 h-fit">
              {children}
            </div>
          </div>
        </ClientLayout>
      </>
    )
  }
}
