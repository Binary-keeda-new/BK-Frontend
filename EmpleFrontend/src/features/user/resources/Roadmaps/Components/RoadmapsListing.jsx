'use client';

import React, { useState, useEffect } from 'react';
import { roadmapsListingData } from '../data/index';

const RoadmapCard = ({ roadmap, onView }) => {
  const t = {
    border: 'var(--border)',
    surface: 'var(--surface)',
    surface2: 'var(--surface2)',
    text: 'var(--text)',
    muted: 'var(--muted2)',
    brand: 'var(--orange)',
  };
  const [showDropdown, setShowDropdown] = useState(false);
  const [shareText, setShareText] = useState('Share Path');
  const [progressDetails, setProgressDetails] = useState(null);

  // Load progress details from localStorage to check enrollment state
  useEffect(() => {
    const data = localStorage.getItem(`roadmap_progress_details_${roadmap.id}`);
    if (data) {
      try {
        setProgressDetails(JSON.parse(data));
      } catch (e) {
        console.error(e);
      }
    }
  }, [roadmap.id]);

  // Click outside to close dropdown
  useEffect(() => {
    if (!showDropdown) return;
    const close = () => setShowDropdown(false);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [showDropdown]);

  const isEnrolled = progressDetails !== null;

  const handleShare = (e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/user/resources/roadmaps?id=${roadmap.id}`;
    navigator.clipboard.writeText(url)
      .then(() => {
        setShareText('Copied! ✓');
        setTimeout(() => setShareText('Share Path'), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  const handleReset = (e) => {
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
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'var(--surface2)', 
            border: '1.5px solid var(--border)',
            color: 'var(--text)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            fontSize: '18px'
          }}>
            {roadmap.icon}
          </div>
          <span style={{
            padding: '3px 10px', borderRadius: 20, fontSize: '0.7rem',
            fontWeight: 700, background: t.surface2, color: t.brand, height: 'fit-content'
          }}>
            {roadmap.difficulty}
          </span>
        </div>

        <h2 style={{ marginBottom: '0.4rem', fontSize: '18px', fontWeight: 700, color: 'var(--text)' }}>{roadmap.name}</h2>
        <p style={{ color: t.muted, marginBottom: '1rem', lineHeight: 1.4, fontSize: '13px' }}>
          <small>{roadmap.description}</small>
        </p>

        <div style={{
          display: 'flex', gap: 16, padding: '0.6rem 0',
          borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`,
          marginBottom: '1rem', alignItems: 'center'
        }}>
          <small style={{ color: t.muted, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--orange)' }}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {roadmap.estimatedDuration}
          </small>
          <small style={{ color: t.muted, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--orange)' }}>
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            {roadmap.sections} Sections
          </small>
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 'auto' }}>
          <button className="btn-primary" style={{ flex: 1, background: 'var(--orange)', border: 'none', padding: '8px 16px', borderRadius: 8, color: 'white', fontWeight: 700, cursor: 'pointer', height: 38, fontSize: '14px' }}>
            {isEnrolled ? 'Continue' : 'Start Path'}
          </button>
          
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
              }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = 'var(--orange)')}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              ...
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
        </div>
      </div>
    </div>
  );
};

const RoadmapsListing = ({ onView }) => {
  const t = {
    border: 'var(--border)',
    surface: 'var(--surface)',
    surface2: 'var(--surface2)',
    text: 'var(--text)',
    muted: 'var(--muted2)',
    brand: 'var(--orange)',
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [category, setCategory] = useState('All');

  // Filtering Logic
  const filteredRoadmaps = roadmapsListingData.filter(roadmap => {
    const matchesSearch = roadmap.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      roadmap.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'All' || roadmap.category === category;
    return matchesSearch && matchesCategory;
  });

  // Sorting Logic
  const sortedRoadmaps = [...filteredRoadmaps].sort((a, b) => {
    if (sortBy === 'popular') return b.enrolled - a.enrolled;
    if (sortBy === 'newest') return b.id.localeCompare(a.id);
    return 0;
  });

  return (
    <div className="fade-in" style={{ padding: '24px 0' }}>
      {/* Header Section */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontSize: "28px", fontWeight: 800, color: "var(--text)", marginBottom: '0px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          Learning <span style={{ color: t.brand }}>Roadmaps</span>
        </h1>
      </div>

      {/* Stats Overview */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 20,
        marginBottom: '3rem'
      }}>
        {[
          { label: 'Active Paths', value: '7', color: '#3b82f6', icon: '🚀' },
          { label: 'Learners', value: '12.4k', color: '#10b981', icon: '👥' },
          { label: 'Avg Rating', value: '4.9', color: '#f59e0b', icon: '⭐' },
        ].map((s, i) => (
          <div key={i} style={{
            background: t.surface, padding: '1rem 1.5rem', borderRadius: 20,
            border: `1px solid ${t.border}`, display: 'flex', flexDirection: 'column', gap: 4,
            transition: 'transform 0.3s ease'
          }} className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <small style={{ color: t.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '11px' }}>{s.label}</small>
              <span style={{ fontSize: '1.25rem' }}>{s.icon}</span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Toolbar (Search + Filters) */}
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
        <div style={{ position: 'relative', flex: 1, minWidth: 280 }}>
          <input
            type="text"
            placeholder="Search learning paths..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: '100%', padding: '14px 16px 14px 16px',
              background: 'var(--surface2)', border: `1px solid ${t.border}`,
              borderRadius: 12, color: t.text, outline: 'none',
              transition: 'all 0.2s ease', fontSize: 15
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            style={{
              padding: '14px 18px', background: t.surface2, border: `1px solid ${t.border}`,
              borderRadius: 12, color: t.text, fontSize: 14, cursor: 'pointer',
              outline: 'none', fontWeight: 500
            }}
          >
            <option value="All" style={{ background: t.surface, color: t.text }}>All Categories</option>
            <option value="Technical" style={{ background: t.surface, color: t.text }}>Technical</option>
            <option value="Career" style={{ background: t.surface, color: t.text }}>Career</option>
          </select>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{
              padding: '14px 18px', background: t.surface2, border: `1px solid ${t.border}`,
              borderRadius: 12, color: t.text, fontSize: 14, cursor: 'pointer',
              outline: 'none', fontWeight: 500
            }}
          >
            <option value="popular" style={{ background: t.surface, color: t.text }}>Most Popular</option>
            <option value="newest" style={{ background: t.surface, color: t.text }}>Newest</option>
          </select>
        </div>
      </div>

      {/* Grid Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {sortedRoadmaps.map(roadmap => (
          <RoadmapCard key={roadmap.id} roadmap={roadmap} onView={onView} />
        ))}
        {sortedRoadmaps.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '80px', color: t.muted }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p style={{ fontSize: 18 }}>No roadmaps found matching your criteria.</p>
            <button
              onClick={() => { setSearchQuery(''); setCategory('All'); }}
              style={{ marginTop: 16, color: t.brand, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapsListing;
