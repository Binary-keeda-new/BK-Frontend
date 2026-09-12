"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Coins} from "lucide-react";
import { getSessionToken } from "@descope/nextjs-sdk/client";

import { QUIZ_CATEGORIES } from "@/shared/constants/quizCategories";
import { useWallet } from "@/providers/WalletProvider";
import InsufficientCoinsDialog from "@/features/wallet/components/InsufficientCoinsDialog";

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
  if (!minutes || minutes <= 0) {
    return "No time limit";
  }

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
    "it-skills": "IT Skills",
    "govt-exams": "Govt Exams",
  };

  return mapping[categorySlug] || formatTitleFromSlug(categorySlug);
}

function mapTopicSlugToDbSubcategory(
  categorySlug: string,
  topicSlug: string,
) {
  const dbCategory = mapRouteCategoryToDbCategory(categorySlug);

  const options = Object.keys(
    QUIZ_CATEGORIES[
      dbCategory as keyof typeof QUIZ_CATEGORIES
    ] || {},
  );

  return (
    options.find(
      (item) => slugify(item) === topicSlug.toLowerCase(),
    ) || formatTitleFromSlug(topicSlug)
  );
}

function getQuizAttemptState(
  quizId: string,
  attemptStatusMap: Record<string, AttemptStatusItem>,
) {
  return attemptStatusMap[quizId] || null;
}

function getQuizActionLabel(
  attemptState: AttemptStatusItem | null,
) {
  if (!attemptState) {
    return "Attempt";
  }

  if (attemptState.status === "in_progress") {
    return "Resume";
  }

  return "Review";
}

function getActionButtonClass(
  attemptState: AttemptStatusItem | null,
) {
  if (
    attemptState?.status === "submitted" ||
    attemptState?.status === "auto_submitted"
  ) {
    return [
      "border border-sky-500/30",
      "bg-sky-500/10",
      "text-sky-300",
      "hover:border-sky-500/50",
      "hover:bg-sky-500/15",
    ].join(" ");
  }

  if (attemptState?.status === "in_progress") {
    return [
      "border border-emerald-500/30",
      "bg-emerald-500/10",
      "text-emerald-300",
      "hover:border-emerald-500/50",
      "hover:bg-emerald-500/15",
    ].join(" ");
  }

  return [
    "border border-[var(--orange)]",
    "bg-[var(--orange)]",
    "text-white",
    "hover:brightness-110",
  ].join(" ");
}

export default function QuizList() {
  const router = useRouter();
  const params = useParams();

  const categorySlug =
    (params?.category as string) ?? "core-cs";

  const topicSlug =
    (params?.topic as string) ?? "topic";

  const dbCategory =
    mapRouteCategoryToDbCategory(categorySlug);

  const dbSubcategory =
    mapTopicSlugToDbSubcategory(
      categorySlug,
      topicSlug,
    );

  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedQuiz, setSelectedQuiz] =
    useState<QuizItem | null>(null);

  const [agreed, setAgreed] = useState(false);

  const [attemptStatusMap, setAttemptStatusMap] =
    useState<Record<string, AttemptStatusItem>>({});

  const [
    showInsufficientDialog,
    setShowInsufficientDialog,
  ] = useState(false);

  const { config, balance } = useWallet();

  const quizCost =
    config?.QUIZ?.ATTEMPT_COST || 5;

  const maxReward =
    config?.QUIZ?.MAX_REWARD || 10;

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        setError("");

        const query = new URLSearchParams({
          category: dbCategory,
          subcategory: dbSubcategory,
        });

        const quizResponse = await fetch(
          `${API_BASE}/api/v1/quizzes?${query.toString()}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
          },
        );

        const quizResult: QuizListResponse =
          await quizResponse.json();

        if (!quizResponse.ok) {
          throw new Error(
            quizResult.message ||
              "Failed to fetch quizzes",
          );
        }

        const fetchedQuizzes =
          quizResult.data || [];

        setQuizzes(fetchedQuizzes);

        const quizIds = fetchedQuizzes.map(
          (quiz) => quiz._id,
        );

        if (quizIds.length === 0) {
          setAttemptStatusMap({});
          return;
        }

        const token = getSessionToken();

        const statusResponse = await fetch(
          `${API_BASE}/api/v1/quiz-attempts/status?quizIds=${quizIds.join(
            ",",
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              ...(token
                ? {
                    Authorization: `Bearer ${token}`,
                  }
                : {}),
            },
            credentials: "include",
            cache: "no-store",
          },
        );

        if (!statusResponse.ok) {
          setAttemptStatusMap({});
          return;
        }

        const statusResult: AttemptStatusResponse =
          await statusResponse.json();

        setAttemptStatusMap(
          statusResult.data || {},
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load quizzes",
        );

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
    if (!selectedQuiz) {
      return;
    }

    router.push(
      `/user/practice/quiz/${categorySlug}/${topicSlug}/${selectedQuiz._id}/attempt`,
    );
  }

  function handleQuizAction(quiz: QuizItem) {
    const attemptState = getQuizAttemptState(
      quiz._id,
      attemptStatusMap,
    );

    if (!attemptState) {
      if (balance < quizCost) {
        setSelectedQuiz(quiz);
        setShowInsufficientDialog(true);
        return;
      }

      openModal(quiz);
      return;
    }

    if (attemptState.status === "in_progress") {
      router.push(
        `/user/practice/quiz/${categorySlug}/${topicSlug}/${quiz._id}/attempt`,
      );

      return;
    }

    router.push(
      `/user/practice/quiz/${categorySlug}/${topicSlug}/${quiz._id}/review?attemptId=${attemptState.attemptId}`,
    );
  }

  return (
    <>
      <div className="p-[clamp(16px,4vw,28px)]">
        <div className="mb-8">
          <h1 className="m-0 font-[family-name:var(--font-syne,sans-serif)] text-[clamp(20px,4vw,24px)] font-extrabold text-[var(--text)]">
            {dbSubcategory}
          </h1>

          <p className="mt-1 text-sm text-[var(--muted2)]">
            Select a quiz to attempt
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] text-red-400">
            {error}
          </div>
        )}

        <div className="mb-3 hidden grid-cols-[minmax(300px,1fr)_160px_160px_140px] xl:gap-x-4 items-center border-b border-[var(--border)] px-6 pb-3 xl:grid">
          {[
            "TITLE",
            "DURATION",
            "ENTRY FEE",
            "STATUS",
          ].map((heading) => (
            <span
              key={heading}
              className="text-[11px] font-semibold tracking-[0.08em] text-[var(--muted)]"
            >
              {heading}
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
              const attemptState =
                getQuizAttemptState(
                  quiz._id,
                  attemptStatusMap,
                );

              const actionLabel =
                getQuizActionLabel(attemptState);

              const actionButtonClass =
                getActionButtonClass(attemptState);

              return (
                <div
                  key={quiz._id}
                  className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-4 transition duration-200 hover:border-[var(--orange)]/50 hover:shadow-[0_4px_16px_rgba(241,90,34,0.08)] xl:grid-cols-[minmax(300px,1fr)_160px_160px_140px] xl:items-center xl:px-6 xl:py-5"
                >
                  {/* Title */}
                  <div className="min-w-0 xl:col-start-1">
                    <p className="m-0 truncate text-[15px] font-semibold text-[var(--text)]">
                      {quiz.title}
                    </p>

                    {/* {quiz.description && ( 
                      <p className="mb-0 mt-1.5 line-clamp-1 text-xs text-[var(--muted2)]">
                        {quiz.description}
                      </p>
                    )}
                      */}
                  </div>

                  {/* Status button on mobile */}
                  <div className="col-start-2 row-start-1 flex items-center justify-end xl:hidden">
                    <button
                      type="button"
                      onClick={() => handleQuizAction(quiz)}
                      className={`min-w-[104px] cursor-pointer whitespace-nowrap rounded-lg px-4 py-2.5 text-[13px] font-semibold transition ${actionButtonClass}`}
                    >
                      {actionLabel}
                    </button>
                  </div>

                  {/* Mobile details */}
                  <div className="col-span-2 grid grid-cols-2 gap-3 border-t border-[var(--border)] pt-4 xl:hidden">
                    <div>
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--muted)]">
                        Duration
                      </p>
                      <p className="m-0 text-[13px] text-[var(--muted2)]">
                        {formatDuration(quiz.duration)}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--muted)]">
                        Entry fee
                      </p>
                      <div className="flex items-center gap-1.5 text-[13px] font-semibold text-orange-400">
                        <Coins className="size-4" strokeWidth={1.8} />
                        <span>{quizCost} Coins</span>
                      </div>
                    </div>
                  </div>

                  {/* Desktop duration */}
                  <p className="m-0 hidden text-[13px] text-[var(--muted2)] xl:col-start-2 xl:block">
                    {formatDuration(quiz.duration)}
                  </p>

                  {/* Desktop entry fee */}
                  <div className="hidden items-center gap-1.5 text-[13px] font-semibold text-orange-400 xl:col-start-3 xl:flex">
                    <Coins className="size-4" strokeWidth={1.8} />
                    <span>{quizCost} Coins</span>
                  </div>

                  {/* Desktop status */}
                  <div className="hidden justify-start xl:col-start-4 xl:flex">
                    <button
                      type="button"
                      onClick={() => handleQuizAction(quiz)}
                      className={`min-w-[104px] cursor-pointer whitespace-nowrap rounded-lg px-4 py-2.5 text-[13px] font-semibold transition ${actionButtonClass}`}
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
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/75 p-4 backdrop-blur-[4px]"
        >
          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            className="flex max-h-[90vh] w-full max-w-[480px] flex-col gap-5 overflow-y-auto rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-[clamp(20px,5vw,32px)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="m-0 text-[clamp(16px,4vw,20px)] font-bold text-[var(--text)]">
                  {selectedQuiz.title}
                </h2>

                <p className="mb-0 mt-1 text-[13px] text-[var(--muted2)]">
                  Duration:{" "}
                  {formatDuration(
                    selectedQuiz.duration,
                  )}
                </p>

                <p className="mb-0 mt-1 text-[13px] text-[var(--muted2)]">
                  Total marks:{" "}
                  {selectedQuiz.totalMarks}
                </p>

                {selectedQuiz.numberOfQuestions ? (
                  <p className="mb-0 mt-1 text-[13px] text-[var(--muted2)]">
                    Questions:{" "}
                    {
                      selectedQuiz.numberOfQuestions
                    }
                  </p>
                ) : null}
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close quiz details"
                className="shrink-0 cursor-pointer border-none bg-transparent px-1 py-0 text-2xl leading-none text-[var(--muted2)] transition hover:text-[var(--text)]"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-3">
                <p className="mb-1 text-[11px] text-[var(--muted2)]">
                  Entry fee
                </p>

                <div className="flex items-center gap-1.5 text-sm font-semibold text-orange-400">
                  <Coins className="size-4" />
                  {quizCost} Coins
                </div>
              </div>
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
                {RULES.map((rule) => (
                  <li
                    key={rule}
                    className="text-[13px] leading-[1.6] text-[var(--muted2)]"
                  >
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            <label
              className={`flex cursor-pointer items-start gap-2.5 rounded-[10px] border px-4 py-3.5 transition ${
                agreed
                  ? "border-[var(--orange)] bg-[rgba(241,90,34,0.08)]"
                  : "border-[var(--border)]"
              }`}
            >
              <input
                type="checkbox"
                checked={agreed}
                onChange={(event) =>
                  setAgreed(
                    event.target.checked,
                  )
                }
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[var(--orange)]"
              />

              <span className="text-[13px] leading-[1.5] text-[var(--text)]">
                I have read and understood all the
                rules. I am ready to start the quiz.
              </span>
            </label>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 cursor-pointer rounded-[10px] border border-[var(--border)] bg-transparent p-3 text-sm font-medium text-[var(--muted2)] transition hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={!agreed}
                onClick={handleStartQuiz}
                className="flex-[2] rounded-[10px] border p-3 text-sm font-bold transition"
                style={{
                  background: agreed
                    ? "var(--orange)"
                    : "transparent",
                  borderColor: agreed
                    ? "var(--orange)"
                    : "var(--border)",
                  color: agreed
                    ? "#ffffff"
                    : "var(--muted)",
                  cursor: agreed
                    ? "pointer"
                    : "not-allowed",
                  opacity: agreed ? 1 : 0.5,
                }}
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      <InsufficientCoinsDialog
        isOpen={showInsufficientDialog}
        onClose={() =>
          setShowInsufficientDialog(false)
        }
        requiredCoins={quizCost}
        onRetry={() => {
          setShowInsufficientDialog(false);

          if (selectedQuiz) {
            openModal(selectedQuiz);
          }
        }}
      />
    </>
  );
}