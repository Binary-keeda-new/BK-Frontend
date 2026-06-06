"use client";

import Link from "next/link";

export default function DbmsQuestionsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontSize: "22px", fontWeight: 800, color: "var(--text)" }}>DBMS Interview Questions</h1>
        <p style={{ color: "var(--muted2)", marginTop: "6px" }}>Top 50 Database questions with detailed solutions (will be added).</p>
      </div>

      <div style={{ display: "flex", gap: "12px", marginBottom: "18px" }}>
        <Link href="/user/resources/interview-questions" style={{ color: "var(--muted2)" }}>← Back to Interview Questions</Link>
      </div>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 18 }}>
        <p style={{ color: "var(--muted2)" }}>Questions will be listed here. I'll add the hardcoded top 50 Q&amp;A with descriptions and images next.</p>
      </div>
    </div>
  );
}
