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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-2xl rounded-3xl bg-[rgb(19,20,27)] p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Edit Question</h3>
          <button
            onClick={onClose}
            className="text-white/30 transition hover:text-white"
          >
            ✕
          </button>
        </div>

        <QuestionForm
          draft={editQ}
          setDraft={setEditQ}
          onSubmit={onSubmit}
          loading={editLoading}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  )
}