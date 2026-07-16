"use client";

import React, { useState, useEffect } from "react";
import { Cpu, Workflow, BookOpen, Users, Star, Search, Clock, ListCollapse, ArrowLeft } from "lucide-react";
import CTutorialPage from "../c/pages/CTutorialPage"; // Import C tutorial feature directly
import JavaTutorialPage from "../java/pages/JavaTutorialPage"; // Import Java tutorial feature
import DAATutorialPage from "../daa/pages/DAATutorialPage";
import DBMSTutorialPage from "../dbms/pages/DBMSTutorialPage";
import TutorialsLandingPage from "./TutorialsLandingPage";
import VideosPlaceholderPage from "./VideosPlaceholderPage";

// Official stylized programming language logo SVGs
const CLogo = (props: any) => (
  <svg viewBox="0 0 306 344.35" width="22" height="22" className={props.className} style={props.style}>
    <path fill="#00599C" d="M302.107,258.262c2.401-4.159,3.893-8.845,3.893-13.053V99.14c0-4.208-1.49-8.893-3.892-13.052L153,172.175 L302.107,258.262z"/>
    <path fill="#004482" d="M166.25,341.193l126.5-73.034c3.644-2.104,6.956-5.737,9.357-9.897L153,172.175L3.893,258.263 c2.401,4.159,5.714,7.793,9.357,9.896l126.5,73.034C147.037,345.401,158.963,345.401,166.25,341.193z"/>
    <path fill="#659AD2" d="M302.108,86.087c-2.402-4.16-5.715-7.793-9.358-9.897L166.25,3.156c-7.287-4.208-19.213-4.208-26.5,0 L13.25,76.19C5.962,80.397,0,90.725,0,99.14v146.069c0,4.208,1.491,8.894,3.893,13.053L153,172.175L302.108,86.087z"/>
    <g>
      <path fill="#FFFFFF" d="M153,274.175c-56.243,0-102-45.757-102-102s45.757-102,102-102c36.292,0,70.139,19.53,88.331,50.968 l-44.143,25.544c-9.105-15.736-26.038-25.512-44.188-25.512c-28.122,0-51,22.878-51,51c0,28.121,22.878,51,51,51 c18.152,0,35.085-9.776,44.191-25.515l44.143,25.543C223.142,254.644,189.294,274.175,153,274.175z"/>
    </g>
  </svg>
);

const JavaLogo = (props: any) => (
  <svg viewBox="0 0 128 128" width="22" height="22" className={props.className} style={props.style}>
    <path fill="#0074BD" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"/>
    <path fill="#EA2D2E" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"/>
    <path fill="#0074BD" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"/>
    <path fill="#EA2D2E" d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z"/>
    <path fill="#0074BD" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"/>
  </svg>
);

const SUBJECTS = [
  { 
    id: "c",
    title: "C Programming", 
    description: "Learn pointers, dynamic allocations, and syntax structure with interview questions.", 
    icon: CLogo, 
    color: "#ff6b35",
    difficulty: "Beginner",
    duration: "2-4 Weeks",
    chapters: 17
  },
  {
    id: "java",
    title: "Java Programming",
    description: "Master classes, objects, exception handling, and collections with interactive exercises.",
    icon: JavaLogo,
    color: "#e2433b",
    difficulty: "Intermediate",
    duration: "4-8 Weeks",
    chapters: 25
  },
  { 
    id: "daa",
    title: "DAA", 
    description: "Design and Analysis of Algorithms - Learn complexity, sorting, and advanced algorithmic patterns.", 
    icon: Workflow, 
    color: "#a855f7",
    disabled: false,
    difficulty: "Advanced",
    duration: "6-10 Weeks",
    chapters: 44
  },
  { 
    id: "dbms",
    title: "DBMS", 
    description: "Database Management Systems - Master SQL, normalization, and database architecture.", 
    icon: Cpu, 
    color: "#6c63ff",
    disabled: false,
    difficulty: "Intermediate",
    duration: "4-6 Weeks",
    chapters: 10
  },
];

export function TutorialsNotesPage({ onBackToLanding }: { onBackToLanding: () => void }) {
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [progressStatus, setProgressStatus] = useState<Record<string, boolean>>(() => {
    if (typeof window === 'undefined') return {};
    const status: Record<string, boolean> = {};
    SUBJECTS.forEach(sub => {
      try {
        const stored = localStorage.getItem(`${sub.id}_tutorial_progress`);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Object.keys(parsed).length > 0) {
            status[sub.id] = true;
          }
        }
      } catch (e) {}
    });
    return status;
  });

  const t: Record<string, string> = {
    border: 'var(--border)',
    surface: 'var(--surface)',
    surface2: 'var(--surface2)',
    text: 'var(--text)',
    muted: 'var(--muted2)',
    brand: 'var(--orange)',
  };

  if (activeSubject === "c") return <CTutorialPage onBack={() => setActiveSubject(null)} />;
  if (activeSubject === "java") return <JavaTutorialPage onBack={() => setActiveSubject(null)} />;
  if (activeSubject === "daa") return <DAATutorialPage onBack={() => setActiveSubject(null)} />;
  if (activeSubject === "dbms") return <DBMSTutorialPage onBack={() => setActiveSubject(null)} />;

  const filteredSubjects = SUBJECTS.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fade-in" style={{ padding: '24px 0', maxWidth: '1200px', margin: '0 auto', paddingLeft: 24, paddingRight: 24 }}>
      {/* Back Button */}
      <button 
        onClick={onBackToLanding}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent',
          border: 'none', color: t.muted, cursor: 'pointer', fontSize: '14px',
          fontWeight: 600, padding: 0, marginBottom: '24px',
          transition: 'color 0.2s'
        }}
        onMouseEnter={e => (e.currentTarget.style.color = t.text)}
        onMouseLeave={e => (e.currentTarget.style.color = t.muted)}
      >
        Back to Tutorials
      </button>

      {/* Header Section */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontSize: "28px", fontWeight: 800, color: "var(--text)", marginBottom: '4px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          Learning <span style={{ color: t.brand }}>Tutorials</span>
        </h1>
        <p style={{ color: t.muted, fontSize: "14px", marginTop: "4px" }}>
          Step-by-step programming language guides and high-frequency interview questions
        </p>
      </div>


      {/* Toolbar */}
      <div style={{
        display: 'flex',
        gap: 16,
        marginBottom: 40,
        flexWrap: 'wrap',
        alignItems: 'center',
        padding: '20px',
        background: t.surface,
        borderRadius: 16,
        border: `1px solid ${t.border}`
      }}>
        <div style={{
          flex: '1 1 300px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Search size={18} style={{ position: 'absolute', left: 16, color: t.muted }} />
          <input
            type="text"
            placeholder="Search tutorials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(0,0,0,0.2)',
              border: `1px solid ${t.border}`,
              borderRadius: 12,
              padding: '12px 16px 12px 44px',
              color: t.text,
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = t.brand}
            onBlur={(e) => e.target.style.borderColor = t.border}
          />
        </div>
      </div>

      {/* Grid List */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
        {filteredSubjects.map((sub) => {
          return (
            <div
              key={sub.id}
              onClick={() => {
                if (!sub.disabled) setActiveSubject(sub.id);
              }}
              style={{
                background: t.surface,
                border: `1px solid ${t.border}`,
                borderRadius: '16px',
                padding: '24px',
                cursor: sub.disabled ? "not-allowed" : "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                opacity: sub.disabled ? 0.6 : 1,
                display: "flex",
                flexDirection: "column",
                position: 'relative',
                overflow: 'hidden',
                minHeight: '280px'
              }}
              onMouseEnter={e => {
                if (!sub.disabled) {
                  (e.currentTarget as HTMLElement).style.borderColor = sub.color;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 24px -10px ${sub.color}40`;
                }
              }}
              onMouseLeave={e => {
                if (!sub.disabled) {
                  (e.currentTarget as HTMLElement).style.borderColor = t.border;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "14px",
                  background: `${sub.color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px solid ${sub.color}30`
                }}>
                  <sub.icon size={28} strokeWidth={2} style={{ color: sub.color }} />
                </div>
                
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  <span style={{
                    padding: '4px 12px', borderRadius: 20, fontSize: '0.7rem',
                    fontWeight: 700, background: `${sub.color}15`, color: sub.color, height: 'fit-content',
                    border: `1px solid ${sub.color}30`
                  }}>
                    {sub.difficulty}
                  </span>
                </div>
              </div>

              <h2 style={{ marginBottom: '0.5rem', fontSize: '20px', fontWeight: 700, color: 'var(--text)' }}>
                {sub.title}
                {sub.disabled && (
                  <span style={{ marginLeft: 8, fontSize: '10px', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: 4, verticalAlign: 'middle' }}>SOON</span>
                )}
              </h2>
              
              <p style={{ color: t.muted, marginBottom: '1.25rem', lineHeight: 1.5, fontSize: '14px', flexGrow: 1 }}>
                {sub.description}
              </p>

              <div style={{
                display: 'flex', gap: 16, padding: '12px 14px',
                background: 'var(--surface2)',
                borderRadius: '10px',
                marginBottom: '1.25rem', alignItems: 'center'
              }}>
                <small style={{ color: t.muted, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '12px', fontWeight: 500 }}>
                  <ListCollapse size={14} style={{ color: sub.color }} />
                  {sub.chapters} Chapters
                </small>
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button 
                  disabled={sub.disabled}
                  style={{ 
                    flex: 1, background: sub.disabled ? t.surface2 : 'var(--orange)', border: 'none', 
                    padding: '10px 16px', borderRadius: 10, color: sub.disabled ? t.muted : 'white', 
                    fontWeight: 700, cursor: sub.disabled ? 'not-allowed' : 'pointer', height: 42, fontSize: '14px',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => { if(!sub.disabled) e.currentTarget.style.filter = 'brightness(1.1)'; }}
                  onMouseOut={(e) => { if(!sub.disabled) e.currentTarget.style.filter = 'brightness(1)'; }}
                >
                  {sub.disabled ? 'Coming Soon' : (progressStatus[sub.id] ? 'Continue' : 'Start Tutorial')}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function TutorialsPage() {
  const [viewMode, setViewMode] = useState<"landing" | "notes" | "videos">("landing");

  if (viewMode === "landing") {
    return <TutorialsLandingPage onSelect={setViewMode} />;
  }

  if (viewMode === "videos") {
    return <VideosPlaceholderPage onBack={() => setViewMode("landing")} />;
  }

  return (
    <div style={{ position: 'relative' }}>
      <TutorialsNotesPage onBackToLanding={() => setViewMode("landing")} />
    </div>
  );
}