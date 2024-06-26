'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { useSelector } from 'react-redux'
import { BoxLink, Icons, Logout } from './index'

export default function User() {
  const { user } = useSelector(state => state.user)

  const [isOpen, setIsOpen] = useState(false)

  if (!user) {
    return (
      <div className="flex items-center gap-x-2 lg:border lg:border-gray-300 lg:rounded-md lg:py-2 lg:px-3 text-sm">
        <Link href="/login">
          <span className="flex items-center gap-x-1">
            <Icons.Login className="icon" />
            登录
          </span>
        </Link>
        <span className="hidden lg:block lg:border lg:border-gray-300 lg:h-6"></span>
        <Link href="/register">
          <span className="hidden lg:block px-2">注册</span>
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="lg:hidden">
        <Link href="/profile">
          <span>
            <Icons.User className="icon" />
          </span>
        </Link>
      </div>
      <div
        className={`hidden lg:cursor-pointer lg:relative lg:flex lg:rounded lg:p-1.5 lg:transition ${isOpen && 'bg-red-100'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icons.User className="icon" />
        <Icons.ArrowDown className="icon" />
        <div
          className={` bg-white shadow-md rounded overflow-hidden absolute top-full left-0 w-60
                   border border-gray-100 ${isOpen ? 'block' : 'hidden'}`}
        >
          <BoxLink path="/profile" name={user.name}>
            <div className="realative w-6 h-6">
              <Image src={'/avatar.png'} alt="user" width={200} height={200} />
            </div>
          </BoxLink>
          <Logout />
        </div>
      </div>
    </>
  )
}
