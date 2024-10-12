'use client'
import { Button } from '@/components/ui/button'
import Safari from '@/components/ui/safari'
import {
  Cog6ToothIcon,
  RocketLaunchIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import Link from 'next/link'
import FeatureCard from './FeatureCard'

const Hero = () => {
  return (
    <>
      <section className='container mx-auto px-6 py-40 text-center'>
        <motion.h1
          className='mb-8 text-5xl font-extrabold text-gray-900 dark:text-white md:text-7xl'
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Swipe Through Resumes, Hire Smarter.
        </motion.h1>
        <motion.p
          className='mx-auto mb-12 max-w-2xl text-xl text-gray-600 dark:text-gray-300'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {`"Create custom job application forms, sort resumes by ATS scores, and effortlessly swipe left or right to shortlist or discard candidates. Simplify your hiring process with a swipe!"`}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button
            asChild
            size='lg'
            className='transform rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 px-8 py-4 text-lg font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:from-teal-600 hover:to-cyan-700'
          >
            <Link href='/demo'>Create your own form.</Link>
          </Button>
        </motion.div>
      </section>
      <section id='features' className='bg-white py-24 dark:bg-gray-800'>
        <div className='container mx-auto px-6'>
          <h2 className='mb-12 text-center text-4xl font-bold text-gray-800 dark:text-white'>
            Ride the Features Wave
          </h2>
          <div className='grid grid-cols-1 gap-12 md:grid-cols-3'>
            <FeatureCard
              icon={<RocketLaunchIcon className='h-12 w-12 text-teal-500' />}
              title='Custom Form Builder'
              description='Effortlessly create job application forms tailored to your needs. Share across platforms and collect resumes in one place.'
              gif='https://i.pinimg.com/564x/00/e7/2f/00e72fe3eef191fe27271540616933d4.jpg'
            />
            <FeatureCard
              icon={<ShieldCheckIcon className='h-12 w-12 text-cyan-500' />}
              title='ATS-Powered Sorting'
              description='Automatically rank resumes with our built-in ATS scoring system. Find the best candidates without the hassle.'
              gif='https://i.pinimg.com/564x/5e/4e/78/5e4e78a45091b68edf1e53461b551adf.jpg'
            />
            <FeatureCard
              icon={<Cog6ToothIcon className='h-12 w-12 text-sky-500' />}
              title='Swipe to Review'
              description='Swipe left to discard, swipe right to shortlist. Review resumes like never before with our intuitive swipe interface.'
              gif='https://i.pinimg.com/originals/09/94/96/0994969b23f4c948d979c38f4cedc77a.gif'
            />
          </div>
        </div>
      </section>

      <section
        id='demo'
        className='bg-gradient-to-b from-teal-50 to-cyan-100 py-24 dark:from-gray-900 dark:to-blue-900'
      >
        <div className='container mx-auto px-6'>
          <h2 className='mb-12 text-center text-4xl font-bold text-gray-800 dark:text-white'>
            See swipeCV in Action
          </h2>
          <div className='flex flex-col items-center'>
            <Safari
              url='magicui.design'
              className='size-1/2'
              src='https://i.pinimg.com/originals/32/91/57/3291574b94400a80a476978fe9e3572f.gif'
            ></Safari>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
