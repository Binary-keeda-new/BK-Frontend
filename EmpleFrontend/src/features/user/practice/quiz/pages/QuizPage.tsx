"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { QUIZ_CATEGORIES } from "@/shared/constants/quizCategories";
import { apiRequest } from "@/shared/utils/api";
import { Terminal, Brain, Cloud, Landmark } from "lucide-react";

type QuizItem = {
  _id: string;
  title: string;
  category: string;
  subcategory: string;
};

type QuizListResponse = {
  success: boolean;
  message: string;
  data: QuizItem[];
};

const CATEGORY_META: Record<
  keyof typeof QUIZ_CATEGORIES,
  { icon: React.ReactNode; href: string; desc: string }
> = {
  "Core CS": {
    icon: <Terminal className="h-8 w-8 text-blue-500" />,
    href: "/user/practice/quiz/core-cs",
    desc: "Data Structures, Algorithms, OS, Networks",
  },
  "IT Skills": {
    icon: <Cloud className="h-8 w-8 text-purple-500" />,
    href: "/user/practice/quiz/it-skills",
    desc: "AIML, Development, DevOps, Cybersecurity, SQL, MongoDB, Linux",
  },
  "Aptitude": {
    icon: <Brain className="h-8 w-8 text-green-500" />,
    href: "/user/practice/quiz/aptitude",
    desc: "Quantitative, Logical Aptitude",
  },
  "Govt Exams": {
    icon: <Landmark className="h-8 w-8 text-rose-500" />,
    href: "/user/practice/quiz/govt-exams",
    desc: "UPSC CSE, UPPSC, BPSC",
  },
};

export default function QuizHome() {
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await apiRequest<QuizListResponse>(
          "/api/v1/quizzes?page=1&limit=200",
          {
            method: "GET",
          }
        );

        setQuizzes(result.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load quizzes");
        setQuizzes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const quizCountByCategory = useMemo(() => {
    const counts: Record<string, number> = {};

    for (const quiz of quizzes) {
      counts[quiz.category] = (counts[quiz.category] || 0) + 1;
    }

    return counts;
  }, [quizzes]);

  const quizCards = useMemo(() => {
    return (
      Object.keys(QUIZ_CATEGORIES) as Array<keyof typeof QUIZ_CATEGORIES>
    ).map((category) => ({
      title: category,
      desc: CATEGORY_META[category].desc,
      icon: CATEGORY_META[category].icon,
      href: CATEGORY_META[category].href,
      count: quizCountByCategory[category] || 0,
    }));
  }, [quizCountByCategory]);

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
          Quiz
        </h1>
        <p
          style={{
            color: "var(--muted2)",
            fontSize: "14px",
            marginTop: "4px",
          }}
        >
          Select a topic to start your quiz
        </p>
      </div>

      {error && (
        <div
          style={{
            marginBottom: "16px",
            padding: "12px 14px",
            borderRadius: "12px",
            border: "1px solid rgba(239,68,68,0.35)",
            background: "rgba(239,68,68,0.08)",
            color: "#ef4444",
            fontSize: "13px",
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
        }}
      >
        {quizCards.map((card) => (
          <Link href={card.href} key={card.title} style={{ textDecoration: "none", display: "flex" }}>
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "24px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                minHeight: "170px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = "1px solid var(--orange)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(241,90,34,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = "1px solid var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>
                {card.icon}
              </div>

              <h2
                style={{
                  fontSize: "17px",
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: "8px",
                }}
              >
                {card.title}
              </h2>

              <p
                style={{
                  fontSize: "13px",
                  color: "var(--muted2)",
                  lineHeight: 1.5,
                  marginBottom: "14px",
                }}
              >
                {card.desc}
              </p>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                  fontWeight: 700,
                  padding: "6px 10px",
                  borderRadius: "999px",
                  background: "var(--surface2)",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                  marginTop: "auto",
                  alignSelf: "flex-start",
                }}
              >
                {loading
                  ? "Loading..."
                  : `${card.count} quiz${card.count === 1 ? "" : "zes"}`}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}