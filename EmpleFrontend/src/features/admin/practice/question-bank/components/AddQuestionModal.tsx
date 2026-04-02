'use client'

import QuestionForm, { NewQuestion } from './QuestionForm'

type Props = {
  isOpen: boolean
  addMode: 'manual' | 'aiken' | 'json' | 'excel'
  setAddMode: React.Dispatch<
    React.SetStateAction<'manual' | 'aiken' | 'json' | 'excel'>
  >
  newQ: NewQuestion
  setNewQ: React.Dispatch<React.SetStateAction<NewQuestion>>
  addLoading: boolean
  fileError: string
  fileInputRef: React.RefObject<HTMLInputElement | null>
  onClose: () => void
  onAddQuestion: () => void
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  setFileError: (value: string) => void
}

export default function AddQuestionModal({
  isOpen,
  addMode,
  setAddMode,
  newQ,
  setNewQ,
  addLoading,
  fileError,
  fileInputRef,
  onClose,
  onAddQuestion,
  onFileUpload,
  setFileError,
}: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-2xl rounded-3xl bg-[rgb(19,20,27)] p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Add Question</h3>
          <button
            onClick={onClose}
            className="text-white/30 transition hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="mb-5 grid grid-cols-4 gap-2">
          {(['manual', 'aiken', 'json', 'excel'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setAddMode(mode)
                setFileError('')
              }}
              className={`rounded-xl py-2 text-xs font-medium capitalize transition ${
                addMode === mode
                  ? 'bg-[rgb(241,90,34)] text-white'
                  : 'bg-[rgb(10,11,14)] text-white/50 hover:text-white'
              }`}
            >
              {mode === 'manual' ? 'Manual' : `Upload ${mode.toUpperCase()}`}
            </button>
          ))}
        </div>

        {addMode === 'manual' ? (
          <QuestionForm
            draft={newQ}
            setDraft={setNewQ}
            onSubmit={onAddQuestion}
            loading={addLoading}
            submitLabel="Add Question"
          />
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-white/50">
              {addMode === 'aiken' &&
                'Upload an AIKEN-format .txt file. Each question block separated by a blank line.'}
              {addMode === 'json' &&
                'Upload a JSON file: an array of { question, options, correctOptions, positiveMarks, negativeMarks }.'}
              {addMode === 'excel' &&
                'Upload an .xlsx file with columns: question, option_a…option_d, correct_option, positive_marks, negative_marks.'}
            </p>

            <label className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-dashed border-white/20 p-8 text-center transition hover:border-[rgb(241,90,34)]">
              <span className="text-2xl">📂</span>
              <span className="text-sm text-white/60">Click to select file</span>
              <span className="text-xs text-white/30">
                {addMode === 'aiken' && '.txt'}
                {addMode === 'json' && '.json'}
                {addMode === 'excel' && '.xlsx, .xls'}
              </span>

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept={
                  addMode === 'aiken'
                    ? '.txt'
                    : addMode === 'json'
                    ? '.json'
                    : '.xlsx,.xls'
                }
                onChange={onFileUpload}
                disabled={addLoading}
              />
            </label>

            {fileError && <p className="text-sm text-red-400">{fileError}</p>}

            {addLoading && (
              <p className="text-center text-sm text-white/50">
                Uploading questions…
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}