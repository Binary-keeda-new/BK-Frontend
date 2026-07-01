"use client";

import React, { useState } from "react";
import { GeneratedRoadmap, RoadmapAnswers, RoadmapSection } from "../types/roadmapAI.types";

// ─── Shimmer skeleton ─────────────────────────────────────────────────────────
export const RoadmapSkeleton: React.FC = () => (
  <div style={{ padding: "24px 0" }}>
    <div style={{ marginBottom: 32 }}>
      <div style={{ height: 36, width: "55%", background: "var(--surface2)", borderRadius: 10, marginBottom: 12, animation: "rmShim 1.4s infinite" }} />
      <div style={{ height: 16, width: "38%", background: "var(--surface2)", borderRadius: 8, marginBottom: 8, animation: "rmShim 1.4s infinite" }} />
      <div style={{ height: 28, width: "18%", background: "var(--surface2)", borderRadius: 20, animation: "rmShim 1.4s infinite" }} />
    </div>
    <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 24, padding: "2rem", marginBottom: 40 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32, marginBottom: 32 }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ height: 40, width: "60%", margin: "0 auto 8px", background: "var(--border)", borderRadius: 8, animation: "rmShim 1.4s infinite" }} />
            <div style={{ height: 14, width: "80%", margin: "0 auto", background: "var(--border)", borderRadius: 6, animation: "rmShim 1.4s infinite" }} />
          </div>
        ))}
      </div>
      <div style={{ height: 10, background: "var(--border)", borderRadius: 10, animation: "rmShim 1.4s infinite" }} />
    </div>
    {[1, 2, 3, 4].map(i => (
      <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, marginBottom: 16, padding: "22px 28px", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--surface2)", flexShrink: 0, animation: "rmShim 1.4s infinite" }} />
        <div style={{ flex: 1 }}>
          <div style={{ height: 18, width: "45%", background: "var(--surface2)", borderRadius: 8, marginBottom: 8, animation: "rmShim 1.4s infinite" }} />
          <div style={{ height: 13, width: "25%", background: "var(--surface2)", borderRadius: 6, animation: "rmShim 1.4s infinite" }} />
        </div>
      </div>
    ))}
    <style>{`@keyframes rmShim{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}`}</style>
  </div>
);

// ─── Section card — lightweight preview (no SectionCard reuse here) ───────────
const SectionPreviewCard: React.FC<{ section: RoadmapSection; index: number }> = ({ section, index }) => {
  const [isExpanded, setIsExpanded] = useState(index === 0);

  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 20,
      marginBottom: 16,
      overflow: "hidden",
      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    }}>
      {/* Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          padding: "22px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1 }}>
          <div style={{
            width: 32, height: 32,
            border: "2px solid var(--orange)",
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            background: "rgba(255,92,53,0.08)",
            color: "var(--orange)",
            fontSize: 13,
            fontWeight: 800,
          }}>
            {index + 1}
          </div>

          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>
              {section.week}: {section.title}
            </h3>
            <div style={{ display: "flex", gap: 16, fontSize: 13, color: "var(--muted2)", fontWeight: 500, alignItems: "center" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--orange)" }}>
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                {section.duration}
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--orange)" }}>
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                {section.points} points
              </span>
            </div>
          </div>
        </div>

        <button style={{
          width: 36, height: 36,
          border: "1.5px solid var(--border)",
          borderRadius: "50%",
          background: "var(--surface2)",
          cursor: "pointer",
          fontSize: 20,
          color: "var(--text)",
          transition: "all 0.2s",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          {isExpanded ? "−" : "+"}
        </button>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div style={{
          padding: "0 28px 28px 76px",
          borderTop: "1px solid var(--border)",
          paddingTop: 24,
        }}>
          {/* Objectives */}
          {section.objectives?.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--orange)", marginBottom: 12 }}>
                Learning Objectives
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {section.objectives.map((obj, i) => (
                  <li key={i} style={{ padding: "8px 0 8px 24px", position: "relative", color: "var(--text)", fontSize: 14 }}>
                    <span style={{ position: "absolute", left: 0, color: "var(--orange)", fontWeight: 700 }}>→</span>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Content */}
          {section.content && (
            <div
              style={{ marginBottom: 24, color: "var(--text)", fontSize: 14, lineHeight: 1.6 }}
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          )}

          {/* Websites */}
          {section.resources?.websites?.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--orange)", marginBottom: 12 }}>
                Recommended Websites
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
                {section.resources.websites.map((web, i) => (
                  <a key={i} href={web.url} target="_blank" rel="noopener noreferrer" style={{
                    display: "flex", flexDirection: "column", justifyContent: "space-between",
                    padding: "18px", background: "var(--surface2)", borderRadius: 14,
                    textDecoration: "none", color: "var(--text)", fontSize: 14,
                    border: "1px solid var(--border)", minHeight: 90,
                  }}>
                    <span style={{ fontWeight: 700, marginBottom: 10 }}>{web.title}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--orange)" }}>Visit Site →</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Videos */}
          {section.resources?.videos?.length > 0 && (
            <div>
              <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--orange)", marginBottom: 12 }}>
                Recommended Videos
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
                {section.resources.videos.map((vid, i) => (
                  <a key={i} href={vid.url} target="_blank" rel="noopener noreferrer" style={{
                    display: "block", padding: "18px", background: "var(--surface2)", borderRadius: 14,
                    textDecoration: "none", color: "var(--text)", fontSize: 14, border: "1px solid var(--border)",
                  }}>
                    <span style={{ fontWeight: 700, display: "block", marginBottom: 8 }}>{vid.title}</span>
                    <span style={{ fontSize: 12, color: "var(--muted2)" }}>{vid.dur} · Watch on YouTube →</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ─── Main View ────────────────────────────────────────────────────────────────
interface GeneratedRoadmapViewProps {
  roadmap: GeneratedRoadmap;
  answers: Partial<RoadmapAnswers>;
  onNewRoadmap: () => void;
}

const GeneratedRoadmapView: React.FC<GeneratedRoadmapViewProps> = ({ roadmap, answers, onNewRoadmap }) => {
  const t: Record<string, string> = {
    border: "var(--border)",
    surface: "var(--surface)",
    surface2: "var(--surface2)",
    text: "var(--text)",
    muted: "var(--muted2)",
    brand: "var(--orange)",
  };

  return (
    <div style={{ padding: "24px 0" }}>

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, fontSize: 14, color: t.muted }}>
        <span onClick={onNewRoadmap} style={{ color: "var(--orange)", cursor: "pointer", fontWeight: 600 }}>Roadmaps</span>
        <span>/</span>
        <span>{roadmap.title}</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: 32, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 24 }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)", fontWeight: 800, color: t.text, marginBottom: 12 }}>
            {roadmap.title}
          </h1>
          <p style={{ fontSize: "1.1rem", color: t.muted, marginBottom: 20, maxWidth: 800 }}>
            {roadmap.description}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <span style={{ padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 700, color: "white", background: "#10b981" }}>
              {roadmap.difficulty}
            </span>
            <span style={{ padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 700, background: t.surface2, color: t.brand, display: "inline-flex", alignItems: "center", gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--orange)" }}>
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              {roadmap.estimatedDuration}
            </span>
            <span style={{ padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 700, background: "rgba(255,92,53,0.12)", color: t.brand }}>
              ✦ Personalized for you
            </span>
          </div>
        </div>

        <button onClick={onNewRoadmap} style={{
          display: "flex", alignItems: "center", gap: 6,
          background: "transparent", border: "1px solid var(--border)",
          borderRadius: 10, padding: "10px 16px",
          fontSize: 13, color: t.muted, cursor: "pointer",
          transition: "border-color 0.15s, color 0.15s",
          fontWeight: 500,
        }}
          onMouseOver={(e) => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.color = "var(--orange)"; }}
          onMouseOut={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = t.muted; }}
        >
          + New Roadmap
        </button>
      </div>

      {/* Progress Overview */}
      <div style={{
        background: t.surface2,
        border: `1px solid ${t.border}`,
        borderRadius: 24, padding: "2rem", marginBottom: 40,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32, marginBottom: 32 }}>
          {[
            { value: roadmap.sections.length, label: "Total Sections" },
            { value: roadmap.sections.reduce((acc, s) => acc + (s.points || 0), 0), label: "Total Points" },
            { value: roadmap.estimatedDuration, label: "Estimated Duration" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--orange)" }}>{s.value}</div>
              <div style={{ fontSize: 14, color: t.muted, marginTop: 4, textTransform: "uppercase", letterSpacing: "1px" }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div>
          <div style={{ height: 10, background: t.border, borderRadius: 10, overflow: "hidden" }}>
            <div style={{ height: "100%", width: "0%", background: "linear-gradient(90deg,var(--orange) 0%,#ff8c42 100%)" }} />
          </div>
          <div style={{ fontSize: 12, color: t.muted, marginTop: 6, textAlign: "right" }}>Start your journey!</div>
        </div>
      </div>

      {/* Learning Journey */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: t.text, marginBottom: 24 }}>Learning Journey</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {roadmap.sections.map((section, i) => (
            <SectionPreviewCard key={section.id} section={section} index={i} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default GeneratedRoadmapView;