'use client'

import { Home, Menu, PlusCircleIcon, Settings, X } from 'lucide-react'
import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'

export default function Sidebar() {
  const menuItems = [
    {
      icon: <Home className='h-6 w-6' />,
      text: 'Home',
      color: 'text-teal-600 dark:text-teal-400',
      link: '/home'
    },
    {
      icon: <PlusCircleIcon className='h-6 w-6' />,
      text: 'Create',
      color: 'text-cyan-600 dark:text-cyan-400',
      link: '/create'
    },
    {
      icon: <Settings className='h-6 w-6' />,
      text: 'Settings',
      color: 'text-blue-600 dark:text-blue-400',
      link: '/settings'
    }
  ]

  const toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar')
    const toggleOpen = document.getElementById('toggle-open')
    const toggleClose = document.getElementById('toggle-close')

    if (sidebar && toggleOpen && toggleClose) {
      sidebar.classList.toggle('-translate-x-full')
      toggleOpen.classList.toggle('hidden')
      toggleClose.classList.toggle('hidden')
    }
  }

  return (
    <div className='relative min-h-screen bg-gradient-to-br from-teal-50 via-cyan-100 to-sky-200 transition-colors duration-500 dark:from-gray-900 dark:via-blue-900 dark:to-cyan-900'>
      <button
        id='toggle-open'
        className='fixed left-4 top-4 z-20 rounded-full bg-white p-2 text-teal-600 shadow-lg transition-all duration-300 hover:bg-teal-50 dark:bg-gray-800 dark:text-teal-400 dark:hover:bg-gray-700 lg:hidden'
        onClick={toggleSidebar}
        aria-label='Open Sidebar'
      >
        <Menu className='h-6 w-6' />
      </button>

      <div
        id='sidebar'
        className='fixed left-0 top-0 z-10 h-full w-64 -translate-x-full overflow-y-auto bg-white/80 backdrop-blur-lg transition-transform duration-300 ease-in-out dark:bg-gray-800/80 lg:translate-x-0'
      >
        <button
          id='toggle-close'
          className='absolute right-4 top-5 hidden rounded-full bg-teal-100 p-2 text-teal-600 transition-colors hover:bg-teal-200 dark:bg-gray-700 dark:text-teal-400 dark:hover:bg-gray-600 lg:hidden'
          onClick={toggleSidebar}
          aria-label='Close Sidebar'
        >
          <X className='h-6 w-6' />
        </button>

        <nav className='p-4'>
          <div className='mb-8 flex flex-row items-center justify-between'>
            <Link
              href='/'
              className='text-2xl font-bold text-teal-600 dark:text-teal-400'
            >
              SwipeCV
            </Link>
            <div className='p-2 pr-10 max-lg:rounded-full max-lg:bg-teal-100 max-lg:dark:bg-gray-700 lg:pr-0'>
              <ThemeToggle />
            </div>
          </div>
          <ul className='space-y-4'>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  className='flex items-center space-x-4 rounded-lg bg-white/50 p-3 transition-all duration-200 hover:bg-white/80 hover:shadow-md dark:bg-gray-700/50 dark:hover:bg-gray-700/80'
                >
                  <span
                    className={`rounded-full bg-teal-100 p-2 ${item.color} dark:bg-gray-600`}
                  >
                    {item.icon}
                  </span>
                  <span className='font-medium text-gray-800 dark:text-gray-200'>
                    {item.text}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className='absolute bottom-0 left-0 right-0 p-4'>
          <p className='text-center text-sm text-gray-500 dark:text-gray-400'>
            © {new Date().getFullYear()} SwipeCV
          </p>
        </div>
      </div>
    </div>
  )
}
