"use client";

import Link from "next/link";

const PRACTICE_CARDS = [
  {
    title: "Quiz",
    href: "/user/practice/quiz",
    description: "Test your knowledge with multiple choice questions",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    topics: ["Core CS", "Aptitude", "IT Concepts", "UPSC Mapping", "Constitution"],
    color: "#ff6b35",
  },
  {
    title: "Test",
    href: "/user/practice/test",
    description: "Role-based tests to prepare for your dream job",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    topics: ["Full Stack", "Data Analyst", "DevOps", "Cyber Security", "Product Manager"],
    color: "#6c63ff",
  },
];

export default function PracticeHome() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 style={{
          fontFamily: "var(--font-syne, sans-serif)",
          fontSize: "24px",
          fontWeight: 800,
          color: "var(--text)",
        }}>
          Practice
        </h1>
        <p style={{ color: "var(--muted2)", fontSize: "14px", marginTop: "4px" }}>
          Choose a category to start practicing
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
        {PRACTICE_CARDS.map((card) => (
          <Link href={card.href} key={card.title} style={{ textDecoration: "none" }}>
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "24px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.border = `1px solid ${card.color}`;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${card.color}30`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.border = "1px solid var(--border)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Icon */}
              <div style={{
                width: "52px", height: "52px", borderRadius: "12px",
                background: `${card.color}20`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: card.color, marginBottom: "16px",
              }}>
                {card.icon}
              </div>

              {/* Title */}
              <h2 style={{
                fontSize: "20px", fontWeight: 700,
                color: "var(--text)", marginBottom: "8px",
              }}>
                {card.title}
              </h2>

              {/* Description */}
              <p style={{ fontSize: "13px", color: "var(--muted2)", marginBottom: "16px", lineHeight: 1.5 }}>
                {card.description}
              </p>

              {/* Topics */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {card.topics.map((topic) => (
                  <span key={topic} style={{
                    fontSize: "11px", fontWeight: 600,
                    padding: "4px 10px", borderRadius: "999px",
                    background: `${card.color}15`,
                    color: card.color,
                    border: `1px solid ${card.color}30`,
                  }}>
                    {topic}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <div style={{
                position: "absolute", top: "24px", right: "24px",
                color: "var(--muted2)",
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}