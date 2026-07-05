"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { QUIZ_CATEGORIES } from "@/shared/constants/quizCategories";
import { getSessionToken } from "@descope/nextjs-sdk/client";
import { Share2 } from "lucide-react";

type QuizItem = {
  _id: string;
  title: string;
  description?: string;
  instructions?: string;
  category: string;
  subcategory: string;
  totalMarks: number;
  duration?: number;
  numberOfQuestions?: number;
  passingMarks?: number;
};

type QuizListResponse = {
  success: boolean;
  message: string;
  data: QuizItem[];
};

type AttemptStatusItem = {
  attempted: boolean;
  status: "in_progress" | "submitted" | "auto_submitted";
  attemptId: string;
};

type AttemptStatusResponse = {
  success: boolean;
  message?: string;
  data: Record<string, AttemptStatusItem>;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const RULES = [
  "Read each question carefully before answering.",
  "The quiz will auto-submit when the timer runs out.",
  "Do not refresh or close the tab during the quiz.",
  "You can navigate across questions before submission.",
  "Results will be shown immediately after submission.",
];

function slugify(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}

function formatDuration(minutes?: number) {
  if (!minutes || minutes <= 0) return "No time limit";
  return `${minutes} mins`;
}

function formatTitleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function mapRouteCategoryToDbCategory(categorySlug: string) {
  const mapping: Record<string, string> = {
    "core-cs": "Core CS",
    aptitude: "Aptitude",
    "it-concepts": "IT Concepts",
    upsc: "UPSC Mapping",
    constitution: "Constitution",
  };

  return mapping[categorySlug] || formatTitleFromSlug(categorySlug);
}

function mapTopicSlugToDbSubcategory(categorySlug: string, topicSlug: string) {
  const dbCategory = mapRouteCategoryToDbCategory(categorySlug);
  const options = QUIZ_CATEGORIES[dbCategory as keyof typeof QUIZ_CATEGORIES] || [];

  return (
    options.find((item) => slugify(item) === topicSlug.toLowerCase()) ||
    formatTitleFromSlug(topicSlug)
  );
}

function getQuizAttemptState(
  quizId: string,
  attemptStatusMap: Record<string, AttemptStatusItem>
) {
  return attemptStatusMap[quizId] || null;
}

function getQuizActionLabel(attemptState: AttemptStatusItem | null) {
  if (!attemptState) return "Attempt";
  if (attemptState.status === "in_progress") return "Resume";
  return "Review";
}

function getQuizBadgeLabel(attemptState: AttemptStatusItem | null) {
  if (!attemptState) return null;
  if (attemptState.status === "in_progress") return "In Progress";
  return "Completed";
}

export default function QuizList() {
  const router = useRouter();
  const params = useParams();

  const categorySlug = (params?.category as string) ?? "core-cs";
  const topicSlug = (params?.topic as string) ?? "topic";

  const dbCategory = mapRouteCategoryToDbCategory(categorySlug);
  const dbSubcategory = mapTopicSlugToDbSubcategory(categorySlug, topicSlug);

  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState<QuizItem | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [attemptStatusMap, setAttemptStatusMap] = useState<
    Record<string, AttemptStatusItem>
  >({});

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        setError("");

        const query = new URLSearchParams({
          category: dbCategory,
          subcategory: dbSubcategory,
        });

        const res = await fetch(`${API_BASE}/api/v1/quizzes?${query.toString()}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        const result: QuizListResponse = await res.json();

        if (!res.ok) {
          throw new Error(result.message || "Failed to fetch quizzes");
        }

        const fetchedQuizzes = result.data || [];
        setQuizzes(fetchedQuizzes);

        const quizIds = fetchedQuizzes.map((quiz) => quiz._id);

        if (quizIds.length > 0) {
          const token = getSessionToken();

          const statusRes = await fetch(
            `${API_BASE}/api/v1/quiz-attempts/status?quizIds=${quizIds.join(",")}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
              },
              credentials: "include",
              cache: "no-store",
            }
          );

          console.log("fetchedQuizzes", fetchedQuizzes);
          console.log("quizIds", quizIds);
          console.log("statusResult", statusRes);

          if (statusRes.ok) {
            const statusResult: AttemptStatusResponse = await statusRes.json();
            setAttemptStatusMap(statusResult.data || {});
          } else {
            setAttemptStatusMap({});
          }
        } else {
          setAttemptStatusMap({});
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load quizzes");
        setQuizzes([]);
        setAttemptStatusMap({});
      } finally {
        setLoading(false);
      }
    };
    
    void fetchQuizzes();
  }, [dbCategory, dbSubcategory]);

  function openModal(quiz: QuizItem) {
    setSelectedQuiz(quiz);
    setAgreed(false);
  }

  function closeModal() {
    setSelectedQuiz(null);
    setAgreed(false);
  }

  function handleStartQuiz() {
    if (!selectedQuiz) return;

    router.push(
      `/user/practice/quiz/${categorySlug}/${topicSlug}/${selectedQuiz._id}/attempt`
    );
  }

  function handleQuizAction(quiz: QuizItem) {
    const attemptState = getQuizAttemptState(quiz._id, attemptStatusMap);

    if (!attemptState) {
      openModal(quiz);
      return;
    }

    if (attemptState.status === "in_progress") {
      router.push(
        `/user/practice/quiz/${categorySlug}/${topicSlug}/${quiz._id}/attempt`
      );
      return;
    }

    router.push(
      `/user/practice/quiz/${categorySlug}/${topicSlug}/${quiz._id}/review?attemptId=${attemptState.attemptId}`
    );
  }

  return (
    <>
      <div className="p-[clamp(16px,4vw,28px)]">
        <div className="mb-7">
          <h1 className="m-0 text-[clamp(20px,4vw,24px)] font-extrabold text-[var(--text)] [font-family:var(--font-syne,sans-serif)]">
            {dbSubcategory}
          </h1>
          <p className="mt-1 text-sm text-[var(--muted2)]">
            Select a quiz to attempt
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-[rgba(239,68,68,0.35)] bg-[rgba(239,68,68,0.08)] px-[14px] py-3 text-[13px] text-[#ef4444]">
            {error}
          </div>
        )}

        <div className="mb-3 hidden grid-cols-[1fr_140px_160px] border-b border-[var(--border)] px-6 pb-[10px] sm:grid">
          {["TITLE", "DURATION", ""].map((h) => (
            <span
              key={h}
              className="text-[11px] font-semibold tracking-[0.08em] text-[var(--muted)]"
            >
              {h}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {loading ? (
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm text-[var(--muted2)]">
              Loading quizzes...
            </div>
          ) : quizzes.length === 0 ? (
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm text-[var(--muted2)]">
              No quizzes available for this topic yet.
            </div>
          ) : (
            quizzes.map((quiz) => {
              const attemptState = getQuizAttemptState(quiz._id, attemptStatusMap);
              const badgeLabel = getQuizBadgeLabel(attemptState);
              const actionLabel = getQuizActionLabel(attemptState);

             const actionButtonClass =
              attemptState?.status === "submitted" ||
              attemptState?.status === "auto_submitted"
                ? "border border-sky-500/30 bg-sky-500/10 text-sky-300"
                : attemptState?.status === "in_progress"
                ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                : "border-none bg-[var(--orange)] text-white";

              return (
                <div
                  key={quiz._id}
                  className="grid grid-cols-[1fr_auto] grid-rows-[auto_auto] items-center gap-x-3 gap-y-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-[14px] transition-[border,box-shadow] duration-200 ease-in-out hover:border-[var(--orange)] hover:shadow-[0_4px_16px_rgba(241,90,34,0.12)] sm:grid-cols-[1fr_140px_160px] sm:grid-rows-1 sm:px-6 sm:py-[18px]"
                >
                  <div className="col-[1] row-[1] sm:col-auto sm:row-auto">
                    <p className="m-0 text-[15px] font-semibold text-[var(--text)]">
                      {quiz.title}
                    </p>

                    {quiz.description && (
                      <p className="mb-0 mt-[6px] text-xs text-[var(--muted2)]">
                        {quiz.description}
                      </p>
                    )}

                    {badgeLabel && (
                      <span
                        className={`mt-2 inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                        attemptState?.status === "in_progress"
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                          : "border-sky-500/30 bg-sky-500/10 text-sky-300"
                      }`}
                      >
                        {badgeLabel}
                      </span>
                    )}
                  </div>

                  <p className="col-[1] row-[2] m-0 text-[13px] text-[var(--muted2)] sm:col-auto sm:row-auto">
                    {formatDuration(quiz.duration)}
                  </p>

                  <div className="col-[2] row-[1/3] flex justify-end self-center sm:col-auto sm:row-auto">
                    <button
                      onClick={() => handleQuizAction(quiz)}
                      className={`cursor-pointer whitespace-nowrap rounded-lg px-[18px] py-2 text-[13px] font-semibold ${actionButtonClass}`}
                    >
                      {actionLabel}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {selectedQuiz && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-[rgba(0,0,0,0.75)] p-4 backdrop-blur-[4px]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[90vh] w-full max-w-[480px] flex-col gap-5 overflow-y-auto rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-[clamp(20px,5vw,32px)]"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="m-0 text-[clamp(16px,4vw,20px)] font-bold text-[var(--text)]">
                  {selectedQuiz.title}
                </h2>
                <p className="mb-0 mt-1 text-[13px] text-[var(--muted2)]">
                  Duration: {formatDuration(selectedQuiz.duration)}
                </p>
                <p className="mb-0 mt-1 text-[13px] text-[var(--muted2)]">
                  Total Marks: {selectedQuiz.totalMarks}
                </p>
                {selectedQuiz.numberOfQuestions ? (
                  <p className="mb-0 mt-1 text-[13px] text-[var(--muted2)]">
                    Questions: {selectedQuiz.numberOfQuestions}
                  </p>
                ) : null}
              </div>

              <button
                onClick={closeModal}
                className="shrink-0 cursor-pointer border-none bg-transparent px-1 py-0 text-2xl leading-none text-[var(--muted2)]"
              >
                ×
              </button>
            </div>

            {selectedQuiz.instructions && (
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface2,#1e2028)] p-4 text-[13px] leading-[1.6] text-[var(--muted2)]">
                {selectedQuiz.instructions}
              </div>
            )}

            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface2,#1e2028)] p-5">
              <p className="mb-3 mt-0 text-xs font-semibold tracking-[0.06em] text-[var(--orange)]">
                QUIZ RULES
              </p>

              <ul className="m-0 flex list-disc flex-col gap-2 pl-[18px]">
                {RULES.map((rule, i) => (
                  <li
                    key={i}
                    className="text-[13px] leading-[1.6] text-[var(--muted2)]"
                  >
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            <label
              className="flex cursor-pointer items-start gap-[10px] rounded-[10px] px-4 py-[14px]"
              style={{
                border: `1px solid ${agreed ? "var(--orange)" : "var(--border)"}`,
                background: agreed ? "rgba(241,90,34,0.08)" : "transparent",
              }}
            >
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-[2px] h-4 w-4 shrink-0 cursor-pointer"
                style={{ accentColor: "var(--orange)" }}
              />
              <span className="text-[13px] leading-[1.5] text-[var(--text)]">
                I have read and understood all the rules. I am ready to start the
                quiz.
              </span>
            </label>

            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 cursor-pointer rounded-[10px] border border-[var(--border)] bg-transparent p-3 text-sm font-medium text-[var(--muted2)]"
              >
                Cancel
              </button>

              <button
                disabled={!agreed}
                onClick={handleStartQuiz}
                className="flex-[2] rounded-[10px] p-3 text-sm font-bold"
                style={{
                  background: agreed ? "var(--orange)" : "transparent",
                  border: `1px solid ${agreed ? "var(--orange)" : "var(--border)"}`,
                  color: agreed ? "#fff" : "var(--muted)",
                  cursor: agreed ? "pointer" : "not-allowed",
                  opacity: agreed ? 1 : 0.5,
                }}
              >
                Start Quiz
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
}