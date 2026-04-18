'use client';

import { useRouter } from 'next/navigation';

/* ===================== */
/* Types */
/* ===================== */

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
  correctAnswer: string;
  marks: number;
}

interface Quiz {
  id: number;
  title: string;
  category: string;
  subcategory: string;
  totalMarks: number;
  active: boolean;
  description: string;
  questions: Question[];
}

/* ===================== */
/* Mock Data */
/* ===================== */

const MOCK_QUIZZES: Quiz[] = [/* keep your same data */];

function getQuizById(id: number): Quiz | undefined {
  return MOCK_QUIZZES.find((q) => q.id === id);
}

/* ===================== */
/* Icons */
/* ===================== */

const BackIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);


function OptionCard({ option, isCorrect }: { option: Option; isCorrect: boolean }) {
  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg transition
        border
        ${
          isCorrect
            ? 'border-green-400 bg-green-500/10'
            : 'border-[var(--clr-border)] hover:border-[var(--clr-border2)] hover:bg-[var(--clr-surface2)]'
        }
      `}
    >
      <div
        className={`
          w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
          ${
            isCorrect
              ? 'bg-green-500/20 border border-green-400 text-green-500'
              : 'bg-[var(--clr-surface2)] border border-[var(--clr-border2)] text-[var(--clr-text3)]'
          }
        `}
      >
        {isCorrect ? <CheckIcon /> : option.id}
      </div>

      <span
        className={`
          text-sm
          ${isCorrect ? 'text-green-500 font-semibold' : 'text-[var(--clr-text2)]'}
        `}
      >
        {option.text}
      </span>
    </div>
  );
}


function QuestionCard({ question, index }: { question: Question; index: number }) {
  return (
    <div className="bg-[var(--clr-surface)] border border-[var(--clr-border)] rounded-2xl overflow-hidden">

      {/* Header */}
      <div className="flex items-start gap-4 px-5 py-4 border-b border-[var(--clr-border)] bg-[var(--clr-surface2)]">

        <div className="w-8 h-8 rounded-full bg-[var(--clr-accent)] text-white flex items-center justify-center text-sm font-bold shadow-md">
          {index + 1}
        </div>

        <p className="flex-1 text-sm font-semibold text-[var(--clr-text)] leading-relaxed">
          {question.question}
        </p>

        <span className="px-2 py-1 rounded-md text-xs font-bold bg-[var(--clr-accent3)] text-[var(--clr-accent)]">
          {question.marks} marks
        </span>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-5 py-4">
        {question.options.map((opt) => (
          <OptionCard
            key={opt.id}
            option={opt}
            isCorrect={opt.id === question.correctAnswer}
          />
        ))}
      </div>
    </div>
  );
}


export default function QuizPreviewContent({ quizId }: { quizId: number }) {
  const router = useRouter();
  const quiz = getQuizById(quizId);

  if (!quiz) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-[var(--clr-text2)]">
        <p className="text-lg font-semibold">Quiz not found</p>
        <button
          onClick={() => router.push('/quizzes')}
          className="px-5 py-2 rounded-full bg-[var(--clr-accent)] text-white text-sm font-semibold"
        >
          Back to Quizzes
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[900px] px-4 sm:px-6 py-6 sm:py-8">

      {/* Back Button */}
      <button
        onClick={() => router.push('/quizzes')}
        className="flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-[var(--clr-border2)] text-sm font-semibold text-[var(--clr-text2)] hover:text-[var(--clr-accent)] hover:border-[var(--clr-accent)] hover:bg-[var(--clr-accent3)] transition"
      >
        <BackIcon />
        Back to Quizzes
      </button>

      {/* Header */}
      <div className="relative bg-[var(--clr-surface)] border border-[var(--clr-border)] rounded-2xl p-5 sm:p-6 mb-6 overflow-hidden">

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">

          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--clr-text)]">
              {quiz.title}{' '}
              <span className="text-[var(--clr-accent)]">Preview</span>
            </h1>

            <p className="text-sm text-[var(--clr-text2)] mt-2 max-w-xl">
              {quiz.description}
            </p>
          </div>

          <span
            className={`
              flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold
              ${quiz.active ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-[var(--clr-surface2)] text-[var(--clr-text3)]'}
            `}
          >
            {quiz.active && <span className="w-2 h-2 bg-green-500 rounded-full" />}
            {quiz.active ? 'Active' : 'Inactive'}
          </span>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-2 mt-4">
          {[
            ['Category', quiz.category],
            ['Subcategory', quiz.subcategory],
            ['Questions', quiz.questions.length],
            ['Marks', quiz.totalMarks],
          ].map(([label, value]) => (
            <div
              key={label}
              className="px-3 py-1 rounded-md bg-[var(--clr-surface2)] border border-[var(--clr-border)] text-xs"
            >
              <span className="text-[var(--clr-text3)]">{label}:</span>{' '}
              <span className="font-bold text-[var(--clr-text)]">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-5 bg-[var(--clr-accent)] rounded" />
        <span className="text-xs font-bold uppercase text-[var(--clr-text2)]">
          Questions & Options
        </span>
      </div>

      {/* Questions */}
      <div className="flex flex-col gap-4">
        {quiz.questions.map((q, i) => (
          <QuestionCard key={q.id} question={q} index={i} />
        ))}
      </div>

      {/* Legend */}
      <div className="mt-5 px-4 py-2 rounded-md border border-[var(--clr-border)] bg-[var(--clr-surface)] text-xs text-[var(--clr-text3)] inline-flex items-center gap-2">
        <div className="w-3 h-3 bg-green-500/20 border border-green-400 rounded" />
        Correct answer highlighted
      </div>
    </div>
  );
}