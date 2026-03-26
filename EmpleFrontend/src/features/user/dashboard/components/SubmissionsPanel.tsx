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
      className="p-[22px] rounded-[16px]"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      {/* Header row: title + toggle */}
      <div className="flex items-center justify-between mb-[18px]">
        <div className="font-syne text-[15px] font-bold" style={{ color: "var(--text)" }}>
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
              className="px-[18px] py-[6px] rounded-[22px] text-[12.5px] font-medium cursor-pointer border-none transition-all duration-200"
              style={{
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

      {/* Table header */}
      <div
        className="grid text-[10.5px] font-bold uppercase tracking-[0.06em] px-[14px] py-[8px] rounded-[8px] mb-[6px]"
        style={{
          gridTemplateColumns: "1fr 120px 100px 100px",
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
            className="grid items-center px-[14px] py-[10px] rounded-[10px] transition-all duration-150"
            style={{
              gridTemplateColumns: "1fr 120px 100px 100px",
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
            {/* Title */}
            <div>
              <div className="text-[13px] font-semibold" style={{ color: "var(--text)" }}>
                {item.title}
              </div>
              <div className="text-[11px]" style={{ color: "var(--muted)" }}>
                {item.date}
              </div>
            </div>

            {/* Score */}
            <div className="text-center text-[13px] font-bold" style={{ color: "#ff9a5c" }}>
              {item.score}
            </div>

            {/* Rank */}
            <div className="text-center">
              <span
                className="text-[12px] font-bold px-[10px] py-[3px] rounded-[20px]"
                style={{
                  background: "rgba(241,90,34,0.1)",
                  color: "var(--orange)",
                  border: "1px solid rgba(241,90,34,0.2)",
                }}
              >
                {item.rank}
              </span>
            </div>

            {/* Preview */}
            <div className="text-center">
              <button
                className="text-[11.5px] font-semibold px-[12px] py-[4px] rounded-[20px] cursor-pointer transition-all duration-150 hover:-translate-y-[1px]"
                style={{
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
        <div className="mt-[14px]">
          <button
            onClick={() => setVisibleCount(prev => prev + 5)}
            className="px-5 py-[8px] rounded-[20px] text-[12px] font-semibold cursor-pointer transition-all duration-[180ms] hover:-translate-y-[1px]"
            style={{
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