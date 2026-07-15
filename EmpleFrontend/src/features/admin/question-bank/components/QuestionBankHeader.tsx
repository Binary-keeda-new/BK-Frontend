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
    <div className="mb-8 flex items-center justify-between">
      <div>
        <button
          onClick={onBack}
          className="mb-3 rounded-xl border border-white/10 bg-[rgb(19,20,27)] px-4 py-2 text-sm font-medium text-white transition hover:border-[rgb(241,90,34)] hover:text-[rgb(241,90,34)]"
        >
          Back
        </button>

        <h1 className="text-3xl font-bold">{title}</h1>
      </div>

      <div className="rounded-xl border border-white/10 bg-[rgb(19,20,27)] px-5 py-3 text-right">
        <p className="text-2xl font-bold text-[rgb(241,90,34)]">
          {questionCount}
        </p>
        <p className="text-xs uppercase tracking-wide text-white/50">
          {questionCount === 1 ? 'Question' : 'Questions'}
        </p>
      </div>
    </div>
  )
}