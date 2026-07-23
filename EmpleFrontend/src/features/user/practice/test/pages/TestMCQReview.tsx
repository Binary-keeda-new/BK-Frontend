'use client';

import { useEffect, useMemo, useState } from 'react';
import { UserTestSection } from '../types/test.types';
import { getTestSectionReview } from '../services/test.service';

type Props = {
  attemptId: string;
  section: UserTestSection;
  sectionIndex: number;
  onBack: () => void;
};

type ReviewAnswer = {
  questionId: string;
  question: string;
  questionType: 'MCQ' | 'MSQ' | 'NAT';
  options: string[];
  selectedOptions: string[];
  correctOptions: string[];
  isCorrect: boolean;
  marksAwarded: number;
  positiveMarks: number;
  negativeMarks: number;
  imageUrl?: string | null;
  solution?: string;
  solutionMedia?: string | null;
};

type SectionReviewData = {
  attemptId: string;
  sectionId: string;
  answers: ReviewAnswer[];
};

function getQuestionMode(questionType?: string | null) {
  if (questionType === 'MCQ') return 'Single correct';
  if (questionType === 'MSQ') return 'Multiple correct';
  if (questionType === 'NAT') return 'Numerical answer';
  return 'Question';
}

function getMarksText(answer: ReviewAnswer) {
  if (answer.marksAwarded > 0) return `+${answer.marksAwarded}`;
  return `${answer.marksAwarded}`;
}

export default function TestMCQReview({
  attemptId,
  section,
  sectionIndex,
  onBack,
}: Props) {
  const [data, setData] = useState<SectionReviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const questions = useMemo(() => data?.answers ?? [], [data]);

  useEffect(() => {
    const loadReview = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await getTestSectionReview(attemptId, section._id);
        setData(result as unknown as SectionReviewData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load review');
      } finally {
        setLoading(false);
      }
    };

    void loadReview();
  }, [attemptId, section._id]);

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <p className="text-sm text-[var(--muted2)]">Loading review...</p>
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
        <div className="rounded-3xl border border-red-500/25 bg-red-500/10 p-8">
          <p className="text-sm text-red-400">
            {error || 'Review could not be loaded.'}
          </p>

          <button
            type="button"
            onClick={onBack}
            className="mt-4 rounded-xl bg-[var(--orange)] px-4 py-2.5 text-sm font-semibold text-white"
          >
            Back to Sections
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-4 md:px-6">
      <section className="mb-5 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 md:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.08em] text-[var(--orange)]">
              SECTION {sectionIndex + 1} · MCQ REVIEW
            </p>

            <h1 className="mt-2 text-[clamp(24px,4vw,34px)] font-bold leading-tight text-[var(--text)]">
              {section.title}
            </h1>

            <p className="mt-2 text-sm leading-6 text-[var(--muted2)]">
              Review your submitted answers and compare them with the correct
              answers.
            </p>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="rounded-xl bg-[var(--orange)] px-4 py-2.5 text-sm font-semibold text-white"
          >
            Back to Sections
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface2)] p-4">
            <p className="text-xs text-[var(--muted2)]">Questions</p>
            <p className="mt-2 text-2xl font-bold text-[var(--text)]">
              {questions.length || section.numberOfQuestions}
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface2)] p-4">
            <p className="text-xs text-[var(--muted2)]">Duration</p>
            <p className="mt-2 text-2xl font-bold text-[var(--text)]">
              {section.duration} min
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface2)] p-4">
            <p className="text-xs text-[var(--muted2)]">Type</p>
            <p className="mt-2 text-2xl font-bold text-[var(--text)]">MCQ</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 md:p-6">
        <div>
          <p className="text-xs font-semibold tracking-[0.08em] text-[var(--orange)]">
            QUESTIONS
          </p>

          <h2 className="mt-1 text-xl font-bold text-[var(--text)]">
            Detailed review
          </h2>
        </div>

        <div className="mt-5 flex flex-col gap-4">
          {questions.map((question, index) => {
            const isNat = question.questionType === 'NAT';

            return (
              <article
                key={question.questionId}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface2)] p-4 md:p-5"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold tracking-[0.08em] text-[var(--orange)]">
                        Question {index + 1}
                      </p>

                      <h3 className="mt-2 text-base font-semibold leading-7 text-[var(--text)] md:text-[17px]">
                        {question.question}
                      </h3>
                    </div>

                    <span
                      className={
                        question.isCorrect
                          ? 'inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-400'
                          : 'inline-flex items-center rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-400'
                      }
                    >
                      {question.isCorrect ? 'Correct' : 'Incorrect'} ·{' '}
                      {getMarksText(question)}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[11px] font-medium text-[var(--muted2)]">
                      {getQuestionMode(question.questionType)}
                    </span>

                    <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[11px] font-medium text-[var(--muted2)]">
                      +{question.positiveMarks} / -{question.negativeMarks}
                    </span>
                  </div>

                  {question.imageUrl && (
                    <img
                      src={question.imageUrl}
                      alt="Question"
                      className="max-w-full rounded-xl border border-[var(--border)]"
                    />
                  )}

                  {isNat ? (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                        <p className="text-xs text-[var(--muted2)]">
                          Your Answer
                        </p>
                        <p className="mt-2 text-base font-semibold text-[var(--text)]">
                          {question.selectedOptions[0] || 'Not answered'}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                        <p className="text-xs text-[var(--muted2)]">
                          Correct Answer
                        </p>
                        <p className="mt-2 text-base font-semibold text-emerald-300">
                          {question.correctOptions[0] || '-'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2.5">
                      {question.options.map((option) => {
                        const isSelected =
                          question.selectedOptions.includes(option);
                        const isCorrect =
                          question.correctOptions.includes(option);

                        let optionClassName =
                          'rounded-xl border px-4 py-3 text-sm transition';

                        if (isSelected && isCorrect) {
                          optionClassName +=
                            ' border-emerald-500 bg-emerald-500/15 text-emerald-200';
                        } else if (isSelected && !isCorrect) {
                          optionClassName +=
                            ' border-red-500/70 bg-red-500/10 text-red-300';
                        } else if (isCorrect) {
                          optionClassName +=
                            ' border-emerald-500/70 bg-emerald-500/10 text-emerald-300';
                        } else {
                          optionClassName +=
                            ' border-[var(--border)] bg-[var(--surface)] text-[var(--muted2)]';
                        }

                        return (
                          <div key={option} className={optionClassName}>
                            <div className="flex items-start justify-between gap-3">
                              <span>{option}</span>

                              <div className="flex shrink-0 gap-2">
                                {isSelected && (
                                  <span className="rounded-full bg-sky-500/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-sky-300">
                                    Your answer
                                  </span>
                                )}

                                {isCorrect && (
                                  <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
                                    Correct
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {(question.solution || question.solutionMedia) && (
                    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                      <p className="text-xs font-semibold tracking-[0.08em] text-[var(--orange)]">
                        SOLUTION
                      </p>

                      {question.solution && (
                        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[var(--muted2)]">
                          {question.solution}
                        </p>
                      )}

                      {question.solutionMedia && (
                        <img
                          src={question.solutionMedia}
                          alt="Solution"
                          className="mt-3 max-w-full rounded-xl border border-[var(--border)]"
                        />
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}

          {questions.length === 0 && (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface2)] px-4 py-4 text-sm text-[var(--muted2)]">
              No questions available for review.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}