'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from '@descope/react-sdk';
import { roadmapsListingData } from '../data/index';

import CreateRoadmapButton from './CreateRoadmapButton';
import CreateRoadmapPanel from './CreateRoadmapPannel';
import GeneratedRoadmapView from './GeneratedRoadmapView';
import { GeneratedRoadmap, PersonalizedRoadmapSummary } from '../types/roadmapAI.types';
import { fetchMyRoadmapsAPI, deleteMyRoadmapAPI } from '../services/roadmapAI.service';

interface Roadmap {
  id: string;
  name: string;
  description: string;
  estimatedDuration: string;
  sections: number;
  difficulty: string;
  icon: React.ReactNode;
  category: string;
  enrolled: number;
  isPersonalized?: boolean;
  mongoId?: string;
}

interface RoadmapCardProps {
  roadmap: Roadmap;
  onView: (id: string) => void;
  onDelete?: (mongoId: string) => void;
}

interface RoadmapsListingProps {
  onView: (id: string) => void;
}

const RoadmapCard: React.FC<RoadmapCardProps> = ({ roadmap, onView, onDelete }) => {
  const t: Record<string, string> = {
    border: 'var(--border)', surface: 'var(--surface)', surface2: 'var(--surface2)',
    text: 'var(--text)', muted: 'var(--muted2)', brand: 'var(--orange)',
  };
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [shareText, setShareText] = useState<string>('Share Path');
  const [progressDetails, setProgressDetails] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem(`roadmap_progress_details_${roadmap.id}`);
    if (data) { try { setProgressDetails(JSON.parse(data)); } catch (e) { console.error(e); } }
  }, [roadmap.id]);

  useEffect(() => {
    if (!showDropdown) return;
    const close = () => setShowDropdown(false);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [showDropdown]);

  const isEnrolled = progressDetails !== null;

  const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const url = `${window.location.origin}/user/resources/roadmaps?id=${roadmap.id}`;
    navigator.clipboard.writeText(url)
      .then(() => { setShareText('Copied! ✓'); setTimeout(() => setShareText('Share Path'), 2000); })
      .catch(err => console.error('Failed to copy text: ', err));
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to reset your progress for the ${roadmap.name}? This cannot be undone.`)) {
      localStorage.removeItem(`roadmap_progress_details_${roadmap.id}`);
      localStorage.removeItem(`roadmap_duration_${roadmap.id}`);
      localStorage.removeItem(`roadmap_progress_${roadmap.id}`);
      setProgressDetails(null);
      setShowDropdown(false);
    }
  };

  return (
    <div className="animated-border" onClick={() => onView(roadmap.id)} style={{ cursor: 'pointer', height: '100%' }}>
      <div className="animated-border-inner" style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--surface2)', border: '1.5px solid var(--border)', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '18px' }}>
            {roadmap.icon}
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {roadmap.isPersonalized && (
              <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: '0.65rem', fontWeight: 700, background: 'rgba(255,92,53,0.12)', color: t.brand, display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}>
                ✦ Personalized
              </span>
            )}
            <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: '0.7rem', fontWeight: 700, background: t.surface2, color: t.brand, whiteSpace: 'nowrap' }}>
              {roadmap.difficulty}
            </span>
          </div>
        </div>
        <h2 style={{ marginBottom: '0.4rem', fontSize: '18px', fontWeight: 700, color: 'var(--text)' }}>{roadmap.name}</h2>
        <p style={{ color: t.muted, marginBottom: '1rem', lineHeight: 1.4, fontSize: '13px' }}>
          <small>{roadmap.description}</small>
        </p>
        <div style={{ display: 'flex', gap: 16, padding: '0.6rem 0', borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`, marginBottom: '1rem', alignItems: 'center' }}>
          <small style={{ color: t.muted, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--orange)' }}>
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            {roadmap.estimatedDuration}
          </small>
          <small style={{ color: t.muted, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--orange)' }}>
              <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            {roadmap.sections} Sections
          </small>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 'auto' }}>
          <button className="btn-primary" style={{ flex: 1, background: 'var(--orange)', border: 'none', padding: '8px 16px', borderRadius: 8, color: 'white', fontWeight: 700, cursor: 'pointer', height: 38, fontSize: '14px' }}>
            {isEnrolled || roadmap.isPersonalized ? 'Continue' : 'Start Path'}
          </button>
          {roadmap.isPersonalized ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm(`Delete "${roadmap.name}"? This cannot be undone.`)) {
                  onDelete?.(roadmap.mongoId!);
                }
              }}
              style={{
                width: 38, height: 38, borderRadius: 8, background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444',
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 16, transition: 'all 0.2s',
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; e.currentTarget.style.borderColor = '#ef4444'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)'; }}
              title="Delete this roadmap"
            >🗑️</button>
          ) : (
            <div style={{ position: 'relative' }}>
              <button onClick={(e) => { e.stopPropagation(); setShowDropdown(!showDropdown); }}
                style={{ width: 38, height: 38, borderRadius: 8, background: t.surface2, border: `1px solid ${t.border}`, color: t.text, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s' }}
                onMouseOver={(e) => (e.currentTarget.style.borderColor = 'var(--orange)')}
                onMouseOut={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}>
                ...
              </button>
              {showDropdown && (
                <div style={{ position: 'absolute', bottom: '50px', right: '0', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', zIndex: 10, padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '160px' }}>
                  <button onClick={handleShare} style={{ padding: '8px 12px', borderRadius: '8px', background: 'transparent', border: 'none', color: 'var(--text)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px' }}
                    onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                    onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}>
                    🔗 {shareText}
                  </button>
                  {isEnrolled && (
                    <button onClick={handleReset} style={{ padding: '8px 12px', borderRadius: '8px', background: 'transparent', border: 'none', color: '#ef4444', fontSize: '13px', fontWeight: 600, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px' }}
                      onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)')}
                      onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}>
                      🗑️ Reset Progress
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const RoadmapsListing: React.FC<RoadmapsListingProps> = ({ onView }) => {
  const t: Record<string, string> = {
    border: 'var(--border)', surface: 'var(--surface)', surface2: 'var(--surface2)',
    text: 'var(--text)', muted: 'var(--muted2)', brand: 'var(--orange)',
  };

  const { sessionToken } = useSession();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [category, setCategory] = useState<string>('All');
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [personalizedRoadmaps, setPersonalizedRoadmaps] = useState<PersonalizedRoadmapSummary[]>([]);
  const [previewRoadmap, setPreviewRoadmap] = useState<GeneratedRoadmap | null>(null);

  const openPanel = useCallback(() => setIsPanelOpen(true), []);
  const closePanel = useCallback(() => {
    setIsPanelOpen(false);
    setPreviewRoadmap(null);
  }, []);

  const loadPersonalizedRoadmaps = useCallback(async () => {
    if (!sessionToken) return;
    try {
      const data = await fetchMyRoadmapsAPI(sessionToken);
      setPersonalizedRoadmaps(data);
    } catch (err) {
      console.error('[RoadmapAI] Failed to load personalized roadmaps:', err);
    }
  }, [sessionToken]);

  useEffect(() => {
    loadPersonalizedRoadmaps();
  }, [loadPersonalizedRoadmaps]);

  const handlePreviewReady = useCallback((roadmap: GeneratedRoadmap) => {
    setPreviewRoadmap(roadmap);
  }, []);

  const handleFinalized = useCallback((_savedId: string) => {
    setPreviewRoadmap(null);
    setIsPanelOpen(false);
    loadPersonalizedRoadmaps();
  }, [loadPersonalizedRoadmaps]);

  const personalizedAsCards: Roadmap[] = personalizedRoadmaps.map((p) => ({
    id: `personalized-${p._id}`,
    name: p.title,
    description: p.description,
    estimatedDuration: p.estimatedDuration,
    sections: p.totalSections,
    difficulty: p.difficulty,
    icon: <span>✦</span>,
    category: 'Personalized',
    enrolled: 0,
    isPersonalized: true,
    mongoId: p._id,
  }));

  const handleDelete = useCallback(async (mongoId: string) => {
    if (!sessionToken) return;
    try {
      await deleteMyRoadmapAPI(mongoId, sessionToken);
      setPersonalizedRoadmaps((prev) => prev.filter((r) => r._id !== mongoId));
    } catch (err) {
      console.error('[RoadmapAI] Failed to delete roadmap:', err);
      alert('Could not delete roadmap. Please try again.');
    }
  }, [sessionToken]);

  const allRoadmaps: Roadmap[] = [...personalizedAsCards, ...roadmapsListingData];

  const filteredRoadmaps = allRoadmaps.filter(roadmap => {
    const matchesSearch = roadmap.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      roadmap.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'All' || roadmap.category === category;
    return matchesSearch && matchesCategory;
  });

  const sortedRoadmaps = [...filteredRoadmaps].sort((a, b) => {
    if (a.isPersonalized && !b.isPersonalized) return -1;
    if (!a.isPersonalized && b.isPersonalized) return 1;
    if (sortBy === 'popular') return b.enrolled - a.enrolled;
    if (sortBy === 'newest') return b.id.localeCompare(a.id);
    return 0;
  });

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <style>{`@keyframes roadmap-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

      <div className="fade-in" style={{ width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden', padding: '24px 28px' }}>

        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontSize: "28px", fontWeight: 800, color: "var(--text)", marginBottom: 0, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            <span style={{ color: t.brand }}>Roadmaps</span>
          </h1>
          <CreateRoadmapButton onClick={openPanel} disabled={isPanelOpen} isLoading={isGenerating} />
        </div>

        {isGenerating ? (
          // ── Centered loading spinner ──
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '60vh',
            gap: 20,
          }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              border: '3px solid rgba(255,92,53,0.15)',
              borderTop: '3px solid var(--orange)',
              animation: 'roadmap-spin 0.9s linear infinite',
            }} />
            <p style={{ color: 'var(--orange)', fontWeight: 700, fontSize: 16, margin: 0 }}>
              Generating your roadmap...
            </p>
            <p style={{ color: 'var(--muted2)', fontSize: 13, margin: 0 }}>
              Searching the web for real resources — this takes ~1 min
            </p>
          </div>

        ) : previewRoadmap ? (
          // ── Live preview ──
          <>
            <div style={{
              marginBottom: 20, padding: '12px 16px', background: 'rgba(255,92,53,0.08)',
              border: '1px solid rgba(255,92,53,0.3)', borderRadius: 12,
              display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: t.brand, fontWeight: 600,
            }}>
              ⚠ This is a live preview — not saved yet. Use the chat panel (bottom-left) to Finalize when you're happy with it.
            </div>
            <GeneratedRoadmapView
              roadmap={previewRoadmap}
              answers={previewRoadmap.sourceAnswers || {}}
              onNewRoadmap={() => { setPreviewRoadmap(null); openPanel(); }}
            />
          </>

        ) : (
          // ── Normal listing ──
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: '3rem' }}>
              {[
                { label: 'Active Paths', value: String(roadmapsListingData.length + personalizedRoadmaps.length), color: '#3b82f6', icon: '🚀' },
                { label: 'Learners', value: '12.4k', color: '#10b981', icon: '👥' },
                { label: 'Avg Rating', value: '4.9', color: '#f59e0b', icon: '⭐' },
              ].map((s, i) => (
                <div key={i} style={{ background: t.surface, padding: '1rem 1.5rem', borderRadius: 20, border: `1px solid ${t.border}`, display: 'flex', flexDirection: 'column', gap: 4 }} className="stat-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <small style={{ color: t.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '11px' }}>{s.label}</small>
                    <span style={{ fontSize: '1.25rem' }}>{s.icon}</span>
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 16, marginBottom: 40, flexWrap: 'wrap', alignItems: 'center', padding: '20px', background: t.surface, borderRadius: 16, border: `1px solid ${t.border}` }}>
              <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
                <input type="text" placeholder="Search learning paths..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  style={{ width: '100%', padding: '14px 16px', background: 'var(--surface2)', border: `1px solid ${t.border}`, borderRadius: 12, color: t.text, outline: 'none', fontSize: 15 }} />
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <select value={category} onChange={e => setCategory(e.target.value)} style={{ padding: '14px 18px', background: t.surface2, border: `1px solid ${t.border}`, borderRadius: 12, color: t.text, fontSize: 14, cursor: 'pointer', outline: 'none', fontWeight: 500 }}>
                  <option value="All">All Categories</option>
                  <option value="Personalized">Personalized</option>
                  <option value="Technical">Technical</option>
                  <option value="Career">Career</option>
                </select>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ padding: '14px 18px', background: t.surface2, border: `1px solid ${t.border}`, borderRadius: 12, color: t.text, fontSize: 14, cursor: 'pointer', outline: 'none', fontWeight: 500 }}>
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {sortedRoadmaps.map(roadmap => (
                <RoadmapCard
                  key={roadmap.id}
                  roadmap={roadmap}
                  onView={(id) => onView(id)}
                  onDelete={roadmap.isPersonalized ? handleDelete : undefined}
                />
              ))}
              {sortedRoadmaps.length === 0 && (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '80px', color: t.muted }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                  <p style={{ fontSize: 18 }}>No roadmaps found matching your criteria.</p>
                  <button onClick={() => { setSearchQuery(''); setCategory('All'); }} style={{ marginTop: 16, color: t.brand, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <CreateRoadmapPanel
        isOpen={isPanelOpen}
        onClose={closePanel}
        onPreviewReady={handlePreviewReady}
        onFinalized={handleFinalized}
        onGeneratingChange={setIsGenerating}
      />
    </div>
  );
};

export default RoadmapsListing;