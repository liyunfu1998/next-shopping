import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const initialState = {
  userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : {},
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      const { user, access_token: token, refresh_token } = action.payload
      state.token = token
      state.user = user
      Cookies.set('userInfo', JSON.stringify({ token, user }))
      Cookies.set('refreshToken', JSON.stringify(refresh_token || ''), { expires: 7 })
    },

    userLogout: (state, action) => {
      Cookies.remove('userInfo')
      Cookies.remove('refreshToken')
      state.token = null
      state.user = null
    },
  },
})

export const { userLogin, userLogout } = authSlice.actions

export default authSlice.reducer
