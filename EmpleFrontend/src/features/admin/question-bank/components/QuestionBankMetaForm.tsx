'use client'

type Props = {
  title: string
  description: string
  updatedAt?: string
  saving: boolean
  onTitleChange: (value: string) => void
  onDescriptionChange: (value: string) => void
  onAddQuestion: () => void
  onSave: () => void
}

export default function QuestionBankMetaForm({
  title,
  description,
  updatedAt,
  saving,
  onTitleChange,
  onDescriptionChange,
  onAddQuestion,
  onSave,
}: Props) {
  return (
    <div className="mb-6 rounded-3xl bg-[rgb(19,20,27)] p-6 ring-1 ring-white/10">
      <div className="grid gap-4">
        <div>
          <label className="mb-2 block text-sm text-white/70">
            Question Bank Name *
          </label>
          <input
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="w-full rounded-2xl bg-[rgb(10,11,14)] px-4 py-3 ring-1 ring-white/10 focus:outline-none focus:ring-[rgb(241,90,34)]"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-white/70">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            rows={3}
            className="w-full resize-none rounded-2xl bg-[rgb(10,11,14)] px-4 py-3 ring-1 ring-white/10 focus:outline-none focus:ring-[rgb(241,90,34)]"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-white/30">
            {updatedAt &&
              `Last updated: ${new Date(updatedAt).toLocaleDateString()}`}
          </span>

          <div className="flex gap-3">
            <button
              onClick={onAddQuestion}
              className="rounded-2xl border border-[rgb(241,90,34)] px-5 py-2 text-sm text-[rgb(241,90,34)] transition hover:bg-[rgb(241,90,34)] hover:text-white"
            >
              + Add Question
            </button>

            <button
              onClick={onSave}
              disabled={saving}
              className="rounded-2xl bg-[rgb(241,90,34)] px-5 py-2 text-sm transition disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}