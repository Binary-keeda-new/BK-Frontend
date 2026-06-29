"use client";

import Link from "next/link";

const PROJECT_CARDS = [
  {
    title: "Fullstack",
    href: "/user/resources/project-ideas/fullstack",
    description: "10 fullstack project ideas from easy to hard to build real-world skills",
    icon: "🌐",
    color: "#6c63ff",
  },
  {
    title: "AI / ML",
    href: "/user/resources/project-ideas/aiml",
    description: "10 AI/ML project ideas from easy to hard to build intelligent systems",
    icon: "🧠",
    color: "#0ea5e9",
  },
  {
    title: "Cybersecurity",
    href: "/user/resources/project-ideas/cybersecurity",
    description: "10 cybersecurity project ideas from easy to hard to sharpen your security skills",
    icon: "🛡️",
    color: "#ef4444",
  },
];

export default function ProjectIdeasHome({ basePath = "/user/resources/project-ideas" }: { basePath?: string }) {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1
          style={{
            fontFamily: "var(--font-syne, sans-serif)",
            fontSize: "24px",
            fontWeight: 800,
            color: "var(--text)",
          }}
        >
          Project Ideas
        </h1>
        <p style={{ color: "var(--muted2)", fontSize: "14px", marginTop: "4px" }}>
          Curated project ideas to build your portfolio and sharpen your skills
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
        }}
      >
        {PROJECT_CARDS.map((card) => {
          const finalHref = basePath ? card.href.replace("/user/resources/project-ideas", basePath) : card.href;
          return (
          <Link href={finalHref} key={card.title} style={{ textDecoration: "none" }}>
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "20px",
                cursor: "pointer",
                transition: "all 0.18s ease",
                position: "relative",
                minHeight: "140px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.border = `1px solid ${card.color}`;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${card.color}30`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.border = "1px solid var(--border)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "10px" }}>{card.icon}</div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: "8px",
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--muted2)",
                  marginBottom: "12px",
                  lineHeight: 1.4,
                }}
              >
                {card.description}
              </p>

            </div>
          </Link>
        )})}
      </div>
    </div>
  );
}