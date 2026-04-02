'use client'

import QuestionCard from './QuestionCard'

type Question = {
  _id: string
  question: string
  options: string[]
  correctOptions: string[]
  positiveMarks: number
  negativeMarks: number
}

type Props = {
  questions: Question[]
  loading: boolean
  deletingId: string | null
  onAddFirst: () => void
  onEdit: (question: Question) => void
  onDelete: (id: string) => void
}

export default function QuestionList({
  questions,
  loading,
  deletingId,
  onAddFirst,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="rounded-3xl bg-[rgb(19,20,27)] p-6 ring-1 ring-white/10">
      <h2 className="mb-4 text-xl font-semibold">Questions</h2>

      {loading ? (
        <p className="text-sm text-white/40">Loading questions…</p>
      ) : questions.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <p className="text-white/40">No questions yet.</p>
          <button
            onClick={onAddFirst}
            className="rounded-2xl bg-[rgb(241,90,34)] px-5 py-2 text-sm"
          >
            + Add First Question
          </button>
        </div>
      ) : (
        <div className="max-h-[600px] space-y-4 overflow-y-auto pr-1">
          {questions.map((item, i) => (
  <QuestionCard
    key={item._id}
    questionItem={item}
    index={i}
    deleting={deletingId === item._id}
    onEdit={() => onEdit(item)}
    onDelete={() => onDelete(item._id)}
  />
))}
        </div>
      )}
    </div>
  )
}