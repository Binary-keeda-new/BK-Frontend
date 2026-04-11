'use client'

type Question = {
  _id: string
  question: string
  options: string[]
  correctOptions: string[]
  positiveMarks: number
  negativeMarks: number
}

type Props = {
  questionItem: Question
  index: number
  deleting: boolean
  onEdit: () => void
  onDelete: () => void
}

export default function QuestionCard({
  questionItem,
  index,
  deleting,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="rounded-2xl bg-[rgb(10,11,14)] p-4 ring-1 ring-white/10">
      <div className="mb-2 flex items-start justify-between gap-2">
        <p className="text-sm text-[rgb(241,90,34)]">Q{index + 1}</p>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="rounded-lg bg-white/5 px-3 py-1 text-xs text-white/60 transition hover:bg-white/10"
          >
            Edit
          </button>

          <button
            onClick={onDelete}
            disabled={deleting}
            className="rounded-lg bg-red-500/10 px-3 py-1 text-xs text-red-400 transition hover:bg-red-500/20 disabled:opacity-40"
          >
            {deleting ? '…' : 'Delete'}
          </button>
        </div>
      </div>

      <p className="mb-3 text-sm">{questionItem.question}</p>

      <div className="grid gap-2">
  {questionItem.options.map((option, optionIndex) => {
    const isCorrect = questionItem.correctOptions.includes(option)

    return (
      <div
        key={`${questionItem._id}-${optionIndex}-${option}`}
        className={`rounded-xl px-3 py-2 text-sm ${
          isCorrect
            ? 'bg-green-500/20 text-green-300'
            : 'bg-white/5 text-white/70'
        }`}
      >
        {isCorrect && <span className="mr-1 text-green-400">✓</span>}
        {option}
      </div>
    )
  })}
</div>

      <div className="mt-3 flex gap-4 text-xs text-white/40">
        <span className="text-green-400">
          +{questionItem.positiveMarks} marks
        </span>
        <span className="text-red-400">
          -{questionItem.negativeMarks} marks
        </span>
      </div>
    </div>
  )
}