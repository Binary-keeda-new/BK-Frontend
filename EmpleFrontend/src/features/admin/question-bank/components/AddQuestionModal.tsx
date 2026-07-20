'use client'

import QuestionForm, { NewQuestion } from './QuestionForm'
import * as XLSX from 'xlsx'
import { Download } from 'lucide-react'

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

  const downloadSample = (type: "excel" | "json" | "aiken") => {
    if (type === "aiken") {
      const text = `CATEGORY: Core CS\nSUBCATEGORY: Data Structures\nTOPIC: Array\nSUBTOPIC: Searching\nEXAM: GATE\nYEAR: 2024\nIMAGE: https://example.com/image.png\nSOLUTION: Binary search is O(log n).\nSOLUTION_MEDIA: https://example.com/video.mp4\nTYPE: MCQ\nWhat is the time complexity of binary search?\nA) O(1)\nB) O(n)\nC) O(log n)\nD) O(n log n)\nANSWER: C\nPOSITIVE: 4\nNEGATIVE: 1\n\nTYPE: MSQ\nWhich of the following are prime numbers?\nA. 2\nB. 4\nC. 5\nD. 9\nANSWER: A, C\nPOSITIVE: 4\nNEGATIVE: 1\n\nTYPE: NAT\nWhat is 5 + 7?\nANSWER: 12\nPOSITIVE: 4\nNEGATIVE: 1`;
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sample_questions.txt";
      a.click();
      URL.revokeObjectURL(url);
    } else if (type === "json") {
      const json = [
        {
          type: "MCQ",
          question: "What is the capital of France?",
          options: ["London", "Paris", "Berlin", "Madrid"],
          answer: "Paris",
          positiveMarks: 4,
          negativeMarks: 1,
          imageUrl: "https://example.com/image.png",
          solution: "Paris is the capital of France.",
          solutionMedia: "https://example.com/video.mp4",
          category: "Geography",
          subcategory: "Europe",
          topic: "Capitals",
          subTopic: "France",
          exam: "General Knowledge",
          year: 2024
        },
        {
          type: "MSQ",
          question: "Which of the following are prime numbers?",
          options: ["2", "4", "5", "9"],
          correctOptions: ["2", "5"],
          positiveMarks: 4,
          negativeMarks: 1
        },
        {
          type: "NAT",
          question: "What is 5 + 7?",
          options: [],
          answer: "12",
          positiveMarks: 4,
          negativeMarks: 1
        }
      ];
      const blob = new Blob([JSON.stringify(json, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sample_questions.json";
      a.click();
      URL.revokeObjectURL(url);
    } else if (type === "excel") {
      const data = [
        { type: "MCQ", question: "What is the capital of France?", A: "London", B: "Paris", C: "Berlin", D: "Madrid", answer: "Paris", positiveMarks: 4, negativeMarks: 1, imageUrl: "https://example.com/image.png", solution: "Paris is the capital of France.", solutionMedia: "https://example.com/video.mp4", category: "Geography", subcategory: "Europe", topic: "Capitals", subTopic: "France", exam: "General Knowledge", year: 2024 },
        { type: "MSQ", question: "Which of the following are prime numbers?", A: "2", B: "4", C: "5", D: "9", answer: "2,5", positiveMarks: 4, negativeMarks: 1 },
        { type: "NAT", question: "What is 5 + 7?", A: "", B: "", C: "", D: "", answer: "12", positiveMarks: 4, negativeMarks: 1 }
      ];
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Questions");
      XLSX.writeFile(wb, "sample_questions.xlsx");
    }
  };

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
          />
        ) : (
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <p className="text-sm text-white/50">
                {addMode === 'aiken' &&
                  'Upload an AIKEN-format .txt file. Each question block separated by a blank line.'}
                {addMode === 'json' &&
                  'Upload a JSON file: an array of { question, options, correctOptions, positiveMarks, negativeMarks }.'}
                {addMode === 'excel' &&
                  'Upload an .xlsx file with columns: question, option_a…option_d, correct_option, positive_marks, negative_marks.'}
              </p>
              <button
                type="button"
                onClick={() => downloadSample(addMode as "excel" | "json" | "aiken")}
                className="flex items-center gap-1.5 rounded-lg border border-[rgb(241,90,34)] px-3 py-1.5 text-[11px] font-bold text-[rgb(241,90,34)] transition-all hover:bg-[rgb(241,90,34)] hover:text-white whitespace-nowrap ml-2 flex-shrink-0"
              >
                <Download size={13} strokeWidth={2.5} />
                Download Sample
              </button>
            </div>

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