'use client'

import React, { ChangeEvent, useMemo, useState, useRef } from 'react'
import ToastContainer from '@/features/admin/question-bank/components/ToastContainer';

type ThemeKey = 'dark' | 'light'

interface FormState {
  title: string
  description: string
  marks: string
  category: keyof typeof categories | ''
  subcategory: string
}

interface QuizFormProps {
  onClose: () => void
  onSuccess?: () => void
  theme?: ThemeKey
}

const categories = {
  Mathematics: [
    'Algebra',
    'Geometry',
    'Calculus',
    'Statistics',
    'Trigonometry',
  ],
  Science: [
    'Physics',
    'Chemistry',
    'Biology',
    'Astronomy',
    'Earth Science',
  ],
  Technology: [
    'Programming',
    'Networking',
    'Cybersecurity',
    'AI & ML',
    'Web Dev',
  ],
  History: ['Ancient History', 'World Wars', 'Civilizations', 'Politics'],
  Language: ['Grammar', 'Literature', 'Vocabulary', 'Writing', 'Comprehension'],
}


export default function QuizForm({
  onClose,
  theme = 'dark',
  onSuccess,
}: QuizFormProps) {
  const [form, setForm] = useState<FormState>({
    title: '',
    description: '',
    marks: '',
    category: '',
    subcategory: '',
  })

  const [toasts, setToasts] = useState<{
  id: number;
  message: string;
  type: 'success' | 'error';
}[]>([]);

const toastId = useRef(0);

const addToast = (message: string, type: 'success' | 'error' = 'success') => {
  const id = ++toastId.current;
  setToasts((prev) => [...prev, { id, message, type }]);

  setTimeout(() => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, 3000);
};
  const [loading, setLoading] = useState(false)

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
    const val = e.target.value as keyof typeof categories
    setForm((prev) => ({
      ...prev,
      category: val,
      subcategory: '',
    }))
  }

 const handleSubmit = async (status: 'draft' | 'published') => {
  if (filledCount < 5) {
    addToast('Please fill all required fields.')
    return
  }

  try {
    setLoading(true)

    const payload = {
  title: form.title,
  description: form.description,
  marks: form.marks,
  category: form.category,
  subcategory: form.subcategory,
  status,
}

    console.log('Submitting quiz payload:', payload)

    const response = await fetch('http://localhost:5000/api/v1/admin/quizzes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to save quiz')
    }

    onSuccess?.();

    addToast(
      status === 'published'
        ? 'Quiz published successfully!'
        : 'Quiz saved as draft successfully!'
    )

    onClose()
  } catch (error) {
    console.error('Failed to save quiz:', error)
    alert(error instanceof Error ? error.message : 'Server connection failed.')
  } finally {
    setLoading(false)
  }
}

  return (
    <>
    <ToastContainer toasts={toasts}/>
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
                Draft to Publish
              </p>
            </div>

            <div className="rounded-2xl bg-[var(--clr-bg,#0a0b0e)] p-4 ring-1 ring-white/10">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--clr-text2)]">
                Required Fields
              </p>
              <p className="text-sm text-[var(--clr-text)]">5 fields required</p>
            </div>

            <div className="rounded-2xl bg-[var(--clr-bg,#0a0b0e)] p-4 ring-1 ring-white/10">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--clr-text2)]">
                Progress
              </p>
              <p className="text-sm text-[var(--clr-text)]">
                {filledCount} / 5 completed
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
                placeholder="e.g. Introduction to Calculus"
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

              <div className="mt-3 flex flex-wrap gap-2">
                {[25, 50, 100, 200].map((value) => {
                  const active = form.marks === String(value)

                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, marks: String(value) }))
                      }
                      className={`rounded-xl px-3 py-1.5 text-xs font-medium transition ${
                        active
                          ? 'bg-[var(--clr-accent)] text-white ring-1 ring-[var(--clr-accent)]'
                          : 'bg-[var(--clr-bg,#0a0b0e)] text-[var(--clr-text2)] ring-1 ring-white/10 hover:text-[var(--clr-text)]'
                      }`}
                    >
                      {value}
                    </button>
                  )
                })}
              </div>

              <p className="mt-2 text-xs text-[var(--clr-text2)]">
                Quick-select a common marks value or enter a custom one.
              </p>
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
                    {Object.keys(categories).map((cat) => (
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
                      categories[form.category].map((sub) => (
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
                Make sure the title, category, and marks are correct before
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
  onClick={() => handleSubmit('published')}
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
