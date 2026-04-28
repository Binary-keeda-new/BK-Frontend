"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { QUIZ_CATEGORIES } from "@/shared/constants/quizCategories";

function formatTitleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function slugify(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}

function mapRouteCategoryToDbCategory(categorySlug: string) {
  const mapping: Record<string, string> = {
    "core-cs": "Core CS",
    aptitude: "Aptitude",
    "it-concepts": "IT Concepts",
    upsc: "UPSC Mapping",
    constitution: "Constitution",
  };

  return mapping[categorySlug] || formatTitleFromSlug(categorySlug);
}

function getTopicDescription(category: string, topic: string) {
  const descriptions: Record<string, Record<string, string>> = {
    "Core CS": {
      "Data Structures": "Arrays, Linked Lists, Trees, Graphs, Stacks, Queues and more",
      Algorithms: "Sorting, Searching, Dynamic Programming, Greedy, Divide & Conquer",
      OS: "Processes, Threads, Memory Management, Scheduling, Deadlocks",
      Networks: "OSI Model, TCP/IP, DNS, HTTP, Routing and Network Security",
    },
    Aptitude: {
      Quantitative: "Arithmetic, percentages, ratio, averages, profit and loss",
      "Logical Reasoning": "Patterns, series, puzzles, deductions and logic-based questions",
      Verbal: "Grammar, vocabulary, reading comprehension and sentence correction",
    },
    "IT Concepts": {
      Cloud: "Cloud computing basics, deployment models, services and architecture",
      DevOps: "CI/CD, automation, containers, deployment pipelines and tooling",
      Databases: "Relational and non-relational databases, queries, storage and design",
      Security: "Cybersecurity basics, authentication, encryption and safe practices",
    },
    "UPSC Mapping": {
      "Technology mapped to UPSC syllabus":
        "Technology topics aligned with UPSC syllabus and current-affairs relevance",
    },
    Constitution: {
      "Indian Constitution":
        "Preamble, fundamental rights, duties, DPSP and constitutional structure",
      Polity: "Parliament, executive, judiciary, federalism, governance and institutions",
    },
  };

  return descriptions[category]?.[topic] || `Practice quizzes for ${topic}`;
}

function getTopicIcon(category: string, topic: string) {
  const icons: Record<string, Record<string, string>> = {
    "Core CS": {
      "Data Structures": "🗂️",
      Algorithms: "⚙️",
      OS: "🖥️",
      Networks: "🌐",
    },
    Aptitude: {
      Quantitative: "📐",
      "Logical Reasoning": "🧩",
      Verbal: "📝",
    },
    "IT Concepts": {
      Cloud: "☁️",
      DevOps: "🚀",
      Databases: "🗄️",
      Security: "🔐",
    },
    "UPSC Mapping": {
      "Technology mapped to UPSC syllabus": "🧭",
    },
    Constitution: {
      "Indian Constitution": "📜",
      Polity: "🏛️",
    },
  };

  return icons[category]?.[topic] || "📘";
}

export default function QuizCategoryPage() {
  const params = useParams();
  const categorySlug = (params?.category as string) ?? "core-cs";
  const dbCategory = mapRouteCategoryToDbCategory(categorySlug);

  const topics: string[] = [
  ...(QUIZ_CATEGORIES[dbCategory as keyof typeof QUIZ_CATEGORIES] ?? []),
];

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
          {dbCategory}
        </h1>
        <p style={{ color: "var(--muted2)", fontSize: "14px", marginTop: "4px" }}>
          Choose a subtopic to begin practicing
        </p>
      </div>

      {topics.length === 0 ? (
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            padding: "20px",
            color: "var(--muted2)",
            fontSize: "14px",
          }}
        >
          No topics available for this category.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
            alignItems: "stretch",
          }}
        >
          {topics.map((topic) => {
            const href = `/user/practice/quiz/${categorySlug}/${slugify(topic)}`;

            return (
              <Link
                href={href}
                key={topic}
                style={{ textDecoration: "none", display: "flex" }}
              >
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
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 8px 24px rgba(241,90,34,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.border = "1px solid var(--border)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div style={{ fontSize: "32px", marginBottom: "12px" }}>
                    {getTopicIcon(dbCategory, topic)}
                  </div>

                  <h2
                    style={{
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "var(--text)",
                      marginBottom: "8px",
                    }}
                  >
                    {topic}
                  </h2>

                  <p
                    style={{
                      fontSize: "13px",
                      color: "var(--muted2)",
                      lineHeight: 1.5,
                      marginTop: "auto",
                    }}
                  >
                    {getTopicDescription(dbCategory, topic)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}