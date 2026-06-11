"use client";

import { InterviewQuestion } from "../types/interviewQuestion";

interface QuestionCardProps {
  question: InterviewQuestion;
  questionNumber: number;
}

export default function QuestionCard({ question, questionNumber }: QuestionCardProps) {
  const formatAnswer = (text: string) => {
    return text.split("\n").map((line, idx) => {
      if (line.startsWith("**") && line.endsWith(":**")) {
        return (
          <div key={idx} style={{ marginTop: "16px", marginBottom: "8px" }}>
            <h4 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text)", margin: 0 }}>
              {line.replace(/\*\*/g, "")}
            </h4>
          </div>
        );
      }
      if (line.startsWith("- ")) {
        const parts = line.substring(2).split(/\*\*(.*?)\*\*/g);
        return (
          <div key={idx} style={{ marginLeft: "16px", marginBottom: "12px", fontSize: "14px", color: "var(--muted2)", lineHeight: 1.6 }}>
            <span style={{ color: "#f59e0b", fontWeight: 600, marginRight: "8px" }}>•</span> 
            {parts.map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part)}
          </div>
        );
      }
      if (line.trim() === "") {
        return <div key={idx} style={{ height: "12px" }} />;
      }
      if (line.startsWith("[[IMAGE:") && line.endsWith("]]")) {
        const payload = line.substring(8, line.length - 2).trim();
        const [src, caption] = payload.split("|").map((part) => part.trim());
        return (
          <div key={idx} style={{ margin: "20px 0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <img
              src={src}
              alt={`${question.question} image ${idx + 1}`}
              style={{ width: "100%", maxWidth: "380px", height: "auto", borderRadius: "4px" }}
            />
            {caption ? (
              <div style={{ marginTop: "8px", fontSize: "13px", color: "var(--muted2)", fontStyle: "italic", maxWidth: "380px" }}>
                {caption}
              </div>
            ) : null}
          </div>
        );
      }
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={idx} style={{ fontSize: "14px", color: "var(--muted2)", lineHeight: 1.6, margin: "8px 0" }}>
          {parts.map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part)}
        </p>
      );
    });
  };

  return (
    <div style={{ marginBottom: "48px", paddingBottom: "32px", borderBottom: "1px solid var(--border)" }}>
      {/* Question Header with Companies on Right */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "24px", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", flex: 1 }}>
          <div
            style={{
              background: "linear-gradient(135deg, #f59e0b, #fb923c)",
              color: "white",
              width: "36px",
              height: "36px",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "16px",
              flexShrink: 0,
            }}
          >
            {questionNumber}
          </div>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "var(--text)", margin: 0, lineHeight: 1.4 }}>
            {question.question}
          </h2>
        </div>
        
        {/* Companies on the Right */}
        <div style={{ display: "flex", flexWrap: "nowrap", gap: "10px", justifyContent: "flex-end" }}>
          {question.companies.map((company) => (
            <span
              key={company}
              style={{
                fontSize: "13px",
                fontWeight: 600,
                padding: "6px 12px",
                background: "rgba(245, 158, 11, 0.12)",
                color: "#f59e0b",
                border: "1px solid rgba(245, 158, 11, 0.25)",
                borderRadius: "4px",
                display: "inline-block",
                whiteSpace: "nowrap",
              }}
            >
              {company}
            </span>
          ))}
        </div>
      </div>

      {/* Answer Section */}
      <div style={{ marginBottom: "24px", marginLeft: "52px" }}>
        <div style={{ fontSize: "12px", fontWeight: 700, color: "#f59e0b", textTransform: "uppercase", marginBottom: "12px", letterSpacing: "0.5px" }}>
          Solution
        </div>
        <div style={{ color: "var(--muted2)", lineHeight: 1.8 }}>{formatAnswer(question.answer)}</div>
      </div>

      {/* Image Section - Full Width */}
      {((question.imageUrls && question.imageUrls.length > 0) || question.imageUrl) && (() => {
        const imgs = (question.imageUrls ?? (question.imageUrl ? [question.imageUrl] : []));
        const captions = question.imageCaptions ?? [];
        return (
          <div style={{ marginBottom: "24px", marginLeft: "52px", marginTop: "24px", display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
            {imgs.map((src, idx) => (
              <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: imgs.length > 1 ? "280px" : "380px" }}>
                <img
                  src={src}
                  alt={`${question.question} image ${idx + 1}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    borderRadius: "4px",
                  }}
                />
                {captions[idx] ? (
                  <div style={{ marginTop: "8px", fontSize: "13px", color: "var(--muted2)", fontStyle: "italic", textAlign: "center" }}>
                    {captions[idx]}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        );
      })()}
    </div>
  );
}
