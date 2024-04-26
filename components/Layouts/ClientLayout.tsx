import { Navbar } from '@/components'

export default function ClientLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
