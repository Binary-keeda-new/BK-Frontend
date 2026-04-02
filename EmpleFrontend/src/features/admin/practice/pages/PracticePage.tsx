'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type CreateQuestionBankResponse = {
  success: boolean
  message: string
  data: {
    _id: string
    title: string
    description: string
    createdAt?: string
    updatedAt?: string
  }
}

export default function Page() {
  const [isQuestionBankOpen, setIsQuestionBankOpen] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })

  const cards = [
    {
      title: 'Add Quiz',
      description:
        'Create a new quiz with title, duration, instructions, and scoring settings.',
      button: 'Create Quiz',
      icon: '📝',
    },
    {
      title: 'Add Test',
      description:
        'Set up a full test with sections, timing rules, attempt limits, and evaluation flow.',
      button: 'Create Test',
      icon: '📚',
    },
    {
      title: 'Add Question Bank',
      description:
        'Build and organize a reusable question bank by subject, topic, and difficulty.',
      button: 'Create Question Bank',
      icon: '📂',
    },
  ]

  const handleOpenQuestionBank = () => {
    setIsQuestionBankOpen(true)
  }

  const handleCloseQuestionBank = () => {
    setIsQuestionBankOpen(false)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

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
            title: formData.title,
            description: formData.description,
          }),
        }
      )

      const result: CreateQuestionBankResponse = await res.json()

      if (!res.ok) {
        throw new Error(result.message || 'Failed to create question bank')
      }

      setIsQuestionBankOpen(false)
      setShowSnackbar(true)
      setFormData({ title: '', description: '' })

      setTimeout(() => {
        setShowSnackbar(false)
      }, 3000)
    } catch (error) {
      console.error('Create question bank failed:', error)
    } finally {
      setLoading(false)
    }
  }
  const router = useRouter()

  return (
    <main className="min-h-screen bg-[rgb(10,11,14)] px-6 py-10 text-white md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4">
          <div>
            <p className="mb-2 inline-block rounded-full bg-[rgb(19,20,27)] px-4 py-1 text-sm font-medium text-[rgb(241,90,34)] ring-1 ring-white/10">
              Admin Panel
            </p>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              Assessment Setup
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-white/60 md:text-base">
              Manage assessments from one place.
            </p>
          </div>
        </div>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="group relative overflow-hidden rounded-3xl bg-[rgb(19,20,27)] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(0,0,0,0.8)]"
            >
              <div className="absolute right-0 top-0 h-28 w-28 translate-x-8 -translate-y-8 rounded-full bg-[rgb(241,90,34)]/10 blur-2xl" />

              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgb(241,90,34)] text-2xl shadow-sm">
                    <span>{card.icon}</span>
                  </div>
                </div>

                <h2 className="text-2xl font-semibold tracking-tight">
                  {card.title}
                </h2>

                <p className="mt-3 flex-1 text-sm leading-6 text-white/60">
                  {card.description}
                </p>

                <div className="mt-6 flex items-center justify-end">
                  <button
                    onClick={
                      card.title === 'Add Question Bank'
                        ? handleOpenQuestionBank
                        : undefined
                    }
                    className="rounded-2xl bg-[rgb(241,90,34)] px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {card.button}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>

      {isQuestionBankOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-3xl bg-[rgb(19,20,27)] p-6 shadow-2xl ring-1 ring-white/10">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  Create Question Bank
                </h3>
                <p className="mt-2 text-sm text-white/60">
                  Enter the basic details to create a new question bank.
                </p>
              </div>
              <button
                onClick={handleCloseQuestionBank}
                className="rounded-full bg-[rgb(10,11,14)] px-3 py-1 text-sm text-white/70 ring-1 ring-white/10 transition hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter question bank title"
                  required
                  className="w-full rounded-2xl bg-[rgb(10,11,14)] px-4 py-3 text-sm text-white outline-none ring-1 ring-white/10 placeholder:text-white/35 focus:ring-[rgb(241,90,34)]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter question bank description"
                  rows={4}
                  required
                  className="w-full rounded-2xl bg-[rgb(10,11,14)] px-4 py-3 text-sm text-white outline-none ring-1 ring-white/10 placeholder:text-white/35 focus:ring-[rgb(241,90,34)]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseQuestionBank}
                  className="rounded-2xl bg-[rgb(10,11,14)] px-5 py-3 text-sm font-medium text-white/80 ring-1 ring-white/10 transition hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-2xl bg-[rgb(241,90,34)] px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showSnackbar && (
        <div className="fixed bottom-6 right-6 z-[60] rounded-2xl bg-green-600 px-5 py-4 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
          Question bank has been created successfully.
        </div>
      )}
    </main>
  )
}