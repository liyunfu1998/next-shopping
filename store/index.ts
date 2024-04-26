import { configureStore } from '@reduxjs/toolkit'

import fetchApi from '@/store/slices/fetchApiSlice'
import userReducer from '@/store/slices/userSlice'
import cartSlice from '@/store/slices/cartSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartSlice,
    [fetchApi.reducerPath]: fetchApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(fetchApi.middleware),
})
