"use client";

import Link from "next/link";

const SUBJECT_CARDS = [
  { title: "OOP", href: "/user/resources/interview-questions/oop", description: "Top 50 OOP interview questions with solutions", icon: "🧩", color: "#ff6b35" },
  { title: "DBMS", href: "/user/resources/interview-questions/dbms", description: "Top 50 Database interview questions with solutions", icon: "🗄️", color: "#22c55e" },
  { title: "CN", href: "/user/resources/interview-questions/cn", description: "Top 50 Computer Networks questions with solutions", icon: "📡", color: "#6c63ff" },
  { title: "OS", href: "/user/resources/interview-questions/os", description: "Top 50 Operating Systems questions with solutions", icon: "📂", color: "#f59e0b" },
  { title: "ML", href: "/user/resources/interview-questions/ml", description: "Top 50 Machine Learning interview questions with solutions", icon: "🤖", color: "#0ea5e9" },
  { title: "CYBER", href: "/user/resources/interview-questions/cyber", description: "Top 50 Cybersecurity interview questions with solutions", icon: "🔒", color: "#ef4444" },
  { title: "DEVOPS", href: "/user/resources/interview-questions/devops", description: "Top 50 DevOps interview questions with solutions", icon: "⚙️", color: "#10b981" },
  { title: "System Design", href: "/user/resources/interview-questions/system-design", description: "Top 50 System Design interview questions with solutions", icon: "🏗️", color: "#f59e0b" },
];

export default function InterviewQuestionsHome({ basePath = "/user/resources/interview-questions" }: { basePath?: string }) {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontSize: "24px", fontWeight: 800, color: "var(--text)" }}>
          Interview Questions
        </h1>
        <p style={{ color: "var(--muted2)", fontSize: "14px", marginTop: "4px" }}>
          Top interview questions and detailed solutions across subjects
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
        {SUBJECT_CARDS.map((card) => {
          const finalHref = card.href.replace("/user/resources/interview-questions", basePath);
          return (
          <Link href={finalHref} key={card.title} style={{ textDecoration: "none" }}>
            <div
              style={{
                background: "var(--surface)", border: "1px solid var(--border)",
                borderRadius: "12px", padding: "20px", cursor: "pointer",
                transition: "all 0.18s ease", position: "relative",
                minHeight: "140px",
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
              <div style={{ fontSize: "28px", marginBottom: "10px" }}>{card.icon}</div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text)", marginBottom: "8px" }}>{card.title}</h3>
              <p style={{ fontSize: "13px", color: "var(--muted2)", marginBottom: "12px", lineHeight: 1.4 }}>{card.description}</p>
              <div style={{ position: "absolute", top: "18px", right: "18px", color: "var(--muted2)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </div>
          </Link>
        )})}
      </div>
    </div>
  );
}
