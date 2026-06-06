"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getQuizAttemptResult } from "../services/quizAttempt.service";
import type { QuizAttemptResultData } from "../types/quizAttempt.types";

export default function QuizResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const attemptId = searchParams.get("attemptId");

  const [result, setResult] = useState<QuizAttemptResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(3);
const [redirectEnabled, setRedirectEnabled] = useState(true);


  useEffect(() => {
    const loadResult = async () => {
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
        setError(err instanceof Error ? err.message : "Failed to load result");
      } finally {
        setLoading(false);
      }
    };

    void loadResult();
  }, [attemptId]);

 useEffect(() => {
  if (!result || !redirectEnabled) return;
  if (countdown <= 0) return;

  const timer = window.setTimeout(() => {
    setCountdown((prev) => prev - 1);
  }, 1000);

  return () => window.clearTimeout(timer);
}, [countdown, redirectEnabled, result]);

useEffect(() => {
  if (!result || !redirectEnabled) return;
  if (countdown !== 0) return;

  router.push("/user/dashboard");
}, [countdown, redirectEnabled, result, router]);

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

  if (loading) {
    return (
      <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center justify-center px-4 py-10">
        <div className="w-full rounded-3xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface,#161820)] p-8 text-center">
          <p className="text-sm text-[var(--muted2,#8a8a9a)]">Loading result...</p>
        </div>
      </main>
    );
  }

  if (error || !result) {
    return (
      <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center justify-center px-4 py-10">
        <div className="w-full rounded-3xl border border-red-500/25 bg-red-500/10 p-8 text-center">
          <p className="text-sm text-red-400">
            {error || "Result could not be loaded."}
          </p>

          <button
            type="button"
            onClick={() => router.push("/user/dashboard")}
            className="mt-4 rounded-xl bg-[var(--orange,#f15a22)] px-4 py-2.5 text-sm font-semibold text-white"
          >
            Go to Dashboard
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-4xl items-center justify-center px-4 py-10">
      <section className="w-full rounded-3xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface,#161820)] p-6 md:p-8">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.08em] text-[var(--orange,#f15a22)]">
            QUIZ SUBMITTED
          </p>

          <h1 className="mt-3 text-[clamp(28px,5vw,40px)] font-bold text-[var(--text,#f0f0f4)]">
            {result.totalMarksObtained}
          </h1>

          <p className="mt-2 text-sm text-[var(--muted2,#8a8a9a)]">
            {result.status === "auto_submitted"
              ? "Your quiz was auto-submitted because time ran out."
              : "Your quiz has been submitted successfully."}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface2,#1e2028)] p-4 text-center">
            <p className="text-xs text-[var(--muted2,#8a8a9a)]">Correct</p>
            <p className="mt-2 text-2xl font-bold text-emerald-400">
              {stats.correctCount}
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface2,#1e2028)] p-4 text-center">
            <p className="text-xs text-[var(--muted2,#8a8a9a)]">Incorrect</p>
            <p className="mt-2 text-2xl font-bold text-red-400">
              {stats.incorrectCount}
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface2,#1e2028)] p-4 text-center">
            <p className="text-xs text-[var(--muted2,#8a8a9a)]">Accuracy</p>
            <p className="mt-2 text-2xl font-bold text-[var(--text,#f0f0f4)]">
              {stats.accuracy}%
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-[var(--border,rgba(255,255,255,0.07))] bg-[var(--surface2,#1e2028)] p-5 text-center">
          <p className="text-sm text-[var(--muted2,#8a8a9a)]">
            Redirecting to dashboard in
          </p>
          <p className="mt-2 text-4xl font-bold text-[var(--orange,#f15a22)]">
            {countdown}
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => router.push("/user/dashboard")}
            className="rounded-xl bg-[var(--orange,#f15a22)] px-5 py-3 text-sm font-semibold text-white"
          >
            Go to Dashboard Now
          </button>
        </div>
      </section>
    </main>
  );
}