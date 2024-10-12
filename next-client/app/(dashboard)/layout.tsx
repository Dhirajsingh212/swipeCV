import Sidebar from '@/components/Sidebar'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-row gap-2'>
      <Sidebar />
      <div className='ml-[74px] p-2'>{children}</div>
    </div>
  )
}

export default Layout
