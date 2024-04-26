'use client'

import Image from 'next/image'
import Link from 'next/link'
import * as z from 'zod'
import { toast } from 'react-hot-toast'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'

import { usePostDataMutation } from '@/store/slices/fetchApiSlice'
import { userLogin } from '@/store/slices/userSlice'
import { DisplayError, Loading } from '@/components'
import alert, { confirmAlert } from '@/utils/alert'

const schema = z
  .object({
    name: z
      .string({
        required_error: '用户名必填',
      })
      .min(3, { message: '用户名最少三个字符' }),
    email: z
      .string({
        required_error: '电子邮件地址必填',
      })
      .email('输入的电子邮件地址无效'),
    password: z
      .string({
        required_error: '密码必填',
      })
      .min(6, { message: '密码必须大于6个字符' }),
    confirmPassword: z
      .string({
        required_error: '确认密码必填',
      })
      .min(6, { message: '密码必须大于6个字符' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '确认密码必须与密码一致',
    path: ['confirmPassword'],
  })

export default function RegisterPage() {
  const dispatch = useDispatch()
  const router = useRouter()

  const [postData, { data, isSuccess, isError, isLoading, error }] = usePostDataMutation()

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (isSuccess) {
      //      toast.success('注册成功')
      alert('success', data.msg)
      dispatch(userLogin(data.data))
      reset()
      router.push('/')
    }
    if (isError) {
      confirmAlert({
        title: '您的注册有问题',
        text: error?.data?.err,
        icon: 'warning',
        confirmButtonText: '去登录',
      }).then(result => {
        if (result.isConfirmed) router.push('/login')
      })
      //      toast.error(error?.data?.err)
    }
  }, [isSuccess, isError])

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    if (name && email && password && confirmPassword) {
      postData({ url: '/api/auth/register', body: { name, email, password }, token: '' })
    }
  }

  return (
    <div className=" grid items-center min-h-screen ">
      <div className="container max-w-xl px-12 py-6 space-y-6 lg:border lg:border-gray-100 lg:rounded-lg lg:shadow">
        <div className="relative w-44 h-24 mx-auto">
          <Link passHref href="/">
            <Image src="/images/logo.svg" layout="fill" alt="logo" />
          </Link>
        </div>
        <h2>需要注册</h2>
        <form className="space-y-5" onSubmit={handleSubmit(submitHandler)}>
          <div>
            <input
              type="text"
              className="input"
              name="name"
              placeholder="名称"
              {...register('name')}
            />
            <DisplayError errors={formErrors.name} />
          </div>
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

          <div>
            <input
              className="input"
              type="password"
              placeholder="重复密码"
              {...register('confirmPassword')}
            />
            <DisplayError errors={formErrors.confirmPassword} />
          </div>

          <button className="btn mx-auto w-60" type="submit" disabled={isLoading}>
            {isLoading ? <Loading /> : '注册'}
          </button>
        </form>

        <div>
          <p className="inline ml-2">已经拥有账户</p>
          <Link href="/login">
            <span className="text-blue-400 text-lg ">登录</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
