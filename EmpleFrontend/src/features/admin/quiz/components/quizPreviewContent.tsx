'use client';

import { useEffect, useState } from 'react';

interface PreviewQuestion {
  _id: string;
  question: string;
  questionType: 'MCQ' | 'MSQ' | 'NAT';
  options: string[];
  correctOptions: string[];
  positiveMarks: number;
  negativeMarks: number;
}

interface PreviewQuiz {
  _id: string;
  title: string;
  category: string;
  subcategory: string;
  totalMarks: number;
  description?: string;
  questions: PreviewQuestion[];
}

interface PreviewResponse {
  success: boolean;
  message: string;
  data: PreviewQuiz;
}

const API_BASE = 'http://localhost:5000/api/v1/admin';

const BackIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);

const CheckIcon = () => (
  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

function OptionCard({
  option,
  isCorrect,
  index,
}: {
  option: string;
  isCorrect: boolean;
  index: number;
}) {
  const label = String.fromCharCode(65 + index);

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border px-4 py-3 transition ${
        isCorrect
          ? 'border-green-400 bg-green-500/10'
          : 'border-[var(--clr-border)] hover:border-[var(--clr-border2)] hover:bg-[var(--clr-surface2)]'
      }`}
    >
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold ${
          isCorrect
            ? 'border-green-400 bg-green-500/20 text-green-500'
            : 'border-[var(--clr-border2)] bg-[var(--clr-surface2)] text-[var(--clr-text3)]'
        }`}
      >
        {isCorrect ? <CheckIcon /> : label}
      </div>

      <span
        className={`text-sm ${
          isCorrect ? 'font-semibold text-green-500' : 'text-[var(--clr-text2)]'
        }`}
      >
        {option}
      </span>
    </div>
  );
}

function QuestionCard({
  question,
  index,
}: {
  question: PreviewQuestion;
  index: number;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)]">
      <div className="flex items-start gap-4 border-b border-[var(--clr-border)] bg-[var(--clr-surface2)] px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--clr-accent)] text-sm font-bold text-white shadow-md">
          {index + 1}
        </div>

        <p className="flex-1 text-sm font-semibold leading-relaxed text-[var(--clr-text)]">
          {question.question}
        </p>

        <span className="rounded-md bg-[var(--clr-accent3)] px-2 py-1 text-xs font-bold text-[var(--clr-accent)]">
          +{question.positiveMarks} / -{question.negativeMarks}
        </span>
      </div>

      {question.questionType === 'NAT' ? (
        <div className="px-5 py-4">
          <div className="rounded-lg border border-green-400 bg-green-500/10 px-4 py-3">
            <span className="text-xs font-bold uppercase tracking-wide text-green-500">
              Correct Answer
            </span>
            <p className="mt-1 text-sm font-semibold text-green-500">
              {question.correctOptions[0] || '-'}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 px-5 py-4 sm:grid-cols-2">
          {question.options.map((opt, idx) => (
            <OptionCard
              key={`${question._id}-${idx}`}
              option={opt}
              index={idx}
              isCorrect={question.correctOptions.includes(opt)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function QuizPreviewContent({
  quizId,
  onBack,
}: {
  quizId: string;
  onBack?: () => void;
}) {
  const [quiz, setQuiz] = useState<PreviewQuiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!quizId) return;

    const fetchPreview = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await fetch(`${API_BASE}/quizzes/${quizId}/preview`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        });

        const contentType = res.headers.get('content-type') || '';

        if (!contentType.includes('application/json')) {
          const text = await res.text();
          throw new Error(text.slice(0, 120) || 'Server did not return JSON');
        }

        const result: PreviewResponse = await res.json();

        if (!res.ok) {
          throw new Error(result.message || 'Failed to fetch quiz preview');
        }

        setQuiz(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch quiz preview');
      } finally {
        setLoading(false);
      }
    };

    fetchPreview();
  }, [quizId]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-[var(--clr-text2)]">
        Loading preview...
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-[var(--clr-text2)]">
        <p className="text-lg font-semibold">
          {error || 'Quiz preview not found'}
        </p>
        {onBack && (
          <button
            onClick={onBack}
            className="rounded-full bg-[var(--clr-accent)] px-5 py-2 text-sm font-semibold text-white"
          >
            Back to Quizzes
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-[900px] px-4 py-6 sm:px-6 sm:py-8">
      {onBack && (
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 rounded-full border border-[var(--clr-border2)] px-4 py-2 text-sm font-semibold text-[var(--clr-text2)] transition hover:border-[var(--clr-accent)] hover:bg-[var(--clr-accent3)] hover:text-[var(--clr-accent)]"
        >
          <BackIcon />
          Back to Quizzes
        </button>
      )}

      <div className="relative mb-6 overflow-hidden rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-5 sm:p-6">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-[var(--clr-text)] sm:text-2xl">
              {quiz.title} <span className="text-[var(--clr-accent)]">Preview</span>
            </h1>

            <p className="mt-2 max-w-xl text-sm text-[var(--clr-text2)]">
              {quiz.description || 'No description available.'}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {[
            ['Category', quiz.category],
            ['Subcategory', quiz.subcategory],
            ['Questions', quiz.questions.length],
            ['Marks', quiz.totalMarks],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-md border border-[var(--clr-border)] bg-[var(--clr-surface2)] px-3 py-1 text-xs"
            >
              <span className="text-[var(--clr-text3)]">{label}:</span>{' '}
              <span className="font-bold text-[var(--clr-text)]">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <div className="h-5 w-1 rounded bg-[var(--clr-accent)]" />
        <span className="text-xs font-bold uppercase text-[var(--clr-text2)]">
          Questions & Options
        </span>
      </div>

      <div className="flex flex-col gap-4">
  {quiz.questions?.length ? (
    quiz.questions.map((q, i) => (
      <QuestionCard key={q._id} question={q} index={i} />
    ))
  ) : (
    <div className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] px-5 py-8 text-sm text-[var(--clr-text2)]">
      No questions available in this quiz yet.
    </div>
  )}
</div>


      <div className="mt-5 inline-flex items-center gap-2 rounded-md border border-[var(--clr-border)] bg-[var(--clr-surface)] px-4 py-2 text-xs text-[var(--clr-text3)]">
        <div className="h-3 w-3 rounded border border-green-400 bg-green-500/20" />
        Correct answers highlighted
      </div>
    </div>
  );
}