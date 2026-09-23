"use client";

import React from "react";
import { BookText, PlaySquare } from "lucide-react";

interface TutorialsLandingPageProps {
  onSelect: (mode: "notes" | "videos") => void;
}

const TUTORIAL_CARDS = [
  {
    id: "notes",
    title: "Notes",
    description: "Step-by-step programming language guides, roadmaps, and interview questions.",
    icon: <BookText size={28} strokeWidth={2} />,
    topics: ["C & Java", "DAA", "DBMS", "Interview Qns", "Roadmaps"],
    color: "#ff6b35",
  },
  {
    id: "videos",
    title: "Videos",
    description: "High-quality video tutorials and walkthroughs for deep technical concepts.",
    icon: <PlaySquare size={28} strokeWidth={2} />,
    topics: ["AI & ML", "Python", "DSA", "Placement Prep", "Data Science"],
    color: "#a855f7",
  },
];

export default function TutorialsLandingPage({ onSelect }: TutorialsLandingPageProps) {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 style={{
          fontFamily: "var(--font-syne, sans-serif)",
          fontSize: "24px",
          fontWeight: 800,
          color: "var(--text)",
        }}>
          Tutorials
        </h1>
        <p style={{ color: "var(--muted2)", fontSize: "14px", marginTop: "4px" }}>
          Choose how you'd like to learn
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 360px))", gap: "20px" }}>
        {TUTORIAL_CARDS.map((card) => (
          <div
            key={card.id}
            onClick={() => onSelect(card.id as "notes" | "videos")}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "24px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                position: "relative",
                overflow: "hidden",
                height: "100%",
                display: "flex",
                flexDirection: "column",
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
              {/* Icon */}
              <div style={{
                width: "52px", height: "52px", borderRadius: "12px",
                background: `${card.color}20`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: card.color, marginBottom: "16px",
              }}>
                {card.icon}
              </div>

              {/* Title */}
              <h2 style={{
                fontSize: "20px", fontWeight: 700,
                color: "var(--text)", marginBottom: "8px",
              }}>
                {card.title}
              </h2>

              {/* Description */}
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--muted2)",
                  marginBottom: "16px",
                  lineHeight: 1.5,
                  minHeight: "39px",
                  flexGrow: 1,
                }}
              >
                {card.description}
              </p>

              {/* Topics */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "auto" }}>
                {card.topics.map((topic) => (
                  <span key={topic} style={{
                    fontSize: "11px", fontWeight: 600,
                    padding: "4px 10px", borderRadius: "999px",
                    background: `${card.color}15`,
                    color: card.color,
                    border: `1px solid ${card.color}30`,
                  }}>
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
