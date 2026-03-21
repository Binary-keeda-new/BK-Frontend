"use client";

import Link from "next/link";

const RESOURCES_CARDS = [
  {
    title: "Roadmaps",
    href: "/user/resources/roadmaps",
    description: "Structured learning paths with quizzes and progress mapping",
    icon: "🗺️",
    topics: ["Frontend", "Backend", "DevOps", "Data Science"],
    color: "#ff6b35",
  },
  {
    title: "Sheets",
    href: "/user/resources/sheets",
    description: "Curated cheat sheets for placement preparation",
    icon: "📄",
    topics: ["DSA Sheet", "Placement Sheet", "AI Tools Sheet"],
    color: "#22c55e",
  },
  {
    title: "Blogs",
    href: "/user/resources/blogs",
    description: "Articles, tips and industry insights",
    icon: "✍️",
    topics: ["Career", "Tech", "Interview Tips"],
    color: "#6c63ff",
  },
  {
    title: "Tutorials",
    href: "/user/resources/tutorials",
    description: "Step by step tutorials to learn new skills",
    icon: "🎓",
    topics: ["DSA", "System Design", "Web Dev"],
    color: "#f59e0b",
  },
];

export default function ResourcesHome() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontSize: "24px", fontWeight: 800, color: "var(--text)" }}>
          Resources
        </h1>
        <p style={{ color: "var(--muted2)", fontSize: "14px", marginTop: "4px" }}>
          Everything you need to ace your placement
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
        {RESOURCES_CARDS.map((card) => (
          <Link href={card.href} key={card.title} style={{ textDecoration: "none" }}>
            <div
              style={{
                background: "var(--surface)", border: "1px solid var(--border)",
                borderRadius: "16px", padding: "24px", cursor: "pointer",
                transition: "all 0.2s ease", position: "relative",
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
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>{card.icon}</div>
              <h2 style={{ fontSize: "20px", fontWeight: 700, color: "var(--text)", marginBottom: "8px" }}>
                {card.title}
              </h2>
              <p style={{ fontSize: "13px", color: "var(--muted2)", marginBottom: "16px", lineHeight: 1.5 }}>
                {card.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {card.topics.map((topic) => (
                  <span key={topic} style={{
                    fontSize: "11px", fontWeight: 600,
                    padding: "4px 10px", borderRadius: "999px",
                    background: `${card.color}15`, color: card.color,
                    border: `1px solid ${card.color}30`,
                  }}>
                    {topic}
                  </span>
                ))}
              </div>
              <div style={{ position: "absolute", top: "24px", right: "24px", color: "var(--muted2)" }}>
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