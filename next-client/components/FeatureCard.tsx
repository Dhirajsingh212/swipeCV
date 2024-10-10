'use client'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function FeatureCard({ icon, title, description, gif }: any) {
  return (
    <Card className='overflow-hidden'>
      <CardContent className='p-6 text-center'>
        <motion.div
          className='mb-4 flex justify-center'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {icon}
        </motion.div>
        <h3 className='mb-2 text-xl font-semibold text-gray-800 dark:text-white'>
          {title}
        </h3>
        <p className='mb-4 text-gray-600 dark:text-gray-300'>{description}</p>
        <Image
          src={gif}
          alt={title}
          width={1000}
          height={1000}
          objectFit='cover'
          className='h-full w-full rounded-lg'
        />
      </CardContent>
    </Card>
  )
}
