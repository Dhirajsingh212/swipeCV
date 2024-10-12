'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'

export default function PricingCard({
  title,
  price,
  features,
  btnText,
  highlighted
}: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card
        className={`flex flex-col ${highlighted ? 'border-4 border-teal-500 dark:border-teal-400' : ''}`}
      >
        <CardHeader>
          <CardTitle className='text-center text-2xl font-bold'>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className='flex-grow'>
          <div className='mb-6 text-center text-4xl font-bold text-teal-600 dark:text-teal-400'>
            {price}
            <span className='text-lg font-normal text-gray-600 dark:text-gray-400'>
              /mo
            </span>
          </div>
          <ul className='mb-8 h-40 w-60 space-y-2'>
            {features.map((feature: any, index: any) => (
              <li
                key={index}
                className='flex items-center text-gray-600 dark:text-gray-300'
              >
                <svg
                  className='mr-2 h-5 w-5 text-teal-500'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path d='M5 13l4 4L19 7'></path>
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          <Button
            className={`w-full ${highlighted ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700' : ''}`}
          >
            {btnText}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
