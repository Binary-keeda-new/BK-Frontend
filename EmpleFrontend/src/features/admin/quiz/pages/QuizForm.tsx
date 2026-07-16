'use client'

import React, { ChangeEvent, useMemo, useRef, useState } from 'react'
import ToastContainer from '@/features/admin/question-bank/components/ToastContainer'
import { QUIZ_CATEGORIES } from '@/shared/constants/quizCategories'
import { apiRequest } from '@/shared/utils/api'

interface FormState {
  title: string
  description: string
  marks: string
  numberOfQuestions: string
  category: keyof typeof QUIZ_CATEGORIES | ''
  subcategory: string
}

interface QuizFormProps {
  onClose: () => void
  onSuccess?: () => void
}

export default function QuizForm({
  onClose,
  onSuccess,
}: QuizFormProps) {
  const [form, setForm] = useState<FormState>({
    title: '',
    description: '',
    marks: '',
    numberOfQuestions: '',
    category: '',
    subcategory: '',
  })

  const [toasts, setToasts] = useState<{
    id: number
    message: string
    type: 'success' | 'error'
  }[]>([])

  const toastId = useRef(0)
  const [loading, setLoading] = useState(false)

  const addToast = (
    message: string,
    type: 'success' | 'error' = 'success'
  ) => {
    const id = ++toastId.current
    setToasts((prev) => [...prev, { id, message, type }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }

  const filledCount = useMemo(
    () => Object.values(form).filter(Boolean).length,
    [form]
  )

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as keyof typeof QUIZ_CATEGORIES
    setForm((prev) => ({
      ...prev,
      category: val,
      subcategory: '',
    }))
  }

  const handleSubmit = async () => {
    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.marks.trim() ||
      !form.numberOfQuestions.trim() ||
      !form.category ||
      !form.subcategory
    ) {
      addToast('Please fill all required fields.', 'error')
      return
    }

    if (Number(form.numberOfQuestions) <= 0) {
      addToast('Number of questions must be greater than 0.', 'error')
      return
    }

    if (Number(form.marks) < 0) {
      addToast('Total marks cannot be negative.', 'error')
      return
    }

    try {
  setLoading(true)


  const payload = {
    title: form.title.trim(),
    description: form.description.trim(),
    marks: Number(form.marks),
    numberOfQuestions: Number(form.numberOfQuestions),
    category: form.category,
    subcategory: form.subcategory,
    status: 'published',
  }

  await apiRequest('/api/v1/admin/quizzes', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  addToast('Quiz published successfully!', 'success')
  onSuccess?.()
  onClose()
} catch (error) {
  console.error('Failed to save quiz:', error)
  addToast(
    error instanceof Error ? error.message : 'Server connection failed.',
    'error'
  )
} finally {
  setLoading(false)
}
  }

  return (
    <>
      <ToastContainer toasts={toasts} />

      <div className="w-full">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--clr-accent)] shadow-[0_10px_30px_rgba(241,90,34,0.22)]">
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="text-white"
                  >
                    <path
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-[var(--clr-text)]">
                Create New <span className="text-[var(--clr-accent)]">Quiz</span>
              </h1>
              <p className="mt-2 text-sm text-[var(--clr-text2)]">
                Fill in the quiz details and publish it to your admin collection.
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-2xl bg-[var(--clr-bg,#0a0b0e)] px-4 py-2 text-sm text-[var(--clr-text2)] ring-1 ring-white/10 transition hover:text-[var(--clr-text)]"
            >
              Close
            </button>
          </div>

          <section className="rounded-[28px] bg-[var(--clr-surface,#13141b)] p-6 ring-1 ring-white/10 md:p-8">
            <div className="mb-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-[var(--clr-bg,#0a0b0e)] p-4 ring-1 ring-white/10">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--clr-text2)]">
                  Status
                </p>
                <p className="text-sm font-semibold text-[var(--clr-accent)]">
                  Ready to Publish
                </p>
              </div>

              <div className="rounded-2xl bg-[var(--clr-bg,#0a0b0e)] p-4 ring-1 ring-white/10">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--clr-text2)]">
                  Required Fields
                </p>
                <p className="text-sm text-[var(--clr-text)]">6 fields required</p>
              </div>

              <div className="rounded-2xl bg-[var(--clr-bg,#0a0b0e)] p-4 ring-1 ring-white/10">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--clr-text2)]">
                  Progress
                </p>
                <p className="text-sm text-[var(--clr-text)]">
                  {filledCount} / 6 completed
                </p>
              </div>
            </div>

            <div className="grid gap-6">
              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--clr-text2)]">
                  Quiz Title *
                </label>
                <input
                  name="title"
                  placeholder="e.g. Core CS Mock Test 1"
                  value={form.title}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl bg-[var(--clr-bg,#0a0b0e)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10 transition placeholder:text-white/35 focus:ring-2 focus:ring-[var(--clr-accent)]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--clr-text2)]">
                  Description *
                </label>
                <textarea
                  name="description"
                  rows={4}
                  placeholder="Briefly describe what this quiz covers..."
                  value={form.description}
                  onChange={handleInputChange}
                  className="w-full resize-none rounded-2xl bg-[var(--clr-bg,#0a0b0e)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10 transition placeholder:text-white/35 focus:ring-2 focus:ring-[var(--clr-accent)]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--clr-text2)]">
                  Total Marks *
                </label>
                <input
                  name="marks"
                  type="number"
                  placeholder="100"
                  value={form.marks}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl bg-[var(--clr-bg,#0a0b0e)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10 transition placeholder:text-white/35 focus:ring-2 focus:ring-[var(--clr-accent)]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--clr-text2)]">
                  Number of Questions *
                </label>

                <input
                  name="numberOfQuestions"
                  type="number"
                  placeholder="10"
                  value={form.numberOfQuestions}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl bg-[var(--clr-bg,#0a0b0e)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10 transition placeholder:text-white/35 focus:ring-2 focus:ring-[var(--clr-accent)]"
                />
              </div>

              <div className="border-t border-white/10 pt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--clr-text2)]">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleCategory}
                      className="w-full rounded-2xl bg-[var(--clr-bg,#0a0b0e)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10 transition focus:ring-2 focus:ring-[var(--clr-accent)]"
                    >
                      <option value="">Select category</option>
                      {Object.keys(QUIZ_CATEGORIES).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--clr-text2)]">
                      Subcategory *
                    </label>
                    <select
                      name="subcategory"
                      value={form.subcategory}
                      onChange={handleInputChange}
                      disabled={!form.category}
                      className="w-full rounded-2xl bg-[var(--clr-bg,#0a0b0e)] px-4 py-3 text-sm text-[var(--clr-text)] outline-none ring-1 ring-white/10 transition focus:ring-2 focus:ring-[var(--clr-accent)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <option value="">Select subcategory</option>
                      {form.category &&
                        Object.keys(QUIZ_CATEGORIES[form.category as keyof typeof QUIZ_CATEGORIES]).map((sub) => (
                          <option key={sub} value={sub}>
                            {sub}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[var(--clr-bg,#0a0b0e)] p-4 ring-1 ring-white/10">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--clr-text2)]">
                  Publishing Note
                </p>
                <p className="text-sm text-[var(--clr-text2)]">
                  Make sure the title, category, marks, and question count are correct before
                  publishing. You can edit the quiz later from the admin dashboard.
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="rounded-2xl bg-[var(--clr-bg,#0a0b0e)] px-5 py-3 text-sm font-medium text-[var(--clr-text2)] ring-1 ring-white/10 transition hover:text-[var(--clr-text)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="rounded-2xl bg-[var(--clr-accent)] px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-[180px]"
                >
                  {loading ? 'Publishing...' : 'Publish Quiz'}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
