'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type QuestionBank = {
  _id: string
  title: string
  description: string
  createdAt?: string
  updatedAt?: string
}

type Props = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (data: QuestionBank) => void
}

type CreateQuestionBankResponse = {
  success: boolean
  message: string
  data: QuestionBank
}

export default function CreateQuestionBank({
  isOpen,
  onClose,
  onSuccess,
}: Props) {
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
    })
    onClose()
  }

  const handleCreate = async () => {
    const trimmedTitle = formData.title.trim()
    const trimmedDescription = formData.description.trim()

    if (!trimmedTitle || !trimmedDescription) {
      return
    }

    try {
      setLoading(true)

      const res = await fetch(
        'http://localhost:5000/api/v1/admin/question-banks',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: trimmedTitle,
            description: trimmedDescription,
          }),
        }
      )

      const result: CreateQuestionBankResponse = await res.json()

      if (!res.ok) {
        throw new Error(result.message || 'Failed to create question bank')
      }

      onSuccess?.(result.data)

      setFormData({
        title: '',
        description: '',
      })

      onClose()

      router.push(`/practice/question-bank/${result.data._id}`)
    } catch (err) {
      console.error('Create question bank failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md rounded-3xl bg-[rgb(19,20,27)] p-6 ring-1 ring-white/10">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Create Question Bank
            </h2>
            <p className="mt-1 text-sm text-white/55">
              Add a title and description to create a new question bank.
            </p>
          </div>

          <button
            onClick={handleClose}
            className="rounded-full bg-[rgb(10,11,14)] px-3 py-1 text-sm text-white/70 ring-1 ring-white/10 transition hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/75">
              Title
            </label>
            <input
              name="title"
              placeholder="Enter question bank title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10 placeholder:text-white/35"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/75">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter question bank description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-2xl bg-[rgb(10,11,14)] p-3 text-white outline-none ring-1 ring-white/10 placeholder:text-white/35"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={handleClose}
              disabled={loading}
              className="rounded-2xl bg-gray-700 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              onClick={handleCreate}
              disabled={loading}
              className="rounded-2xl bg-[rgb(241,90,34)] px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}