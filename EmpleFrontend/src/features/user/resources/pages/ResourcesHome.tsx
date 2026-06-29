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
  {
    title: "Interview Questions",
    href: "/user/resources/interview-questions",
    description: "Top interview questions and detailed solutions across subjects",
    icon: "📚",
    topics: ["OOP", "DBMS", "CN", "OS", "ML", "Cyber", "DevOps", "System Design"],
    color: "#ff3b30",
  },
  {
  title: "Project Ideas",
  href: "/user/resources/project-ideas",
  description: "Curated project ideas for Fullstack, AI/ML, and Cybersecurity to build your portfolio",
  icon: "💡",
  topics: ["Fullstack", "AI/ML", "Cybersecurity"],
  color: "#a855f7",
  },
  {
    title: "Certificates",
    href: "/user/resources/certificates",
    description: "Explore certifications in AWS, Cisco, Red Hat, CUDA, TensorFlow, Google, and Cyber Security",
    icon: "🏆",
    topics: ["AWS", "Cisco", "Red Hat", "CUDA", "TensorFlow", "Google", "Cyber Security"],
    color: "#fbbf24",
  },
{
  title: "GATE Notes",
  href: "/user/resources/gate-notes",
  description: "Access GATE preparation notes and study material.",
  icon: "📚",
  topics: ["OS", "DBMS", "CN", "COA"],
  color: "#123456",
},
{
  title: "Career Paths",
  href: "/user/resources/career-paths",
  description: "Explore career paths with roadmaps, salaries and quizzes.",
  icon: "🎯",
  topics: ["Business Analyst", "Data Analyst", "BD", "Testing"],
  color: "#f97316",
},
{
  title: "BK SDE Sheet",
  href: "/user/resources/bk-sde-sheet",
  description: "Your SDE prep hub — coding sheet, core CS subjects and aptitude all in one place",
  icon: "📋",
  topics: ["Coding", "OS", "DBMS", "CN", "Aptitude"],
  color: "#f97316",
},
];

export default function ResourcesHome({ basePath = "/user/resources" }: { basePath?: string }) {
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
        {RESOURCES_CARDS.map((card) => {
          const finalHref = card.href.replace("/user/resources", basePath);
          return (
          <Link href={finalHref} key={card.title} style={{ textDecoration: "none" }}>
            <div
              style={{
                    background: "var(--surface)", border: "1px solid var(--border)",
                    borderRadius: "16px", padding: "24px", cursor: "pointer",
                    transition: "all 0.2s ease", position: "relative",
                    minHeight: "260px",
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
            </div>
          </Link>
        )})}
      </div>
    </div>
  );
}