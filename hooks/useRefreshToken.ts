'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'

import { userLogin } from '@/store/slices/authSlice'
import { useGetDataQuery } from '@/store/slices/fetchApiSlice'

export default function useRefreshToken() {
  const dispatch = useDispatch()
  let refreshToken = Cookies.get('refreshToken')

  console.log('refreshToken', refreshToken, typeof refreshToken, !refreshToken)
  const { data, isSuccess, isLoading, isError, error } = useGetDataQuery(
    {
      url: '/api/auth/accessToken',
      token: '',
    },
    { skip: !refreshToken }
  )

  useEffect(() => {
    if (isSuccess && refreshToken) {
      dispatch(userLogin(data))
    }
    if (isError) {
      console.error('Error refreshing token')
    }
  }, [isSuccess, isError, data, dispatch, refreshToken])
}
