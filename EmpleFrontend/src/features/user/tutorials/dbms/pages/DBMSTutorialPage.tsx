"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CONTENT, CHAPTERS } from "../data/dbmsTutorial";
import { Badge } from "../components/CommonComponents";
import { LearnTab, MCQTab, DebugTab, CompleteTab, ArrangeTab } from "../components/TaskTabs";
import { 
  BookOpen, 
  Brain, 
  Bug, 
  Edit3, 
  Shuffle, 
  Target, 
  ArrowLeft,
  RotateCcw,
  TrendingUp,
  ChevronDown
} from "lucide-react";

interface DBMSTutorialPageProps {
  onBack: () => void;
}

const TABS = [
  { id: "learn", label: "Learn", icon: BookOpen },
  { id: "mcq", label: "Quiz", icon: Brain },
  { id: "debug", label: "Debug", icon: Bug },
  { id: "complete", label: "Complete", icon: Edit3 },
  { id: "arrange", label: "Arrange", icon: Shuffle },
  { id: "roadmap", label: "Progress", icon: TrendingUp },
];

export default function DBMSTutorialPage() {
  const [chapter, setChapter] = useState(CHAPTERS[0].id);
  const [activeTab, setActiveTab] = useState("learn");
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});
  const [isChapterDropdownOpen, setIsChapterDropdownOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("dbms_tutorial_progress");
    if (saved) {
      try {
        setCompletedMap(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse progress data", e);
      }
    }
  }, []);

  const addXP = (pts: number) => {
    setCompletedMap(m => {
      const key = `${chapter}-${activeTab}`;
      if (m[key]) return m;
      const newMap = { ...m, [key]: true };
      localStorage.setItem("dbms_tutorial_progress", JSON.stringify(newMap));
      return newMap;
    });
  };

  const resetProgress = () => {
    if (window.confirm("Are you sure you want to reset all your DBMS tutorial progress?")) {
      setCompletedMap({});
      localStorage.removeItem("dbms_tutorial_progress");
    }
  };

  return (
    <div className="min-h-screen text-[var(--text)] pb-12 animate-fadeIn bg-transparent">
      {/* Container: wider max-w for two-column support */}
      <div className="max-w-[1400px] mx-auto px-6 pt-8 space-y-6">
        {/* Header Panel */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-4">
          <div className="flex-1 min-w-[300px]">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-4 text-xs font-semibold" style={{ color: "var(--muted2)" }}>
              <Link href="/tutorials/notes" passHref>
                <button
                  style={{
                    background: "transparent", border: "none", color: "var(--orange)", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", padding: "0", borderRadius: "8px"
                  }}
                >
                  <ArrowLeft size={16} />
                </button>
              </Link>
              <span>/</span>
              <span>Database Management Systems</span>
            </div>
            
            {/* Title */}
            <h1 
              className="text-4xl font-extrabold tracking-tight mb-2"
              style={{ color: "var(--text)" }}
            >
              DBMS
            </h1>
            
            {/* Subtitle */}
            <p className="text-sm mb-4 max-w-3xl leading-relaxed" style={{ color: "var(--muted2)" }}>
              Comprehensive guided learning module covering database design, relational models, SQL queries, and transaction management.
            </p>
          </div>

          {/* User Stats Card - Modernized */}
          <div className="relative group w-full md:w-64 shrink-0 rounded-2xl overflow-hidden shadow-lg">
            {/* Dynamic AI Gradient Border (visible on hover) */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--orange)] via-purple-500 to-[var(--orange)] opacity-0 group-hover:opacity-30 transition-opacity duration-500 animate-gradient-xy blur-[2px]"></div>
            
            <div 
              className="relative p-4 rounded-2xl border flex flex-col gap-3 backdrop-blur-md transition-all duration-300 group-hover:border-transparent group-hover:bg-white/5"
              style={{ background: "rgba(255, 255, 255, 0.02)", borderColor: "var(--border)" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[var(--orange)]/10">
                    <Target className="w-4 h-4" style={{ color: "var(--orange)" }} />
                  </div>
                  <span className="text-sm font-bold text-[var(--text)]">Course Progress</span>
                </div>
                <button 
                  onClick={resetProgress}
                  title="Reset Progress"
                  className="p-1.5 rounded-lg text-[var(--muted2)] hover:text-red-400 hover:bg-red-400/10 transition-all duration-200 active:scale-95 outline-none flex items-center justify-center"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Progress Bar & Text */}
              <div className="space-y-2 mt-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span style={{ color: "var(--muted2)" }}>Tasks Completed</span>
                  <span style={{ color: "var(--orange)" }}>
                    {Object.keys(completedMap).length} / {CHAPTERS.length * 5}
                  </span>
                </div>
                {/* Sleek Progress Bar */}
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                  <div 
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{ 
                      width: `${CHAPTERS.length > 0 ? (Object.keys(completedMap).length / (CHAPTERS.length * 5)) * 100 : 0}%`,
                      background: "linear-gradient(90deg, var(--orange), #ff8a00)"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Sidebar + Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Main workspace area */}
          <div className="flex-1 w-full space-y-6">
            {/* Chapter selector Dropdown */}
            <div className="flex-1 min-w-[300px] relative z-20 mb-6">
              <div className="mb-3 text-[10px] font-bold uppercase tracking-wider font-mono text-[var(--muted2)]">
                Select Chapter
              </div>
              
              <div className="relative w-full">
                <button 
                  onClick={() => setIsChapterDropdownOpen(!isChapterDropdownOpen)}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl border text-sm font-semibold outline-none transition-all hover:bg-white/5"
                  style={{ 
                    background: "var(--surface)", 
                    borderColor: isChapterDropdownOpen ? "var(--orange)" : "var(--border)",
                    color: "var(--text)"
                  }}
                >
                  <span>{CHAPTERS.find(c => c.id === chapter)?.label || "Select a Chapter"}</span>
                  <ChevronDown size={16} className={`transition-transform duration-300 ${isChapterDropdownOpen ? "rotate-180" : ""}`} style={{ color: "var(--muted2)" }} />
                </button>

                {isChapterDropdownOpen && (
                  <div 
                    className="absolute top-[110%] left-0 right-0 rounded-xl border shadow-2xl animate-fadeIn z-50 flex flex-col"
                    style={{ background: "var(--surface)", borderColor: "var(--border)" }}
                  >
                    <div className="max-h-[300px] overflow-y-auto scrollbar-thin rounded-xl">
                      {CHAPTERS.map(ch => (
                        <button
                          key={ch.id}
                          onClick={() => {
                            setChapter(ch.id);
                            setActiveTab("learn");
                            setIsChapterDropdownOpen(false);
                          }}
                          className="w-full text-left p-3.5 text-sm font-semibold transition outline-none flex items-center justify-between"
                          style={{ 
                            background: chapter === ch.id ? "rgba(255, 255, 255, 0.03)" : "transparent",
                            color: chapter === ch.id ? "var(--orange)" : "var(--text)" 
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = chapter === ch.id ? "rgba(255, 255, 255, 0.03)" : "transparent")}
                        >
                          {ch.label}
                          {chapter === ch.id && <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--orange)" }} />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tab switcher */}
            <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
              {TABS.map(t => {
                const done = completedMap[`${chapter}-${t.id}`];
                const Icon = t.icon;
                const isActive = activeTab === t.id;
                return (
                  <button 
                    key={t.id} 
                    onClick={() => setActiveTab(t.id)}
                    className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition outline-none"
                    style={{
                      background: isActive ? "var(--orange-dim)" : "transparent",
                      borderColor: isActive ? "var(--orange)" : "transparent",
                      color: isActive ? "var(--orange)" : "var(--muted2)"
                    }}
                  >
                    <Icon size={13} />
                    <span>{t.label}</span>
                    {done && (
                      <span 
                        className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
                        style={{ background: "var(--orange)", boxShadow: "0 0 4px var(--orange)" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Panel Container */}
            <div 
              className="p-6 rounded-xl border"
              style={{ background: "var(--surface)", borderColor: "var(--border)" }}
            >
              {activeTab === "learn"    && (
                <LearnTab 
                  chapter={chapter} 
                  onXP={addXP} 
                  isCompleted={!!completedMap[`${chapter}-learn`]} 
                />
              )}
              {activeTab === "mcq"      && <MCQTab      key={chapter} chapter={chapter} onXP={addXP} />}
              {activeTab === "debug"    && <DebugTab    key={chapter} chapter={chapter} onXP={addXP} />}
              {activeTab === "complete" && <CompleteTab key={chapter} chapter={chapter} onXP={addXP} />}
              {activeTab === "arrange"  && <ArrangeTab  key={chapter} chapter={chapter} onXP={addXP} />}
              {activeTab === "roadmap"  && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: "var(--border)" }}>
                    <h3 className="text-lg font-bold text-[var(--text)]">Course Progress</h3>
                    <span 
                      className="text-xs px-3 py-1 rounded-full font-bold border"
                      style={{ background: "rgba(255,255,255,0.03)", borderColor: "var(--border)", color: "var(--muted2)" }}
                    >
                      {CHAPTERS.length} Chapters
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {CHAPTERS.map(ch => {
                      const isCurrent = chapter === ch.id;
                      const completed = ["learn", "mcq", "debug", "complete", "arrange"].every(
                        tId => completedMap[`${ch.id}-${tId}`]
                      );
                      return (
                        <div 
                          key={ch.id} 
                          className="p-4 rounded-xl border flex flex-col gap-3 transition-all duration-200 cursor-pointer"
                          onClick={() => { setChapter(ch.id); setActiveTab("learn"); }}
                          style={{ 
                            background: isCurrent ? "var(--surface2)" : "rgba(255,255,255,0.01)", 
                            borderColor: isCurrent ? "var(--orange)" : "var(--border)" 
                          }}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-bold text-[var(--text)] truncate">{ch.label}</span>
                            <button 
                              onClick={() => { setChapter(ch.id); setActiveTab("learn"); }}
                              className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 outline-none border"
                              style={{
                                background: completed ? "rgba(16, 185, 129, 0.08)" : (isCurrent ? "var(--orange)" : "transparent"),
                                borderColor: completed ? "rgba(16, 185, 129, 0.25)" : "var(--orange)",
                                color: completed ? "#34d399" : (isCurrent ? "#fff" : "var(--orange)"),
                              }}
                            >
                              {completed ? "Done ✓" : "Study"}
                            </button>
                          </div>
                          
                          <div className="flex gap-1.5 mt-1">
                            {TABS.filter(t => t.id !== "roadmap").map(t => {
                              const done = completedMap[`${ch.id}-${t.id}`];
                              return (
                                <div 
                                  key={t.id} 
                                  title={`${ch.label} - ${t.label}`}
                                  className="w-7 h-7 rounded-md border flex items-center justify-center text-[10px] font-extrabold transition-all duration-200"
                                  style={{
                                    background: done ? "var(--orange-dim)" : "transparent",
                                    borderColor: done ? "var(--orange)" : "var(--border)",
                                    color: done ? "var(--orange)" : "var(--muted2)"
                                  }}
                                >
                                  {done ? "✓" : t.label[0]}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
