'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from '@descope/react-sdk';
import { useRouter } from 'next/navigation';
import SectionCard from './SectionCard';
import { fetchMyRoadmapByIdAPI } from '../services/roadmapAI.service';
import { GeneratedRoadmap } from '../types/roadmapAI.types';
import { useWallet } from "@/providers/WalletProvider";
import { useNotification } from "@/providers/NotificationProvider";

interface PersonalizedRoadmapDetailProps {
  roadmapId: string; // expects raw Mongo _id (without the "personalized-" prefix)
  onBack: () => void;
}

/**
 * Renders a personalized (AI-generated) roadmap using the EXACT same
 * SectionCard component as the static roadmaps, so the look/behaviour
 * is identical — including video embeds, website cards, and checkboxes.
 *
 * No quizzes are attached to personalized roadmaps (AI doesn't generate
 * verified quiz questions), so completion is tracked purely by the
 * "I have finished reading" checkbox per section, same as your
 * RoadmapDetail does for non-quiz sections.
 */
const PersonalizedRoadmapDetail: React.FC<PersonalizedRoadmapDetailProps> = ({ roadmapId, onBack }) => {
  const { sessionToken } = useSession();
  const [roadmap, setRoadmap] = useState<GeneratedRoadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { notifyReward } = useNotification();
  const { config, refreshWallet } = useWallet();
  const rewardCoins = config?.ROADMAP?.COMPLETION_REWARD || 50;

  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [progressDetails, setProgressDetails] = useState<any>({
    completedContent: [],
    viewedWebsites: {},
    watchedVideos: {},
    passedQuizzes: {},
  });

  const storageKey = `personalized_roadmap_progress_${roadmapId}`;

  useEffect(() => {
    const load = async () => {
      if (!sessionToken) return;
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMyRoadmapByIdAPI(roadmapId, sessionToken);
        setRoadmap(data);
      } catch (err: any) {
        console.error('[PersonalizedRoadmapDetail] load failed:', err);
        setError('Could not load this roadmap. It may have been deleted.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [roadmapId, sessionToken]);

  // Load/save progress locally (same pattern as RoadmapDetail, scoped per personalized roadmap)
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProgressDetails(parsed.progressDetails || progressDetails);
        setCompletedSections(new Set(parsed.completedSections || []));
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roadmapId]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({
      progressDetails,
      completedSections: Array.from(completedSections),
    }));
  }, [progressDetails, completedSections, storageKey]);

  // Sync completedSections from content-completion checkbox (no quizzes for personalized roadmaps)
  useEffect(() => {
    if (!roadmap) return;
    const newCompleted = new Set<string>();
    roadmap.sections.forEach((section) => {
      if (progressDetails.completedContent?.includes(section.id)) {
        newCompleted.add(section.id);
      }
    });
    setCompletedSections(newCompleted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressDetails.completedContent, roadmap]);

  useEffect(() => {
    if (!roadmap) return;
    const totalSections = roadmap.sections.length;
    if (totalSections > 0 && completedSections.size === totalSections) {
      const rewardKey = `roadmap_rewarded_${roadmapId}`;
      if (!localStorage.getItem(rewardKey)) {
        notifyReward("Roadmap Completed", "Awesome job!", rewardCoins);
        refreshWallet();
        localStorage.setItem(rewardKey, 'true');
      }
    }
  }, [completedSections.size, roadmap, roadmapId, notifyReward, refreshWallet, rewardCoins]);

  if (loading) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--muted2)' }}>
        Loading your personalized roadmap…
      </div>
    );
  }

  if (error || !roadmap) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--muted2)' }}>
        <p style={{ marginBottom: 16 }}>{error || 'Roadmap not found.'}</p>
        <button onClick={onBack} style={{ color: 'var(--orange)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
          ← Back to Roadmaps
        </button>
      </div>
    );
  }

  const totalSections = roadmap.sections.length;
  const progress = totalSections > 0 ? (completedSections.size / totalSections) * 100 : 0;
  const totalPoints = roadmap.sections
    .filter((s) => completedSections.has(s.id))
    .reduce((acc, s) => acc + (s.points || 0), 0);

  return (
    <div style={{ padding: '24px 0' }}>
      {/* Breadcrumb — identical to RoadmapDetail */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: 14, color: 'var(--muted2)' }}>
        <span onClick={onBack} style={{ color: 'var(--orange)', cursor: 'pointer', fontWeight: 600 }}>Roadmaps</span>
        <span>/</span>
        <span>{roadmap.title}</span>
      </div>

      {/* Header — identical structure to RoadmapDetail */}
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 24 }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text)', marginBottom: 12 }}>
            {roadmap.title}
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--muted2)', marginBottom: 20, maxWidth: 800 }}>
            {roadmap.description}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ padding: '6px 16px', borderRadius: 20, fontSize: 13, fontWeight: 700, color: 'white', background: '#10b981' }}>
              {roadmap.difficulty}
            </span>
            <span style={{ padding: '6px 16px', borderRadius: 20, fontSize: 13, fontWeight: 700, background: 'var(--surface2)', color: 'var(--orange)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--orange)' }}>
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {roadmap.estimatedDuration}
            </span>
            <span style={{ padding: '6px 16px', borderRadius: 20, fontSize: 13, fontWeight: 700, background: 'rgba(255,92,53,0.12)', color: 'var(--orange)' }}>
              ✦ Personalized for you
            </span>
          </div>
        </div>
      </div>

      {/* Progress Overview — identical to RoadmapDetail */}
      <div style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 24, padding: '2rem', marginBottom: 40, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32, marginBottom: 32 }}>
          {[
            { value: `${completedSections.size}/${totalSections}`, label: 'Sections Completed' },
            { value: totalPoints, label: 'Points Earned' },
            { value: `${progress.toFixed(0)}%`, label: 'Overall Progress' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--orange)' }}>{s.value}</div>
              <div style={{ fontSize: 14, color: 'var(--muted2)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div>
          <div style={{ height: 10, background: 'var(--border)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg,var(--orange) 0%,#ff8c42 100%)', transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} />
          </div>
        </div>
      </div>

      {/* Sections — uses the EXACT same SectionCard component */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 24 }}>Learning Journey</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {roadmap.sections.map((section: any) => (
            <SectionCard
              key={`${roadmapId}-${section.id}`}
              section={section}
              isCompleted={completedSections.has(section.id)}
              onStartQuiz={() => {}} // no quizzes for personalized roadmaps
              progressDetails={progressDetails}
              onUpdateProgressDetails={setProgressDetails}
              roadmapId={roadmapId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalizedRoadmapDetail;