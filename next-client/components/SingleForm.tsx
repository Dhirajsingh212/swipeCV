'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, AlertCircle } from 'lucide-react'

interface FormField {
  id: string
  type: 'text' | 'multipleChoice' | 'checkbox' | 'date' | 'file'
  label: string
  options?: string[]
  required?: boolean
}

interface FormData {
  title: string
  fields: FormField[]
}

// This would typically come from an API or database
const formData: FormData = {
  title: 'Customer Satisfaction Survey',
  fields: [
    { id: '1', type: 'text', label: "What's your name?", required: true },
    {
      id: '2',
      type: 'multipleChoice',
      label: 'How satisfied are you with our service?',
      options: [
        'Very Satisfied',
        'Satisfied',
        'Neutral',
        'Dissatisfied',
        'Very Dissatisfied'
      ],
      required: true
    },
    {
      id: '3',
      type: 'checkbox',
      label: 'Which of our products have you used? (Select all that apply)',
      options: ['Product A', 'Product B', 'Product C', 'Product D']
    },
    {
      id: '4',
      type: 'date',
      label: 'When did you last use our service?',
      required: true
    },
    {
      id: '5',
      type: 'text',
      label: 'Any additional comments?',
      required: false
    },
    {
      id: '6',
      type: 'file',
      label: 'Upload any relevant documents (optional)',
      required: false
    }
  ]
}

export default function FormPage() {
  const [formResponses, setFormResponses] = useState<
    Record<string, string | string[]>
  >({})
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const handleInputChange = (id: string, value: string | string[]) => {
    setFormResponses(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: string[] = []

    formData.fields.forEach(field => {
      if (
        field.required &&
        (!formResponses[field.id] ||
          (Array.isArray(formResponses[field.id]) &&
            (formResponses[field.id] as string[]).length === 0))
      ) {
        newErrors.push(`${field.label} is required`)
      }
    })

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    // Here you would typically send the form data to a server
    console.log('Form submitted:', formResponses)
    setSubmitted(true)
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
          className='mb-8 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800'
        >
          <h1 className='mb-4 text-3xl font-bold text-gray-800 dark:text-white'>
            {formData.title}
          </h1>
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              {formData.fields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className='mb-6'
                >
                  <label className='mb-2 block text-lg font-medium text-gray-700 dark:text-gray-200'>
                    {field.label}
                    {field.required && (
                      <span className='ml-1 text-red-500'>*</span>
                    )}
                  </label>
                  {field.type === 'text' && (
                    <input
                      type='text'
                      value={(formResponses[field.id] as string) || ''}
                      onChange={e =>
                        handleInputChange(field.id, e.target.value)
                      }
                      className='w-full rounded-md border border-gray-300 p-2 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                    />
                  )}
                  {field.type === 'multipleChoice' && field.options && (
                    <div className='space-y-2'>
                      {field.options.map((option, optionIndex) => (
                        <div key={optionIndex} className='flex items-center'>
                          <input
                            type='radio'
                            id={`${field.id}-${optionIndex}`}
                            name={field.id}
                            value={option}
                            checked={
                              (formResponses[field.id] as string) === option
                            }
                            onChange={e =>
                              handleInputChange(field.id, e.target.value)
                            }
                            className='h-4 w-4 border-gray-300 text-teal-600 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800'
                          />
                          <label
                            htmlFor={`${field.id}-${optionIndex}`}
                            className='ml-2 text-gray-700 dark:text-gray-200'
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                  {field.type === 'checkbox' && field.options && (
                    <div className='space-y-2'>
                      {field.options.map((option, optionIndex) => (
                        <div key={optionIndex} className='flex items-center'>
                          <input
                            type='checkbox'
                            id={`${field.id}-${optionIndex}`}
                            value={option}
                            checked={(
                              (formResponses[field.id] as string[]) || []
                            ).includes(option)}
                            onChange={e => {
                              const currentValues =
                                (formResponses[field.id] as string[]) || []
                              const newValues = e.target.checked
                                ? [...currentValues, option]
                                : currentValues.filter(v => v !== option)
                              handleInputChange(field.id, newValues)
                            }}
                            className='h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800'
                          />
                          <label
                            htmlFor={`${field.id}-${optionIndex}`}
                            className='ml-2 text-gray-700 dark:text-gray-200'
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                  {field.type === 'date' && (
                    <input
                      type='date'
                      value={(formResponses[field.id] as string) || ''}
                      onChange={e =>
                        handleInputChange(field.id, e.target.value)
                      }
                      className='w-full rounded-md border border-gray-300 p-2 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                    />
                  )}
                  {field.type === 'file' && (
                    <input
                      type='file'
                      onChange={e =>
                        handleInputChange(
                          field.id,
                          e.target.files ? e.target.files[0].name : ''
                        )
                      }
                      className='w-full rounded-md border border-gray-300 p-2 text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                    />
                  )}
                </motion.div>
              ))}
              {errors.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='mb-4 rounded-md bg-red-50 p-4 dark:bg-red-900'
                >
                  <div className='flex'>
                    <AlertCircle className='h-5 w-5 text-red-400' />
                    <div className='ml-3'>
                      <h3 className='text-sm font-medium text-red-800 dark:text-red-200'>
                        There were errors with your submission
                      </h3>
                      <div className='mt-2 text-sm text-red-700 dark:text-red-300'>
                        <ul className='list-disc space-y-1 pl-5'>
                          {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type='submit'
                className='w-full rounded-md bg-teal-600 px-4 py-2 text-white transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:bg-teal-500 dark:hover:bg-teal-600'
              >
                Submit
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='rounded-md bg-green-50 p-4 dark:bg-green-900'
            >
              <div className='flex'>
                <Check className='h-5 w-5 text-green-400' />
                <div className='ml-3'>
                  <h3 className='text-sm font-medium text-green-800 dark:text-green-200'>
                    Form submitted successfully
                  </h3>
                  <div className='mt-2 text-sm text-green-700 dark:text-green-300'>
                    Thank you for your response. Your submission has been
                    recorded.
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>
    </motion.div>
  )
}
