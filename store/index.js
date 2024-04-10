import { configureStore } from '@reduxjs/toolkit'

import fetchApi from '@/store/slices/fetchApiSlice'
import authSlice from '@/store/slices/authSlice'
import cartSlice from '@/store/slices/cartSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    [fetchApi.reducerPath]: fetchApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(fetchApi.middleware),
})
