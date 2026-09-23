'use client'

import { useEffect, useState } from 'react'
import { Job } from '../types/jobs.types'
import { getAllJobs, deleteJob } from '../services/jobs.service'
import JobFormModal from './JobFormModal'
import DeleteConfirmationModal from '@/features/admin/question-bank/components/DeleteConfirmation'
import ToastContainer from '@/features/admin/question-bank/components/ToastContainer'

type Toast = { id: string; message: string; type: 'success' | 'error' }

export default function JobsTable() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Job | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Job | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (message: string, type: 'success' | 'error') => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 2500)
  }

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const data = await getAllJobs()
      setJobs(data)
    } catch (err) {
      addToast(err instanceof Error ? err.message : 'Failed to fetch jobs', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
    const handleFocus = () => fetchJobs()
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      setDeleteLoading(true)
      await deleteJob(deleteTarget._id)
      setJobs((prev) => prev.filter((j) => j._id !== deleteTarget._id))
      setDeleteTarget(null)
      addToast('Job deleted successfully.', 'success')
    } catch (err) {
      addToast(err instanceof Error ? err.message : 'Error deleting job', 'error')
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleOpenCreate = () => {
    setEditTarget(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (job: Job) => {
    setEditTarget(job)
    setIsModalOpen(true)
  }

  return (
    <main className="min-h-screen bg-[rgb(10,11,14)] px-6 py-10 text-white md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Jobs</h1>
          </div>
          <button
            onClick={handleOpenCreate}
            className="rounded-2xl bg-[rgb(241,90,34)] px-6 py-3 font-semibold transition-transform hover:scale-105 active:scale-95"
          >
            + Add Job
          </button>
        </div>

        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[rgb(241,90,34)] border-t-transparent"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="rounded-3xl bg-[rgb(19,20,27)] p-12 text-center text-white/50">
            No jobs available. Add one to get started.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="group flex h-full flex-col rounded-3xl bg-[rgb(19,20,27)] p-6 transition-colors hover:bg-[rgb(25,26,35)]"
              >
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-xl font-bold text-white">{job.title}</h2>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium capitalize ${
                      job.type === 'government'
                        ? 'bg-blue-500/10 text-blue-400'
                        : 'bg-[rgb(241,90,34)]/10 text-[rgb(241,90,34)]'
                    }`}
                  >
                    {job.type}
                  </span>
                </div>

                <p className="mt-1 text-sm font-medium text-white/70">{job.company}</p>

                {job.location && (
                  <p className="mt-1 text-xs text-white/40">{job.location}</p>
                )}

                <p className="mt-3 flex-grow text-sm text-white/60 line-clamp-3 whitespace-pre-line">
                  {job.description}
                </p>

                {job.salary && (
                  <p className="mt-3 text-sm font-medium text-emerald-400">{job.salary}</p>
                )}

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => handleOpenEdit(job)}
                    className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/5"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteTarget(job)}
                    className="rounded-xl border border-red-900/50 px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <JobFormModal
          isOpen={isModalOpen}
          editTarget={editTarget}
          onClose={() => setIsModalOpen(false)}
          onSuccess={async (job) => {
            await fetchJobs()
            addToast(
              editTarget ? 'Job updated successfully.' : 'Job created successfully.',
              'success'
            )
          }}
        />

        <DeleteConfirmationModal
          isOpen={!!deleteTarget}
          onClose={() => {
            if (!deleteLoading) setDeleteTarget(null)
          }}
          onConfirm={handleDelete}
          loading={deleteLoading}
          title="Delete Job"
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
