'use client'

type Props = {
  isOpen: boolean
  title?: string
  description?: string
  loading?: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function DeleteConfirmationModal({
  isOpen,
  title = 'Delete Question Bank',
  description = 'Are you sure you want to delete this question bank? This action cannot be undone.',
  loading = false,
  onClose,
  onConfirm,
}: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md rounded-3xl bg-[rgb(19,20,27)] p-6 ring-1 ring-white/10">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-white/60">{description}</p>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-2xl bg-gray-700 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-2xl bg-red-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}