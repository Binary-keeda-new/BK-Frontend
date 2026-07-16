'use client'

import QuestionForm, { NewQuestion } from './QuestionForm'

type Question = {
  _id: string
  question: string
  options: string[]
  correctOptions: string[]
  positiveMarks: number
  negativeMarks: number
}

type Props = {
  isOpen: boolean
  editingQuestion: Question | null
  editQ: NewQuestion
  setEditQ: React.Dispatch<React.SetStateAction<NewQuestion>>
  editLoading: boolean
  onClose: () => void
  onSubmit: () => void
}

export default function EditQuestionModal({
  isOpen,
  editingQuestion,
  editQ,
  setEditQ,
  editLoading,
  onClose,
  onSubmit,
}: Props) {
  if (!isOpen || !editingQuestion) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 pt-16 sm:pt-20">
      <div className="flex w-full max-w-2xl flex-col max-h-[85vh] rounded-3xl bg-[rgb(19,20,27)] shadow-2xl">
        <div className="flex-none p-6 pb-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Edit Question</h3>
          <button
            onClick={onClose}
            className="text-white/30 transition hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <QuestionForm
            draft={editQ}
            setDraft={setEditQ}
          />
        </div>

        <div className="flex-none p-6 pt-4 border-t border-white/10 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={editLoading}
            className="rounded-xl bg-[rgb(241,90,34)] px-6 py-2 text-sm font-semibold transition disabled:opacity-50"
          >
            {editLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}