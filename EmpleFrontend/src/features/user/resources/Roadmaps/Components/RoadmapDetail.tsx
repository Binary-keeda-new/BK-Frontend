'use client';

import React, { useState, useEffect } from 'react';
import { getRoadmapById } from '../data/index';
import QuizModal from './QuizModal';
import SectionCard from './SectionCard';
import { useSession } from '@descope/nextjs-sdk/client';
import LoginGate from '@/shared/components/access/LoginGate';

interface RoadmapDetailProps {
  roadmapId: string;
  onBack: () => void;
}

interface ProgressDetails {
  completedContent: any[];
  viewedWebsites: Record<string, any>;
  watchedVideos: Record<string, any>;
  passedQuizzes: Record<string, any>;
}

const RoadmapDetail: React.FC<RoadmapDetailProps> = ({ roadmapId, onBack }) => {
  const { isAuthenticated, isSessionLoading } = useSession();

  const t: Record<string, string> = {
    border: 'var(--border)',
    surface: 'var(--surface)',
    surface2: 'var(--surface2)',
    text: 'var(--text)',
    textMuted: 'var(--muted2)',
    brand: 'var(--orange)',
    progressBg: 'var(--surface2)',
  };

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

  const [progressDetails, setProgressDetails] = useState<ProgressDetails>({
    completedContent: [],
    viewedWebsites: {},
    watchedVideos: {},
    passedQuizzes: {}
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
      setProgressDetails(JSON.parse(savedDetails));
    } else {
      setProgressDetails({
        completedContent: [],
        viewedWebsites: {},
        watchedVideos: {},
        passedQuizzes: {}
      });
    }
    setIsLoaded(true);
  }, [roadmapId]);

  // Save detailed progress on change
  useEffect(() => {
    if (isLoaded && roadmapId) {
      localStorage.setItem(`roadmap_progress_details_${roadmapId}`, JSON.stringify(progressDetails));
    }
  }, [progressDetails, roadmapId, isLoaded]);

  // Synchronize detailed progress with standard completedSections and totalPoints
  useEffect(() => {
    if (!isLoaded || !roadmap) return;

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

  const progress = (completedSections.size / roadmap.totalSections) * 100;
  const hasMultipleDurations = roadmapId === 'ai-ml' || roadmapId === 'full-stack';

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
          <div style={{ display: 'flex', gap: 12 }}>
            <span style={{
              padding: '6px 16px', borderRadius: 20, fontSize: 13,
              fontWeight: 700, color: 'white', background: '#10b981'
            }}>
              {roadmap.difficulty}
            </span>
            <span style={{
              padding: '6px 16px', borderRadius: 20, fontSize: 13,
              fontWeight: 700, background: t.surface2, color: t.brand,
              display: 'inline-flex', alignItems: 'center', gap: 6
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--orange)' }}>
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {roadmap.activeDuration || duration}
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
            { value: totalPoints, label: 'Points Earned' },
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

      {/* Sections */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: t.text, marginBottom: 24 }}>Learning Journey</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {roadmap.sections.map((section: any, index: number) => {
            // Gating Logic
            if (!isAuthenticated && !isSessionLoading && index >= 3) {
              return null;
            }
            
            return (
              <SectionCard
                key={`${roadmapId}-${duration}-${section.id}`}
                section={section}
                isCompleted={completedSections.has(section.id)}
                onStartQuiz={(sec, level) => handleStartQuiz(sec, level)}
                progressDetails={progressDetails}
                onUpdateProgressDetails={setProgressDetails}
                roadmapId={roadmapId}
              />
            );
          })}
          
          {/* Gating CTA */}
          {!isAuthenticated && !isSessionLoading && roadmap.sections.length > 3 && (
            <div style={{ marginTop: '24px' }}>
              <LoginGate 
                title="Unlock the Complete Roadmap" 
                message="Create a free Emple account to view all sections, take quizzes, and track your progress."
              />
            </div>
          )}
        </div>
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
    </div>
  );
};

export default RoadmapDetail;
