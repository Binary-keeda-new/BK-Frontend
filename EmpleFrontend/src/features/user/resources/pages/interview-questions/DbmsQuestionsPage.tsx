"use client";

import Link from "next/link";
import { DBMS_QUESTIONS } from "../../data/DbmsQuestions";
import QuestionCard from "../../components/QuestionCard";

export default function DbmsQuestionsPage() {
  return (
    <div
      style={{
        background: "var(--bg)",
        minHeight: "100vh",
        color: "var(--text)",
      }}
    >
      <div
        style={{
          padding: "24px",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface)",
        }}
      >
        <Link
          href="/user/resources/interview-questions"
          style={{
            color: "var(--muted2)",
            textDecoration: "none",
            fontSize: "14px",
            marginBottom: "16px",
            display: "inline-block",
          }}
        >
          ← Back to Interview Questions
        </Link>

        <h1
          style={{
            fontFamily: "var(--font-syne, sans-serif)",
            fontSize: "28px",
            fontWeight: 800,
            color: "var(--text)",
            marginTop: "12px",
            marginBottom: "4px",
          }}
        >
          DBMS Interview Questions
        </h1>

        <p
          style={{
            fontSize: "12px",
            color: "var(--muted2)",
            opacity: 0.7,
            margin: 0,
          }}
        >
          • Images marked with ★ are AI-generated.
        </p>
      </div>

      <div
        style={{
          maxWidth: "100%",
          margin: "0",
          padding: "32px",
        }}
      >
        {DBMS_QUESTIONS.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            questionNumber={index + 1}
          />
        ))}
      </div>
    </div>
  );
}