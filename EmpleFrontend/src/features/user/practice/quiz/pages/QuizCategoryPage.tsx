"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { QUIZ_CATEGORIES } from "@/shared/constants/quizCategories";
import { FolderTree, Cpu, Database, Network, Bot, Code2, Rocket, ShieldCheck, Package, TableProperties, Leaf, Terminal, Settings2, Calculator, BrainCircuit, Landmark, BookCopy, Compass, BookOpen } from "lucide-react";

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
    "aptitude": "Aptitude",
    "it-skills": "IT Skills",
    "govt-exams": "Govt Exams",
  };

  return mapping[categorySlug] || formatTitleFromSlug(categorySlug);
}

function getTopicDescription(category: string, topic: string) {
  const descriptions: Record<string, Record<string, string>> = {
    "Core CS": {
      "DSA": "Arrays, Linked Lists, Trees, Graphs, Stacks, Queues and more",
      "OS": "Processes, Threads, Memory Management, Scheduling, Deadlocks",
      "DBMS": "Relational and non-relational databases, queries, storage and design",
      "CN": "OSI Model, TCP/IP, DNS, HTTP, Routing and Network Security",
    },
    "IT Skills": {
      "AIML": "Artificial Intelligence and Machine Learning fundamentals",
      "Development": "Frontend, Backend, and Full-Stack web development concepts",
      "DevOps": "CI/CD, automation, containers, deployment pipelines and tooling",
      "Cybersecurity": "Cybersecurity basics, authentication, encryption and safe practices",
      "OOP": "Object-Oriented Programming concepts like inheritance, polymorphism, encapsulation",
      "SQL": "SQL queries, joins, indexing, and relational database management",
      "MongoDB": "NoSQL concepts, documents, collections, aggregation framework",
      "Linux": "Linux commands, file system, permissions, shell scripting",
      "System Design": "Scalability, microservices, load balancing, caching architectures",
    },
    "Aptitude": {
      "Quantitative": "Arithmetic, percentages, ratio, averages, profit and loss",
      "Logical Aptitude": "Patterns, series, puzzles, deductions and logic-based questions",
    },
    "Govt Exams": {
      "UPSC CSE": "UPSC Civil Services Examination (GS & CSAT)",
      "UPPSC": "Uttar Pradesh Public Service Commission (GS & CSAT)",
      "BPSC": "Bihar Public Service Commission (GS & CSAT)",
    },
  };

  return descriptions[category]?.[topic] || `Practice quizzes for ${topic}`;
}

function getTopicIcon(category: string, topic: string) {
  const icons: Record<string, Record<string, React.ReactNode>> = {
    "Core CS": {
      "DSA": <FolderTree className="h-8 w-8 text-blue-500" />,
      "OS": <Cpu className="h-8 w-8 text-indigo-500" />,
      "DBMS": <Database className="h-8 w-8 text-cyan-500" />,
      "CN": <Network className="h-8 w-8 text-sky-500" />,
    },
    "IT Skills": {
      "AIML": <Bot className="h-8 w-8 text-purple-500" />,
      "Development": <Code2 className="h-8 w-8 text-fuchsia-500" />,
      "DevOps": <Rocket className="h-8 w-8 text-violet-500" />,
      "Cybersecurity": <ShieldCheck className="h-8 w-8 text-emerald-500" />,
      "OOP": <Package className="h-8 w-8 text-pink-500" />,
      "SQL": <TableProperties className="h-8 w-8 text-amber-500" />,
      "MongoDB": <Leaf className="h-8 w-8 text-green-500" />,
      "Linux": <Terminal className="h-8 w-8 text-zinc-400" />,
      "System Design": <Settings2 className="h-8 w-8 text-slate-400" />,
    },
    "Aptitude": {
      "Quantitative": <Calculator className="h-8 w-8 text-lime-500" />,
      "Logical Aptitude": <BrainCircuit className="h-8 w-8 text-yellow-500" />,
    },
    "Govt Exams": {
      "UPSC CSE": <Landmark className="h-8 w-8 text-rose-500" />,
      "UPPSC": <BookCopy className="h-8 w-8 text-orange-500" />,
      "BPSC": <Compass className="h-8 w-8 text-red-500" />,
    },
  };

  return icons[category]?.[topic] || <BookOpen className="h-8 w-8 text-gray-500" />;
}

export default function QuizCategoryPage() {
  const params = useParams();
  const categorySlug = (params?.category as string) ?? "core-cs";
  const dbCategory = mapRouteCategoryToDbCategory(categorySlug);

  const topics: string[] = Object.keys(
    QUIZ_CATEGORIES[dbCategory as keyof typeof QUIZ_CATEGORIES] || {}
  );

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