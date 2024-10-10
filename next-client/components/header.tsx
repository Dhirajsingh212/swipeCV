'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import NavLink from './NavLink'

const Header = () => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(isDarkMode ? 'dark' : 'light')
  }, [])

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <header className='container mx-auto px-6 py-4'>
      <nav className='flex items-center justify-between'>
        <Link
          href='/'
          className='bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-3xl font-extrabold text-transparent dark:from-teal-200 dark:to-cyan-400'
        >
          swipeCV
        </Link>
        <div className='hidden space-x-6 md:flex'>
          <NavLink href='#features'>Features</NavLink>
          <NavLink href='#demo'>Demo</NavLink>
          <NavLink href='#pricing'>Pricing</NavLink>
        </div>
        <div className='flex items-center space-x-4'>
          <Button
            onClick={toggleTheme}
            variant='outline'
            size='icon'
            className='rounded-full'
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </Button>
          <Button asChild>
            <Link href='/signup'>Get Started</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}

export default Header
