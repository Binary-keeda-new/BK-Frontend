'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Experience } from '@/features/user/jobs/components/InterviewExperience';

const resultColor: Record<string, string> = {
  Selected: '#22c55e',
  Rejected: '#f87171',
  Pending:  '#f59e0b',
};
const resultBg: Record<string, string> = {
  Selected: 'rgba(34,197,94,0.1)',
  Rejected: 'rgba(248,113,113,0.1)',
  Pending:  'rgba(245,158,11,0.1)',
};

export default function InterviewDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError('');
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/interviews/${id}`)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        return res.json();
      })
      .then(data => setExperience(data.data ?? data))
      .catch(err => setError(err.message || 'Failed to load experience.'))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '28px 24px' }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Loading ── */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
          <div style={{
            width: 32, height: 32, border: '3px solid var(--border)',
            borderTopColor: 'var(--orange)', borderRadius: '50%',
            animation: 'spin 0.7s linear infinite', margin: '0 auto 12px',
          }} />
          <p style={{ margin: 0, fontSize: 14 }}>Loading…</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      )}

      {/* ── Error ── */}
      {!loading && error && (
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{
            padding: '14px 18px', borderRadius: 12, marginBottom: 20,
            background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
            color: '#f87171', fontSize: 13,
          }}>
            {error}
          </div>
          <button
            onClick={() => router.back()}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '9px 16px', borderRadius: 9,
              background: 'var(--surface2)', border: '1px solid var(--border)',
              color: 'var(--text)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}
          >
            ← Back
          </button>
        </div>
      )}

      {/* ── Content ── */}
      {!loading && !error && experience && (
        <div style={{ maxWidth: 680, margin: '0 auto', animation: 'fadeUp 0.22s ease' }}>

          {/* Back button */}
          <button
            onClick={() => router.back()}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, marginBottom: 24,
              padding: '8px 14px', borderRadius: 9,
              background: 'var(--surface2)', border: '1px solid var(--border)',
              color: 'var(--text)', fontSize: 13, fontWeight: 600,
              cursor: 'pointer', transition: 'border-color 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--orange)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'; }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M8 11L3.5 6.5 8 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>

          {/* ── Header card ── */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 18, padding: '24px 26px', marginBottom: 16,
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
              {/* Avatar */}
              <div style={{
                width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                background: 'var(--orange-dim)', border: '1px solid rgba(241,90,34,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, fontWeight: 800, color: 'var(--orange)',
              }}>
                {experience.company.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h1 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
                  {experience.role}
                </h1>
                <p style={{ margin: '0 0 10px', fontSize: 14, color: 'var(--muted)', fontWeight: 500 }}>
                  {experience.company}
                </p>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  fontSize: 12, fontWeight: 700, padding: '4px 10px',
                  borderRadius: 20,
                  background: resultBg[experience.result] ?? resultBg.Pending,
                  color: resultColor[experience.result] ?? resultColor.Pending,
                  border: `1px solid ${(resultColor[experience.result] ?? resultColor.Pending)}33`,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: resultColor[experience.result] ?? resultColor.Pending, display: 'inline-block' }} />
                  {experience.result}
                </span>
              </div>
            </div>

            {/* Info grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { emoji: '🎓', label: 'Level',  value: experience.level },
                { emoji: '🔄', label: 'Rounds', value: experience.rounds },
                { emoji: '📅', label: 'Posted', value: experience.postedAt },
              ].map(({ emoji, label, value }) => (
                <div key={label} style={{
                  background: 'var(--surface2)', border: '1px solid var(--border)',
                  borderRadius: 11, padding: '12px 14px',
                }}>
                  <p style={{ margin: '0 0 3px', fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {emoji} {label}
                  </p>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Tags ── */}
          {experience.tags && experience.tags.length > 0 && (
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 14, padding: '18px 20px', marginBottom: 16,
            }}>
              <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Topics Covered
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {experience.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: 13, fontWeight: 600, padding: '6px 14px', borderRadius: 20,
                    background: 'var(--orange-dim)', color: 'var(--orange)',
                    border: '1px solid rgba(241,90,34,0.2)',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── Description ── */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 14, padding: '18px 20px',
          }}>
            <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Experience
            </p>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: 'var(--muted)' }}>
              {experience.description}
            </p>
          </div>

        </div>
      )}
    </div>
  );
}