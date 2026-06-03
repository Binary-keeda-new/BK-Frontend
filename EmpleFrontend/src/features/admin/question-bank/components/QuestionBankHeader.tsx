'use client'

type Props = {
  title: string
  questionCount: number
  onBack: () => void
}

export default function QuestionBankHeader({
  title,
  questionCount,
  onBack,
}: Props) {
  return (
    <div className="mb-8 flex items-start justify-between">
      <div>
        <button
          onClick={onBack}
          className="mb-3 text-sm text-white/40 transition hover:text-white/70"
        >
          ← Back
        </button>

        <p className="mb-2 inline-block rounded-full bg-[rgb(19,20,27)] px-4 py-1 text-sm text-[rgb(241,90,34)]">
          Question Bank Editor
        </p>

        <h1 className="text-3xl font-bold">{title}</h1>
      </div>

      <span className="text-sm text-white/30">
        {questionCount} question{questionCount !== 1 ? 's' : ''}
      </span>
    </div>
  )
}