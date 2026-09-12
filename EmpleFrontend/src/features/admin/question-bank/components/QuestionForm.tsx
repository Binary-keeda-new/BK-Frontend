'use client'

import OptionRow from './OptionRow'
import { QUIZ_CATEGORIES } from '@/shared/constants/quizCategories'

export type NewQuestion = {
  question: string
  options: string[]
  correctOptions: string[]
  positiveMarks: number
  negativeMarks: number
  questionType: 'MCQ' | 'MSQ' | 'NAT'
  imageUrl?: string | null
  imageFile?: File | null
  solution?: string
  solutionMedia?: string | null
  category: string
  subcategory: string
  topic: string
  subTopic?: string
  exam?: string
  year?: number | null
}

type Props = {
  draft: NewQuestion
  setDraft: React.Dispatch<React.SetStateAction<NewQuestion>>
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

      <div className="space-y-3 rounded-xl ring-1 ring-white/10 p-4 bg-white/5">
        <h3 className="text-sm font-semibold text-white">Metadata & Solution</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs text-white/50">Category *</label>
            <select
              value={draft.category}
              onChange={(e) => setDraft((prev) => ({ ...prev, category: e.target.value, subcategory: '', topic: '' }))}
              className="w-full rounded-xl bg-[rgb(10,11,14)] px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-[rgb(241,90,34)]"
            >
              <option value="">Select Category</option>
              {Object.keys(QUIZ_CATEGORIES).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-white/50">Subcategory *</label>
            <select
              value={draft.subcategory}
              onChange={(e) => setDraft((prev) => ({ ...prev, subcategory: e.target.value, topic: '' }))}
              disabled={!draft.category}
              className="w-full rounded-xl bg-[rgb(10,11,14)] px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-[rgb(241,90,34)] disabled:opacity-50"
            >
              <option value="">Select Subcategory</option>
              {draft.category && QUIZ_CATEGORIES[draft.category as keyof typeof QUIZ_CATEGORIES] && Object.keys(QUIZ_CATEGORIES[draft.category as keyof typeof QUIZ_CATEGORIES]).map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-white/50">Topic *</label>
            {draft.category && draft.subcategory && (QUIZ_CATEGORIES[draft.category as keyof typeof QUIZ_CATEGORIES] as any)?.[draft.subcategory]?.length > 0 ? (
              <select
                value={draft.topic}
                onChange={(e) => setDraft((prev) => ({ ...prev, topic: e.target.value }))}
                className="w-full rounded-xl bg-[rgb(10,11,14)] px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-[rgb(241,90,34)]"
              >
                <option value="">Select Topic</option>
                {(QUIZ_CATEGORIES[draft.category as keyof typeof QUIZ_CATEGORIES] as any)[draft.subcategory].map((top: string) => (
                  <option key={top} value={top}>{top}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={draft.topic}
                onChange={(e) => setDraft((prev) => ({ ...prev, topic: e.target.value }))}
                placeholder="E.g., Algorithms"
                className="w-full rounded-xl bg-[rgb(10,11,14)] px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-[rgb(241,90,34)]"
              />
            )}
          </div>
          <div>
            <label className="mb-1 block text-xs text-white/50">SubTopic</label>
            <input
              type="text"
              value={draft.subTopic ?? ''}
              onChange={(e) => setDraft((prev) => ({ ...prev, subTopic: e.target.value }))}
              placeholder="E.g., Trees"
              className="w-full rounded-xl bg-[rgb(10,11,14)] px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-[rgb(241,90,34)]"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-white/50">Exam</label>
            <input
              type="text"
              value={draft.exam ?? ''}
              onChange={(e) => setDraft((prev) => ({ ...prev, exam: e.target.value }))}
              placeholder="E.g., GATE 2023"
              className="w-full rounded-xl bg-[rgb(10,11,14)] px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-[rgb(241,90,34)]"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-white/50">Year</label>
            <input
              type="number"
              value={draft.year ?? ''}
              onChange={(e) => setDraft((prev) => ({ ...prev, year: e.target.value ? parseInt(e.target.value) : null }))}
              placeholder="E.g., 2023"
              className="w-full rounded-xl bg-[rgb(10,11,14)] px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-[rgb(241,90,34)]"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs text-white/50">Solution Explanation</label>
          <textarea
            value={draft.solution ?? ''}
            onChange={(e) => setDraft((prev) => ({ ...prev, solution: e.target.value }))}
            placeholder="Explain the correct answer..."
            rows={6}
            className="w-full resize-y rounded-xl bg-[rgb(10,11,14)] px-3 py-2 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-[rgb(241,90,34)] leading-relaxed whitespace-pre-wrap break-words"
          />
        </div>
      </div>

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

    </div>
  )
}