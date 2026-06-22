'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Job, FilterType } from '../types/jobs.types';
import { fetchJobs} from '../services/jobs.service';
import JobDetails from './JobDetails';
import InterviewExperience from './InterviewExperience';
import { useSession } from '@descope/nextjs-sdk/client';
import LoginGate from '@/shared/components/access/LoginGate';

// ── Helpers ───────────────────────────────────────────────────────────────────
// Convert "2d ago", "1 week ago", "3 months ago" → sortable number (ms from epoch, estimated)
function postedAtToMs(postedAt: string): number {
  if (!postedAt) return 0;
  // If it looks like a real date string, parse directly
  const direct = Date.parse(postedAt);
  if (!isNaN(direct)) return direct;

  const now = Date.now();
  const s = postedAt.toLowerCase();
  const n = parseInt(s) || 1;
  if (s.includes('min'))   return now - n * 60 * 1000;
  if (s.includes('hour'))  return now - n * 60 * 60 * 1000;
  if (s.includes('day') || s.includes('d ago')) return now - n * 24 * 60 * 60 * 1000;
  if (s.includes('week'))  return now - n * 7 * 24 * 60 * 60 * 1000;
  if (s.includes('month')) return now - n * 30 * 24 * 60 * 60 * 1000;
  return 0;
}

// Dropdown style reused across all 3 selects
const dropdownStyle: React.CSSProperties = {
  padding: '7px 28px 7px 12px',
  borderRadius: 8,
  border: '1px solid var(--border)',
  background: 'var(--surface2)',
  color: 'var(--muted)',
  fontSize: 13,
  fontWeight: 500,
  cursor: 'pointer',
  appearance: 'none',
  WebkitAppearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px center',
  outline: 'none',
  minWidth: 110,
};

// ── Job Card ──────────────────────────────────────────────────────────────────
function JobCard({ job, onView, onApply }: { job: Job; onView: (job: Job) => void; onApply: (link: string) => void }) {
  const isGov = job.type === 'government';
  const releasedCount = job.stages?.filter(s => s.status === 'released').length ?? 0;
  const totalCount = job.stages?.length ?? 0;
  const statusLabel = job.lastDate ? 'Closing' : 'Open';
  const statusColor = job.lastDate ? '#f59e0b' : '#22c55e';
  const statusBg    = job.lastDate ? 'rgba(245,158,11,0.1)' : 'rgba(34,197,94,0.1)';

  // Company initials avatar
  const initials = job.company.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

  return (
    <article
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: '18px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 280,
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(241,90,34,0.35)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(241,90,34,0.08)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* ── TOP: avatar + title + status ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
        {/* Avatar */}
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 11,
            background: isGov ? 'rgba(59,130,246,0.1)' : 'var(--orange-dim)',
            border: `1px solid ${isGov ? 'rgba(59,130,246,0.2)' : 'rgba(241,90,34,0.2)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            fontWeight: 800,
            color: isGov ? '#60a5fa' : 'var(--orange)',
            flexShrink: 0,
            letterSpacing: '-0.01em',
          }}
        >
          {initials}
        </div>

        {/* Title + company */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              margin: '0 0 3px',
              fontSize: 15,
              fontWeight: 700,
              color: 'var(--text)',
              lineHeight: 1.3,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {job.title}
          </h3>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>
            {job.company}
          </p>
        </div>

        {/* Status badge */}
        <span
          style={{
            flexShrink: 0,
            fontSize: 11,
            fontWeight: 700,
            padding: '4px 9px',
            borderRadius: 20,
            background: statusBg,
            color: statusColor,
            border: `1px solid ${statusColor}33`,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: statusColor, display: 'inline-block' }} />
          {statusLabel}
        </span>
      </div>

      {/* ── DIVIDER ── */}
      <div style={{ height: 1, background: 'var(--border)', marginBottom: 14 }} />

      {/* ── MIDDLE: info rows ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
        {/* Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)', width: 16, textAlign: 'center' }}>📍</span>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>
            {job.location || 'Not specified'}
          </span>
        </div>
        {/* Salary */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)', width: 16, textAlign: 'center' }}>💰</span>
          <span style={{ fontSize: 13, color: job.salary ? 'var(--orange)' : 'var(--muted)', fontWeight: job.salary ? 600 : 400 }}>
            {job.salary || 'Not disclosed'}
          </span>
        </div>
        {/* Type + experience */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: 'var(--muted)', width: 16, textAlign: 'center' }}>💼</span>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>
            {isGov ? 'Govt / PSU' : 'Full-time'}{' '}
            <span style={{ color: 'var(--border)', margin: '0 4px' }}>·</span>
            {isGov ? 'As notified' : '2–5 years exp'}
          </span>
        </div>
      </div>

      {/* ── SKILLS / TAGS ── */}
      {job.tags && job.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
          {job.tags.map(tag => (
            <span
              key={tag}
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: '3px 9px',
                borderRadius: 20,
                background: 'var(--surface2)',
                color: 'var(--muted)',
                border: '1px solid var(--border)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* ── GOVT: stage progress ── (logic untouched, spacing adjusted) */}
      {isGov && job.stages && job.stages.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>
              {releasedCount}/{totalCount} stages released
            </span>
            {job.lastDate && (
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                Last date: <strong style={{ color: 'var(--text)' }}>{job.lastDate}</strong>
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {job.stages.map((s, i) => (
              <div
                key={s.name || s.label || i}
                title={s.name || s.label}
                style={{
                  flex: 1,
                  height: 4,
                  borderRadius: 2,
                  background: s.status === 'released' ? '#22c55e' : 'var(--border)',
                  transition: 'background 0.2s',
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Spacer pushes footer to bottom */}
      <div style={{ flex: 1 }} />

      {/* ── BOTTOM: posted time + buttons ── */}
      <div style={{ marginTop: 'auto', paddingTop: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>{job.postedAt}</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {/* Apply — primary */}
          <button
            onClick={() => onApply(job.applyLink)}
            style={{
              flex: 1,
              padding: '9px 0',
              borderRadius: 9,
              background: 'var(--orange)',
              color: '#fff',
              fontSize: 13,
              fontWeight: 700,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 0.15s',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
          >
            Apply
          </button>
          {/* View — secondary */}
          <button
            onClick={() => onView(job)}
            style={{
              flex: 1,
              padding: '9px 0',
              borderRadius: 9,
              background: 'var(--surface2)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'border-color 0.15s, color 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--orange)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--orange)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--text)';
            }}
          >
            View
          </button>
        </div>
      </div>
    </article>
  );
}

// ── Section Header ────────────────────────────────────────────────────────────
function SectionHeader({ icon, title, count }: { icon: React.ReactNode; title: string; count: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
      <span
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: 'var(--orange-dim)',
          border: '1px solid rgba(241,90,34,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--orange)',
        }}
      >
        {icon}
      </span>
      <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>{title}</h2>
      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          padding: '2px 9px',
          borderRadius: 20,
          background: 'var(--surface2)',
          color: 'var(--muted)',
          border: '1px solid var(--border)',
          marginLeft: 2,
        }}
      >
        {count}
      </span>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div
      style={{
        padding: '40px 20px',
        textAlign: 'center',
        border: '1px dashed var(--border)',
        borderRadius: 16,
        color: 'var(--muted)',
        fontSize: 14,
      }}
    >
      {message}
    </div>
  );
}

// ── JobBoard ──────────────────────────────────────────────────────────────────
export default function JobBoard({ initialJobId }: { initialJobId?: string }) {
  const [jobs, setJobs]             = useState<Job[]>([]);
  const [loading, setLoading]       = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  
  const { isAuthenticated } = useSession() as any;
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleApply = (link: string) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      window.open(link, '_blank');
    }
  };

  // Existing type filter
  const [filter, setFilter]         = useState<FilterType>('all');
  // New dropdown filters
  const [locFilter, setLocFilter]   = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sort, setSort]             = useState<'newest' | 'oldest'>('newest');
  // Filters panel toggle
  const [filtersOpen, setFiltersOpen] = useState(false);
  // View mode: jobs board or interview experiences
  const [viewMode, setViewMode] = useState<'jobs' | 'interviews'>('jobs');

  
    useEffect(() => {
  fetchJobs()
    .then((res: any) => {
      // HANDLE DIFFERENT API SHAPES
      let fetchedJobs: Job[] = [];
      if (Array.isArray(res)) {
        fetchedJobs = res;
      } else if (Array.isArray(res?.data)) {
        fetchedJobs = res.data;
      } else if (Array.isArray(res?.jobs)) {
        fetchedJobs = res.jobs;
      }
      setJobs(fetchedJobs);

      if (initialJobId) {
        const found = fetchedJobs.find(j => j.id === initialJobId || j.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === initialJobId);
        if (found) setSelectedJob(found);
      }
    })
    .catch(() => setJobs([]))
    .finally(() => setLoading(false));
}, [initialJobId]);

  // Unique locations for dropdown
  const locationOptions = useMemo(() => {
    const locs = jobs.map(j => j.location).filter(Boolean) as string[];
    return Array.from(new Set(locs));
  }, [jobs]);

  // Unique typeLabels — fallback to standard set if none on data
  const typeOptions = useMemo(() => {
    const fromData = jobs.map(j => (j as any).typeLabel).filter(Boolean) as string[];
    const unique = Array.from(new Set(fromData));
    return unique.length > 0 ? unique : ['Full-time', 'Part-time', 'Contract'];
  }, [jobs]);

  // Apply all filters + sort
  const filtered = useMemo(() => {
    let list = [...jobs];
    if (filter !== 'all')     list = list.filter(j => j.type === filter);
    if (locFilter !== 'all')  list = list.filter(j => j.location === locFilter);
    if (typeFilter !== 'all') list = list.filter(j =>
      ((j as any).typeLabel ?? (j.type === 'government' ? 'Govt / PSU' : 'Full-time')) === typeFilter
    );
    list.sort((a, b) => {
      const diff = postedAtToMs(b.postedAt) - postedAtToMs(a.postedAt);
      return sort === 'newest' ? diff : -diff;
    });
    return list;
  }, [jobs, filter, locFilter, typeFilter, sort]);

  const privateJobs = useMemo(() => filtered.filter(j => j.type === 'private'), [filtered]);
  const govJobs     = useMemo(() => filtered.filter(j => j.type === 'government'), [filtered]);

  const showPrivate = filter === 'all' || filter === 'private';
  const showGov     = filter === 'all' || filter === 'government';

  // ── Interview Experience view (after all hooks) ──
  if (viewMode === 'interviews') {
    return <InterviewExperience onBack={() => setViewMode('jobs')} />;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '28px 24px' }}>
      {/* Right panel overlay */}
      {selectedJob && (
        <JobDetails job={selectedJob} onApply={handleApply} onBack={() => {
          setSelectedJob(null);
          if (initialJobId) {
             window.history.pushState({}, '', '/jobs');
          }
        }} />
      )}

      {/* Page header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
          Job Board
        </h1>
        <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--muted)' }}>
          Explore private &amp; government opportunities
        </p>
      </div>

      {/* ── Top bar ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
          marginBottom: filtersOpen ? 0 : 28,
          padding: '10px 12px',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: filtersOpen ? '14px 14px 0 0' : 14,
          flexWrap: 'wrap',
        }}
      >
        {/* LEFT: type pills + Interview Experience */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {(['all', 'private', 'government'] as FilterType[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '7px 14px',
                borderRadius: 8,
                border: filter === f ? '1.5px solid var(--orange)' : '1px solid var(--border)',
                background: filter === f ? 'var(--orange-dim)' : 'var(--surface2)',
                color: filter === f ? 'var(--orange)' : 'var(--muted)',
                fontWeight: filter === f ? 700 : 500,
                fontSize: 13,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {f === 'all' ? 'All' : f === 'private' ? 'Private' : 'Govt'}
            </button>
          ))}
          <button
            onClick={() => setViewMode('interviews')}
            style={{
              padding: '7px 14px',
              borderRadius: 8,
              border: '1px solid var(--border)',
              background: 'var(--surface2)',
              color: 'var(--muted)',
              fontWeight: 500,
              fontSize: 13,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            Interview Experience
          </button>
        </div>

        {/* RIGHT: Filters toggle button */}
        <button
          onClick={() => setFiltersOpen(o => !o)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '7px 14px',
            borderRadius: 8,
            border: filtersOpen ? '1.5px solid var(--orange)' : '1px solid var(--border)',
            background: filtersOpen ? 'var(--orange-dim)' : 'var(--surface2)',
            color: filtersOpen ? 'var(--orange)' : 'var(--muted)',
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
          Filters
          {(locFilter !== 'all' || typeFilter !== 'all' || sort !== 'newest') && (
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--orange)',
                display: 'inline-block',
              }}
            />
          )}
        </button>
      </div>

      {/* ── Collapsible filter dropdowns ── */}
      {filtersOpen && (
        <div
          style={{
            display: 'flex',
            gap: 10,
            alignItems: 'center',
            flexWrap: 'wrap',
            padding: '12px 16px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderTop: 'none',
            borderRadius: '0 0 14px 14px',
            marginBottom: 28,
          }}
        >
          <select value={locFilter} onChange={e => setLocFilter(e.target.value)} style={dropdownStyle}>
            <option value="all">📍 Location</option>
            {locationOptions.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={dropdownStyle}>
            <option value="all">💼 Type</option>
            {typeOptions.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={sort} onChange={e => setSort(e.target.value as 'newest' | 'oldest')} style={dropdownStyle}>
            <option value="newest">🕐 Newest</option>
            <option value="oldest">🕐 Oldest</option>
          </select>
          <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>
            {filtered.length} listings
          </span>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
          <div
            style={{
              width: 32,
              height: 32,
              border: '3px solid var(--border)',
              borderTopColor: 'var(--orange)',
              borderRadius: '50%',
              animation: 'spin 0.7s linear infinite',
              margin: '0 auto 12px',
            }}
          />
          <p style={{ margin: 0, fontSize: 14 }}>Loading jobs…</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      )}

      {/* Content grid — single flat list, no section headers */}
      {!loading && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 16,
            alignItems: 'stretch',
          }}
        >
          {filtered.length === 0 ? (
            <EmptyState message="No jobs match your filters." />
          ) : (
            filtered.map((job, index) => (
              <JobCard key={job.id ?? `${job.title}-${index}`} job={job} onView={setSelectedJob} onApply={handleApply} />
            ))
          )}
        </div>
      )}

      {showLoginModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 99999, padding: '20px'
        }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
            <button 
              onClick={() => setShowLoginModal(false)}
              style={{
                position: 'absolute', top: '10px', right: '10px',
                background: 'transparent', border: 'none', color: 'var(--muted2)',
                fontSize: '24px', cursor: 'pointer', zIndex: 10
              }}
            >
              &times;
            </button>
            <LoginGate title="Free Account Required" message="Create a free Emple account to apply for jobs and track your applications." />
          </div>
        </div>
      )}
    </div>
  );
}