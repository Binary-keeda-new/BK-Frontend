'use client';

import React, { useState, useEffect } from 'react';
import { getRoadmapById } from '../data/index';
import QuizModal from './QuizModal';
import SectionCard from './SectionCard';
import { Search, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { useWallet } from "@/providers/WalletProvider";
import { useNotification } from "@/providers/NotificationProvider";

const categoryColors: Record<string, { bg: string; text: string }> = {
  "Aptitude": { bg: "rgba(249, 115, 22, 0.15)", text: "#f97316" },
  "Core Subjects": { bg: "rgba(16, 185, 129, 0.15)", text: "#10b981" },
  "Tools": { bg: "rgba(139, 92, 246, 0.15)", text: "#8b5cf6" },
  "Programming Language": { bg: "rgba(245, 158, 11, 0.15)", text: "#f59e0b" },
  "DSA": { bg: "rgba(239, 68, 68, 0.15)", text: "#ef4444" },
  "Full Stack": { bg: "rgba(14, 165, 233, 0.15)", text: "#0ea5e9" },
  "Rest/Revision": { bg: "rgba(107, 114, 128, 0.15)", text: "#9ca3af" }
};

interface RoadmapDetailProps {
  roadmapId: string;
  onBack: () => void;
}

interface ProgressDetails {
  completedContent: any[];
  viewedWebsites: Record<string, any>;
  watchedVideos: Record<string, any>;
  passedQuizzes: Record<string, any>;
  completedProblems?: number[];
}

const getDaysForSection = (sectionId: number): number[] => {
  const ranges: Record<number, [number, number]> = {
    1: [1, 10],
    2: [11, 20],
    3: [21, 30],
    4: [31, 40],
    5: [41, 50],
    6: [51, 60],
    7: [61, 75],
    8: [76, 95],
    9: [96, 100],
    10: [101, 120]
  };
  const range = ranges[sectionId];
  if (!range) return [];
  const [start, end] = range;
  const days = [];
  for (let i = start; i <= end; i++) {
    days.push(i);
  }
  return days;
};

const RoadmapDetail: React.FC<RoadmapDetailProps> = ({ roadmapId, onBack }) => {
  const t: Record<string, string> = {
    border: 'var(--border)',
    surface: 'var(--surface)',
    surface2: 'var(--surface2)',
    text: 'var(--text)',
    textMuted: 'var(--muted2)',
    brand: 'var(--orange)',
    progressBg: 'var(--surface2)',
  };

  const { notifyReward } = useNotification();
  const { config, refreshWallet } = useWallet();
  const rewardCoins = config?.ROADMAP?.COMPLETION_REWARD || 50;

  const [duration, setDuration] = useState<string>('6 months');
  const roadmap = getRoadmapById(roadmapId, duration);

  const handleDurationChange = (newDur: string) => {
    setDuration(newDur);
    localStorage.setItem(`roadmap_duration_${roadmapId}`, newDur);
  };

  useEffect(() => {
    const saved = localStorage.getItem(`roadmap_duration_${roadmapId}`);
    if (saved) {
      setDuration(saved);
    } else {
      const tempRoadmap = getRoadmapById(roadmapId);
      if (tempRoadmap && tempRoadmap.durations) {
        const keys = Object.keys(tempRoadmap.durations);
        if (keys.length > 0) {
          if (keys.includes('6 months')) {
            setDuration('6 months');
          } else {
            setDuration(keys[0]);
          }
        } else {
          setDuration('6 months');
        }
      } else {
        setDuration('6 months');
      }
    }
  }, [roadmapId]);

  // PERSISTENCE
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [completedSections, setCompletedSections] = useState<Set<any>>(new Set());
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [selectedSection, setSelectedSection] = useState<any>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeIframeUrl, setActiveIframeUrl] = useState<string | null>(null);

  const [progressDetails, setProgressDetails] = useState<ProgressDetails>({
    completedContent: [],
    viewedWebsites: {},
    watchedVideos: {},
    passedQuizzes: {},
    completedProblems: []
  });

  // Load progress on mount
  useEffect(() => {
    setIsLoaded(false);
    const saved = localStorage.getItem(`roadmap_progress_${roadmapId}`);
    if (saved) {
      const { sections, points } = JSON.parse(saved);
      setCompletedSections(new Set(sections));
      setTotalPoints(points);
    } else {
      setCompletedSections(new Set());
      setTotalPoints(0);
    }

    const savedDetails = localStorage.getItem(`roadmap_progress_details_${roadmapId}`);
    if (savedDetails) {
      const parsed = JSON.parse(savedDetails);
      setProgressDetails({
        completedContent: parsed.completedContent || [],
        viewedWebsites: parsed.viewedWebsites || {},
        watchedVideos: parsed.watchedVideos || {},
        passedQuizzes: parsed.passedQuizzes || {},
        completedProblems: parsed.completedProblems || []
      });
    } else {
      setProgressDetails({
        completedContent: [],
        viewedWebsites: {},
        watchedVideos: {},
        passedQuizzes: {},
        completedProblems: []
      });
    }
    setIsLoaded(true);
  }, [roadmapId]);

  useEffect(() => {
    if (!roadmap || !isLoaded) return;
    const totalSections = roadmap.totalSections || 1;
    if (completedSections.size === totalSections && totalSections > 0) {
      const rewardKey = `roadmap_rewarded_${roadmapId}`;
      if (!localStorage.getItem(rewardKey)) {
        notifyReward("Roadmap Completed", "Awesome job!", rewardCoins);
        refreshWallet();
        localStorage.setItem(rewardKey, 'true');
      }
    }
  }, [completedSections.size, roadmap, isLoaded, roadmapId, notifyReward, refreshWallet, rewardCoins]);

  // Save detailed progress on change
  useEffect(() => {
    if (isLoaded && roadmapId) {
      localStorage.setItem(`roadmap_progress_details_${roadmapId}`, JSON.stringify(progressDetails));
    }
  }, [progressDetails, roadmapId, isLoaded]);

  // Synchronize detailed progress with standard completedSections and totalPoints
  useEffect(() => {
    if (!isLoaded || !roadmap) return;

    if (roadmapId === 'placement-roadmap') {
      const completedDays = progressDetails.completedContent?.filter((id: any) => String(id).startsWith('day-')) || [];
      const newCompleted = new Set(completedDays);
      const hasChanged = completedSections.size !== newCompleted.size || 
                         !Array.from(completedSections).every(val => newCompleted.has(val));
      if (hasChanged) {
        setCompletedSections(newCompleted);
        localStorage.setItem(`roadmap_progress_${roadmapId}`, JSON.stringify({
          sections: Array.from(newCompleted),
          points: 0
        }));
      }
      return;
    }

    if (roadmapId === '120-days-of-code') {
      const completedProblems = progressDetails.completedProblems || [];
      const newCompleted = new Set<any>();
      let newPoints = 0;

      roadmap.sections.forEach((section: any) => {
        const sectionDays = getDaysForSection(section.id);
        if (sectionDays.length > 0) {
          const allCompleted = sectionDays.every(day => completedProblems.includes(day));
          if (allCompleted) {
            newCompleted.add(section.id);
            newPoints += (section.points || 0);
          }
        }
      });

      const currentCompletedArr = Array.from(completedSections);
      const newCompletedArr = Array.from(newCompleted);
      const hasChanged = currentCompletedArr.length !== newCompletedArr.length || 
                        !currentCompletedArr.every(val => newCompleted.has(val)) ||
                        totalPoints !== newPoints;

      if (hasChanged) {
        setCompletedSections(newCompleted);
        setTotalPoints(newPoints);
        localStorage.setItem(`roadmap_progress_${roadmapId}`, JSON.stringify({
          sections: newCompletedArr,
          points: newPoints
        }));
      }
      return;
    }

    const newCompleted = new Set<any>();
    let newPoints = 0;

    roadmap.sections.forEach((section: any) => {
      const isNewSchema = section.resources && !Array.isArray(section.resources);
      let isComp = false;

      if (!isNewSchema) {
        // Fallback for old roadmaps
        if (completedSections.has(section.id)) {
          isComp = true;
        }
      } else {
        // New validation rules
        const contentFinished = progressDetails.completedContent?.includes(section.id) || false;
        
        const passedLvs = progressDetails.passedQuizzes?.[section.id] || {};
        const hasQuizzes = !!(section.quizzes && (section.quizzes.easy || section.quizzes.medium || section.quizzes.hard));
        const quizzesFinished = hasQuizzes ? (passedLvs.easy && passedLvs.medium && passedLvs.hard) : true;
        
        // Recommended websites and videos are optional, so only reading content and quizzes are required
        isComp = !!(contentFinished && quizzesFinished);
      }

      if (isComp) {
        newCompleted.add(section.id);
        newPoints += (section.points || 0);
      }
    });

    const currentCompletedArr = Array.from(completedSections);
    const newCompletedArr = Array.from(newCompleted);
    const hasChanged = currentCompletedArr.length !== newCompletedArr.length || 
                      !currentCompletedArr.every(val => newCompleted.has(val)) ||
                      totalPoints !== newPoints;

    if (hasChanged) {
      setCompletedSections(newCompleted);
      setTotalPoints(newPoints);
      localStorage.setItem(`roadmap_progress_${roadmapId}`, JSON.stringify({
        sections: newCompletedArr,
        points: newPoints
      }));
    }
  }, [progressDetails, roadmap, roadmapId, isLoaded]);

  const handleStartQuiz = (section: any, level?: string | null) => {
    setSelectedSection(section);
    setSelectedLevel(level || null);
  };

  const handleDayToggle = (dayNumber: number, checked: boolean) => {
    const dayId = `day-${dayNumber}`;
    let newCompletedContent = [...(progressDetails.completedContent || [])];
    if (checked) {
      if (!newCompletedContent.includes(dayId)) {
        newCompletedContent.push(dayId);
      }
    } else {
      newCompletedContent = newCompletedContent.filter(id => id !== dayId);
    }
    setProgressDetails(prev => ({
      ...prev,
      completedContent: newCompletedContent
    }));
  };

  const handleQuizComplete = (passed: boolean, points: number, percentage: number, level?: string | null) => {
    if (passed && selectedSection) {
      const isNewSchema = selectedSection.resources && !Array.isArray(selectedSection.resources);

      if (!isNewSchema) {
        // Legacy flow
        setCompletedSections(prev => new Set([...prev, selectedSection.id]));
        if (!completedSections.has(selectedSection.id)) {
          setTotalPoints(p => p + points);
        }
      } else if (level) {
        // New multi-level flow
        const currentPassed = progressDetails.passedQuizzes?.[selectedSection.id] || {};
        const newPassed = { ...currentPassed, [level]: true };
        
        setProgressDetails(prev => ({
          ...prev,
          passedQuizzes: {
            ...prev.passedQuizzes,
            [selectedSection.id]: newPassed
          }
        }));
      }
    }
  };

  if (!roadmap) return <div style={{ color: 'var(--text)', padding: 20 }}>Roadmap not found.</div>;

  const progress = (completedSections.size / (roadmap.totalSections || 1)) * 100;
  const hasMultipleDurations = roadmapId === 'ai-ml' || roadmapId === 'full-stack';

  const filteredDays = roadmapId === 'placement-roadmap'
    ? (roadmap?.sections || []).filter((day: any) => {
        const query = searchQuery.toLowerCase();
        
        const matchesDay = `day ${day.day}`.includes(query);
        const matchesTarget = day.targets?.some((t: any) => 
          t.topic.toLowerCase().includes(query) || 
          t.category.toLowerCase().includes(query)
        ) || false;
        
        const matchesResource = Array.isArray(day.resources)
          ? day.resources.some((r: any) => r.title.toLowerCase().includes(query))
          : false;
          
        const matchesSearch = !query || matchesDay || matchesTarget || matchesResource;

        const matchesCategory = selectedCategory === "All" || day.targets?.some((t: any) => 
          t.category === selectedCategory
        ) || false;

        return matchesSearch && matchesCategory;
      })
    : [];

  const paginatedDays = filteredDays;

  return (
    <div style={{ padding: '24px 0' }}>
      {/* Breadcrumb */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        marginBottom: 16, fontSize: 14, color: t.textMuted
      }}>
        <span onClick={onBack} style={{ color: 'var(--orange)', cursor: 'pointer', fontWeight: 600 }}>Roadmaps</span>
        <span>/</span>
        <span>{roadmap.title || roadmap.name}</span>
      </div>

      {/* Header with Title & Duration Toggle */}
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 24 }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, color: t.text, marginBottom: 12 }}>
            {roadmap.title || roadmap.name}
          </h1>
          <p style={{ fontSize: '1.1rem', color: t.textMuted, marginBottom: 20, maxWidth: 800 }}>
            {roadmap.description}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <span style={{
              padding: '6px 16px', borderRadius: 20, fontSize: 13,
              fontWeight: 700, color: 'white', background: '#10b981'
            }}>
              {roadmap.estimatedDuration}
            </span>
            <span style={{
              padding: '6px 16px', borderRadius: 20, fontSize: 13,
              fontWeight: 700, color: 'white', background: '#10b981'
            }}>
              {roadmap.difficulty}
            </span>
          </div>
        </div>

        {/* Duration Selector */}
        {hasMultipleDurations && (
          <div style={{ 
            background: t.surface, padding: 6, borderRadius: 12, 
            display: 'flex', gap: 4, border: `1px solid ${t.border}`
          }}>
            {['3 months', '6 months'].map(d => (
              <button
                key={d}
                onClick={() => handleDurationChange(d)}
                style={{
                  padding: '10px 20px', borderRadius: 8, border: 'none',
                  fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: duration === d ? 'var(--orange)' : 'transparent',
                  color: duration === d ? 'white' : t.textMuted
                }}
              >
                {d}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Progress Overview */}
      <div style={{
        background: t.progressBg,
        border: `1px solid ${t.border}`,
        borderRadius: 24, padding: '2rem', marginBottom: 40,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 32, marginBottom: 32
        }}>
          {[
            { value: `${completedSections.size}/${roadmap.totalSections}`, label: 'Sections Completed' },
            { value: `${progress.toFixed(0)}%`, label: 'Overall Progress' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--orange)' }}>{s.value}</div>
              <div style={{ fontSize: 14, color: t.textMuted, marginTop: 4, textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div>
          <div style={{ height: 10, background: t.border, borderRadius: 10, overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${progress}%`,
              background: 'linear-gradient(90deg,var(--orange) 0%,#ff8c42 100%)',
              transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }} />
          </div>
        </div>
      </div>

      {/* Sections or Tabular Roadmap */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: t.text, marginBottom: 24 }}>Learning Journey</h2>
        
        {roadmapId === 'placement-roadmap' ? (
          <div>
            {/* Search and Filter Controls */}
            <div style={{
              display: 'flex',
              gap: 16,
              marginBottom: 24,
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
              <div style={{ position: 'relative', flex: 1, minWidth: 280 }}>
                <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted2)' }} />
                <input
                  type="text"
                  placeholder="Search days, topics, or categories..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 44px',
                    background: 'var(--surface2)',
                    border: `1px solid var(--border)`,
                    borderRadius: 12,
                    color: 'var(--text)',
                    outline: 'none',
                    fontSize: 14,
                    transition: 'all 0.2s ease',
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = 'var(--orange)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface2)', padding: '4px 12px', borderRadius: 12, border: `1px solid var(--border)` }}>
                <Filter size={16} style={{ color: 'var(--muted2)' }} />
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  style={{
                    padding: '8px 24px 8px 8px',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text)',
                    fontSize: 14,
                    cursor: 'pointer',
                    outline: 'none',
                    fontWeight: 500,
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='gray' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right center',
                    backgroundSize: '14px'
                  }}
                >
                  <option value="All" style={{ background: 'var(--surface)', color: 'var(--text)' }}>All Categories</option>
                  {Object.keys(categoryColors).map(cat => (
                    <option key={cat} value={cat} style={{ background: 'var(--surface)', color: 'var(--text)' }}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Table */}
            {paginatedDays.length > 0 ? (
              <div style={{ overflowX: 'auto', borderRadius: 16, border: `1px solid var(--border)`, background: 'var(--surface)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, minWidth: 800 }}>
                  <thead>
                    <tr style={{ background: 'var(--surface2)', borderBottom: `2px solid var(--border)`, textAlign: 'left' }}>
                      <th style={{ padding: '16px 20px', width: '80px', textAlign: 'center' }}>Status</th>
                      <th style={{ padding: '16px 20px', width: '120px' }}>Day</th>
                      <th style={{ padding: '16px 20px', width: '180px' }}>Category</th>
                      <th style={{ padding: '16px 20px' }}>Target / Topic</th>
                      <th style={{ padding: '16px 20px', width: '220px' }}>Resources</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedDays.map((day: any) => {
                      const isDayChecked = completedSections.has(`day-${day.day}`);
                      return (
                        <tr
                          key={day.day}
                          style={{
                            borderBottom: `1px solid var(--border)`,
                            background: isDayChecked ? 'rgba(16, 185, 129, 0.02)' : 'transparent',
                            transition: 'background-color 0.2s'
                          }}
                        >
                          <td style={{ padding: '16px 20px', textAlign: 'center', verticalAlign: 'middle' }}>
                            <input
                              type="checkbox"
                              checked={isDayChecked}
                              onChange={(e) => handleDayToggle(day.day, e.target.checked)}
                              style={{
                                width: 18,
                                height: 18,
                                cursor: 'pointer',
                                accentColor: 'var(--orange)'
                              }}
                            />
                          </td>
                          <td style={{ padding: '16px 20px', fontWeight: 700, verticalAlign: 'middle' }}>
                            <div style={{ color: 'var(--orange)' }}>Day {day.day}</div>
                            <div style={{ fontSize: 11, color: 'var(--muted2)', fontWeight: 500, marginTop: 2 }}>{day.dayOfWeek}</div>
                          </td>
                          <td style={{ padding: '16px 20px', verticalAlign: 'middle' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                              {day.targets?.map((t: any, idx: number) => {
                                const badgeColor = categoryColors[t.category] || { bg: "rgba(107, 114, 128, 0.15)", text: "#9ca3af" };
                                return (
                                  <span
                                    key={idx}
                                    style={{
                                      padding: '4px 8px',
                                      borderRadius: 6,
                                      fontSize: 11,
                                      fontWeight: 700,
                                      background: badgeColor.bg,
                                      color: badgeColor.text,
                                      display: 'inline-block',
                                      width: 'fit-content',
                                      textTransform: 'uppercase',
                                      letterSpacing: '0.5px'
                                    }}
                                  >
                                    {t.category}
                                  </span>
                                );
                              })}
                            </div>
                          </td>
                          <td style={{ padding: '16px 20px', verticalAlign: 'middle' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                              {day.targets?.map((t: any, idx: number) => (
                                <div key={idx} style={{ color: 'var(--text)', lineHeight: 1.4 }}>
                                  {day.targets.length > 1 && <span style={{ fontWeight: 600, color: 'var(--muted2)', marginRight: 6 }}>•</span>}
                                  {t.topic}
                                </div>
                              ))}
                            </div>
                          </td>
                          <td style={{ padding: '16px 20px', verticalAlign: 'middle' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                              {day.resources && day.resources.length > 0 ? (
                                day.resources.map((res: any, idx: number) => {
                                  const isIframe = res.type === 'iframe' || (res.url && res.url.includes('youtube.com/embed'));
                                  return isIframe ? (
                                    <button
                                      key={idx}
                                      onClick={() => setActiveIframeUrl(res.url)}
                                      style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 4,
                                        padding: '6px 12px',
                                        background: 'rgba(239, 68, 68, 0.1)',
                                        border: '1px solid #ef4444',
                                        color: '#ef4444',
                                        borderRadius: 20,
                                        textDecoration: 'none',
                                        fontSize: 12,
                                        fontWeight: 600,
                                        whiteSpace: 'nowrap',
                                        transition: 'all 0.2s',
                                        cursor: 'pointer'
                                      }}
                                      onMouseOver={(e) => {
                                        e.currentTarget.style.background = '#ef4444';
                                        e.currentTarget.style.color = '#fff';
                                      }}
                                      onMouseOut={(e) => {
                                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                                        e.currentTarget.style.color = '#ef4444';
                                      }}
                                    >
                                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                      </svg>
                                      {res.title}
                                    </button>
                                  ) : (
                                    <a
                                      key={idx}
                                      href={res.url || '#'}
                                      target={res.url ? '_blank' : undefined}
                                      rel="noopener noreferrer"
                                      style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 4,
                                        padding: '6px 12px',
                                        background: res.url ? 'rgba(239, 68, 68, 0.1)' : 'var(--surface2)',
                                        border: `1px solid ${res.url ? '#ef4444' : 'var(--border)'}`,
                                        color: res.url ? '#ef4444' : 'var(--text)',
                                        borderRadius: 20,
                                        textDecoration: 'none',
                                        fontSize: 12,
                                        fontWeight: 600,
                                        whiteSpace: 'nowrap',
                                        transition: 'all 0.2s',
                                        cursor: res.url ? 'pointer' : 'default'
                                      }}
                                      onMouseOver={(e) => {
                                        if (res.url) {
                                          e.currentTarget.style.background = '#ef4444';
                                          e.currentTarget.style.color = '#fff';
                                        }
                                      }}
                                      onMouseOut={(e) => {
                                        if (res.url) {
                                          e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                                          e.currentTarget.style.color = '#ef4444';
                                        }
                                      }}
                                    >
                                      {res.url ? (
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                          <polyline points="15 3 21 3 21 9"/>
                                          <line x1="10" y1="14" x2="21" y2="3"/>
                                        </svg>
                                      ) : (
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', color: 'var(--muted2)' }}>
                                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                          <polyline points="14 2 14 8 20 8"/>
                                        </svg>
                                      )}
                                      {res.title}
                                    </a>
                                  );
                                })
                              ) : (
                                <span style={{ fontSize: 13, color: 'var(--muted2)', fontStyle: 'italic' }}>None</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px', border: `1px dashed var(--border)`, borderRadius: 16, color: 'var(--muted2)' }}>
                No days matching search filters.
              </div>
            )}

          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {roadmap.sections.map((section: any) => (
              <SectionCard
                key={`${roadmapId}-${duration}-${section.id}`}
                section={section}
                isCompleted={completedSections.has(section.id)}
                onStartQuiz={(sec, level) => handleStartQuiz(sec, level)}
                progressDetails={progressDetails}
                onUpdateProgressDetails={setProgressDetails}
                roadmapId={roadmapId}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quiz Modal */}
      {selectedSection && (
        <QuizModal
          section={selectedSection}
          level={selectedLevel}
          onClose={() => { setSelectedSection(null); setSelectedLevel(null); }}
          onComplete={handleQuizComplete}
        />
      )}

      {/* Iframe Modal */}
      {activeIframeUrl && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }} onClick={() => setActiveIframeUrl(null)}>
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '900px',
            aspectRatio: '16/9',
            backgroundColor: '#000',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }} onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setActiveIframeUrl(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: 'white',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                backdropFilter: 'blur(4px)'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <iframe 
              src={activeIframeUrl} 
              style={{ width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapDetail;
