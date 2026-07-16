'use client';

import { useState, useEffect, useMemo } from 'react';
import { Session, SessionFilter } from '../types/sessions.types';
import { fetchSessions } from '../services/sessions.service';

const ITEMS_PER_PAGE = 9;

// ── Session Card ────────────────────────────────────────────────────────────
function SessionCard({ session, onWatch }: { session: Session; onWatch: (s: Session) => void }) {
  const categoryColor =
    session.category === 'workshop' ? '#a855f7' :
    session.category === 'bk-session' ? '#0ea5e9' : '#ef4444'
  const categoryBg =
    session.category === 'workshop' ? 'rgba(168,85,247,0.1)' :
    session.category === 'bk-session' ? 'rgba(14,165,233,0.1)' : 'rgba(239,68,68,0.1)'
  const categoryLabel =
    session.category === 'workshop' ? 'Workshop' :
    session.category === 'bk-session' ? 'BK Session' : 'YT Session'

  return (
    <article
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = categoryColor + '55';
        (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 24px ${categoryColor}15`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
      onClick={() => { if (session.category !== 'bk-session') onWatch(session); }}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: 'var(--surface2)', overflow: 'hidden' }}>
        {session.thumbnail ? (
          <img
            src={session.thumbnail}
            alt={session.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        )}

        {/* Play overlay — only for non BK sessions */}
        {session.category !== 'bk-session' && (
          <div
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(0,0,0,0.3)',
              opacity: 0, transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '0'; }}
          >
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#000">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          </div>
        )}

        {/* Category badge */}
        <span style={{
          position: 'absolute', top: 10, left: 10,
          fontSize: 11, fontWeight: 700, padding: '3px 9px',
          borderRadius: 20, background: categoryBg,
          color: categoryColor, border: `1px solid ${categoryColor}33`,
          backdropFilter: 'blur(4px)',
        }}>
          {categoryLabel}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--text)', lineHeight: 1.4 }}>
          {session.title}
        </h3>
        {session.description && (
          <p style={{
            margin: 0, fontSize: 13, color: 'var(--muted)', lineHeight: 1.6,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {session.description}
          </p>
        )}

        <div style={{ marginTop: 'auto', paddingTop: 8 }}>
          {session.category === 'bk-session' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {session.scheduledAt && (
                <p style={{
                  margin: 0, fontSize: 12, color: '#0ea5e9',
                  fontWeight: 600, textAlign: 'center',
                }}>
                  📅 {new Date(session.scheduledAt).toLocaleString()}
                </p>
              )}
              <a
                href={session.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                style={{
                  width: '100%', padding: '9px 0', borderRadius: 9,
                  background: '#0ea5e9', color: '#fff',
                  fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer',
                  textDecoration: 'none', textAlign: 'center', display: 'block',
                  transition: 'opacity 0.15s',
                }}
              >
                Join Session
              </a>
            </div>
          ) : (
            <button
              onClick={e => { e.stopPropagation(); onWatch(session); }}
              style={{
                width: '100%', padding: '9px 0', borderRadius: 9,
                background: 'var(--orange)', color: '#fff',
                fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer',
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
            >
              Watch Now
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

// ── Video Modal ──────────────────────────────────────────────────────────────
function VideoModal({ session, onClose }: { session: Session; onClose: () => void }) {
  const getEmbedUrl = (url: string) => {
    try {
      const u = new URL(url);
      let videoId = '';
      if (u.hostname.includes('youtube.com')) videoId = u.searchParams.get('v') ?? '';
      else if (u.hostname.includes('youtu.be')) videoId = u.pathname.slice(1);
      if (videoId) return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } catch {}
    return url;
  };

  const embedUrl = getEmbedUrl(session.videoLink);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 860,
          background: 'var(--surface)',
          borderRadius: 16, overflow: 'hidden',
          border: '1px solid var(--border)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
        }}
      >
        <div style={{
          padding: '14px 18px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', borderBottom: '1px solid var(--border)',
        }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>
            {session.title}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'var(--surface2)', border: '1px solid var(--border)',
              borderRadius: 8, width: 32, height: 32, cursor: 'pointer',
              color: 'var(--muted)', fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
          <iframe
            src={embedUrl}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

// ── Pagination ───────────────────────────────────────────────────────────────
function Pagination({ page, totalPages, onPageChange }: { page: number; totalPages: number; onPageChange: (p: number) => void }) {
  if (totalPages <= 1) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 32 }}>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        style={{
          padding: '7px 14px', borderRadius: 8,
          border: '1px solid var(--border)',
          background: 'var(--surface)', color: 'var(--muted)',
          cursor: page === 1 ? 'not-allowed' : 'pointer',
          opacity: page === 1 ? 0.4 : 1,
          fontSize: 13, fontWeight: 600,
        }}
      >
        ← Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          style={{
            width: 36, height: 36, borderRadius: 8,
            border: p === page ? '1.5px solid var(--orange)' : '1px solid var(--border)',
            background: p === page ? 'var(--orange-dim)' : 'var(--surface)',
            color: p === page ? 'var(--orange)' : 'var(--muted)',
            fontWeight: p === page ? 700 : 500,
            fontSize: 13, cursor: 'pointer',
          }}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        style={{
          padding: '7px 14px', borderRadius: 8,
          border: '1px solid var(--border)',
          background: 'var(--surface)', color: 'var(--muted)',
          cursor: page === totalPages ? 'not-allowed' : 'pointer',
          opacity: page === totalPages ? 0.4 : 1,
          fontSize: 13, fontWeight: 600,
        }}
      >
        Next →
      </button>
    </div>
  );
}

// ── SessionsBoard ────────────────────────────────────────────────────────────
export default function SessionsBoard() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<SessionFilter>('all');
  const [watching, setWatching] = useState<Session | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchSessions()
      .then((res: any) => {
        const data = Array.isArray(res) ? res : res?.data ?? res?.sessions ?? [];
        // Sort FIFO — oldest first by createdAt
        const sorted = [...data].sort((a, b) => {
          const dateA = new Date(a.createdAt ?? 0).getTime();
          const dateB = new Date(b.createdAt ?? 0).getTime();
          return dateA - dateB;
        });
        setSessions(sorted);
      })
      .catch(() => setSessions([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (filter === 'all') return sessions;
    return sessions.filter(s => s.category === filter);
  }, [sessions, filter]);

  // Reset to page 1 when filter changes
  useEffect(() => { setPage(1); }, [filter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const filters: { key: SessionFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'workshop', label: 'Workshop' },
    { key: 'yt-session', label: 'YT Session' },
    { key: 'bk-session', label: 'BK Session' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '28px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
          Sessions
        </h1>
        <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--muted)' }}>
          Workshops and YouTube sessions curated for your growth
        </p>
      </div>

      {/* Filter tabs */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        marginBottom: 28, padding: '10px 12px',
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 14, flexWrap: 'wrap',
      }}>
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            style={{
              padding: '7px 14px', borderRadius: 8,
              border: filter === f.key ? '1.5px solid var(--orange)' : '1px solid var(--border)',
              background: filter === f.key ? 'var(--orange-dim)' : 'var(--surface2)',
              color: filter === f.key ? 'var(--orange)' : 'var(--muted)',
              fontWeight: filter === f.key ? 700 : 500,
              fontSize: 13, cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            {f.label}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>
          {filtered.length} sessions
        </span>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
          <div style={{
            width: 32, height: 32, border: '3px solid var(--border)',
            borderTopColor: 'var(--orange)', borderRadius: '50%',
            animation: 'spin 0.7s linear infinite', margin: '0 auto 12px',
          }} />
          <p style={{ margin: 0, fontSize: 14 }}>Loading sessions…</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      )}

      {/* Empty */}
      {!loading && filtered.length === 0 && (
        <div style={{
          padding: '60px 20px', textAlign: 'center',
          border: '1px dashed var(--border)', borderRadius: 16,
          color: 'var(--muted)', fontSize: 14,
        }}>
          No sessions found.
        </div>
      )}

      {/* Grid */}
      {!loading && paginated.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 16,
        }}>
          {paginated.map((s, i) => (
            <SessionCard key={s._id ?? s.id ?? i} session={s} onWatch={setWatching} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && (
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      )}

      {/* Video Modal */}
      {watching && <VideoModal session={watching} onClose={() => setWatching(null)} />}
    </div>
  );
}
