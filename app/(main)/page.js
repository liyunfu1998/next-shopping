'use client'
import { useSelector } from 'react-redux'

export default function Page() {
  const res = useSelector(store => store)
  console.log('res', res)
  return <div>hello</div>
}
