'use client'

import OptionRow from './OptionRow'

export type NewQuestion = {
  question: string
  options: string[]
  correctOptions: string[]
  positiveMarks: number
  negativeMarks: number
  questionType: 'MCQ' | 'MSQ' | 'NAT'
  imageUrl?: string | null
  imageFile?: File | null
}

type Props = {
  draft: NewQuestion
  setDraft: React.Dispatch<React.SetStateAction<NewQuestion>>
  onSubmit: () => void
  loading: boolean
  submitLabel: string
}

function makeOptionHandlers(
  draft: NewQuestion,
  setDraft: React.Dispatch<React.SetStateAction<NewQuestion>>
) {
  const updateOption = (i: number, val: string) => {
    const old = draft.options[i]
    const opts = draft.options.map((o, idx) => (idx === i ? val : o))
    const correct = draft.correctOptions.map((c) => (c === old ? val : c))

    setDraft((prev) => ({
      ...prev,
      options: opts,
      correctOptions: correct,
    }))
  }

  const toggleCorrect = (i: number) => {
    const opt = draft.options[i]
    if (!opt.trim()) return

    setDraft((prev) => {
      if (prev.questionType === 'MCQ') {
        return {
          ...prev,
          correctOptions: [opt],
        }
      }

      return {
        ...prev,
        correctOptions: prev.correctOptions.includes(opt)
          ? prev.correctOptions.filter((c) => c !== opt)
          : [...prev.correctOptions, opt],
      }
    })
  }

  const addOption = () => {
    setDraft((prev) => ({
      ...prev,
      options: [...prev.options, ''],
    }))
  }

  const removeOption = (i: number) => {
    const removed = draft.options[i]

    setDraft((prev) => ({
      ...prev,
      options: prev.options.filter((_, idx) => idx !== i),
      correctOptions: prev.correctOptions.filter((c) => c !== removed),
    }))
  }

  return { updateOption, toggleCorrect, addOption, removeOption }
}

export default function QuestionForm({
  draft,
  setDraft,
  onSubmit,
  loading,
  submitLabel,
}: Props) {
  const { updateOption, toggleCorrect, addOption, removeOption } =
    makeOptionHandlers(draft, setDraft)

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-xs text-white/50">Question *</label>
        <textarea
          value={draft.question}
          onChange={(e) =>
            setDraft((prev) => ({ ...prev, question: e.target.value }))
          }
          placeholder="Enter question text..."
          rows={3}
          className="w-full resize-none rounded-xl bg-[rgb(10,11,14)] px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-[rgb(241,90,34)]"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs text-white/50">Question Type</label>
        <select
          value={draft.questionType}
          onChange={(e) => {
            const value = e.target.value as 'MCQ' | 'MSQ' | 'NAT'

            setDraft((prev) => ({
              ...prev,
              questionType: value,
              options:
                value === 'NAT'
                  ? []
                  : prev.options.length
                  ? prev.options
                  : ['', '', '', ''],
              correctOptions: [],
            }))
          }}
          className="w-full rounded-xl bg-[rgb(10,11,14)] px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-[rgb(241,90,34)]"
        >
          <option value="MCQ">MCQ</option>
          <option value="MSQ">MSQ</option>
          <option value="NAT">NAT</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="mb-1 block text-xs text-white/50">Image</label>

        <input
          type="text"
          value={draft.imageUrl ?? ''}
          onChange={(e) =>
            setDraft((prev) => ({
              ...prev,
              imageUrl: e.target.value,
              imageFile: null,
            }))
          }
          placeholder="Paste image URL"
          className="w-full rounded-xl bg-[rgb(10,11,14)] px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-[rgb(241,90,34)]"
        />

        <div className="text-center text-xs text-white/30">OR</div>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (!file) return

            const previewUrl = URL.createObjectURL(file)

            setDraft((prev) => ({
              ...prev,
              imageFile: file,
              imageUrl: previewUrl,
            }))
          }}
          className="w-full text-xs text-white/60"
        />

        {draft.imageUrl && (
          <div className="mt-2 overflow-hidden rounded-xl ring-1 ring-white/10">
            <img
              src={draft.imageUrl}
              alt="Preview"
              className="max-h-48 w-full object-contain bg-[rgb(10,11,14)]"
            />
          </div>
        )}
      </div>

      {draft.questionType !== 'NAT' && (
        <div>
          <label className="mb-1 block text-xs text-white/50">
            Options * — click letter to mark correct
          </label>

          <div className="space-y-2">
            {draft.options.map((opt, i) => (
              <OptionRow
                key={i}
                index={i}
                value={opt}
                isCorrect={draft.correctOptions.includes(opt) && opt.trim() !== ''}
                onChange={(val) => updateOption(i, val)}
                onToggleCorrect={() => toggleCorrect(i)}
                onRemove={() => removeOption(i)}
                canRemove={draft.options.length > 2}
              />
            ))}
          </div>

          {draft.options.length < 6 && (
            <button
              type="button"
              onClick={addOption}
              className="mt-2 text-xs text-[rgb(241,90,34)] hover:underline"
            >
              + Add option
            </button>
          )}
        </div>
      )}

      {draft.questionType === 'NAT' && (
        <div>
          <label className="mb-1 block text-xs text-white/50">Answer *</label>
          <input
            type="text"
            value={draft.correctOptions[0] ?? ''}
            onChange={(e) =>
              setDraft((prev) => ({
                ...prev,
                correctOptions: [e.target.value],
              }))
            }
            placeholder="Enter correct answer"
            className="w-full rounded-xl bg-[rgb(10,11,14)] px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-[rgb(241,90,34)]"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs text-white/50">
            Positive marks
          </label>
          <input
            type="number"
            min={0}
            value={draft.positiveMarks}
            onChange={(e) =>
              setDraft((prev) => ({
                ...prev,
                positiveMarks: parseFloat(e.target.value) || 0,
              }))
            }
            className="w-full rounded-xl bg-[rgb(10,11,14)] px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-[rgb(241,90,34)]"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-white/50">
            Negative marks
          </label>
          <input
            type="number"
            min={0}
            value={draft.negativeMarks}
            onChange={(e) =>
              setDraft((prev) => ({
                ...prev,
                negativeMarks: parseFloat(e.target.value) || 0,
              }))
            }
            className="w-full rounded-xl bg-[rgb(10,11,14)] px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-[rgb(241,90,34)]"
          />
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={loading}
        className="w-full rounded-2xl bg-[rgb(241,90,34)] py-3 text-sm font-semibold transition disabled:opacity-50"
      >
        {loading ? 'Saving…' : submitLabel}
      </button>
    </div>
  )
}