'use client'
import { Toaster } from 'react-hot-toast'
import StoreProvider from '@/app/StoreProvider'

export default function Layout({ children }) {
  return (
    <StoreProvider>
      {children}

      <Toaster position="top-center" toastOptions={{ style: { fontSize: '1rem' } }} />
    </StoreProvider>
  )
}
