"use client";

import { useState } from "react";

type Tab = "Test" | "Quiz";

const MOCK_DATA = {
  Test: [
    { title: "Data Structures Test", score: "85/100", rank: "#4", date: "Feb 18" },
    { title: "Algorithms Test", score: "72/100", rank: "#12", date: "Feb 15" },
    { title: "OS Concepts", score: "90/100", rank: "#2", date: "Feb 10" },
    { title: "DBMS Test", score: "68/100", rank: "#18", date: "Feb 6" },
    { title: "Networks Test", score: "78/100", rank: "#9", date: "Feb 1" },
    { title: "Computer Architecture", score: "81/100", rank: "#7", date: "Jan 28" },
    { title: "Compiler Design", score: "74/100", rank: "#11", date: "Jan 22" },
    { title: "Software Engineering", score: "88/100", rank: "#3", date: "Jan 15" },
    { title: "Cloud Computing", score: "66/100", rank: "#20", date: "Jan 10" },
    { title: "Machine Learning", score: "92/100", rank: "#1", date: "Jan 5" },
  ],
  Quiz: [
    { title: "React Hooks Quiz", score: "9/10", rank: "#3", date: "Feb 19" },
    { title: "CSS Flexbox Quiz", score: "7/10", rank: "#11", date: "Feb 14" },
    { title: "JS Promises Quiz", score: "8/10", rank: "#7", date: "Feb 11" },
    { title: "TypeScript Basics", score: "6/10", rank: "#15", date: "Feb 7" },
    { title: "Next.js Routing", score: "10/10", rank: "#1", date: "Feb 2" },
    { title: "Node.js Streams", score: "7/10", rank: "#9", date: "Jan 27" },
    { title: "GraphQL Basics", score: "8/10", rank: "#5", date: "Jan 20" },
    { title: "Docker & Containers", score: "9/10", rank: "#2", date: "Jan 14" },
    { title: "REST vs GraphQL", score: "6/10", rank: "#13", date: "Jan 8" },
    { title: "Web Security Quiz", score: "5/10", rank: "#18", date: "Jan 3" },
  ],
};

export default function SubmissionsPanel() {
  const [active, setActive] = useState<Tab>("Test");
  const [visibleCount, setVisibleCount] = useState(5);

  const handleTabChange = (tab: Tab) => {
    setActive(tab);
    setVisibleCount(5);
  };

  return (
    <div
      className="rounded-[16px]"
      style={{
        padding: "clamp(14px, 4vw, 22px)",
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Header row: title + toggle */}
      <div
        className="flex items-center justify-between flex-wrap gap-y-3"
        style={{ marginBottom: "clamp(12px, 3vw, 18px)" }}
      >
        <div
          className="font-syne font-bold"
          style={{ fontSize: "clamp(13px, 3.5vw, 15px)", color: "var(--text)" }}
        >
          Submissions
        </div>

        {/* Toggle */}
        <div
          className="flex rounded-[25px] p-[3px] gap-[2px]"
          style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}
        >
          {(["Test", "Quiz"] as Tab[]).map(tab => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className="rounded-[22px] font-medium cursor-pointer border-none transition-all duration-200"
              style={{
                padding: "clamp(4px, 1.2vw, 6px) clamp(10px, 3vw, 18px)",
                fontSize: "clamp(10px, 2.5vw, 12.5px)",
                background: active === tab ? "var(--orange)" : "transparent",
                color: active === tab ? "#fff" : "var(--muted2)",
                boxShadow: active === tab ? "0 2px 10px rgba(241,90,34,0.35)" : "none",
              }}
            >
              {tab} Submissions
            </button>
          ))}
        </div>
      </div>

      {/* Table header — hidden on very small screens, shown from sm up */}
      <div
        className="hidden sm:grid text-[10.5px] font-bold uppercase tracking-[0.06em] rounded-[8px] mb-[6px]"
        style={{
          gridTemplateColumns: "1fr 100px 80px 80px",
          padding: "clamp(6px, 1.5vw, 8px) clamp(10px, 3vw, 14px)",
          color: "var(--muted)",
          background: "var(--surface2)",
        }}
      >
        <span>Title</span>
        <span className="text-center">Score</span>
        <span className="text-center">Rank</span>
        <span className="text-center">Preview</span>
      </div>

      {/* Table rows */}
      <div className="flex flex-col gap-[6px]">
        {MOCK_DATA[active].slice(0, visibleCount).map((item, i) => (
          <div
            key={i}
            className="rounded-[10px] transition-all duration-150"
            style={{
              padding: "clamp(8px, 2vw, 10px) clamp(10px, 3vw, 14px)",
              background: "var(--surface2)",
              border: "1px solid var(--border)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(241,90,34,0.3)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            }}
          >
            {/* Desktop layout: grid */}
            <div
              className="hidden sm:grid items-center"
              style={{ gridTemplateColumns: "1fr 100px 80px 80px" }}
            >
              <div>
                <div
                  className="font-semibold"
                  style={{ fontSize: "clamp(11px, 2.8vw, 13px)", color: "var(--text)" }}
                >
                  {item.title}
                </div>
                <div style={{ fontSize: "clamp(9px, 2.2vw, 11px)", color: "var(--muted)" }}>
                  {item.date}
                </div>
              </div>

              <div
                className="text-center font-bold"
                style={{ fontSize: "clamp(11px, 2.8vw, 13px)", color: "#ff9a5c" }}
              >
                {item.score}
              </div>

              <div className="text-center">
                <span
                  className="font-bold rounded-[20px]"
                  style={{
                    fontSize: "clamp(10px, 2.5vw, 12px)",
                    padding: "3px clamp(7px, 2vw, 10px)",
                    background: "rgba(241,90,34,0.1)",
                    color: "var(--orange)",
                    border: "1px solid rgba(241,90,34,0.2)",
                  }}
                >
                  {item.rank}
                </span>
              </div>

              <div className="text-center">
                <button
                  className="font-semibold rounded-[20px] cursor-pointer transition-all duration-150 hover:-translate-y-[1px]"
                  style={{
                    fontSize: "clamp(10px, 2.5vw, 11.5px)",
                    padding: "4px clamp(8px, 2vw, 12px)",
                    background: "var(--surface)",
                    color: "var(--muted2)",
                    border: "1px solid var(--border)",
                  }}
                >
                  View →
                </button>
              </div>
            </div>

            {/* Mobile layout: stacked */}
            <div className="flex sm:hidden items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div
                  className="font-semibold truncate"
                  style={{ fontSize: "clamp(11px, 3.5vw, 13px)", color: "var(--text)" }}
                >
                  {item.title}
                </div>
                <div
                  className="flex items-center gap-2 mt-[4px] flex-wrap"
                  style={{ fontSize: "clamp(9px, 2.5vw, 11px)", color: "var(--muted)" }}
                >
                  <span>{item.date}</span>
                  <span style={{ color: "#ff9a5c", fontWeight: 700 }}>{item.score}</span>
                  <span
                    className="font-bold rounded-[20px]"
                    style={{
                      fontSize: "10px",
                      padding: "2px 7px",
                      background: "rgba(241,90,34,0.1)",
                      color: "var(--orange)",
                      border: "1px solid rgba(241,90,34,0.2)",
                    }}
                  >
                    {item.rank}
                  </span>
                </div>
              </div>
              <button
                className="font-semibold rounded-[20px] cursor-pointer transition-all duration-150 flex-shrink-0"
                style={{
                  fontSize: "11px",
                  padding: "4px 10px",
                  background: "var(--surface)",
                  color: "var(--muted2)",
                  border: "1px solid var(--border)",
                }}
              >
                View →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View More */}
      {visibleCount < MOCK_DATA[active].length && (
        <div style={{ marginTop: "clamp(10px, 2.5vw, 14px)" }}>
          <button
            onClick={() => setVisibleCount(prev => prev + 5)}
            className="rounded-[20px] font-semibold cursor-pointer transition-all duration-[180ms] hover:-translate-y-[1px]"
            style={{
              fontSize: "clamp(10px, 2.5vw, 12px)",
              padding: "clamp(6px, 1.5vw, 8px) clamp(14px, 3.5vw, 20px)",
              background: "var(--surface2)",
              color: "var(--muted2)",
              border: "1.5px solid var(--border)",
            }}
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
}