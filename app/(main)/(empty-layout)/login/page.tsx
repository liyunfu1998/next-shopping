'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'

import { usePostDataMutation } from '@/store/slices/fetchApiSlice'
import { DisplayError, Loading } from '@/components'
import { userLogin } from '@/store/slices/userSlice'
import alert, { confirmAlert } from '@/utils/alert'

const schema = z.object({
  email: z
    .string({
      required_error: '邮件地址必填',
    })
    .email('输入的电子邮件地址无效'),
  password: z
    .string({
      required_error: '密码必填',
    })
    .min(6, { message: '密码最少6个字符' }),
})

export default function LoginPage() {
  const dispatch = useDispatch()
  const router = useRouter()

  const [postData, { data, isSuccess, isError, isLoading, error }] = usePostDataMutation()

  const {
    handleSubmit,
    register,
    formState: { errors: formErrors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (isSuccess) {
      alert('success', data.message)
      dispatch(userLogin(data.data.token))
      reset()
      router.push('/')
    }
    if (isError) {
      //      toast.error(error?.data.err)
      confirmAlert({
        title: '您的登录有问题',
        text: error?.data?.err,
        icon: 'warning',
        confirmButtonText: '去注册',
      }).then(result => {
        if (result.isConfirmed) router.push('/register')
      })
    }
  }, [isSuccess, isError])

  const submitHandler = async ({ email, password }) => {
    if (email && password) {
      await postData({
        url: '/api/auth/login',
        body: { email, password },
        token: '',
      })
    }
  }

  return (
    <div className="grid items-center min-h-screen ">
      <div className="container max-w-xl px-12 py-6 space-y-6 lg:border lg:border-gray-100 lg:rounded-lg lg:shadow">
        <div className="relative w-44 h-24 mx-auto">
          <Link passHref href="/">
            <Image src="/images/logo.svg" layout="fill" alt="logo" />
          </Link>
        </div>
        <h2>登录</h2>
        <form className="space-y-5" onSubmit={handleSubmit(submitHandler)}>
          <div>
            <input
              className="input"
              type="text"
              placeholder="电子邮件地址"
              {...register('email')}
            />
            <DisplayError errors={formErrors.email} />
          </div>

          <div>
            <input className="input" type="password" placeholder="密码" {...register('password')} />
            <DisplayError errors={formErrors.password} />
          </div>

          <button className="btn mx-auto w-60" type="submit" disabled={isLoading}>
            {isLoading ? <Loading /> : '登录'}
          </button>
        </form>

        <div>
          <p className="inline ml-2">你还没有注册</p>
          <Link href="/register">
            <span className="text-blue-400 text-lg ">注册</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
