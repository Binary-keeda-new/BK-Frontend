'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { UserTestSection } from '../types/test.types';
import {
  getTestSectionAttempt,
  submitTestSectionAttempt,
  type TestSectionAttemptData,
} from '../services/testAttempt.service';

type Status = 'not-visited' | 'not-attempted' | 'answered' | 'flagged';

type Props = {
  attemptId: string;
  testId: string;
  section: UserTestSection;
  sectionIndex: number;
  onBackToSections: () => void;
  onSectionCompleted: (sectionId: string) => void;
};

const SC: Record<Status, { bg: string; color: string; border: string }> = {
  'not-visited': {
    bg: 'transparent',
    color: 'var(--text)',
    border: 'var(--border, rgba(255,255,255,0.07))',
  },
  'not-attempted': {
    bg: '#1e3a5f',
    color: '#60a5fa',
    border: '#3b82f6',
  },
  answered: {
    bg: '#14532d',
    color: '#4ade80',
    border: '#22c55e',
  },
  flagged: {
    bg: '#450a0a',
    color: '#f87171',
    border: '#ef4444',
  },
};

const LEGEND: { label: string; status: Status }[] = [
  { label: 'Answered', status: 'answered' },
  { label: 'Not Attempted', status: 'not-attempted' },
  { label: 'Not Visited', status: 'not-visited' },
  { label: 'Flagged', status: 'flagged' },
];

function getQuestionMode(questionType?: string): 'mcq' | 'multi' | 'nat' {
  if (questionType === 'MCQ') return 'mcq';
  if (questionType === 'MSQ') return 'multi';
  return 'nat';
}

export default function TestAttempt({
  attemptId,
  section,
  sectionIndex,
  onBackToSections,
  onSectionCompleted,
}: Props) {
  const [data, setData] = useState<TestSectionAttemptData | null>(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [visited, setVisited] = useState<Record<number, boolean>>({ 0: true });
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const questions = data?.questions ?? [];
  const totalQuestions = questions.length;
  const q = questions[current];

  const selected = useMemo(() => {
    if (!q) return [];
    return answers[q.questionId] ?? [];
  }, [answers, q]);

  const loadSection = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await getTestSectionAttempt(attemptId, section._id);
      setData(result);

      const answerMap: Record<string, string[]> = {};
      for (const answer of result.answers || []) {
        answerMap[answer.questionId] = answer.selectedOptions ?? [];
      }

      setAnswers(answerMap);
      setCurrent(0);
      setVisited({ 0: true });
      setFlagged({});
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load test section'
      );
    } finally {
      setLoading(false);
    }
  }, [attemptId, section._id]);

  useEffect(() => {
    void loadSection();
  }, [loadSection]);

  const handleSubmit = useCallback(async () => {
    if (submitting) return;

    try {
      setSubmitting(true);
      setError(null);

      await submitTestSectionAttempt(
        attemptId,
        section._id,
        Object.entries(answers).map(([questionId, selectedOptions]) => ({
          questionId,
          selectedOptions,
        }))
      );

      onSectionCompleted(section._id);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to submit section'
      );
    } finally {
      setSubmitting(false);
      setShowSubmitConfirm(false);
    }
  }, [answers, attemptId, onSectionCompleted, section._id, submitting]);

  const openSubmitConfirm = useCallback(() => {
    if (submitting || loading) return;
    setShowSubmitConfirm(true);
  }, [loading, submitting]);

  const handleOption = useCallback(
    (option: string) => {
      if (!q) return;

      const mode = getQuestionMode(q.questionType);

      setAnswers((prev) => {
        const currentSelected = prev[q.questionId] ?? [];

        const nextSelected =
          mode === 'mcq'
            ? currentSelected[0] === option
              ? []
              : [option]
            : currentSelected.includes(option)
            ? currentSelected.filter((item) => item !== option)
            : [...currentSelected, option];

        return {
          ...prev,
          [q.questionId]: nextSelected,
        };
      });
    },
    [q]
  );

  const handleNatChange = useCallback(
    (value: string) => {
      if (!q) return;

      setAnswers((prev) => ({
        ...prev,
        [q.questionId]: value ? [value] : [],
      }));
    },
    [q]
  );

  const goTo = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= totalQuestions) return;

      setVisited((prev) => ({
        ...prev,
        [idx]: true,
      }));

      setCurrent(idx);
      setSidebarOpen(false);
    },
    [totalQuestions]
  );

  const toggleFlag = useCallback(() => {
    setFlagged((prev) => ({
      ...prev,
      [current]: !prev[current],
    }));
  }, [current]);

  const getStatus = useCallback(
    (idx: number): Status => {
      const question = questions[idx];
      if (!question) return 'not-visited';

      const selectedOptions = answers[question.questionId] ?? [];

      if (flagged[idx]) return 'flagged';
      if (selectedOptions.some((item) => item.trim() !== '')) return 'answered';
      if (visited[idx]) return 'not-attempted';

      return 'not-visited';
    },
    [answers, flagged, questions, visited]
  );

  const answeredCount = useMemo(() => {
    return questions.filter((question) => {
      const selectedOptions = answers[question.questionId] ?? [];
      return selectedOptions.some((item) => item.trim() !== '');
    }).length;
  }, [answers, questions]);

  if (section.type === 'coding') {
    return (
      <div className="mx-auto w-full max-w-[900px] p-6">
        <button
          onClick={onBackToSections}
          className="mb-5 rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--muted2)]"
        >
          ← Back to Sections
        </button>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
          <p className="text-xs font-semibold tracking-[0.08em] text-[var(--orange)]">
            SECTION {sectionIndex + 1}
          </p>

          <h1 className="mt-2 text-2xl font-extrabold text-[var(--text)]">
            Coding Section
          </h1>

          <p className="mt-2 text-sm text-[var(--muted2)]">
            Coding problem attempt UI will be connected after coding problems is done.
          </p>

          <button
            onClick={() => onSectionCompleted(section._id)}
            className="mt-6 rounded-xl bg-[var(--orange)] px-5 py-3 text-sm font-bold text-white"
          >
            Mark Coding Section Complete
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-8 text-[var(--text,#f0f0f4)]">
        Loading section...
      </div>
    );
  }

  if (error && !data) {
    return <div className="p-8 text-[#f87171]">{error}</div>;
  }

  if (!data || !q) {
    return (
      <div className="p-8 text-[#f87171]">
        Section attempt could not be loaded.
      </div>
    );
  }

  const mode = getQuestionMode(q.questionType);

  const Panel = () => (
    <aside className="flex h-full flex-col gap-4 rounded-2xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface,#161820)] p-5">
      <div>
        <p className="m-0 text-[11px] font-semibold tracking-[0.08em] text-[var(--muted,#666)]">
          QUESTIONS
        </p>

        <p className="mt-2 text-xs text-[var(--muted2,#8a8a9a)]">
          Answered:{' '}
          <strong className="text-[var(--text,#f0f0f4)]">
            {answeredCount}
          </strong>{' '}
          / {totalQuestions}
        </p>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {questions.map((_, idx) => {
          const status = getStatus(idx);
          const colors = SC[status];
          const active = idx === current;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => goTo(idx)}
              aria-label={`Go to question ${idx + 1}`}
              aria-current={active ? 'true' : undefined}
              className="aspect-square rounded-lg text-[13px] font-medium transition"
              style={{
                fontWeight: active ? 700 : 500,
                background: active ? 'var(--orange, #f15a22)' : colors.bg,
                color: active ? '#fff' : colors.color,
                border: `1px solid ${
                  active ? 'var(--orange, #f15a22)' : colors.border
                }`,
              }}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-2">
        {LEGEND.map(({ label, status }) => {
          const colors = SC[status];

          return (
            <div key={label} className="flex items-center gap-2">
              <div
                className="h-3 w-3 shrink-0 rounded-[3px]"
                style={{
                  background: colors.bg || 'var(--surface2, #1e2028)',
                  border: `1px solid ${colors.border}`,
                }}
              />

              <span className="text-xs text-[var(--muted2,#8a8a9a)]">
                {label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-auto">
        <button
          type="button"
          onClick={openSubmitConfirm}
          disabled={submitting || loading}
          className="w-full rounded-[10px] bg-[var(--orange,#f15a22)] px-4 py-3 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? 'Submitting...' : 'Submit Section'}
        </button>
      </div>
    </aside>
  );
  return (
    <>
      <main className="mx-auto w-full max-w-7xl px-4 py-4 md:px-6">
        <div className="mb-4 rounded-2xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface,#161820)] px-4 py-4 md:px-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-[0.08em] text-[var(--orange,#f15a22)]">
                SECTION {sectionIndex + 1} · MCQ ATTEMPT
              </p>

              <h1 className="mt-1 truncate text-lg font-bold text-[var(--text,#f0f0f4)]">
                Question {current + 1} of {totalQuestions}
              </h1>

              <p className="mt-1 text-sm text-[var(--muted2,#8a8a9a)]">
                {answeredCount} answered · {totalQuestions - answeredCount}{' '}
                remaining
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onBackToSections}
                className="rounded-xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface2,#1e2028)] px-3 py-2 text-sm font-semibold text-[var(--text,#f0f0f4)]"
              >
                Sections
              </button>
              
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface2,#1e2028)] px-3 py-2 text-sm font-semibold text-[var(--text,#f0f0f4)] md:hidden"
              >
                Questions
              </button>

              <button
                type="button"
                onClick={openSubmitConfirm}
                disabled={submitting || loading}
                className="rounded-xl bg-[var(--orange,#f15a22)] px-4 py-2 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>

        </div>

        <div className="grid min-h-[calc(100vh-2rem)] grid-cols-1 gap-5 md:grid-cols-[minmax(0,1fr)_16rem]">
          <section className="min-w-0">
            <div className="flex min-w-0 flex-col">
              <div className="rounded-2xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface,#161820)] p-[clamp(16px,4vw,28px)]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface2,#1e2028)] px-3 py-1 text-[11px] font-semibold text-[var(--orange,#f15a22)]">
                      Q{current + 1}
                    </span>

                    <span className="rounded-full border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface2,#1e2028)] px-3 py-1 text-[11px] font-medium text-[var(--muted2,#8a8a9a)]">
                      {mode === 'mcq' ? 'MCQ' : mode === 'multi' ? 'MSQ' : 'NAT'}
                    </span>

                    <span className="rounded-full border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface2,#1e2028)] px-3 py-1 text-[11px] font-medium text-[var(--muted2,#8a8a9a)]">
                      +{q.positiveMarks} / -{q.negativeMarks}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={toggleFlag}
                    className="rounded-lg px-3 py-[5px] text-xs font-semibold transition"
                    style={{
                      background: flagged[current]
                        ? 'rgba(239,68,68,0.1)'
                        : 'transparent',
                      border: `1px solid ${
                        flagged[current]
                          ? '#ef4444'
                          : 'var(--border, rgba(255,255,255,0.07))'
                      }`,
                      color: flagged[current]
                        ? '#ef4444'
                        : 'var(--muted2, #8a8a9a)',
                    }}
                  >
                    {flagged[current] ? '🚩 Flagged' : '🏳 Flag'}
                  </button>
                </div>

                <p className="mt-5 text-[clamp(15px,2.5vw,17px)] font-medium leading-[1.7] text-[var(--text,#f0f0f4)]">
                  {q.question}
                </p>

                {q.imageUrl && (
                  <img
                    src={q.imageUrl}
                    alt="Question"
                    className="mt-5 max-w-full rounded-xl border border-[var(--border,rgba(255,255,255,0.07))]"
                  />
                )}

                <div className="mt-6">
                  {mode === 'nat' ? (
                    <input
                      type="text"
                      inputMode="decimal"
                      value={selected[0] ?? ''}
                      onChange={(e) => handleNatChange(e.target.value)}
                      placeholder="Enter your answer"
                      className="w-full rounded-xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface2,#1e2028)] px-4 py-[14px] text-[15px] text-[var(--text,#f0f0f4)] outline-none transition focus:border-[var(--orange,#f15a22)] focus:shadow-[0_0_0_3px_rgba(241,90,34,0.12)]"
                    />
                  ) : (
                    <div className="flex flex-col gap-2.5">
                      {q.options.map((opt, i) => {
                        const sel = selected.includes(opt);

                        return (
                          <button
                            key={`${opt}-${i}`}
                            type="button"
                            onClick={() => handleOption(opt)}
                            className="flex w-full items-center gap-[14px] rounded-xl border px-[18px] py-[14px] text-left transition hover:border-[var(--orange,#f15a22)] hover:bg-[rgba(241,90,34,0.07)]"
                            style={{
                              borderColor: sel
                                ? 'var(--orange, #f15a22)'
                                : 'var(--border, rgba(255,255,255,0.07))',
                              background: sel
                                ? 'rgba(241,90,34,0.08)'
                                : 'var(--surface2, #1e2028)',
                            }}
                            aria-pressed={sel}
                          >
                            {mode === 'mcq' ? (
                              <div
                                className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full transition"
                                style={{
                                  border: `2px solid ${
                                    sel
                                      ? 'var(--orange, #f15a22)'
                                      : 'var(--muted, #666)'
                                  }`,
                                  background: sel
                                    ? 'var(--orange, #f15a22)'
                                    : 'transparent',
                                }}
                              >
                                {sel && (
                                  <div className="h-[6px] w-[6px] rounded-full bg-white" />
                                )}
                              </div>
                            ) : (
                              <div
                                className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] transition"
                                style={{
                                  border: `2px solid ${
                                    sel
                                      ? 'var(--orange, #f15a22)'
                                      : 'var(--muted, #666)'
                                  }`,
                                  background: sel
                                    ? 'var(--orange, #f15a22)'
                                    : 'transparent',
                                }}
                              >
                                {sel && (
                                  <svg
                                    width="10"
                                    height="10"
                                    viewBox="0 0 10 10"
                                    fill="none"
                                  >
                                    <path
                                      d="M1.5 5L4 7.5L8.5 2.5"
                                      stroke="#fff"
                                      strokeWidth="1.8"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                )}
                              </div>
                            )}

                            <span
                              className="text-sm leading-[1.4]"
                              style={{
                                color: sel
                                  ? 'var(--text, #f0f0f4)'
                                  : 'var(--muted2, #8a8a9a)',
                              }}
                            >
                              {opt}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {error && (
                  <div className="mt-4 text-[13px] text-[#f87171]">
                    {error}
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => goTo(current - 1)}
                  disabled={current === 0}
                  className="rounded-[10px] border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface,#161820)] px-6 py-2.5 text-sm font-semibold text-[var(--text,#f0f0f4)] transition disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ← Previous
                </button>

                <button
                  type="button"
                  onClick={() => goTo(current + 1)}
                  disabled={current === totalQuestions - 1}
                  className="rounded-[10px] border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface,#161820)] px-6 py-2.5 text-sm font-semibold text-[var(--text,#f0f0f4)] transition disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next →
                </button>
              </div>
            </div>
          </section>

          <div className="hidden md:block">
            <div className="sticky top-4 h-[calc(100vh-2rem)]">
              <Panel />
            </div>
          </div>
        </div>
      </main>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[200] bg-[rgba(0,0,0,0.75)] backdrop-blur-[4px] md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-[88vw] max-w-[380px] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Panel />
          </div>
        </div>
      )}

      {showSubmitConfirm && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
          onClick={() => setShowSubmitConfirm(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface,#161820)] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs font-semibold tracking-[0.08em] text-[var(--orange,#f15a22)]">
              CONFIRM SUBMISSION
            </p>

            <h2 className="mt-2 text-xl font-bold text-[var(--text,#f0f0f4)]">
              Submit this section?
            </h2>

            <p className="mt-2 text-sm leading-6 text-[var(--muted2,#8a8a9a)]">
              You have answered {answeredCount} out of {totalQuestions}{' '}
              questions. Once submitted, this section will be locked.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface2,#1e2028)] p-3">
                <p className="text-xs text-[var(--muted2,#8a8a9a)]">
                  Answered
                </p>
                <p className="mt-1 text-lg font-bold text-[var(--text,#f0f0f4)]">
                  {answeredCount}
                </p>
              </div>

              <div className="rounded-xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface2,#1e2028)] p-3">
                <p className="text-xs text-[var(--muted2,#8a8a9a)]">
                  Remaining
                </p>
                <p className="mt-1 text-lg font-bold text-[var(--text,#f0f0f4)]">
                  {totalQuestions - answeredCount}
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 rounded-xl border border-[var(--border,rgba(255,255,255,0.07))] bg-transparent px-4 py-3 text-sm font-semibold text-[var(--muted2,#8a8a9a)]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => void handleSubmit()}
                disabled={submitting}
                className="flex-1 rounded-xl bg-[var(--orange,#f15a22)] px-4 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? 'Submitting...' : 'Yes, Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}