'use client'

import { useDispatch, useSelector } from 'react-redux'

import { updateUser } from '@/store/slices/authSlice'
import { usePatchDataMutation } from '@/store/slices/fetchApiSlice'
import { BackButton, Icons } from '@/components'
import { editInfo } from '@/utils/alert'
import { useEffect } from 'react'

export default function Page() {
  const { user, token } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [patchData, { data, isSuccess, isError, error }] = usePatchDataMutation()

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateUser(data.user))
    }
  }, [isSuccess])

  const mobileEditHandler = () => {
    editInfo('mobile', '请输入您的电话号码', patchData, token, isError, error)
  }

  const nameEditHandler = () => {
    editInfo('name', '输入名称', patchData, token, isError, error)
  }

  return (
    <div>
      <BackButton>用户帐户信息</BackButton>
      <div className="section-divide-y" />
      <div className="lg:flex">
        <div className="px-5 flex-1">
          <div className="flex justify-between py-4 border-b border-gray-200">
            <p>{user.name}</p>
            {user.name ? (
              <Icons.Edit className="icon cursor-pointer" onClick={nameEditHandler} />
            ) : (
              <Icons.Plus className="icon cursor-pointer" onClick={nameEditHandler} />
            )}
          </div>
        </div>

        <div className="px-5 flex-1">
          <div className="flex justify-between py-4 border-b border-gray-200">
            <p>{user.mobile ? user.mobile : '电话号码'}</p>
            {user.mobile ? (
              <Icons.Edit className="icon cursor-pointer" onClick={mobileEditHandler} />
            ) : (
              <Icons.Plus className="icon cursor-pointer" onClick={mobileEditHandler} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
