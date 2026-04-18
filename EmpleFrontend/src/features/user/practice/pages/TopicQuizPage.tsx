"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

const QUIZZES = [
  { title: "Quiz 1 – Basics", duration: "15 mins", slug: "quiz-1" },
  { title: "Quiz 2 – Intermediate", duration: "20 mins", slug: "quiz-2" },
  { title: "Quiz 3 – Advanced", duration: "25 mins", slug: "quiz-3" },
  { title: "Quiz 4 – Mixed Bag", duration: "20 mins", slug: "quiz-4" },
];

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

export default function TopicQuizPage() {
  const router = useRouter();
  const params = useParams();
  const topic = formatTopicName((params?.topic as string) ?? "topic");

  const [selectedQuiz, setSelectedQuiz] = useState<(typeof QUIZZES)[0] | null>(null);
  const [agreed, setAgreed] = useState(false);

  function openModal(quiz: (typeof QUIZZES)[0]) {
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
        {/* Page Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{
            fontFamily: "var(--font-syne, sans-serif)",
            fontSize: "clamp(20px, 4vw, 24px)",
            fontWeight: 800,
            color: "var(--text)",
            margin: 0,
          }}>
            {topic}
          </h1>
          <p style={{ color: "var(--muted2)", fontSize: "14px", marginTop: "4px" }}>
            Select a quiz to attempt
          </p>
        </div>

        {/* Column Headers */}
        <div className="tqp-col-headers">
          {["TITLE", "DURATION", ""].map((h) => (
            <span key={h} style={{ fontSize: "11px", fontWeight: 600, color: "var(--muted)", letterSpacing: "0.08em" }}>
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {QUIZZES.map((quiz) => (
            <div key={quiz.slug} className="tqp-row">
              <p className="tqp-title" style={{ margin: 0, fontSize: "15px", fontWeight: 600, color: "var(--text)" }}>
                {quiz.title}
              </p>
              <p className="tqp-dur" style={{ margin: 0, fontSize: "13px", color: "var(--muted2)" }}>
                {quiz.duration}
              </p>
              <div className="tqp-btn" style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={() => openModal(quiz)}
                  style={{
                    background: "var(--orange)", color: "#fff", border: "none",
                    borderRadius: "8px", padding: "8px 18px", fontSize: "13px",
                    fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--orange-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "var(--orange)")}
                >
                  Attempt →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedQuiz && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.75)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1000, backdropFilter: "blur(4px)", padding: "16px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "20px",
              padding: "clamp(20px, 5vw, 32px)",
              width: "100%", maxWidth: "480px",
              maxHeight: "90vh", overflowY: "auto",
              display: "flex", flexDirection: "column", gap: "20px",
            }}
          >
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h2 style={{ margin: 0, fontSize: "clamp(16px, 4vw, 20px)", fontWeight: 700, color: "var(--text)" }}>
                  {selectedQuiz.title}
                </h2>
                <p style={{ margin: "4px 0 0", fontSize: "13px", color: "var(--muted2)" }}>
                  Duration: {selectedQuiz.duration}
                </p>
              </div>
              <button
                onClick={closeModal}
                style={{
                  background: "transparent", border: "none",
                  color: "var(--muted2)", fontSize: "24px",
                  cursor: "pointer", lineHeight: 1, padding: "0 4px", flexShrink: 0,
                }}
              >
                ×
              </button>
            </div>

            {/* Rules Box */}
            <div style={{
              background: "var(--surface2, #1e2028)",
              border: "1px solid var(--border)",
              borderRadius: "12px", padding: "20px",
            }}>
              <p style={{ margin: "0 0 12px", fontSize: "12px", fontWeight: 600, color: "var(--orange)", letterSpacing: "0.06em" }}>
                📋 QUIZ RULES
              </p>
              <ul style={{ margin: 0, paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {RULES.map((rule, i) => (
                  <li key={i} style={{ fontSize: "13px", color: "var(--muted2)", lineHeight: 1.6 }}>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            {/* Checkbox */}
            <label style={{
              display: "flex", alignItems: "flex-start", gap: "10px",
              cursor: "pointer", padding: "14px 16px", borderRadius: "10px",
              border: `1px solid ${agreed ? "var(--orange)" : "var(--border)"}`,
              background: agreed ? "rgba(241,90,34,0.08)" : "transparent",
              transition: "all 0.2s ease",
            }}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                style={{
                  marginTop: "2px", accentColor: "var(--orange)",
                  width: "16px", height: "16px", flexShrink: 0, cursor: "pointer",
                }}
              />
              <span style={{ fontSize: "13px", color: "var(--text)", lineHeight: 1.5 }}>
                I have read and understood all the rules. I am ready to start the quiz.
              </span>
            </label>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={closeModal}
                style={{
                  flex: 1, background: "transparent",
                  border: "1px solid var(--border)", color: "var(--muted2)",
                  borderRadius: "10px", padding: "12px", fontSize: "14px",
                  fontWeight: 500, cursor: "pointer", transition: "border 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--muted2)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                Cancel
              </button>
              <button
                disabled={!agreed}
                onClick={() => router.push(`/user/practice/quiz/core-cs/${params?.topic}/${selectedQuiz.slug}/attempt`)}
                style={{
                  flex: 2,
                  background: agreed ? "var(--orange)" : "transparent",
                  border: `1px solid ${agreed ? "var(--orange)" : "var(--border)"}`,
                  color: agreed ? "#fff" : "var(--muted)",
                  borderRadius: "10px", padding: "12px", fontSize: "14px",
                  fontWeight: 700,
                  cursor: agreed ? "pointer" : "not-allowed",
                  transition: "all 0.25s ease",
                  opacity: agreed ? 1 : 0.5,
                }}
                onMouseEnter={(e) => { if (agreed) e.currentTarget.style.background = "var(--orange-hover)"; }}
                onMouseLeave={(e) => { if (agreed) e.currentTarget.style.background = "var(--orange)"; }}
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