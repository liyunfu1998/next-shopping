'use client'
import { toast } from 'react-hot-toast'
export default function Page() {
  const onHandleClick = () => {
    console.log('aaaa')
    toast.success('成功啦')
  }
  return (
    <div>
      <button onClick={onHandleClick}>点击我显示toast</button>
    </div>
  )
}
