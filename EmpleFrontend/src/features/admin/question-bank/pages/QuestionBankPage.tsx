'use client'

import { useEffect, useState } from 'react'
import CreateQuestionBank from '../components/createQuestionBank'
import DeleteConfirmationModal from '../components/DeleteConfirmation'
import ToastContainer from '../components/ToastContainer'
import { apiRequest } from '@/shared/utils/api'

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

type DeleteQuestionBankResponse = {
  success: boolean
  message: string
}

type QuestionBankPageProps = {
  onEditQuestionBank: (id: string) => void
}

type Toast = {
  id: number
  message: string
  type: 'success' | 'error'
}

export default function QuestionBankPage({
  onEditQuestionBank,
}: QuestionBankPageProps) {
  const [questionBanks, setQuestionBanks] = useState<QuestionBank[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<QuestionBank | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now()

    setToasts((prev) => [...prev, { id, message, type }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 2500)
  }

  const fetchQuestionBanks = async () => {
    try {
      setLoading(true)

      const result = await apiRequest<GetQuestionBanksResponse>(
        '/api/v1/admin/question-banks',
        {
          method: 'GET',
        }
      )

      setQuestionBanks(result.data || [])
    } catch (err) {
      addToast(
        err instanceof Error ? err.message : 'Failed to fetch question banks',
        'error'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestionBanks()

    const handleFocus = () => fetchQuestionBanks()
    window.addEventListener('focus', handleFocus)

    return () => window.removeEventListener('focus', handleFocus)
  }, [])

  const handleDelete = async () => {
    if (!deleteTarget) return

    try {
      setDeleteLoading(true)

      await apiRequest<DeleteQuestionBankResponse>(
        `/api/v1/admin/question-banks/${deleteTarget._id}`,
        {
          method: 'DELETE',
        }
      )

      setQuestionBanks((prev) =>
        prev.filter((item) => item._id !== deleteTarget._id)
      )

      setDeleteTarget(null)
      addToast('Question bank deleted successfully.', 'success')
    } catch (err) {
      addToast(
        err instanceof Error ? err.message : 'Error deleting question bank',
        'error'
      )
    } finally {
      setDeleteLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[rgb(10,11,14)] px-6 py-10 text-white md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
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
                    onClick={() => onEditQuestionBank(item._id)}
                    className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/5"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setDeleteTarget(item)}
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
          onSuccess={async (newItem) => {
            setQuestionBanks((prev) => [newItem, ...prev])
            await fetchQuestionBanks()
            addToast('Question bank created successfully.', 'success')
          }}
        />

        <DeleteConfirmationModal
          isOpen={!!deleteTarget}
          onClose={() => {
            if (!deleteLoading) setDeleteTarget(null)
          }}
          onConfirm={handleDelete}
          loading={deleteLoading}
          title="Delete Question Bank"
          description={
            deleteTarget
              ? `Are you sure you want to delete "${deleteTarget.title}"? This action cannot be undone.`
              : ''
          }
        />

        <ToastContainer toasts={toasts} />
      </div>
    </main>
  )
}