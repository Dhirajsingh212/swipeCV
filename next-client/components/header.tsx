'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import NavLink from './NavLink'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

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
          <SignedOut>
            <Button className='bg-slate-900 text-white hover:bg-slate-700'>
              <SignInButton />
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <Button asChild>
            <Link href='/home'>Get Started</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}

export default Header
