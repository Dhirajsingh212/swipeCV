'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, AlertCircle } from 'lucide-react'

// Type definitions for form structure
interface FormField {
  label: string
  type: 'text' | 'multipleChoice' | 'checkbox' | 'date' | 'file'
  options?: {
    value: string
  }[]
  required?: boolean
}

interface FormData {
  formTitle: string
  createdAt: string | Date
  fields: FormField[]
}

export default function DynamicForm({ formData }: { formData: FormData }) {
  // Initialize responses with empty values based on field types
  const initializeResponses = () => {
    const initial: Record<string, any> = {}
    formData.fields.forEach((field, index) => {
      const fieldId = `field-${index}`
      initial[fieldId] = field.type === 'checkbox' ? [] : ''
    })
    return initial
  }

  const [formResponses, setFormResponses] = useState(initializeResponses())
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const validateForm = () => {
    const newErrors: string[] = []
    formData.fields.forEach((field, index) => {
      const fieldId = `field-${index}`
      const response = formResponses[fieldId]

      if (field.required) {
        if (field.type === 'checkbox' && (!response || response.length === 0)) {
          newErrors.push(`${field.label} is required`)
        } else if (!response || response.length === 0) {
          newErrors.push(`${field.label} is required`)
        }
      }
    })
    return newErrors
  }

  const handleInputChange = (fieldId: string, value: any) => {
    setFormResponses(prev => ({ ...prev, [fieldId]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formErrors = validateForm()

    if (formErrors.length > 0) {
      setErrors(formErrors)
      return
    }

    const formattedResponses = formData.fields.reduce(
      (acc, field, index) => {
        const fieldId = `field-${index}`
        acc[field.label] = formResponses[fieldId]
        return acc
      },
      {} as Record<string, any>
    )

    console.log('Form submitted:', {
      title: formData.formTitle,
      submittedAt: new Date().toISOString(),
      responses: formattedResponses
    })

    setErrors([])
    setSubmitted(true)
  }

  const renderField = (field: FormField, index: number) => {
    const fieldId = `field-${index}`

    switch (field.type) {
      case 'text':
        return (
          <input
            type='text'
            value={formResponses[fieldId] || ''}
            onChange={e => handleInputChange(fieldId, e.target.value)}
            className='w-full rounded-md border border-gray-300 p-2 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
          />
        )

      case 'multipleChoice':
        return (
          <div className='space-y-2'>
            {field.options?.map((option, optionIndex) => (
              <div key={optionIndex} className='flex items-center'>
                <input
                  type='radio'
                  id={`${fieldId}-${optionIndex}`}
                  name={fieldId}
                  value={option.value}
                  checked={formResponses[fieldId] === option.value}
                  onChange={e => handleInputChange(fieldId, e.target.value)}
                  className='h-4 w-4 border-gray-300 text-teal-600 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800'
                />
                <label
                  htmlFor={`${fieldId}-${optionIndex}`}
                  className='ml-2 text-gray-700 dark:text-gray-200'
                >
                  {option.value}
                </label>
              </div>
            ))}
          </div>
        )

      case 'checkbox':
        return (
          <div className='space-y-2'>
            {field.options?.map((option, optionIndex) => (
              <div key={optionIndex} className='flex items-center'>
                <input
                  type='checkbox'
                  id={`${fieldId}-${optionIndex}`}
                  value={option.value}
                  checked={(formResponses[fieldId] || []).includes(
                    option.value
                  )}
                  onChange={e => {
                    const currentValues = formResponses[fieldId] || []
                    const newValues = e.target.checked
                      ? [...currentValues, option.value]
                      : currentValues.filter((v: any) => v !== option.value)
                    handleInputChange(fieldId, newValues)
                  }}
                  className='h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800'
                />
                <label
                  htmlFor={`${fieldId}-${optionIndex}`}
                  className='ml-2 text-gray-700 dark:text-gray-200'
                >
                  {option.value}
                </label>
              </div>
            ))}
          </div>
        )

      case 'date':
        return (
          <input
            type='date'
            value={formResponses[fieldId] || ''}
            onChange={e => handleInputChange(fieldId, e.target.value)}
            className='w-full rounded-md border border-gray-300 p-2 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
          />
        )

      case 'file':
        return (
          <input
            type='file'
            onChange={e =>
              handleInputChange(
                fieldId,
                e.target.files ? e.target.files[0].name : ''
              )
            }
            className='w-full rounded-md border border-gray-300 p-2 text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
          />
        )

      default:
        return null
    }
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
            {formData.formTitle}
          </h1>
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              {formData.fields.map((field, index) => (
                <motion.div
                  key={index}
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
                  {renderField(field, index)}
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
