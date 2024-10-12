'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const menuItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'settings', label: 'Settings' },
  { id: 'profile', label: 'Profile' }
]

const contentPages: any = {
  dashboard: { title: 'Dashboard', content: 'Welcome to your dashboard!' },
  analytics: { title: 'Analytics', content: 'Here are your analytics data.' },
  settings: {
    title: 'Settings',
    content: 'Adjust your account settings here.'
  },
  profile: {
    title: 'Profile',
    content: 'View and edit your profile information.'
  }
}

export default function ResponsiveMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activePage, setActivePage] = useState('dashboard')
  const { theme, setTheme } = useTheme()

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  const Sidebar = ({ isMobile = false }) => (
    <nav className='flex h-full flex-col p-4'>
      <h2 className='mb-6 text-2xl font-bold'>Menu</h2>
      {menuItems.map(item => (
        <Button
          key={item.id}
          variant={activePage === item.id ? 'default' : 'ghost'}
          className='mb-2 justify-start'
          onClick={() => {
            setActivePage(item.id)
            if (isMobile) setIsMobileMenuOpen(false)
          }}
        >
          {item.label}
        </Button>
      ))}
    </nav>
  )

  return (
    <div className='flex h-screen bg-background text-foreground'>
      {/* Desktop Sidebar - Always visible on large screens */}
      <aside className='hidden w-64 bg-card shadow-lg lg:block'>
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className='fixed inset-y-0 left-0 z-50 w-64 bg-card shadow-lg lg:hidden'
          >
            <div className='flex justify-end p-4'>
              <Button variant='ghost' size='icon' onClick={toggleMobileMenu}>
                <X />
              </Button>
            </div>
            <Sidebar isMobile />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className='flex-1 p-4 lg:p-8'>
        <header className='mb-8 flex items-center justify-between'>
          <Button
            variant='ghost'
            size='icon'
            onClick={toggleMobileMenu}
            className='lg:hidden'
          >
            <Menu />
          </Button>
          <h1 className='text-3xl font-bold'>
            {contentPages[activePage].title}
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='icon'>
                {theme === 'light' ? (
                  <Moon className='h-[1.2rem] w-[1.2rem]' />
                ) : (
                  <Sun className='h-[1.2rem] w-[1.2rem]' />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <motion.div
          key={activePage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className='rounded-lg bg-card p-6 shadow-md'
        >
          <p>{contentPages[activePage].content}</p>
        </motion.div>
      </main>
    </div>
  )
}
