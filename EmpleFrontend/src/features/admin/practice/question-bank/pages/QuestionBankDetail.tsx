'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import AddQuestionModal from '../components/AddQuestionModal'
import EditQuestionModal from '../components/EditQuestionModal'
import QuestionBankHeader from '../components/QuestionBankHeader'
import QuestionBankMetaForm from '../components/QuestionBankMetaForm'
import QuestionList from '../components/QuestionList'
import ToastContainer from '../components/ToastContainer'
import type { NewQuestion } from '../components/QuestionForm'

type QuestionBank = {
  _id: string
  title: string
  description: string
  createdAt?: string
  updatedAt?: string
}

type Question = {
  _id: string
  question: string
  options: string[]
  correctOptions: string[]
  positiveMarks: number
  negativeMarks: number
  questionType?: 'MCQ' | 'MSQ' | 'IMAGE'
}

type SingleQuestionBankResponse = {
  success: boolean
  message: string
  data: QuestionBank
}

type QuestionsResponse = {
  success: boolean
  message: string
  data: Question[]
}

type Toast = { id: number; message: string; type: 'success' | 'error' }

const API_BASE = 'http://localhost:5000/api/v1/admin'

const EMPTY_QUESTION: NewQuestion = {
  question: '',
  options: ['', '', '', ''],
  correctOptions: [],
  positiveMarks: 4,
  negativeMarks: 1,
  questionType: 'MCQ',
}

function parseAiken(text: string): NewQuestion[] {
  const blocks = text.trim().split(/\n{2,}/)
  const questions: NewQuestion[] = []

  for (const block of blocks) {
    const lines = block.trim().split('\n').filter(Boolean)
    if (lines.length < 3) continue

    const questionLine = lines[0]
    const optionLines = lines.slice(1).filter((l) => /^[A-Z]\.\s/.test(l))
    const answerLine = lines.find((l) => l.toUpperCase().startsWith('ANSWER:'))

    if (!answerLine) continue

    const answerKey = answerLine.replace(/ANSWER:\s*/i, '').trim()
    const options = optionLines.map((l) => l.replace(/^[A-Z]\.\s/, '').trim())
    const correctOption = optionLines
      .find((l) => l.startsWith(answerKey + '.'))
      ?.replace(/^[A-Z]\.\s/, '')
      .trim()

    if (!correctOption) continue

    questions.push({
      question: questionLine.trim(),
      options,
      correctOptions: [correctOption],
      positiveMarks: 4,
      negativeMarks: 1,
      questionType: 'MCQ',
    })
  }

  return questions
}

function parseJSON(text: string): NewQuestion[] {
  try {
    const parsed = JSON.parse(text)
    const arr = Array.isArray(parsed) ? parsed : [parsed]

    return arr.map((q: Partial<NewQuestion>) => ({
      question: q.question ?? '',
      options: q.options ?? [],
      correctOptions: q.correctOptions ?? [],
      positiveMarks: q.positiveMarks ?? 4,
      negativeMarks: q.negativeMarks ?? 1,
      questionType:
        q.questionType ??
        ((q.correctOptions?.length ?? 0) > 1 ? 'MSQ' : 'MCQ'),
    }))
  } catch {
    return []
  }
}

export default function QuestionBankDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [questionBank, setQuestionBank] = useState<QuestionBank | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [bankLoading, setBankLoading] = useState(true)
  const [bankSaving, setBankSaving] = useState(false)

  const [questions, setQuestions] = useState<Question[]>([])
  const [questionsLoading, setQuestionsLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)

  const [isAddOpen, setIsAddOpen] = useState(false)
  const [newQ, setNewQ] = useState<NewQuestion>(EMPTY_QUESTION)
  const [addMode, setAddMode] = useState<'manual' | 'aiken' | 'json' | 'excel'>(
    'manual'
  )
  const [addLoading, setAddLoading] = useState(false)
  const [fileError, setFileError] = useState('')

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editQ, setEditQ] = useState<NewQuestion>(EMPTY_QUESTION)
  const [editLoading, setEditLoading] = useState(false)

  const [toasts, setToasts] = useState<Toast[]>([])
  const toastId = useRef(0)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [parsedQuestions, setParsedQuestions] = useState<NewQuestion[]>([])
const [selectedFileName, setSelectedFileName] = useState('')

  const addToast = (message: string, type: Toast['type'] = 'success') => {
    const id = ++toastId.current
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3500)
  }

  useEffect(() => {
    if (!id) return

    const fetchBank = async () => {
      try {
        const res = await fetch(`${API_BASE}/question-banks/${id}`)
        const result: SingleQuestionBankResponse = await res.json()

        if (!res.ok) throw new Error(result.message)

        setQuestionBank(result.data)
        setEditTitle(result.data.title)
        setEditDescription(result.data.description)
      } catch (err) {
        addToast(
          (err as Error).message || 'Failed to load question bank',
          'error'
        )
      } finally {
        setBankLoading(false)
      }
    }

    fetchBank()
  }, [id])

  const fetchQuestions = async () => {
    setQuestionsLoading(true)
    try {
      const res = await fetch(`${API_BASE}/question-banks/${id}/questions`)
      const result: QuestionsResponse = await res.json()

      if (!res.ok) throw new Error(result.message)

      setQuestions(result.data)
    } catch (err) {
      addToast(
        (err as Error).message || 'Failed to fetch questions',
        'error'
      )
    } finally {
      setQuestionsLoading(false)
    }
  }

  useEffect(() => {
    if (id) fetchQuestions()
  }, [id])

  const handleSaveBank = async () => {
    if (!editTitle.trim()) {
      addToast('Title cannot be empty', 'error')
      return
    }

    setBankSaving(true)
    try {
      const res = await fetch(`${API_BASE}/question-banks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
        }),
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.message)

      setQuestionBank((prev) =>
        prev ? { ...prev, title: editTitle, description: editDescription } : prev
      )
      addToast('Question bank saved successfully')
    } catch (err) {
      addToast((err as Error).message || 'Failed to save', 'error')
    } finally {
      setBankSaving(false)
    }
  }

  const validateQuestion = (q: NewQuestion): string | null => {
    if (!q.question.trim()) return 'Question text is required'

    const filledOptions = q.options.filter((o) => o.trim())
    if (filledOptions.length < 2) return 'At least 2 options are required'

    if (q.correctOptions.length === 0) return 'Select at least one correct option'

    const invalidCorrect = q.correctOptions.some((c) => !filledOptions.includes(c))
    if (invalidCorrect) return 'Correct option must match a filled option'

    if (q.positiveMarks < 0) return 'Positive marks must be ≥ 0'

    return null
  }

  const submitQuestions = async (questionsToAdd: NewQuestion[]) => {
    setAddLoading(true)
    try {
      const res = await fetch(`${API_BASE}/question-banks/${id}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questions: questionsToAdd }),
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.message)

      addToast(
        questionsToAdd.length > 1
          ? `${questionsToAdd.length} questions added`
          : 'Question added successfully'
      )

      closeAddModal()
      fetchQuestions()
    } catch (err) {
      addToast((err as Error).message || 'Failed to add question', 'error')
    } finally {
      setAddLoading(false)
    }
  }

  const handleAddQuestion = () => {
    const err = validateQuestion(newQ)
    if (err) {
      addToast(err, 'error')
      return
    }

    const clean: NewQuestion = {
      ...newQ,
      options: newQ.options.filter((o) => o.trim()),
      questionType: newQ.correctOptions.length > 1 ? 'MSQ' : 'MCQ',
    }

    submitQuestions([clean])
  }

 const clearUploadState = () => {
  setFileError('')
  setParsedQuestions([])
  setSelectedFileName('')
  if (fileInputRef.current) fileInputRef.current.value = ''
}
const handleImportParsedQuestions = async () => {
  if (parsedQuestions.length === 0) {
    addToast('No parsed questions to import', 'error')
    return
  }

  await submitQuestions(parsedQuestions)
}
   
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  setFileError('')
setParsedQuestions([])
setSelectedFileName('')

  const file = e.target.files?.[0]
  if (!file) return

  setSelectedFileName(file.name)

  try {
    const text = await file.text()
    let parsed: NewQuestion[] = []

    if (addMode === 'aiken') {
      parsed = parseAiken(text)
    } else if (addMode === 'json') {
      parsed = parseJSON(text)
    } else if (addMode === 'excel') {
      setFileError(
        'Excel parsing requires xlsx library. We can add that next.'
      )
      return
    }

    if (parsed.length === 0) {
      setFileError('No valid questions found in the file.')
      return
    }

    parsed = parsed.map((q) => ({
      ...q,
      questionType: q.correctOptions.length > 1 ? 'MSQ' : 'MCQ',
    }))

    setParsedQuestions(parsed)
    addToast(
      `${parsed.length} question${parsed.length !== 1 ? 's' : ''} detected`,
      'success'
    )

  } catch (err) {
    setFileError('Failed to read the uploaded file.')
    setSelectedFileName('')
    setParsedQuestions([])
  } finally {
    if (fileInputRef.current) fileInputRef.current.value = ''
  }
}

 const closeAddModal = () => {
  setIsAddOpen(false)
  setNewQ(EMPTY_QUESTION)
  setAddMode('manual')
  clearUploadState()
}

  const openEditModal = (q: Question) => {
    setEditingQuestion(q)
    setEditQ({
      question: q.question,
      options: [...q.options],
      correctOptions: [...q.correctOptions],
      positiveMarks: q.positiveMarks,
      negativeMarks: q.negativeMarks,
      questionType: q.correctOptions.length > 1 ? 'MSQ' : 'MCQ',
    })
    setIsEditOpen(true)
  }

  const handleEditQuestion = async () => {
    if (!editingQuestion) return

    const err = validateQuestion(editQ)
    if (err) {
      addToast(err, 'error')
      return
    }

    setEditLoading(true)
    try {
      const res = await fetch(
        `${API_BASE}/question-banks/${id}/questions/${editingQuestion._id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...editQ,
            options: editQ.options.filter((o) => o.trim()),
            questionType: editQ.correctOptions.length > 1 ? 'MSQ' : 'MCQ',
          }),
        }
      )

      const result = await res.json()
      if (!res.ok) throw new Error(result.message)

      addToast('Question updated')
      setIsEditOpen(false)
      fetchQuestions()
    } catch (err) {
      addToast((err as Error).message || 'Failed to update', 'error')
    } finally {
      setEditLoading(false)
    }
  }

  const handleDelete = async (questionId: string) => {
    if (!confirm('Delete this question?')) return

    setDeletingId(questionId)
    try {
      const res = await fetch(
        `${API_BASE}/question-banks/${id}/questions/${questionId}`,
        { method: 'DELETE' }
      )

      const result = await res.json()
      if (!res.ok) throw new Error(result.message)

      setQuestions((prev) => prev.filter((q) => q._id !== questionId))
      addToast('Question deleted')
    } catch (err) {
      addToast((err as Error).message || 'Failed to delete', 'error')
    } finally {
      setDeletingId(null)
    }
  }

  if (bankLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[rgb(10,11,14)] text-white">
        <div className="text-white/50">Loading question bank…</div>
      </main>
    )
  }

  if (!questionBank) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[rgb(10,11,14)] text-white">
        <div className="text-center">
          <p className="mb-4 text-white/50">Question bank not found.</p>
          <button
            onClick={() => router.back()}
            className="rounded-2xl bg-[rgb(241,90,34)] px-5 py-2 text-sm"
          >
            Go Back
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[rgb(10,11,14)] px-6 py-10 text-white md:px-12 lg:px-20">
      <ToastContainer toasts={toasts} />

      <div className="mx-auto max-w-6xl">
        <QuestionBankHeader
          title={questionBank.title}
          questionCount={questions.length}
          onBack={() => router.back()}
        />

        <QuestionBankMetaForm
          title={editTitle}
          description={editDescription}
          updatedAt={questionBank.updatedAt}
          saving={bankSaving}
          onTitleChange={setEditTitle}
          onDescriptionChange={setEditDescription}
          onAddQuestion={() => setIsAddOpen(true)}
          onSave={handleSaveBank}
        />

        <QuestionList
          questions={questions}
          loading={questionsLoading}
          deletingId={deletingId}
          onAddFirst={() => setIsAddOpen(true)}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      </div>

      <AddQuestionModal
      clearUploadState={clearUploadState}
        isOpen={isAddOpen}
        addMode={addMode}
        setAddMode={setAddMode}
        newQ={newQ}
        setNewQ={setNewQ}
        addLoading={addLoading}
        fileError={fileError}
        fileInputRef={fileInputRef}
        onClose={closeAddModal}
        onAddQuestion={handleAddQuestion}
        onFileUpload={handleFileUpload}
        setFileError={setFileError}
        parsedQuestions={parsedQuestions}
        selectedFileName={selectedFileName}
        onImportParsedQuestions={handleImportParsedQuestions}
        />

      <EditQuestionModal
        isOpen={isEditOpen}
        editingQuestion={editingQuestion}
        editQ={editQ}
        setEditQ={setEditQ}
        editLoading={editLoading}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleEditQuestion}
      />
    </main>
  )
}