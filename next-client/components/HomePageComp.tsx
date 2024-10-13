'use client'

import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { Copy, Edit, Plus, Search, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function HomePageComp({ forms }: { forms: any[] }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredForms = forms.filter(form =>
    form.formTitle.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='min-h-screen bg-gradient-to-br from-teal-50 via-cyan-100 to-sky-200 p-6 transition-colors duration-500 dark:from-gray-900 dark:via-blue-900 dark:to-cyan-900'
    >
      <main className='mx-auto max-w-6xl'>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className='mb-8 flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0'
        >
          <h1 className='text-4xl font-bold text-gray-800 dark:text-white'>
            Your Forms
          </h1>
          <Link
            href='/create'
            className='group flex items-center rounded-lg bg-teal-600 px-4 py-2 text-white transition-all duration-300 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600'
          >
            <Plus className='mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-90' />
            Create New Form
          </Link>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className='mb-6'
        >
          <div className='relative'>
            <input
              type='text'
              placeholder='Search forms...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 text-gray-800 shadow-sm transition-all duration-300 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-none dark:border-gray-600 dark:bg-card dark:text-white dark:focus:border-teal-400 dark:focus:ring-teal-400'
            />
            <Search className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400' />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'
        >
          {filteredForms.length > 0 &&
            filteredForms.map((form, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
                className='group rounded-lg bg-card p-6 shadow-md transition-all duration-300 hover:shadow-lg'
              >
                <h2 className='mb-2 text-xl font-semibold text-gray-800 dark:text-white'>
                  {form.formTitle}
                </h2>
                <p className='mb-4 text-sm text-gray-600 dark:text-gray-300'>
                  Responses: {form.responses || 0} | Created At:
                  {format(new Date(form.createdAt), 'dd MMMM yyyy')}
                </p>
                <div className='flex space-x-2'>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='flex items-center rounded-md bg-sky-100 px-3 py-1 text-sky-600 transition-colors hover:bg-sky-200 dark:bg-sky-900 dark:text-sky-300 dark:hover:bg-sky-800'
                    aria-label='Edit form'
                  >
                    <Edit className='mr-1 h-4 w-4' />
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='flex items-center rounded-md bg-teal-100 px-3 py-1 text-teal-600 transition-colors hover:bg-teal-200 dark:bg-teal-900 dark:text-teal-300 dark:hover:bg-teal-800'
                    aria-label='Duplicate form'
                  >
                    <Copy className='mr-1 h-4 w-4' />
                    Duplicate
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='flex items-center rounded-md bg-red-100 px-3 py-1 text-red-600 transition-colors hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800'
                    aria-label='Delete form'
                  >
                    <Trash2 className='mr-1 h-4 w-4' />
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            ))}
        </motion.div>

        {filteredForms.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className='mt-8 text-center'
          >
            <p className='text-xl text-gray-600 dark:text-gray-400'>
              {searchTerm
                ? 'No forms match your search.'
                : "You haven't created any forms yet."}
            </p>
            {!searchTerm && (
              <Link
                href='/create'
                className='group mt-4 inline-flex items-center rounded-lg bg-teal-600 px-4 py-2 text-white transition-all duration-300 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600'
              >
                <Plus className='mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-90' />
                Create Your First Form
              </Link>
            )}
          </motion.div>
        )}
      </main>
    </motion.div>
  )
}
