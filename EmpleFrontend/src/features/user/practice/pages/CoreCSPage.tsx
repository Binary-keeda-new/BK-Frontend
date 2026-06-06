"use client";

import Link from "next/link";

const CORE_CS_TOPICS = [
  {
    title: "Data Structures",
    desc: "Arrays, Linked Lists, Trees, Graphs, Stacks, Queues and more",
    icon: "🗂️",
    href: "/user/practice/quiz/core-cs/data-structures",
  },
  {
    title: "Algorithms",
    desc: "Sorting, Searching, Dynamic Programming, Greedy, Divide & Conquer",
    icon: "⚙️",
    href: "/user/practice/quiz/core-cs/algorithms",
  },
  {
    title: "Operating Systems",
    desc: "Processes, Threads, Memory Management, Scheduling, Deadlocks",
    icon: "🖥️",
    href: "/user/practice/quiz/core-cs/operating-systems",
  },
  {
    title: "Computer Networks",
    desc: "OSI Model, TCP/IP, DNS, HTTP, Routing and Network Security",
    icon: "🌐",
    href: "/user/practice/quiz/core-cs/computer-networks",
  },
  {
    title: "DBMS",
    desc: "Normalization, SQL, Transactions, Indexing, ER Models",
    icon: "🗄️",
    href: "/user/practice/quiz/core-cs/dbms",
  },
];

export default function CoreCSPage() {
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
          Core CS
        </h1>
        <p style={{ color: "var(--muted2)", fontSize: "14px", marginTop: "4px" }}>
          Choose a subtopic to begin practicing
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
          alignItems: "stretch",
        }}
      >
        {CORE_CS_TOPICS.map((topic) => (
          <Link href={topic.href} key={topic.title} style={{ textDecoration: "none", display: "flex" }}>
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "24px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.border = "1px solid var(--orange)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(241,90,34,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.border = "1px solid var(--border)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>{topic.icon}</div>
              <h2
                style={{
                  fontSize: "17px",
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: "8px",
                }}
              >
                {topic.title}
              </h2>
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--muted2)",
                  lineHeight: 1.5,
                  marginTop: "auto",
                }}
              >
                {topic.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}