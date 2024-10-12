'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Home,
  Settings,
  Mail,
  Users,
  HelpCircle,
  Menu,
  ChevronLeft
} from 'lucide-react'
import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'

const menuItems = [
  { id: 1, label: 'Home', icon: Home, link: '/' },
  { id: 2, label: 'Settings', icon: Settings, link: '/settings' },
  { id: 3, label: 'Messages', icon: Mail, link: '/messages' },
  { id: 4, label: 'Users', icon: Users, link: '/users' },
  { id: 5, label: 'Help', icon: HelpCircle, link: '/help' }
]

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsCollapsed(true)
      }
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  const sidebarVariants = {
    expanded: { width: '240px' },
    collapsed: { width: '72px' }
  }

  return (
    <div className='flex h-screen bg-gray-100 shadow-2xl backdrop-blur-3xl dark:bg-gray-900'>
      <motion.div
        className='fixed inset-y-0 left-0 z-30 flex flex-col bg-white shadow-lg dark:bg-gray-800'
        variants={sidebarVariants}
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        transition={{ duration: 0.3 }}
      >
        <div className='flex h-16 items-center justify-between bg-primary px-4 dark:bg-gray-700'>
          {!isCollapsed && (
            <h1 className='truncate text-xl font-bold text-white'>My App</h1>
          )}
          <button
            onClick={toggleSidebar}
            className='rounded-md p-2 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white'
            aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <ChevronLeft
              size={24}
              className={`transform transition-transform duration-300 ${
                isCollapsed ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
        <nav className='flex-1 overflow-y-auto py-4'>
          <ul className='space-y-2 px-2'>
            {menuItems.map(item => (
              <li key={item.id}>
                <Link
                  href={item.link}
                  className={`group flex items-center rounded-lg p-2 text-gray-700 transition-all duration-200 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 ${
                    isCollapsed ? 'justify-center' : 'justify-start'
                  }`}
                >
                  <item.icon
                    className={`h-6 w-6 ${isCollapsed ? '' : 'mr-3'} text-gray-500 transition-colors duration-200 group-hover:text-primary dark:text-gray-400`}
                  />
                  {!isCollapsed && (
                    <span className='font-medium transition-colors duration-200 group-hover:text-primary'>
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            ))}
            <li
              className={`group flex items-center rounded-lg p-2 text-gray-700 transition-all duration-200 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 ${
                isCollapsed ? 'justify-center' : 'justify-start'
              }`}
            >
              <ThemeToggle className='py-0 pl-0 hover:bg-inherit'>
                {!isCollapsed && (
                  <span className='font-medium transition-colors duration-200 group-hover:text-primary'>
                    Toggle theme
                  </span>
                )}
              </ThemeToggle>
            </li>
          </ul>
        </nav>
        {!isCollapsed && (
          <div className='border-t border-gray-200 p-4 dark:border-gray-700'>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              © 2023 My App
            </p>
          </div>
        )}
      </motion.div>

      {/* Mobile toggle button */}
      {isMobile && (
        <button
          className='fixed left-4 top-4 z-40 rounded-full bg-white p-2 shadow-lg transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800'
          onClick={toggleSidebar}
          aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          <Menu size={24} />
        </button>
      )}

      {/* Main content */}
    </div>
  )
}
