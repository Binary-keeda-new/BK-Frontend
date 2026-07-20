'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Edit3,
  Plus,
  RotateCcw,
  Search,
  Trash2,
} from 'lucide-react'

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
  id: string
  message: string
  type: 'success' | 'error'
}

<<<<<<< HEAD
const PAGE_SIZE = 10
=======
const PAGE_SIZE = 5
>>>>>>> origin/develop

export default function QuestionBankPage({
  onEditQuestionBank,
}: QuestionBankPageProps) {
  const [questionBanks, setQuestionBanks] = useState<QuestionBank[]>([])
  const [loading, setLoading] = useState(true)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<QuestionBank | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (
    message: string,
    type: 'success' | 'error' = 'success'
  ) => {
    const id = crypto.randomUUID()

    setToasts((prev) => [...prev, { id, message, type }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
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
    } catch (error) {
      setQuestionBanks([])

      addToast(
        error instanceof Error
          ? error.message
          : 'Failed to fetch question banks',
        'error'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestionBanks()

    const handleFocus = () => {
      fetchQuestionBanks()
    }

    window.addEventListener('focus', handleFocus)

    return () => {
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  const filteredQuestionBanks = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return questionBanks
    }

    return questionBanks.filter((questionBank) => {
      return (
        questionBank.title.toLowerCase().includes(query) ||
        questionBank.description?.toLowerCase().includes(query)
      )
    })
  }, [questionBanks, search])

  const totalItems = filteredQuestionBanks.length
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE))

  const currentQuestionBanks = useMemo(() => {
    const startIndex = (page - 1) * PAGE_SIZE
    const endIndex = startIndex + PAGE_SIZE

    return filteredQuestionBanks.slice(startIndex, endIndex)
  }, [filteredQuestionBanks, page])

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  const handleSearchSubmit = () => {
    setSearch(searchInput)
    setPage(1)
  }

  const handleResetFilters = () => {
    setSearchInput('')
    setSearch('')
    setPage(1)
  }

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
    } catch (error) {
      addToast(
        error instanceof Error
          ? error.message
          : 'Error deleting question bank',
        'error'
      )
    } finally {
      setDeleteLoading(false)
    }
  }

  const formatDate = (date?: string) => {
    if (!date) return '—'

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
      return '—'
    }

    return parsedDate.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  const start = (page - 1) * PAGE_SIZE

  return (
    <>
      <ToastContainer toasts={toasts} />

      <div className="w-full max-w-[1060px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-[var(--clr-text)] sm:text-3xl">
              Question Banks{' '}
              <span className="text-[var(--clr-accent)]">List</span>
            </h1>

            <p className="mt-1 text-sm text-[var(--clr-text2)]">
              Create and manage reusable question collections for quizzes.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--clr-accent)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            Create Question Bank
          </button>
        </div>

        {/* Search */}
        <div className="mb-5 rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-4">
          <div className="grid gap-3 md:grid-cols-[1fr_auto]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--clr-text3)]" />

              <input
                type="text"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleSearchSubmit()
                  }
                }}
                placeholder="Search by title or description..."
                className="w-full rounded-xl border border-[var(--clr-border)] bg-[var(--clr-surface2)] py-2.5 pl-10 pr-4 text-sm text-[var(--clr-text)] outline-none transition placeholder:text-[var(--clr-text3)] focus:border-[var(--clr-accent)]"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSearchSubmit}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--clr-accent)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
              >
                <Search className="h-4 w-4" />
                Search
              </button>

              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--clr-border)] px-4 py-2.5 text-sm font-semibold text-[var(--clr-text2)] transition hover:bg-[var(--clr-surface2)] hover:text-[var(--clr-text)]"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="border-b border-[var(--clr-border)] bg-[var(--clr-surface2)]">
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[var(--clr-text3)]">
                    Title
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[var(--clr-text3)]">
                    Description
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[var(--clr-text3)]">
                    Created
                  </th>

                  <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-[var(--clr-text3)]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-14">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="h-7 w-7 animate-spin rounded-full border-2 border-[var(--clr-accent)] border-t-transparent" />

                        <span className="text-sm text-[var(--clr-text2)]">
                          Loading question banks...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : currentQuestionBanks.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-14 text-center">
                      <div className="mx-auto flex max-w-sm flex-col items-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--clr-accent3)] text-[var(--clr-accent)]">
                          <Search className="h-5 w-5" />
                        </div>

                        <h3 className="font-semibold text-[var(--clr-text)]">
                          No question banks found
                        </h3>

                        <p className="mt-1 text-sm text-[var(--clr-text2)]">
                          {search
                            ? 'Try using a different search term.'
                            : 'Create a question bank to get started.'}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentQuestionBanks.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b border-[var(--clr-border)] transition last:border-b-0 hover:bg-[var(--clr-surface2)]"
                    >
                      <td className="max-w-[220px] px-4 py-4">
                        <p className="truncate font-semibold text-[var(--clr-text)]">
                          {item.title}
                        </p>
                      </td>

                      <td className="max-w-[380px] px-4 py-4">
                        <p className="line-clamp-2 text-sm leading-5 text-[var(--clr-text2)]">
                          {item.description || 'No description available.'}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-[var(--clr-text2)]">
                        {formatDate(item.createdAt)}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => onEditQuestionBank(item._id)}
                            title="Edit Question Bank"
                            aria-label={`Edit ${item.title}`}
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--clr-border2)] text-blue-500 transition hover:border-blue-300 hover:bg-blue-500/10"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeleteTarget(item)}
                            title="Delete Question Bank"
                            aria-label={`Delete ${item.title}`}
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-red-500/30 text-red-500 transition hover:border-red-500/50 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-3 border-t border-[var(--clr-border)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs text-[var(--clr-text3)]">
              {totalItems === 0
                ? 'Showing 0 results'
                : `Showing ${start + 1} to ${Math.min(
                    start + currentQuestionBanks.length,
                    totalItems
                  )} of ${totalItems}`}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page === 1 || loading}
                onClick={() => setPage((prev) => prev - 1)}
                className="rounded-md border border-[var(--clr-border)] px-3 py-1.5 text-sm font-medium text-[var(--clr-text2)] transition hover:bg-[var(--clr-surface2)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Prev
              </button>

              <span className="rounded-md bg-[var(--clr-accent)] px-3 py-1.5 text-sm font-bold text-white">
                {page}
              </span>

              <button
                type="button"
                disabled={page >= totalPages || loading}
                onClick={() => setPage((prev) => prev + 1)}
                className="rounded-md border border-[var(--clr-border)] px-3 py-1.5 text-sm font-medium text-[var(--clr-text2)] transition hover:bg-[var(--clr-surface2)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <CreateQuestionBank
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={async (newItem) => {
            setQuestionBanks((prev) => [newItem, ...prev])
            setPage(1)
            setIsModalOpen(false)

            await fetchQuestionBanks()

            addToast('Question bank created successfully.', 'success')
          }}
        />

        <DeleteConfirmationModal
          isOpen={Boolean(deleteTarget)}
          onClose={() => {
            if (!deleteLoading) {
              setDeleteTarget(null)
            }
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
      </div>
    </>
  )
}