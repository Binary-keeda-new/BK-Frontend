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
  parsedQuestions: NewQuestion[]
  selectedFileName: string
  clearUploadState: () => void
 onImportParsedQuestions: () => void
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
  parsedQuestions,
  selectedFileName,
  clearUploadState,
  onImportParsedQuestions,
}: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 pt-16 sm:pt-20">
      <div className="flex w-full max-w-2xl flex-col max-h-[85vh] rounded-3xl bg-[rgb(19,20,27)] shadow-2xl">
        <div className="flex-none p-6 pb-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Add Question</h3>
          <button
            onClick={onClose}
            className="text-white/30 transition hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">

        <div className="mb-5 grid grid-cols-4 gap-2">
          {(['manual', 'aiken', 'json', 'excel'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setAddMode(mode)
                setFileError('')
                clearUploadState()
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

            {selectedFileName && !fileError && !addLoading && (
              <div className="rounded-2xl bg-[rgb(10,11,14)] p-4 ring-1 ring-white/10">
                <p className="text-sm font-medium text-white">
                  File selected:{' '}
                  <span className="text-white/70">{selectedFileName}</span>
                </p>
                <p className="mt-1 text-sm text-emerald-400">
                  {parsedQuestions.length} question
                  {parsedQuestions.length !== 1 ? 's' : ''} detected
                </p>
              </div>
            )}

            {parsedQuestions.length > 0 && !fileError && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-white">
                    Question Preview
                  </h4>
                  
                  <span className="text-xs text-white/40">
                    Showing first {Math.min(parsedQuestions.length, 3)} of{' '}
                    {parsedQuestions.length}
                  </span>
                </div>
                
                <div className="space-y-3">
                  {parsedQuestions.slice(0, 3).map((q, index) => (
                    <div
                      key={index}
                      className="rounded-2xl bg-[rgb(10,11,14)] p-4 ring-1 ring-white/10"
                    >
                      <p className="text-sm font-medium text-white">
                        {index + 1}. {q.question}
                      </p>

                      <ul className="mt-3 space-y-1">
                        {q.options.map((option, i) => (
                          <li key={i} className="text-sm text-white/60">
                            {String.fromCharCode(65 + i)}. {option}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
        </div>

        <div className="flex-none p-6 pt-4 border-t border-white/10 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition"
          >
            Cancel
          </button>
          
          {addMode === 'manual' ? (
            <button
              onClick={onAddQuestion}
              disabled={addLoading}
              className="rounded-xl bg-[rgb(241,90,34)] px-6 py-2 text-sm font-semibold transition disabled:opacity-50"
            >
              {addLoading ? 'Saving...' : 'Add Question'}
            </button>
          ) : (
            parsedQuestions.length > 0 && !fileError && (
              <button
                onClick={onImportParsedQuestions}
                disabled={addLoading}
                className="rounded-xl bg-[rgb(241,90,34)] px-6 py-2 text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addLoading
                  ? 'Importing...'
                  : `Import ${parsedQuestions.length} Question${
                      parsedQuestions.length !== 1 ? 's' : ''
                    }`}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  )
}