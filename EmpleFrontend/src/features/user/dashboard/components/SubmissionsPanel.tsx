"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSessionToken } from "@descope/nextjs-sdk/client";
import EmptyState from "@/shared/components/ui/EmptyState";
import { FileText } from "lucide-react";

type Tab = "Test" | "Quiz";

type SubmissionItem = {
  attemptId: string;
  quizId: string;
  quizTitle: string;
  category: string;
  subcategory: string;
  totalMarks: number;
  totalMarksObtained: number;
  totalQuestions: number;
  status: "submitted" | "auto_submitted";
  submittedAt?: string;
};

type AttemptsResponse = {
  success: boolean;
  message: string;
  data: SubmissionItem[];
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function formatDate(value?: string) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

function slugify(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}

function getReviewPath(item: SubmissionItem) {
  return `/user/practice/quiz/${slugify(item.category)}/${slugify(
    item.subcategory
  )}/${item.quizId}/review?attemptId=${item.attemptId}`;
}

export default function SubmissionsPanel({
  isExpanded,
  onToggleExpand,
}: {
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}) {
  const router = useRouter();

  const [active, setActive] = useState<Tab>("Quiz");
  const [submissions, setSubmissions] = useState<SubmissionItem[]>([]);
  const [loading, setLoading] = useState(true);

  const handleTabChange = (tab: Tab) => {
    setActive(tab);
  };

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        setLoading(true);

        if (active === "Test") {
          setSubmissions([]);
          return;
        }

        const token = getSessionToken();

        const res = await fetch(`${API_BASE}/api/v1/quiz-attempts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: "include",
          cache: "no-store",
        });

        const result: AttemptsResponse = await res.json();

        if (!res.ok) {
          throw new Error(result.message || "Failed to fetch submissions");
        }

        setSubmissions(result.data || []);
      } catch (error) {
        console.error(error);
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    };

    void fetchAttempts();
  }, [active]);

  const visibleSubmissions = isExpanded ? submissions : submissions.slice(0, 5);

  return (
    <div
      className="rounded-[16px]"
      style={{
        padding: "clamp(14px, 4vw, 22px)",
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      <div
        className="flex flex-wrap items-center justify-between gap-y-3"
        style={{ marginBottom: "clamp(12px, 3vw, 18px)" }}
      >
        <div
          className="font-syne font-bold"
          style={{
            fontSize: "clamp(13px, 3.5vw, 15px)",
            color: "var(--text)",
          }}
        >
          Submissions
        </div>

        <div
          className="flex rounded-[25px] p-[3px] gap-[2px]"
          style={{
            background: "var(--surface2)",
            border: "1px solid var(--border)",
          }}
        >
          {(["Test", "Quiz"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className="rounded-[22px] border-none font-medium transition-all duration-200"
              style={{
                padding: "clamp(4px, 1.2vw, 6px) clamp(10px, 3vw, 18px)",
                fontSize: "clamp(10px, 2.5vw, 12.5px)",
                background: active === tab ? "var(--orange)" : "transparent",
                color: active === tab ? "#fff" : "var(--muted2)",
                boxShadow:
                  active === tab
                    ? "0 2px 10px rgba(241,90,34,0.35)"
                    : "none",
                cursor: "pointer",
              }}
            >
              {tab} Submissions
            </button>
          ))}
        </div>
      </div>

      <div
        className="mb-[6px] hidden rounded-[8px] text-[10.5px] font-bold uppercase tracking-[0.06em] sm:grid"
        style={{
          gridTemplateColumns: "1fr 100px 90px 80px",
          padding: "clamp(6px, 1.5vw, 8px) clamp(10px, 3vw, 14px)",
          color: "var(--muted)",
          background: "var(--surface2)",
        }}
      >
        <span>Title</span>
        <span className="text-center">Score</span>
        <span className="text-center">Date</span>
        <span className="text-center">Review</span>
      </div>

      <div className="flex flex-col gap-[6px]">
        {loading ? (
          <div
            className="rounded-[10px] p-4 text-sm"
            style={{
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              color: "var(--muted2)",
            }}
          >
            Loading submissions...
          </div>
        ) : active === "Test" ? (
          <div className="py-2">
            <EmptyState
              title="No Test Submissions"
              description="Test submissions are not connected yet."
              icon={<FileText size={20} />}
            />
          </div>
        ) : visibleSubmissions.length === 0 ? (
          <div className="py-2">
            <EmptyState
              title="No Submissions"
              description="No submissions available."
              icon={<FileText size={20} />}
            />
          </div>
        ) : (
          visibleSubmissions.map((item) => {
            const score = `${item.totalMarksObtained}/${item.totalMarks}`;

            return (
              <div
                key={item.attemptId}
                className="rounded-[10px] transition-all duration-150"
                style={{
                  padding: "clamp(8px, 2vw, 10px) clamp(10px, 3vw, 14px)",
                  background: "var(--surface2)",
                  border: "1px solid var(--border)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(241,90,34,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                <div
                  className="hidden items-center sm:grid"
                  style={{ gridTemplateColumns: "1fr 100px 90px 80px" }}
                >
                  <div>
                    <div
                      className="font-semibold"
                      style={{
                        fontSize: "clamp(11px, 2.8vw, 13px)",
                        color: "var(--text)",
                      }}
                    >
                      {item.quizTitle}
                    </div>
                    <div
                      style={{
                        fontSize: "clamp(9px, 2.2vw, 11px)",
                        color: "var(--muted)",
                      }}
                    >
                      {item.category} · {item.subcategory}
                    </div>
                  </div>

                  <div
                    className="text-center font-bold"
                    style={{
                      fontSize: "clamp(11px, 2.8vw, 13px)",
                      color: "#ff9a5c",
                    }}
                  >
                    {score}
                  </div>

                  <div
                    className="text-center"
                    style={{
                      fontSize: "clamp(10px, 2.5vw, 12px)",
                      color: "var(--muted2)",
                    }}
                  >
                    {formatDate(item.submittedAt)}
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() => router.push(getReviewPath(item))}
                      className="rounded-[20px] font-semibold transition-all duration-150 hover:-translate-y-[1px]"
                      style={{
                        fontSize: "clamp(10px, 2.5vw, 11.5px)",
                        padding: "4px clamp(8px, 2vw, 12px)",
                        background: "var(--surface)",
                        color: "var(--muted2)",
                        border: "1px solid var(--border)",
                        cursor: "pointer",
                      }}
                    >
                      Review
                    </button>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-3 sm:hidden">
                  <div className="min-w-0 flex-1">
                    <div
                      className="truncate font-semibold"
                      style={{
                        fontSize: "clamp(11px, 3.5vw, 13px)",
                        color: "var(--text)",
                      }}
                    >
                      {item.quizTitle}
                    </div>

                    <div
                      className="mt-[4px] flex flex-wrap items-center gap-2"
                      style={{
                        fontSize: "clamp(9px, 2.5vw, 11px)",
                        color: "var(--muted)",
                      }}
                    >
                      <span>{formatDate(item.submittedAt)}</span>
                      <span style={{ color: "#ff9a5c", fontWeight: 700 }}>
                        {score}
                      </span>
                      <span>{item.subcategory}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push(getReviewPath(item))}
                    className="flex-shrink-0 rounded-[20px] font-semibold transition-all duration-150"
                    style={{
                      fontSize: "11px",
                      padding: "4px 10px",
                      background: "var(--surface)",
                      color: "var(--muted2)",
                      border: "1px solid var(--border)",
                      cursor: "pointer",
                    }}
                  >
                    Review
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {(submissions.length > 5 || isExpanded) && active === "Quiz" && (
        <div style={{ marginTop: "clamp(10px, 2.5vw, 14px)" }}>
          <button
            onClick={() => onToggleExpand && onToggleExpand()}
            className="rounded-[20px] font-semibold transition-all duration-200 hover:-translate-y-[1px]"
            style={{
              fontSize: "clamp(10px, 2.5vw, 12px)",
              padding: "clamp(6px, 1.5vw, 8px) clamp(14px, 3.5vw, 20px)",
              background: "var(--surface2)",
              color: "var(--muted2)",
              border: "1.5px solid var(--border)",
              cursor: "pointer",
            }}
          >
            {isExpanded ? "View Less" : "View All"}
          </button>
        </div>
      )}
    </div>
  );
}