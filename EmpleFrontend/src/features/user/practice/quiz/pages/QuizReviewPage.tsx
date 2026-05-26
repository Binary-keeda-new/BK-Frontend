"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getQuizAttemptResult } from "../services/quizAttempt.service";
import type {
  QuizAttemptResultAnswer,
  QuizAttemptResultData,
} from "../types/quizAttempt.types";

type ReviewFilter = "all" | "correct" | "incorrect";

function getQuestionMode(questionType?: string | null) {
  if (questionType === "MCQ") return "Single correct";
  if (questionType === "MSQ") return "Multiple correct";
  if (questionType === "NAT") return "Numerical answer";
  return "Question";
}

function getMarksText(answer: QuizAttemptResultAnswer) {
  if (answer.marksAwarded > 0) return `+${answer.marksAwarded}`;
  return `${answer.marksAwarded}`;
}

function getQuestionLabel(index: number) {
  return `Question ${index + 1}`;
}

function getTopicPath(
  params: Record<string, string | string[] | undefined>
): string {
  const category = Array.isArray(params.category)
    ? params.category[0]
    : params.category;

  const topic = Array.isArray(params.topic) ? params.topic[0] : params.topic;

  if (category && topic) {
    return `/user/practice/quiz/${category}/${topic}`;
  }

  if (category) {
    return `/user/practice/quiz/${category}`;
  }

  return "/user/practice/quiz";
}

export default function QuizReviewPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const attemptId = searchParams.get("attemptId");

  const [result, setResult] = useState<QuizAttemptResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<ReviewFilter>("all");

  const topicPath = getTopicPath(params);

  useEffect(() => {
    const loadReview = async () => {
      if (!attemptId) {
        setError("Attempt ID is missing");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const res = await getQuizAttemptResult(attemptId);
        setResult(res.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load review");
      } finally {
        setLoading(false);
      }
    };

    void loadReview();
  }, [attemptId]);

  const stats = useMemo(() => {
    if (!result) {
      return {
        correctCount: 0,
        incorrectCount: 0,
        accuracy: 0,
      };
    }

    const correctCount = result.answers.filter((answer) => answer.isCorrect).length;
    const incorrectCount = result.answers.length - correctCount;
    const accuracy =
      result.answers.length > 0
        ? Math.round((correctCount / result.answers.length) * 100)
        : 0;

    return {
      correctCount,
      incorrectCount,
      accuracy,
    };
  }, [result]);

  const filteredAnswers = useMemo(() => {
    if (!result) return [];

    if (filter === "correct") {
      return result.answers.filter((answer) => answer.isCorrect);
    }

    if (filter === "incorrect") {
      return result.answers.filter((answer) => !answer.isCorrect);
    }

    return result.answers;
  }, [filter, result]);

  const filterCounts = useMemo(() => {
    return {
      all: result?.answers.length ?? 0,
      correct: stats.correctCount,
      incorrect: stats.incorrectCount,
    };
  }, [result, stats.correctCount, stats.incorrectCount]);

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
        <div className="rounded-3xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface,#161820)] p-8">
          <p className="text-sm text-[var(--muted2,#8a8a9a)]">
            Loading review...
          </p>
        </div>
      </main>
    );
  }

  if (error || !result) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
        <div className="rounded-3xl border border-red-500/25 bg-red-500/10 p-8">
          <p className="text-sm text-red-400">
            {error || "Review could not be loaded."}
          </p>

          <button
            type="button"
            onClick={() => router.push(topicPath)}
            className="mt-4 rounded-xl bg-[var(--orange,#f15a22)] px-4 py-2.5 text-sm font-semibold text-white"
          >
            Back to Quiz List
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-4 md:px-6">
      <section className="mb-5 rounded-3xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface,#161820)] p-5 md:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.08em] text-[var(--orange,#f15a22)]">
              ANSWER REVIEW
            </p>

            <h1 className="mt-2 text-[clamp(24px,4vw,34px)] font-bold leading-tight text-[var(--text,#f0f0f4)]">
              Review your answers
            </h1>

            <p className="mt-2 text-sm leading-6 text-[var(--muted2,#8a8a9a)]">
              See what you got right, what needs work, and compare your answers
              with the correct ones.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push(topicPath)}
            className="rounded-xl bg-[var(--orange,#f15a22)] px-4 py-2.5 text-sm font-semibold text-white"
          >
            Back to Quiz List
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface2,#1e2028)] p-4">
            <p className="text-xs text-[var(--muted2,#8a8a9a)]">Score</p>
            <p className="mt-2 text-2xl font-bold text-[var(--text,#f0f0f4)]">
              {result.totalMarksObtained}
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface2,#1e2028)] p-4">
            <p className="text-xs text-[var(--muted2,#8a8a9a)]">Correct</p>
            <p className="mt-2 text-2xl font-bold text-emerald-400">
              {stats.correctCount}
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface2,#1e2028)] p-4">
            <p className="text-xs text-[var(--muted2,#8a8a9a)]">Incorrect</p>
            <p className="mt-2 text-2xl font-bold text-red-400">
              {stats.incorrectCount}
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface2,#1e2028)] p-4">
            <p className="text-xs text-[var(--muted2,#8a8a9a)]">Accuracy</p>
            <p className="mt-2 text-2xl font-bold text-[var(--text,#f0f0f4)]">
              {stats.accuracy}%
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface,#161820)] p-5 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.08em] text-[var(--orange,#f15a22)]">
              QUESTIONS
            </p>
            <h2 className="mt-1 text-xl font-bold text-[var(--text,#f0f0f4)]">
              Detailed review
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={
                filter === "all"
                  ? "rounded-full border border-[var(--orange,#f15a22)] bg-[var(--orange,#f15a22)] px-4 py-2 text-sm font-semibold text-white"
                  : "rounded-full border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface2,#1e2028)] px-4 py-2 text-sm font-semibold text-[var(--muted2,#8a8a9a)]"
              }
            >
              All ({filterCounts.all})
            </button>

            <button
              type="button"
              onClick={() => setFilter("correct")}
              className={
                filter === "correct"
                  ? "rounded-full border border-[var(--orange,#f15a22)] bg-[var(--orange,#f15a22)] px-4 py-2 text-sm font-semibold text-white"
                  : "rounded-full border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface2,#1e2028)] px-4 py-2 text-sm font-semibold text-[var(--muted2,#8a8a9a)]"
              }
            >
              Correct ({filterCounts.correct})
            </button>

            <button
              type="button"
              onClick={() => setFilter("incorrect")}
              className={
                filter === "incorrect"
                  ? "rounded-full border border-[var(--orange,#f15a22)] bg-[var(--orange,#f15a22)] px-4 py-2 text-sm font-semibold text-white"
                  : "rounded-full border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface2,#1e2028)] px-4 py-2 text-sm font-semibold text-[var(--muted2,#8a8a9a)]"
              }
            >
              Incorrect ({filterCounts.incorrect})
            </button>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-4">
          {filteredAnswers.map((answer, index) => {
            const isNat = answer.questionType === "NAT";

            return (
              <article
                key={answer.questionId}
                className="rounded-2xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface2,#1e2028)] p-4 md:p-5"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold tracking-[0.08em] text-[var(--orange,#f15a22)]">
                        {getQuestionLabel(index)}
                      </p>

                      <h3 className="mt-2 text-base font-semibold leading-7 text-[var(--text,#f0f0f4)] md:text-[17px]">
                        {answer.question}
                      </h3>
                    </div>

                    <span
                      className={
                        answer.isCorrect
                          ? "inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-400"
                          : "inline-flex items-center rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-400"
                      }
                    >
                      {answer.isCorrect ? "Correct" : "Incorrect"} ·{" "}
                      {getMarksText(answer)}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface,#161820)] px-3 py-1 text-[11px] font-medium text-[var(--muted2,#8a8a9a)]">
                      {getQuestionMode(answer.questionType)}
                    </span>

                    <span className="rounded-full border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface,#161820)] px-3 py-1 text-[11px] font-medium text-[var(--muted2,#8a8a9a)]">
                      +{answer.positiveMarks} / -{answer.negativeMarks}
                    </span>
                  </div>

                  {answer.imageUrl && (
                    <img
                      src={answer.imageUrl}
                      alt="Question"
                      className="max-w-full rounded-xl border border-[var(--border,rgba(255,255,255,0.07))]"
                    />
                  )}

                  {isNat ? (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface,#161820)] p-4">
                        <p className="text-xs text-[var(--muted2,#8a8a9a)]">
                          Your Answer
                        </p>
                        <p className="mt-2 text-base font-semibold text-[var(--text,#f0f0f4)]">
                          {answer.selectedOptions[0] || "Not answered"}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface,#161820)] p-4">
                        <p className="text-xs text-[var(--muted2,#8a8a9a)]">
                          Correct Answer
                        </p>
                        <p className="mt-2 text-base font-semibold text-emerald-300">
                          {answer.correctOptions[0] || "-"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2.5">
                      {answer.options.map((option) => {
                        const isSelected = answer.selectedOptions.includes(option);
                        const isCorrect = answer.correctOptions.includes(option);

                        let optionClassName =
                          "rounded-xl border px-4 py-3 text-sm transition";

                        if (isSelected && isCorrect) {
  optionClassName +=
    " border-emerald-500 bg-emerald-500/15 text-emerald-200";
} else if (isSelected && !isCorrect) {
  optionClassName +=
    " border-red-500/70 bg-red-500/10 text-red-300";
} else if (isCorrect) {
  optionClassName +=
    " border-emerald-500/70 bg-emerald-500/10 text-emerald-300";
} else {
  optionClassName +=
    " border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface,#161820)] text-[var(--muted2,#8a8a9a)]";
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
                </div>
              </article>
            );
          })}

          {filteredAnswers.length === 0 && (
            <div className="rounded-2xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface2,#1e2028)] px-4 py-4 text-sm text-[var(--muted2,#8a8a9a)]">
              No questions in this filter.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}