"use client";

import Link from "next/link";

const QUIZ_CARDS = [
  { title: "Core CS", desc: "Data Structures, Algorithms, OS, Networks", icon: "💻", href: "/user/practice/quiz/core-cs" },
  { title: "Aptitude", desc: "Quantitative, Logical Reasoning, Verbal", icon: "🧠", href: "/user/practice/quiz/aptitude" },
  { title: "IT Concepts", desc: "Cloud, DevOps, Databases, Security", icon: "☁️", href: "/user/practice/quiz/it-concepts" },
  { title: "UPSC Mapping", desc: "Technology mapped to UPSC syllabus", icon: "📚", href: "/user/practice/quiz/upsc" },
  { title: "Constitution", desc: "Indian Constitution and Polity", icon: "⚖️", href: "/user/practice/quiz/constitution" },
];

export default function QuizHome() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontSize: "24px", fontWeight: 800, color: "var(--text)" }}>
          Quiz
        </h1>
        <p style={{ color: "var(--muted2)", fontSize: "14px", marginTop: "4px" }}>
          Select a topic to start your quiz
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
        {QUIZ_CARDS.map((card) => (
          <Link href={card.href} key={card.title} style={{ textDecoration: "none" }}>
            <div
              style={{
                background: "var(--surface)", border: "1px solid var(--border)",
                borderRadius: "16px", padding: "24px", cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.border = "1px solid var(--orange)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(241,90,34,0.2)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.border = "1px solid var(--border)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>{card.icon}</div>
              <h2 style={{ fontSize: "17px", fontWeight: 700, color: "var(--text)", marginBottom: "8px" }}>
                {card.title}
              </h2>
              <p style={{ fontSize: "13px", color: "var(--muted2)", lineHeight: 1.5 }}>
                {card.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}