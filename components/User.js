import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { Icons } from './index'
import { userLogout } from '../store/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function User() {
  const { user } = useSelector(state => state.auth)

  const dispatch = useDispatch()

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
        className={`hidden lg:relative lg:flex lg:rounded lg:p-1.5 lg:transition ${isOpen && 'bg-red-100'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icons.User className="icon" />
        <Icons.ArrowDown className="icon" />
        <div
          className={`bg-white shadow-md px-3 py-2 absolute top-full left-0 w-56 border border-gray-100 space-y-3 ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <Link href="/profile" passHref>
            <span className="flex items-center py-3 border-b border-gray-200 gap-x-2">
              <div className="realative w-6 h-6">
                <Image src={'/avatar.png'} alt="user" width={200} height={200} />
              </div>
              <span className="min-w-max">{user.name}</span>
              <Icons.ArrowLeft className="icon mr-auto" />
            </span>
          </Link>
          <button className="flex items-center py-3 gap-x-2" onClick={() => dispatch(userLogout())}>
            <Icons.Logout className="icon" />
            注销用户账号
          </button>
        </div>
      </div>
    </>
  )
}
