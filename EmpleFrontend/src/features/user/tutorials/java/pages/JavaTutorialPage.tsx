"use client";

import React, { useState, useEffect } from "react";
import { CONTENT, CHAPTERS } from "../data/javaTutorial";
import { Badge } from "../components/CommonComponents";
import { LearnTab, MCQTab, DebugTab, CompleteTab, ArrangeTab } from "../components/TaskTabs";
import { 
  BookOpen, 
  Brain, 
  Bug, 
  Edit3, 
  Shuffle, 
  Target, 
  RotateCcw
} from "lucide-react";

interface JavaTutorialPageProps {
  onBack: () => void;
}

const TABS = [
  { id: "learn", label: "Learn", icon: BookOpen },
  { id: "mcq", label: "Quiz", icon: Brain },
  { id: "debug", label: "Debug", icon: Bug },
  { id: "complete", label: "Complete", icon: Edit3 },
  { id: "arrange", label: "Arrange", icon: Shuffle },
];

export default function JavaTutorialPage({ onBack }: JavaTutorialPageProps) {
  const [chapter, setChapter] = useState("basics");
  const [activeTab, setActiveTab] = useState("learn");
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});
  const [showRoadmap, setShowRoadmap] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("java_tutorial_progress");
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
      localStorage.setItem("java_tutorial_progress", JSON.stringify(newMap));
      return newMap;
    });
  };

  const resetProgress = () => {
    if (window.confirm("Are you sure you want to reset all your Java Programming tutorial progress?")) {
      setCompletedMap({});
      localStorage.removeItem("java_tutorial_a");
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
              <button 
                onClick={onBack}
                className="hover:underline outline-none transition-colors"
                style={{ color: "var(--orange)" }}
              >
                Tutorials
              </button>
              <span>/</span>
              <span>Java Programming</span>
            </div>
            
            {/* Title */}
            <h1 
              className="text-4xl font-extrabold tracking-tight mb-2"
              style={{ color: "var(--text)" }}
            >
              Java Programming
            </h1>
            
            {/* Subtitle */}
            <p className="text-sm mb-4 max-w-3xl leading-relaxed" style={{ color: "var(--muted2)" }}>
              Comprehensive guided learning module covering syntax, object-oriented principles, exception handling, and the collections framework.
            </p>
          </div>

          {/* User Stats Card */}
          <div 
            className="p-4 rounded-xl border w-full md:w-56 shrink-0"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Target className="w-4 h-4" style={{ color: "var(--orange)" }} />
                <span className="text-xs font-bold text-[var(--text)]">Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <span 
                  className="text-xs px-2 py-0.5 rounded font-bold border"
                  style={{ background: "rgba(255,255,255,0.03)", borderColor: "var(--border)", color: "var(--orange)" }}
                >
                  {Object.keys(completedMap).length} / {CHAPTERS.length * 5} Done
                </span>
                {Object.keys(completedMap).length > 0 && (
                  <button 
                    onClick={resetProgress}
                    title="Reset Progress"
                    className="p-1 rounded-full text-[var(--muted2)] hover:text-red-500 hover:bg-red-500/10 transition active:scale-90 outline-none flex items-center justify-center"
                    style={{ border: "1px solid var(--border)" }}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Sidebar + Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Main workspace area */}
          <div className="flex-1 w-full space-y-6">
            {/* Chapter selector */}
            <div className="flex gap-2 flex-wrap border-b pb-4" style={{ borderColor: "var(--border)" }}>
              {CHAPTERS.map(ch => {
                const isActive = chapter === ch.id;
                return (
                  <button 
                    key={ch.id} 
                    onClick={() => { setChapter(ch.id); setActiveTab("learn"); }}
                    className="px-4 py-2 rounded-lg text-xs font-bold transition duration-200 outline-none border"
                    style={{
                      background: isActive ? "var(--orange)" : "var(--surface)",
                      borderColor: isActive ? "transparent" : "var(--border)",
                      color: isActive ? "#fff" : "var(--muted2)"
                    }}
                  >
                    <span>{ch.label}</span>
                  </button>
                );
              })}
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
            </div>
          </div>

          {/* Collapsible Sidebar: Syllabus Roadmap */}
          {showRoadmap ? (
            <div 
              className="w-full lg:w-[350px] shrink-0 p-5 rounded-xl border space-y-4 animate-fadeIn"
              style={{ background: "var(--surface)", borderColor: "var(--border)" }}
            >
              <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: "var(--border)" }}>
                <div 
                  className="flex items-center cursor-pointer select-none group" 
                  onClick={() => setShowRoadmap(false)}
                  title="Click to collapse"
                >
                  <h4 className="text-[11px] font-bold uppercase tracking-wider font-mono text-[var(--muted2)] group-hover:text-[var(--orange)] transition-colors">Syllabus Roadmap</h4>
                </div>
                <div className="flex items-center gap-2">
                  <span 
                    className="text-[9px] px-2 py-0.5 rounded font-bold border"
                    style={{ background: "rgba(255,255,255,0.03)", borderColor: "var(--border)", color: "var(--muted2)" }}
                  >
                    {CHAPTERS.length} Chapters
                  </span>
                  <button 
                    onClick={() => setShowRoadmap(false)}
                    className="p-1 rounded hover:bg-[var(--surface2)] text-[var(--muted2)] hover:text-[var(--orange)] transition-all outline-none"
                    title="Collapse Sidebar"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Scrollable list of chapters */}
              <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1.5 scrollbar-thin">
                {CHAPTERS.map(ch => {
                  const isCurrent = chapter === ch.id;
                  const completed = ["learn", "mcq", "debug", "complete", "arrange"].every(
                    tId => completedMap[`${ch.id}-${tId}`]
                  );
                  return (
                    <div 
                      key={ch.id} 
                      className="p-3 rounded-lg border flex flex-col gap-2 transition-all duration-200"
                      style={{ 
                        background: isCurrent ? "var(--surface2)" : "rgba(255,255,255,0.01)", 
                        borderColor: isCurrent ? "var(--orange)" : "var(--border)" 
                      }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-[var(--text)] truncate">{ch.label}</span>
                        <button 
                          onClick={() => { setChapter(ch.id); setActiveTab("learn"); }}
                          className="px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 outline-none border"
                          style={{
                            background: completed ? "rgba(16, 185, 129, 0.08)" : (isCurrent ? "var(--orange)" : "transparent"),
                            borderColor: completed ? "rgba(16, 185, 129, 0.25)" : "var(--orange)",
                            color: completed ? "#34d399" : (isCurrent ? "#fff" : "var(--orange)"),
                          }}
                        >
                          {completed ? "Done ✓" : "Study"}
                        </button>
                      </div>
                      
                      <div className="flex gap-1">
                        {TABS.map(t => {
                          const done = completedMap[`${ch.id}-${t.id}`];
                          return (
                            <div 
                              key={t.id} 
                              title={`${ch.label} - ${t.label}`}
                              className="w-6 h-6 rounded-md border flex items-center justify-center text-[9px] font-extrabold transition-all duration-200"
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
          ) : (
            <div 
              onClick={() => setShowRoadmap(true)}
              className="hidden lg:flex w-10 shrink-0 border rounded-xl flex-col items-center py-6 cursor-pointer select-none transition-all duration-200 hover:border-[var(--orange)] hover:bg-[var(--surface2)]"
              style={{ background: "var(--surface)", borderColor: "var(--border)", height: "450px" }}
              title="Expand Syllabus Roadmap"
            >
              {/* Pulsing expand arrow */}
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                style={{ color: "var(--orange)" }} 
                className="mb-4 animate-bounce"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>

              {/* Vertical text */}
              <span 
                className="text-[10px] font-bold uppercase tracking-widest font-mono text-[var(--muted2)] whitespace-nowrap"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                Syllabus Roadmap
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
