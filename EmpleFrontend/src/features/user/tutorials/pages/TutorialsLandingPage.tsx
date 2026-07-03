import React from "react";
import { BookText, PlaySquare } from "lucide-react";

interface TutorialsLandingPageProps {
  onSelect: (mode: "notes" | "videos") => void;
}

export default function TutorialsLandingPage({ onSelect }: TutorialsLandingPageProps) {
  const t: Record<string, string> = {
    border: 'var(--border)',
    surface: 'var(--surface)',
    surface2: 'var(--surface2)',
    text: 'var(--text)',
    muted: 'var(--muted2)',
    brand: 'var(--orange)',
  };

  return (
    <div className="fade-in" style={{ padding: '48px 24px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
      <style>{`
        @keyframes ai-spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .ai-card {
          position: relative;
          border-radius: 26px;
          padding: 2px;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: var(--surface); /* Default fallback */
        }
        .ai-card::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%; 
          width: 250%; height: 250%;
          background: conic-gradient(from 0deg, transparent 0%, var(--glow-color) 25%, transparent 50%);
          animation: ai-spin 6s linear infinite;
          opacity: 0.15;
          transition: opacity 0.3s ease;
          z-index: 0;
        }
        .ai-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px -10px var(--glow-color-dim);
        }
        .ai-card:hover::before {
          opacity: 1;
          animation: ai-spin 3s linear infinite;
        }
        .ai-inner {
          background: var(--surface);
          border-radius: 24px;
          padding: 48px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 1;
          height: 100%;
          border: 1px solid var(--border);
          transition: border-color 0.3s ease;
        }
        .ai-card:hover .ai-inner {
          border-color: transparent;
        }
        .icon-container {
          width: 88px;
          height: 88px;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 28px;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s;
        }
        .ai-card:hover .icon-container {
          transform: scale(1.05);
        }
      `}</style>

      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontSize: "36px", fontWeight: 800, color: "var(--text)", marginBottom: '8px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          <span style={{ color: t.brand }}>Tutorials</span>
        </h1>
        <p style={{ color: t.muted, fontSize: "16px", marginTop: "4px" }}>
          Choose how you'd like to learn.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px", padding: "16px 0" }}>
        
        {/* Notes Card */}
        <div
          className="ai-card"
          onClick={() => onSelect("notes")}
          style={{ 
            '--glow-color': t.brand, 
            '--glow-color-dim': `${t.brand}40` 
          } as React.CSSProperties}
        >
          <div className="ai-inner">
            <div className="icon-container" style={{
              background: `${t.brand}15`,
              border: `1px solid ${t.brand}30`
            }}>
              <BookText size={44} strokeWidth={2} style={{ color: t.brand }} />
            </div>
            <h2 style={{ marginBottom: '0.75rem', fontSize: '26px', fontWeight: 800, color: 'var(--text)' }}>
              Notes
            </h2>
            <p style={{ color: t.muted, lineHeight: 1.6, fontSize: '15px' }}>
              Step-by-step programming language guides, roadmaps, and interview questions.
            </p>
          </div>
        </div>

        {/* Videos Card */}
        <div
          className="ai-card"
          onClick={() => onSelect("videos")}
          style={{ 
            '--glow-color': '#a855f7', 
            '--glow-color-dim': '#a855f740' 
          } as React.CSSProperties}
        >
          <div className="ai-inner">
            <div className="icon-container" style={{
              background: `#a855f715`,
              border: `1px solid #a855f730`
            }}>
              <PlaySquare size={44} strokeWidth={2} style={{ color: "#a855f7" }} />
            </div>
            <h2 style={{ marginBottom: '0.75rem', fontSize: '26px', fontWeight: 800, color: 'var(--text)' }}>
              Videos
            </h2>
            <p style={{ color: t.muted, lineHeight: 1.6, fontSize: '15px' }}>
              High-quality video tutorials and walkthroughs for deep technical concepts.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
