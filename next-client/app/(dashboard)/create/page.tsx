'use client'

import { saveFieldsToDB } from '@/actions/form'
import { Field, FieldType } from '@/types/types'
import { useAuth } from '@clerk/nextjs'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, CheckSquare, Image, List, Plus, Type, X } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function CreateForm() {
  const [formTitle, setFormTitle] = useState('')
  const [fields, setFields] = useState<Field[]>([])
  const { isLoaded, userId } = useAuth()

  const addField = (type: FieldType) => {
    const newField: Field = {
      id: Date.now().toString(),
      type,
      label: `New ${type} question`,
      options:
        type === 'multipleChoice' || type === 'checkbox'
          ? ['Option 1']
          : undefined
    }
    setFields([...fields, newField])
  }

  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id))
  }

  const updateFieldLabel = (id: string, newLabel: string) => {
    setFields(
      fields.map(field =>
        field.id === id ? { ...field, label: newLabel } : field
      )
    )
  }

  const addOption = (fieldId: string) => {
    setFields(
      fields.map(field =>
        field.id === fieldId && field.options
          ? {
              ...field,
              options: [...field.options, `Option ${field.options.length + 1}`]
            }
          : field
      )
    )
  }

  const removeOption = (fieldId: string, optionIndex: number) => {
    setFields(
      fields.map(field =>
        field.id === fieldId && field.options
          ? {
              ...field,
              options: field.options.filter((_, index) => index !== optionIndex)
            }
          : field
      )
    )
  }

  const updateOption = (
    fieldId: string,
    optionIndex: number,
    newValue: string
  ) => {
    setFields(
      fields.map(field =>
        field.id === fieldId && field.options
          ? {
              ...field,
              options: field.options.map((option, index) =>
                index === optionIndex ? newValue : option
              )
            }
          : field
      )
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='min-h-screen bg-gradient-to-br from-teal-50 via-cyan-100 to-sky-200 p-6 transition-colors duration-500 dark:from-gray-900 dark:via-blue-900 dark:to-cyan-900'
    >
      <main className='mx-auto max-w-3xl'>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className='mb-8'
        >
          <input
            type='text'
            value={formTitle}
            onChange={e => setFormTitle(e.target.value)}
            placeholder='Enter form title'
            className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-2xl font-bold text-gray-800 shadow-sm transition-all duration-300 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-teal-400 dark:focus:ring-teal-400'
          />
        </motion.div>

        <AnimatePresence>
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className='mb-4 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800'
            >
              <div className='mb-2 flex items-center justify-between'>
                <input
                  type='text'
                  value={field.label}
                  onChange={e => updateFieldLabel(field.id, e.target.value)}
                  className='w-full rounded border-none bg-transparent text-lg font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:text-white dark:focus:ring-teal-400'
                />
                <button
                  onClick={() => removeField(field.id)}
                  className='ml-2 rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                  aria-label='Remove field'
                >
                  <X className='h-5 w-5' />
                </button>
              </div>

              {(field.type === 'multipleChoice' || field.type === 'checkbox') &&
                field.options && (
                  <div className='ml-4 mt-2 space-y-2'>
                    {field.options.map((option, optionIndex) => (
                      <div key={optionIndex} className='flex items-center'>
                        <input
                          type={
                            field.type === 'multipleChoice'
                              ? 'radio'
                              : 'checkbox'
                          }
                          disabled
                          className='mr-2'
                        />
                        <input
                          type='text'
                          value={option}
                          onChange={e =>
                            updateOption(field.id, optionIndex, e.target.value)
                          }
                          className='flex-grow rounded border-none bg-transparent text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:text-white dark:focus:ring-teal-400'
                        />
                        <button
                          onClick={() => removeOption(field.id, optionIndex)}
                          className='ml-2 rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                          aria-label='Remove option'
                        >
                          <X className='h-4 w-4' />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addOption(field.id)}
                      className='mt-2 flex items-center text-sm text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300'
                    >
                      <Plus className='mr-1 h-4 w-4' />
                      Add Option
                    </button>
                  </div>
                )}

              {field.type === 'text' && (
                <input
                  type='text'
                  disabled
                  placeholder='Short answer text'
                  className='mt-2 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300'
                />
              )}

              {field.type === 'date' && (
                <input
                  type='date'
                  disabled
                  className='mt-2 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300'
                />
              )}

              {field.type === 'file' && (
                <input
                  type='file'
                  disabled
                  className='mt-2 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300'
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className='mt-6 flex flex-wrap justify-center gap-4'
        >
          <button
            onClick={() => addField('text')}
            className='flex items-center rounded-md bg-white px-4 py-2 text-gray-700 shadow-md transition-all hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
          >
            <Type className='mr-2 h-5 w-5' />
            Add Text
          </button>
          <button
            onClick={() => addField('multipleChoice')}
            className='flex items-center rounded-md bg-white px-4 py-2 text-gray-700 shadow-md transition-all hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
          >
            <List className='mr-2 h-5 w-5' />
            Add Multiple Choice
          </button>
          <button
            onClick={() => addField('checkbox')}
            className='flex items-center rounded-md bg-white px-4 py-2 text-gray-700 shadow-md transition-all hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
          >
            <CheckSquare className='mr-2 h-5 w-5' />
            Add Checkbox
          </button>
          <button
            onClick={() => addField('date')}
            className='flex items-center rounded-md bg-white px-4 py-2 text-gray-700 shadow-md transition-all hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
          >
            <Calendar className='mr-2 h-5 w-5' />
            Add Date
          </button>
          <button
            onClick={() => addField('file')}
            className='flex items-center rounded-md bg-white px-4 py-2 text-gray-700 shadow-md transition-all hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
          >
            <Image className='mr-2 h-5 w-5' />
            Add File Upload
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className='mt-8 text-center'
        >
          <button
            onClick={async () => {
              try {
                if (!isLoaded) {
                  toast.error('user not loaded.')
                  return
                }
                if (fields.length === 0 || formTitle.length === 0) {
                  toast.error('Form cannot be empty')
                  return
                }
                await saveFieldsToDB(fields, formTitle, userId || '')
                setFields([])
                setFormTitle('')
                toast.success('form added successfully')
              } catch (err) {
                console.log(err)
                toast.error('something went wrong')
              }
            }}
            className='rounded-lg bg-teal-600 px-6 py-2 text-white transition-all hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600'
          >
            Save Form
          </button>
        </motion.div>
      </main>
    </motion.div>
  )
}
