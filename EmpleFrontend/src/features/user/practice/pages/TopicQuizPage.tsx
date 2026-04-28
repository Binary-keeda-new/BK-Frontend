"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";

type QuizItem = {
  _id: string;
  title: string;
  description?: string;
  category: string;
  subcategory: string;
  totalMarks: number;
  duration?: number;
};

type QuizListResponse = {
  success: boolean;
  message: string;
  data: QuizItem[];
};

const API_BASE = "http://localhost:5000/api/v1/admin";

const RULES = [
  "Each question carries equal marks.",
  "There is no negative marking.",
  "You cannot go back to a previous question.",
  "Do not refresh or close the tab during the quiz.",
  "The quiz will auto-submit when the timer runs out.",
  "Results will be shown immediately after submission.",
];

function formatTopicName(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function mapTopicSlugToCategory(slug: string) {
  const normalized = slug.toLowerCase();

  if (normalized === "core-cs") return "Core CS";
  if (normalized === "aptitude") return "Aptitude";
  if (normalized === "it-concepts") return "IT Concepts";
  if (normalized === "upsc" || normalized === "upsc-mapping") return "UPSC Mapping";
  if (normalized === "constitution") return "Constitution";

  return formatTopicName(slug);
}

function formatDuration(minutes?: number) {
  if (!minutes || minutes <= 0) return "20 mins";
  return `${minutes} mins`;
}

export default function TopicQuizPage() {
  const router = useRouter();
  const params = useParams();

  const topicSlug = (params?.topic as string) ?? "topic";
  const topic = formatTopicName(topicSlug);
  const category = mapTopicSlugToCategory(topicSlug);

  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState<QuizItem | null>(null);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams({
          page: "1",
          limit: "100",
          category,
        });

        const res = await fetch(`${API_BASE}/quizzes?${params.toString()}`, {
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

        setQuizzes(result.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load quizzes");
        setQuizzes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [category]);

  const visibleQuizzes = useMemo(() => {
    return quizzes.filter((quiz) => quiz.category === category);
  }, [quizzes, category]);

  function openModal(quiz: QuizItem) {
    setSelectedQuiz(quiz);
    setAgreed(false);
  }

  function closeModal() {
    setSelectedQuiz(null);
    setAgreed(false);
  }

  return (
    <>
      <style>{`
        .tqp-row {
          display: grid;
          grid-template-columns: 1fr 140px 160px;
          align-items: center;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 18px 24px;
          transition: border 0.2s ease, box-shadow 0.2s ease;
        }
        .tqp-row:hover {
          border-color: var(--orange) !important;
          box-shadow: 0 4px 16px rgba(241,90,34,0.12);
        }
        .tqp-col-headers {
          display: grid;
          grid-template-columns: 1fr 140px 160px;
          padding: 0 24px 10px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 12px;
        }
        @media (max-width: 580px) {
          .tqp-col-headers { display: none; }
          .tqp-row {
            grid-template-columns: 1fr auto;
            grid-template-rows: auto auto;
            gap: 6px 12px;
            padding: 14px 16px;
          }
          .tqp-title  { grid-column: 1; grid-row: 1; }
          .tqp-dur    { grid-column: 1; grid-row: 2; }
          .tqp-btn    { grid-column: 2; grid-row: 1 / 3; align-self: center; }
        }
      `}</style>

      <div style={{ padding: "clamp(16px, 4vw, 28px)" }}>
        <div style={{ marginBottom: "28px" }}>
          <h1
            style={{
              fontFamily: "var(--font-syne, sans-serif)",
              fontSize: "clamp(20px, 4vw, 24px)",
              fontWeight: 800,
              color: "var(--text)",
              margin: 0,
            }}
          >
            {topic}
          </h1>
          <p
            style={{
              color: "var(--muted2)",
              fontSize: "14px",
              marginTop: "4px",
            }}
          >
            Select a quiz to attempt
          </p>
        </div>

        {error && (
          <div
            style={{
              marginBottom: "16px",
              padding: "12px 14px",
              borderRadius: "12px",
              border: "1px solid rgba(239,68,68,0.35)",
              background: "rgba(239,68,68,0.08)",
              color: "#ef4444",
              fontSize: "13px",
            }}
          >
            {error}
          </div>
        )}

        <div className="tqp-col-headers">
          {["TITLE", "DURATION", ""].map((h) => (
            <span
              key={h}
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--muted)",
                letterSpacing: "0.08em",
              }}
            >
              {h}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {loading ? (
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "20px",
                color: "var(--muted2)",
                fontSize: "14px",
              }}
            >
              Loading quizzes...
            </div>
          ) : visibleQuizzes.length === 0 ? (
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "20px",
                color: "var(--muted2)",
                fontSize: "14px",
              }}
            >
              No quizzes available for this topic yet.
            </div>
          ) : (
            visibleQuizzes.map((quiz) => (
              <div key={quiz._id} className="tqp-row">
                <div className="tqp-title">
                  <p
                    style={{
                      margin: 0,
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "var(--text)",
                    }}
                  >
                    {quiz.title}
                  </p>
                  {quiz.subcategory && (
                    <p
                      style={{
                        margin: "4px 0 0",
                        fontSize: "12px",
                        color: "var(--muted2)",
                      }}
                    >
                      {quiz.subcategory}
                    </p>
                  )}
                </div>

                <p
                  className="tqp-dur"
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    color: "var(--muted2)",
                  }}
                >
                  {formatDuration(quiz.duration)}
                </p>

                <div
                  className="tqp-btn"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <button
                    onClick={() => openModal(quiz)}
                    style={{
                      background: "var(--orange)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      padding: "8px 18px",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "var(--orange-hover)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "var(--orange)")
                    }
                  >
                    Attempt →
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedQuiz && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            backdropFilter: "blur(4px)",
            padding: "16px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "20px",
              padding: "clamp(20px, 5vw, 32px)",
              width: "100%",
              maxWidth: "480px",
              maxHeight: "90vh",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "clamp(16px, 4vw, 20px)",
                    fontWeight: 700,
                    color: "var(--text)",
                  }}
                >
                  {selectedQuiz.title}
                </h2>
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: "13px",
                    color: "var(--muted2)",
                  }}
                >
                  Duration: {formatDuration(selectedQuiz.duration)}
                </p>
              </div>

              <button
                onClick={closeModal}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--muted2)",
                  fontSize: "24px",
                  cursor: "pointer",
                  lineHeight: 1,
                  padding: "0 4px",
                  flexShrink: 0,
                }}
              >
                ×
              </button>
            </div>

            <div
              style={{
                background: "var(--surface2, #1e2028)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "20px",
              }}
            >
              <p
                style={{
                  margin: "0 0 12px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--orange)",
                  letterSpacing: "0.06em",
                }}
              >
                📋 QUIZ RULES
              </p>

              <ul
                style={{
                  margin: 0,
                  paddingLeft: "18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {RULES.map((rule, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: "13px",
                      color: "var(--muted2)",
                      lineHeight: 1.6,
                    }}
                  >
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                cursor: "pointer",
                padding: "14px 16px",
                borderRadius: "10px",
                border: `1px solid ${agreed ? "var(--orange)" : "var(--border)"}`,
                background: agreed ? "rgba(241,90,34,0.08)" : "transparent",
                transition: "all 0.2s ease",
              }}
            >
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                style={{
                  marginTop: "2px",
                  accentColor: "var(--orange)",
                  width: "16px",
                  height: "16px",
                  flexShrink: 0,
                  cursor: "pointer",
                }}
              />
              <span
                style={{
                  fontSize: "13px",
                  color: "var(--text)",
                  lineHeight: 1.5,
                }}
              >
                I have read and understood all the rules. I am ready to start the quiz.
              </span>
            </label>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={closeModal}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "1px solid var(--border)",
                  color: "var(--muted2)",
                  borderRadius: "10px",
                  padding: "12px",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "border 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "var(--muted2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "var(--border)")
                }
              >
                Cancel
              </button>

              <button
                disabled={!agreed}
                onClick={() =>
                  router.push(`/user/practice/quiz/${topicSlug}/${selectedQuiz._id}/attempt`)
                }
                style={{
                  flex: 2,
                  background: agreed ? "var(--orange)" : "transparent",
                  border: `1px solid ${agreed ? "var(--orange)" : "var(--border)"}`,
                  color: agreed ? "#fff" : "var(--muted)",
                  borderRadius: "10px",
                  padding: "12px",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: agreed ? "pointer" : "not-allowed",
                  transition: "all 0.25s ease",
                  opacity: agreed ? 1 : 0.5,
                }}
                onMouseEnter={(e) => {
                  if (agreed) e.currentTarget.style.background = "var(--orange-hover)";
                }}
                onMouseLeave={(e) => {
                  if (agreed) e.currentTarget.style.background = "var(--orange)";
                }}
              >
                Start Quiz →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}