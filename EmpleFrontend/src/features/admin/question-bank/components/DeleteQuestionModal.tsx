'use client'

type Props = {
  isOpen: boolean
  loading?: boolean
  questionText?: string
  onClose: () => void
  onConfirm: () => void
}

export default function DeleteQuestionModal({
  isOpen,
  loading = false,
  questionText = '',
  onClose,
  onConfirm,
}: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md rounded-3xl bg-[rgb(19,20,27)] p-6 shadow-2xl">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-white">Delete Question</h3>
          <p className="mt-2 text-sm leading-6 text-white/60">
            Are you sure you want to delete this question? This action cannot be undone.
          </p>
        </div>

        {questionText && (
          <div className="mb-5 rounded-2xl bg-[rgb(10,11,14)] p-4 ring-1 ring-white/10">
            <p className="line-clamp-3 text-sm text-white/75">{questionText}</p>
          </div>
        )}

        <div className="flex justify-end gap-3">
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