'use client'

type Question = {
  _id: string
  question: string
  options: string[]
  correctOptions: string[]
  positiveMarks: number
  negativeMarks: number
  questionType?: 'MCQ' | 'MSQ' | 'NAT'
  imageUrl?: string | null
}

type Props = {
  questions: Question[]
  loading: boolean
  deletingId: string | null
  onAddFirst: () => void
  onEdit: (question: Question) => void
  onDelete: (questionId: string, questionText: string) => void
}

export default function QuestionList({
  questions,
  loading,
  deletingId,
  onAddFirst,
  onEdit,
  onDelete,
}: Props) {
  if (loading) {
    return (
      <div className="rounded-3xl bg-[rgb(19,20,27)] p-10 text-center text-white/50">
        Loading questions...
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="rounded-3xl bg-[rgb(19,20,27)] p-10 text-center">
        <p className="text-white/50">No questions added yet.</p>
        <button
          onClick={onAddFirst}
          className="mt-4 rounded-2xl bg-[rgb(241,90,34)] px-5 py-2 text-sm font-medium text-white"
        >
          Add First Question
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <div
          key={question._id}
          className="rounded-3xl bg-[rgb(19,20,27)] p-5 shadow-lg"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-white">
                Q{index + 1}. {question.question}
              </h3>
              {question.imageUrl && (
  <div className="mt-3 overflow-hidden rounded-xl ring-1 ring-white/10">
    <img
      src={question.imageUrl}
      alt="Question"
      className="max-h-64 w-full object-contain bg-[rgb(10,11,14)]"
      onError={(e) => {
        e.currentTarget.style.display = 'none'
      }}
    />
  </div>
)}

              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-white/5 px-2 py-1 text-white/50">
                  Type: {question.questionType ?? 'MCQ'}
                </span>
                <span className="rounded-full bg-white/5 px-2 py-1 text-white/50">
                  +{question.positiveMarks}
                </span>
                <span className="rounded-full bg-white/5 px-2 py-1 text-white/50">
                  -{question.negativeMarks}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(question)}
                className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/5"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(question._id, question.question)}
                disabled={deletingId === question._id}
                className="rounded-xl border border-red-900/50 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deletingId === question._id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>

          {question.questionType !== 'NAT' && question.options.length > 0 && (
            <ul className="mt-4 space-y-2">
              {question.options.map((option, i) => {
                const isCorrect = question.correctOptions.includes(option)

                return (
                  <li
                    key={i}
                    className={`rounded-2xl px-4 py-3 text-sm ${
                      isCorrect
                        ? 'bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/20'
                        : 'bg-[rgb(10,11,14)] text-white/70 ring-1 ring-white/10'
                    }`}
                  >
                    {String.fromCharCode(65 + i)}. {option}
                  </li>
                )
              })}
            </ul>
          )}

          {question.questionType === 'NAT' && (
            <div className="mt-4 rounded-2xl bg-[rgb(10,11,14)] px-4 py-3 text-sm text-white/70 ring-1 ring-white/10">
              Correct answer: {question.correctOptions[0]}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}