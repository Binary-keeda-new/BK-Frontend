'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import CreateQuestionBank from '../components/createQuestionBank'

type QuestionBank = {
  _id: string
  title: string
  description: string
  createdAt?: string
  updatedAt?: string
}

type GetQuestionBanksResponse = {
  success: boolean
  message: string
  data: QuestionBank[]
}

const API_BASE = 'http://localhost:5000/api/v1/admin/question-banks'

export default function QuestionBankPage() {
  const router = useRouter()

  const [questionBanks, setQuestionBanks] = useState<QuestionBank[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchQuestionBanks = async () => {
    try {
      setLoading(true)
      const res = await fetch(API_BASE)
      const result: GetQuestionBanksResponse = await res.json()

      if (!res.ok) {
        throw new Error(result.message || 'Failed to fetch')
      }

      setQuestionBanks(result.data)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestionBanks()
  }, [])

  const handleDelete = async (_id: string) => {
    if (!confirm('Are you sure you want to delete this?')) return

    try {
      const res = await fetch(`${API_BASE}/${_id}`, {
        method: 'DELETE',
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.message || 'Delete failed')
      }

      setQuestionBanks((prev) => prev.filter((item) => item._id !== _id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error deleting')
    }
  }

  return (
    <main className="min-h-screen bg-[rgb(10,11,14)] px-6 py-10 text-white md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="mb-2 inline-block rounded-full bg-[rgb(19,20,27)] px-4 py-1 text-sm text-[rgb(241,90,34)]">
              Admin Portal
            </p>
            <h1 className="text-3xl font-bold">Question Banks</h1>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-2xl bg-[rgb(241,90,34)] px-6 py-3 font-semibold transition-transform hover:scale-105 active:scale-95"
          >
            + Create New
          </button>
        </div>

        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[rgb(241,90,34)] border-t-transparent"></div>
          </div>
        ) : questionBanks.length === 0 ? (
          <div className="rounded-3xl bg-[rgb(19,20,27)] p-12 text-center text-white/50">
            No question banks available. Create one to get started.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {questionBanks.map((item) => (
              <div
                key={item._id}
                className="group flex h-full flex-col rounded-3xl bg-[rgb(19,20,27)] p-6 transition-colors hover:bg-[rgb(25,26,35)]"
              >
                <h2 className="text-xl font-bold text-white">{item.title}</h2>

                <p className="mt-2 flex-grow text-sm text-white/60 line-clamp-3">
                  {item.description}
                </p>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => router.push(`/practice/question-bank/${item._id}`)}
                    className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/5"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="rounded-xl border border-red-900/50 px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <CreateQuestionBank
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={(newItem) =>
            setQuestionBanks((prev) => [newItem, ...prev])
          }
        />
      </div>
    </main>
  )
}