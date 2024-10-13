import Sidebar from '@/components/Sidebar'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-row'>
      <Sidebar />
      <div className='bg-gradient-to-br from-teal-50 via-cyan-100 to-sky-200 transition-colors duration-500 dark:from-gray-900 dark:via-blue-900 dark:to-cyan-900 lg:ml-64'>
        {children}
      </div>
    </div>
  )
}

export default Layout
