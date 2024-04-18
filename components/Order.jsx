import Image from 'next/image'

import { ArrowLink } from '@/components'

export default function Orders() {
  return (
    <>
      <div className="py-6 lg:py-0">
        <div className="flex justify-between mb-7 px-5">
          <h2 className="inline-block py-1 border-b-2 border-red-500">我的订单</h2>
          <ArrowLink path="profile/orders">所有订单</ArrowLink>
        </div>
        <div className="flex justify-evenly lg:py-20">
          <div className="flex flex-col items-center lg:flex-row lg:gap-x-2">
            <div className="relative w-14 h-14">
              <Image src="/images/status-processing.svg" layout="fill" />
              <span className="absolute order-badge">0</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
