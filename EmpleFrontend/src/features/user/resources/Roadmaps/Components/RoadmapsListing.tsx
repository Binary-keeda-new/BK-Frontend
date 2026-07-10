'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from '@descope/react-sdk';
import { roadmapsListingData } from '../data/index';

import CreateRoadmapButton from './CreateRoadmapButton';
import CreateRoadmapPanel from './CreateRoadmapPannel';
import GeneratedRoadmapView from './GeneratedRoadmapView';
import { GeneratedRoadmap, PersonalizedRoadmapSummary } from '../types/roadmapAI.types';
import { fetchMyRoadmapsAPI, deleteMyRoadmapAPI } from '../services/roadmapAI.service';
import { Route, Users, Star, Search, Clock, ListCollapse } from 'lucide-react';

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
  color: string;
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
  
  const colorMap: Record<string, string> = {
    orange: '#ff6b35',
    red: '#ef4444',
    blue: '#3b82f6',
    purple: '#a855f7',
    green: '#10b981',
    pink: '#ec4899',
    teal: '#14b8a6',
  };
  
  const roadmapColor = colorMap[roadmap.color] || '#ff6b35';

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
    <div
      onClick={() => onView(roadmap.id)}
      style={{
        cursor: 'pointer',
        height: '100%',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        padding: '24px',
        transition: 'all 0.25s ease',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.border = `1px solid ${roadmapColor}`;
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${roadmapColor}20`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.border = "1px solid var(--border)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', alignItems: 'center' }}>
        <div style={{
          width: 44, height: 44, borderRadius: '12px',
          background: roadmapColor, 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          boxShadow: `0 4px 12px ${roadmapColor}40`
        }}>
          {roadmap.icon}
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {roadmap.isPersonalized && (
            <span style={{
              padding: '4px 12px', borderRadius: 20, fontSize: '0.7rem',
              fontWeight: 700, background: 'rgba(255,92,53,0.12)', color: t.brand, height: 'fit-content',
              border: '1px solid rgba(255,92,53,0.3)', whiteSpace: 'nowrap'
            }}>
              ✦ Personalized
            </span>
          )}
          <span style={{
            padding: '4px 12px', borderRadius: 20, fontSize: '0.7rem',
            fontWeight: 700, background: 'var(--surface2)', color: 'var(--text)', height: 'fit-content',
            border: '1px solid var(--border)'
          }}>
            {roadmap.estimatedDuration}
          </span>
          <span style={{
            padding: '4px 12px', borderRadius: 20, fontSize: '0.7rem',
            fontWeight: 700, background: `${roadmapColor}15`, color: roadmapColor, height: 'fit-content',
            border: `1px solid ${roadmapColor}30`
          }}>
            {roadmap.difficulty}
          </span>
        </div>
      </div>

      <h2 style={{ marginBottom: '0.5rem', fontSize: '18px', fontWeight: 700, color: 'var(--text)' }}>{roadmap.name}</h2>
      <p style={{ color: t.muted, marginBottom: '1.25rem', lineHeight: 1.5, fontSize: '13px', flexGrow: 1 }}>
        {roadmap.description}
      </p>

      <div style={{
        display: 'flex', gap: 16, padding: '10px 14px',
        background: 'var(--surface2)',
        borderRadius: '10px',
        marginBottom: '1.25rem', alignItems: 'center'
      }}>
        <small style={{ color: t.muted, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '12px', fontWeight: 500 }}>
          <Clock size={14} style={{ color: roadmapColor }} />
          {roadmap.estimatedDuration}
        </small>
        <small style={{ color: t.muted, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '12px', fontWeight: 500 }}>
          <ListCollapse size={14} style={{ color: roadmapColor }} />
          {roadmap.sections} Sections
        </small>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
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
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowDropdown(!showDropdown);
              }}
              style={{
                width: 38, height: 38, borderRadius: 8, background: t.surface2,
                border: `1px solid ${t.border}`, color: t.text, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'border-color 0.2s',
                fontSize: '16px', fontWeight: 700
              }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = 'var(--orange)')}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              ···
            </button>
            
            {showDropdown && (
              <div style={{
                position: 'absolute',
                bottom: '50px',
                right: '0',
                background: 'var(--surface2)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                zIndex: 10,
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                minWidth: '160px'
              }}>
                <button
                  onClick={handleShare}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text)',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                  onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  🔗 {shareText}
                </button>
                
                {isEnrolled && (
                  <button
                    onClick={handleReset}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: 'transparent',
                      border: 'none',
                      color: '#ef4444',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)')}
                    onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    🗑️ Reset Progress
                  </button>
                )}
              </div>
            )}
          </div>
        )}
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
  const [activePathsCount, setActivePathsCount] = useState<number>(0);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [personalizedRoadmaps, setPersonalizedRoadmaps] = useState<PersonalizedRoadmapSummary[]>([]);
  const [previewRoadmap, setPreviewRoadmap] = useState<GeneratedRoadmap | null>(null);

  useEffect(() => {
    let count = 0;
    roadmapsListingData.forEach(r => {
      const legacyData = localStorage.getItem(`roadmap_progress_${r.id}`);
      const detailsData = localStorage.getItem(`roadmap_progress_details_${r.id}`);
      if (legacyData || detailsData) {
        count++;
      }
    });
    setActivePathsCount(count);
  }, []);

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
    color: 'orange'
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
    if (sortBy === 'alphabetical') return a.name.localeCompare(b.name);
    if (sortBy === 'reverse-alphabetical') return b.name.localeCompare(a.name);
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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: 20 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', border: '3px solid rgba(255,92,53,0.15)', borderTop: '3px solid var(--orange)', animation: 'roadmap-spin 0.9s linear infinite' }} />
            <p style={{ color: 'var(--orange)', fontWeight: 700, fontSize: 16, margin: 0 }}>Generating your roadmap...</p>
            <p style={{ color: 'var(--muted2)', fontSize: 13, margin: 0 }}>Searching the web for real resources — this takes ~1 min</p>
          </div>
        ) : previewRoadmap ? (
          <>
            <div style={{ marginBottom: 20, padding: '12px 16px', background: 'rgba(255,92,53,0.08)', border: '1px solid rgba(255,92,53,0.3)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: t.brand, fontWeight: 600 }}>
              ⚠ This is a live preview — not saved yet. Use the chat panel (bottom-left) to Finalize when you're happy with it.
            </div>
            <GeneratedRoadmapView roadmap={previewRoadmap} answers={previewRoadmap.sourceAnswers || {}} onNewRoadmap={() => { setPreviewRoadmap(null); openPanel(); }} />
          </>
        ) : (
          <>
            {/* Stats Overview */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: '3rem' }}>
              {[
                { label: 'Active Paths', value: activePathsCount.toString(), color: '#ff6b35', icon: Route },
                { label: 'Learners', value: '12.4k', color: '#22c55e', icon: Users },
                { label: 'Avg Rating', value: '4.9', color: '#fbbf24', icon: Star },
              ].map((s, i) => (
                <div key={i} style={{ background: t.surface, padding: '20px 24px', borderRadius: 20, border: `1px solid ${t.border}`, display: 'flex', flexDirection: 'column', gap: 8, transition: 'transform 0.3s ease' }} className="stat-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <small style={{ color: t.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '11px' }}>{s.label}</small>
                    <div style={{ width: 32, height: 32, borderRadius: '8px', background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <s.icon size={16} style={{ color: s.color }} />
                    </div>
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)' }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Toolbar (Search + Filters) */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 40, flexWrap: 'wrap', alignItems: 'center', padding: '20px', background: t.surface, borderRadius: 16, border: `1px solid ${t.border}` }}>
              <div style={{ position: 'relative', flex: 1, minWidth: 280 }}>
                <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted2)' }} />
                <input type="text" placeholder="Search learning paths..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  style={{ width: '100%', padding: '14px 16px 14px 44px', background: 'var(--surface2)', border: `1px solid ${t.border}`, borderRadius: 12, color: t.text, outline: 'none', transition: 'all 0.2s ease', fontSize: 15 }}
                  onFocus={e => e.currentTarget.style.borderColor = 'var(--orange)'} onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'} />
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <select value={category} onChange={e => setCategory(e.target.value)}
                  style={{ padding: '14px 18px', background: t.surface2, border: `1px solid ${t.border}`, borderRadius: 12, color: t.text, fontSize: 14, cursor: 'pointer', outline: 'none', fontWeight: 500, appearance: 'none', paddingRight: '40px', backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='gray' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}>
                  <option value="All" style={{ background: t.surface, color: t.text }}>All Categories</option>
                  <option value="Technical" style={{ background: t.surface, color: t.text }}>Technical</option>
                  <option value="Career" style={{ background: t.surface, color: t.text }}>Career</option>
                </select>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                  style={{ padding: '14px 18px', background: t.surface2, border: `1px solid ${t.border}`, borderRadius: 12, color: t.text, fontSize: 14, cursor: 'pointer', outline: 'none', fontWeight: 500, appearance: 'none', paddingRight: '40px', backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='gray' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}>
                  <option value="popular" style={{ background: t.surface, color: t.text }}>Most Popular</option>
                  <option value="newest" style={{ background: t.surface, color: t.text }}>Newest</option>
                  <option value="alphabetical" style={{ background: t.surface, color: t.text }}>Sort A-Z</option>
                  <option value="reverse-alphabetical" style={{ background: t.surface, color: t.text }}>Sort Z-A</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {sortedRoadmaps.map(roadmap => (
                <RoadmapCard key={roadmap.id} roadmap={roadmap} onView={onView} onDelete={roadmap.isPersonalized ? handleDelete : undefined} />
              ))}
              {sortedRoadmaps.length === 0 && (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '80px', color: t.muted }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                  <p style={{ fontSize: 18 }}>No roadmaps found matching your criteria.</p>
                  <button onClick={() => { setSearchQuery(''); setCategory('All'); setSortBy('popular'); }} style={{ marginTop: 16, color: t.brand, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
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