"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Question = { id: number; type: "mcq" | "multi"; text: string; options: string[] };

const QUESTIONS: Question[] = [
  { id: 1,  type: "mcq",   text: "What is the time complexity of binary search?",                          options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"] },
  { id: 2,  type: "mcq",   text: "Which data structure uses LIFO order?",                                  options: ["Queue", "Stack", "Linked List", "Tree"] },
  { id: 3,  type: "multi", text: "Which of the following are sorting algorithms? (Select all that apply)", options: ["Merge Sort", "Binary Search", "Quick Sort", "Bubble Sort"] },
  { id: 4,  type: "mcq",   text: "What does CPU stand for?",                                               options: ["Central Processing Unit", "Core Processing Unit", "Central Program Utility", "Computed Processing Unit"] },
  { id: 5,  type: "mcq",   text: "Which layer of the OSI model handles routing?",                          options: ["Data Link", "Transport", "Network", "Session"] },
  { id: 6,  type: "multi", text: "Which are valid HTTP methods? (Select all that apply)",                  options: ["GET", "PUSH", "POST", "DELETE"] },
  { id: 7,  type: "mcq",   text: "What is a deadlock in operating systems?",                               options: ["A process waiting indefinitely", "A memory overflow", "A CPU scheduling error", "A network timeout"] },
  { id: 8,  type: "mcq",   text: "Which normal form eliminates transitive dependencies?",                  options: ["1NF", "2NF", "3NF", "BCNF"] },
  { id: 9,  type: "mcq",   text: "What is the base of the hexadecimal number system?",                     options: ["8", "10", "16", "2"] },
  { id: 10, type: "multi", text: "Which are types of joins in SQL? (Select all that apply)",               options: ["INNER JOIN", "OUTER JOIN", "CROSS JOIN", "LOOP JOIN"] },
];

type Status = "not-visited" | "not-attempted" | "answered" | "flagged";

const SC: Record<Status, { bg: string; color: string; border: string }> = {
  "not-visited":   { bg: "transparent", color: "var(--text)",  border: "var(--border, rgba(255,255,255,0.07))" },
  "not-attempted": { bg: "#1e3a5f",     color: "#60a5fa",      border: "#3b82f6" },
  answered:        { bg: "#14532d",     color: "#4ade80",      border: "#22c55e" },
  flagged:         { bg: "#450a0a",     color: "#f87171",      border: "#ef4444" },
};

const LEGEND: { label: string; status: Status }[] = [
  { label: "Answered",      status: "answered" },
  { label: "Not Attempted", status: "not-attempted" },
  { label: "Not Visited",   status: "not-visited" },
  { label: "Flagged",       status: "flagged" },
];

export default function QuizAttemptPage() {
  const router = useRouter();
  const [current, setCurrent]         = useState(0);
  const [answers, setAnswers]         = useState<Record<number, string[]>>({});
  const [statuses, setStatuses]       = useState<Record<number, Status>>({});
  const [flagged, setFlagged]         = useState<Record<number, boolean>>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const q        = QUESTIONS[current];
  const selected = answers[current] ?? [];

  function getStatus(idx: number): Status {
    if (flagged[idx])         return "flagged";
    if (answers[idx]?.length) return "answered";
    if (statuses[idx])        return statuses[idx];
    return "not-visited";
  }

  function handleOption(option: string) {
    setAnswers((prev) => {
      const cur = prev[current] ?? [];
      return {
        ...prev,
        [current]: q.type === "mcq"
          ? cur[0] === option ? [] : [option]
          : cur.includes(option) ? cur.filter((o) => o !== option) : [...cur, option],
      };
    });
    setStatuses((prev) => ({ ...prev, [current]: "answered" }));
  }

  function goTo(idx: number) {
    if (!answers[current]?.length && !statuses[current])
      setStatuses((prev) => ({ ...prev, [current]: "not-attempted" }));
    setCurrent(idx);
    setSidebarOpen(false);
  }

  function toggleFlag() {
    setFlagged((prev) => ({ ...prev, [current]: !prev[current] }));
  }

  const Panel = () => (
    <div style={{
      display: "flex", flexDirection: "column", gap: "16px",
      background: "var(--surface, #161820)",
      border: "1px solid var(--border, rgba(255,255,255,0.07))",
      borderRadius: "16px", padding: "20px",
      height: "100%", boxSizing: "border-box",
    }}>
      <p style={{ margin: 0, fontSize: "11px", fontWeight: 600, color: "var(--muted, #666)", letterSpacing: "0.08em" }}>
        QUESTIONS
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px" }}>
        {QUESTIONS.map((_, idx) => {
          const s = getStatus(idx);
          const c = SC[s];
          const active = idx === current;
          return (
            <button key={idx} onClick={() => goTo(idx)} style={{
              aspectRatio: "1", borderRadius: "8px", fontSize: "13px",
              fontWeight: active ? 700 : 500,
              background: active ? "var(--orange, #f15a22)" : c.bg,
              color:      active ? "#fff" : c.color,
              border:     `1px solid ${active ? "var(--orange, #f15a22)" : c.border}`,
              cursor: "pointer", transition: "all 0.15s ease",
            }}>
              {idx + 1}
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {LEGEND.map(({ label, status }) => {
          const c = SC[status];
          return (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "12px", height: "12px", borderRadius: "3px", flexShrink: 0,
                background: c.bg || "var(--surface2, #1e2028)",
                border: `1px solid ${c.border}`,
              }} />
              <span style={{ fontSize: "12px", color: "var(--muted2, #8a8a9a)" }}>{label}</span>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: "auto" }}>
        <button
          onClick={() => router.back()}
          style={{
            width: "100%", background: "var(--orange, #f15a22)", border: "none",
            color: "#fff", borderRadius: "10px", padding: "12px",
            fontSize: "14px", fontWeight: 700, cursor: "pointer", transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--orange-hover, #e04d18)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--orange, #f15a22)")}
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        .ql {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          padding: 20px 24px;
          height: calc(100vh - 60px);
          max-width: calc(1280px - 276px);
          margin: 0 auto 0 0;
          width: 100%;
        }
        .qm {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .qm-inner {
          flex: 1;
          overflow-y: auto;
          padding-right: 2px;
        }
        .qm-nav {
          flex-shrink: 0;
          display: flex;
          justify-content: space-between;
          padding-top: 16px;
        }
        .qs {
          display: block;
          position: fixed;
          top: 60px;
          right: 0;
          width: 256px;
          height: calc(100vh - 60px);
          padding: 20px;
          box-sizing: border-box;
        }
        .mob-btn { display: none !important; }
        .mob-overlay { display: none; }
        .opt:hover {
          border-color: var(--orange, #f15a22) !important;
          background: rgba(241,90,34,0.07) !important;
        }
        @media (max-width: 768px) {
          .ql {
            grid-template-columns: 1fr;
            height: auto;
            min-height: calc(100vh - 60px);
            padding: 12px 16px;
            max-width: 100%;
            margin: 0;
          }
          .qm { height: auto; }
          .qm-inner { overflow-y: visible; }
          .qs { display: none; }
          .mob-btn { display: flex !important; }
          .mob-overlay { display: flex; }
        }
      `}</style>

      {/* Navbar */}
      <nav style={{
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        background: "var(--surface, #161820)",
        borderBottom: "1px solid var(--border, rgba(255,255,255,0.07))",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <div className="flex items-center">
            <img src="/logo-final.png" className="h-[75px] w-auto" />
          </div>

          <button
            className="mob-btn"
            onClick={() => setSidebarOpen(true)}
            style={{
              marginLeft: "auto",
              background: "var(--surface2, #1e2028)",
              border: "1px solid var(--border, rgba(255,255,255,0.07))",
              color: "var(--text, #f0f0f4)",
              borderRadius: "8px",
              padding: "6px 14px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              alignItems: "center",
              gap: "6px",
            }}
          >
            📋 Questions
          </button>
        </div>
      </nav>

      {/* Outer centering wrapper */}
      <div style={{ display: "flex" }}>
        <div className="ql">

          {/* Main column */}
          <div className="qm">
            <div className="qm-inner">
              <div style={{
                background: "var(--surface, #161820)",
                border: "1px solid var(--border, rgba(255,255,255,0.07))",
                borderRadius: "16px", padding: "clamp(16px,4vw,28px)",
                display: "flex", flexDirection: "column", gap: "20px",
              }}>
                {/* Q header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--orange, #f15a22)", letterSpacing: "0.08em" }}>
                    Q{current + 1} / {QUESTIONS.length}
                    <span style={{ marginLeft: "8px", fontSize: "11px", color: "var(--muted2, #8a8a9a)", fontWeight: 400, letterSpacing: 0 }}>
                      {q.type === "mcq" ? "Single correct" : "Multiple correct"}
                    </span>
                  </span>
                  <button onClick={toggleFlag} style={{
                    background: flagged[current] ? "rgba(239,68,68,0.1)" : "transparent",
                    border: `1px solid ${flagged[current] ? "#ef4444" : "var(--border, rgba(255,255,255,0.07))"}`,
                    color: flagged[current] ? "#ef4444" : "var(--muted2, #8a8a9a)",
                    borderRadius: "8px", padding: "5px 12px",
                    fontSize: "12px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
                  }}>
                    {flagged[current] ? "🚩 Flagged" : "🏳 Flag"}
                  </button>
                </div>

                {/* Question text */}
                <p style={{
                  margin: 0, fontSize: "clamp(15px,2.5vw,17px)",
                  fontWeight: 500, color: "var(--text, #f0f0f4)", lineHeight: 1.7,
                }}>
                  {q.text}
                </p>

                {/* Options */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {q.options.map((opt, i) => {
                    const sel = selected.includes(opt);
                    return (
                      <div key={i} className="opt" onClick={() => handleOption(opt)} style={{
                        display: "flex", alignItems: "center", gap: "14px",
                        padding: "14px 18px", borderRadius: "12px", cursor: "pointer",
                        border: `1px solid ${sel ? "var(--orange, #f15a22)" : "var(--border, rgba(255,255,255,0.07))"}`,
                        background: sel ? "rgba(241,90,34,0.08)" : "var(--surface2, #1e2028)",
                        transition: "all 0.15s ease",
                      }}>
                        {q.type === "mcq" ? (
                          <div style={{
                            width: "18px", height: "18px", borderRadius: "50%", flexShrink: 0,
                            border: `2px solid ${sel ? "var(--orange, #f15a22)" : "var(--muted, #666)"}`,
                            background: sel ? "var(--orange, #f15a22)" : "transparent",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "all 0.15s",
                          }}>
                            {sel && <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fff" }} />}
                          </div>
                        ) : (
                          <div style={{
                            width: "18px", height: "18px", borderRadius: "4px", flexShrink: 0,
                            border: `2px solid ${sel ? "var(--orange, #f15a22)" : "var(--muted, #666)"}`,
                            background: sel ? "var(--orange, #f15a22)" : "transparent",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "all 0.15s",
                          }}>
                            {sel && (
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M1.5 5L4 7.5L8.5 2.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                        )}
                        <span style={{ fontSize: "14px", color: sel ? "var(--text, #f0f0f4)" : "var(--muted2, #8a8a9a)", lineHeight: 1.4 }}>
                          {opt}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Nav buttons pinned to bottom */}
            <div className="qm-nav">
              <button
                onClick={() => goTo(current - 1)} disabled={current === 0}
                style={{
                  background: "var(--surface, #161820)",
                  border: "1px solid var(--border, rgba(255,255,255,0.07))",
                  color: "var(--text, #f0f0f4)", borderRadius: "10px", padding: "10px 24px",
                  fontSize: "14px", fontWeight: 600,
                  cursor: current === 0 ? "not-allowed" : "pointer",
                  opacity: current === 0 ? 0.4 : 1, transition: "all 0.2s",
                }}
              >
                ← Previous
              </button>
              <button
                onClick={() => goTo(current + 1)} disabled={current === QUESTIONS.length - 1}
                style={{
                  background: "var(--surface, #161820)",
                  border: "1px solid var(--border, rgba(255,255,255,0.07))",
                  color: "var(--text, #f0f0f4)", borderRadius: "10px", padding: "10px 24px",
                  fontSize: "14px", fontWeight: 600,
                  cursor: current === QUESTIONS.length - 1 ? "not-allowed" : "pointer",
                  opacity: current === QUESTIONS.length - 1 ? 0.4 : 1, transition: "all 0.2s",
                }}
              >
                Next →
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Desktop sidebar — fixed to right of viewport */}
      <div className="qs"><Panel /></div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="mob-overlay" onClick={() => setSidebarOpen(false)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(4px)", zIndex: 200,
          alignItems: "flex-end", justifyContent: "center", padding: "16px",
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            width: "100%", maxWidth: "400px", maxHeight: "80vh",
            overflowY: "auto", borderRadius: "20px",
          }}>
            <Panel />
          </div>
        </div>
      )}
    </>
  );
}