'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface Experience {
  id: string;
  role: string;
  company: string;
  level: 'Fresher' | 'Experienced';
  rounds: string;
  description: string;
  tags: string[];
  postedAt: string;
  result: 'Selected' | 'Rejected' | 'Pending';
}

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

interface Props {
  onBack: () => void;
}

export default function InterviewExperience({ onBack }: Props) {
  const router = useRouter();

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');
  const [search, setSearch]           = useState('');
  const [levelFilter, setLevelFilter] = useState<'all' | 'Fresher' | 'Experienced'>('all');
  const [shareOpen, setShareOpen]     = useState(false);

  const emptyForm = { role: '', company: '', level: 'Fresher' as Experience['level'], rounds: '', description: '', tags: '', result: 'Pending' as Experience['result'] };
  const [form, setForm] = useState(emptyForm);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/interviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) }),
      });
      if (!res.ok) throw new Error(`POST failed: ${res.status}`);
      const { data } = await res.json();
      setExperiences(prev => [data, ...prev]);
      setShareOpen(false);
      setForm(emptyForm);
    } catch (err) {
      console.error('[InterviewExperience] submit error:', err);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError('');
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/interviews`)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        return res.json();
      })
      .then(data => setExperiences(Array.isArray(data) ? data : data.data ?? []))
      .catch(err => setError(err.message || 'Failed to load experiences.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = experiences.filter(e => {
    const matchLevel  = levelFilter === 'all' || e.level === levelFilter;
    const q           = search.toLowerCase();
    const matchSearch = !q || e.role.toLowerCase().includes(q) || e.company.toLowerCase().includes(q) || e.tags.some(t => t.toLowerCase().includes(q));
    return matchLevel && matchSearch;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '28px 24px' }}>
      <style>{`
        @keyframes ieCardIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shareModalIn {
          from { opacity: 0; transform: translate(-50%, -48%) scale(0.97); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, gap: 12, flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Interview Experiences
          </h1>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--muted)' }}>
            Real experiences shared by candidates — prep smarter
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={onBack}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '9px 16px', borderRadius: 9,
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
          <button
            onClick={() => setShareOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '9px 16px', borderRadius: 9,
              background: 'var(--orange)', border: 'none',
              color: '#fff', fontSize: 13, fontWeight: 700,
              cursor: 'pointer', transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 1v8M3 5l3.5-4L10 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 10v1a1 1 0 001 1h9a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            Share Experience
          </button>
        </div>
      </div>

      {/* ── Filter / search bar ── */}
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
          padding: '10px 14px', marginBottom: 24,
          background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14,
        }}
      >
        <div style={{ position: 'relative', flex: 1, minWidth: 180 }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
            style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }}>
            <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M9 9l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by role, company or tag…"
            style={{
              width: '100%', padding: '7px 12px 7px 30px', borderRadius: 8,
              border: '1px solid var(--border)', background: 'var(--surface2)',
              color: 'var(--text)', fontSize: 13, outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>

        {(['all', 'Fresher', 'Experienced'] as const).map(l => (
          <button
            key={l}
            onClick={() => setLevelFilter(l)}
            style={{
              padding: '7px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer',
              fontWeight: levelFilter === l ? 700 : 500, transition: 'all 0.15s',
              border: levelFilter === l ? '1.5px solid var(--orange)' : '1px solid var(--border)',
              background: levelFilter === l ? 'var(--orange-dim)' : 'var(--surface2)',
              color: levelFilter === l ? 'var(--orange)' : 'var(--muted)',
            }}
          >
            {l === 'all' ? 'All' : l}
          </button>
        ))}

        <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>
          {filtered.length} experience{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* ── Loading ── */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
          <div style={{
            width: 32, height: 32, border: '3px solid var(--border)',
            borderTopColor: 'var(--orange)', borderRadius: '50%',
            animation: 'spin 0.7s linear infinite', margin: '0 auto 12px',
          }} />
          <p style={{ margin: 0, fontSize: 14 }}>Loading experiences…</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      )}

      {/* ── Error ── */}
      {!loading && error && (
        <div style={{
          padding: '14px 18px', borderRadius: 12, marginBottom: 20,
          background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
          color: '#f87171', fontSize: 13,
        }}>
          {error}
        </div>
      )}

      {/* ── Cards ── */}
      {!loading && !error && (
        filtered.length === 0 ? (
          <div style={{
            padding: '48px 20px', textAlign: 'center',
            border: '1px dashed var(--border)', borderRadius: 16, color: 'var(--muted)', fontSize: 14,
          }}>
            {search || levelFilter !== 'all' ? 'No experiences match your search.' : 'No experiences yet.'}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16, alignItems: 'stretch' }}>
            {filtered.map((exp, i) => {
              const initials = exp.company.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
              return (
                <article
                  key={exp.id ?? `${exp.role}-${i}`}
                  onClick={() => router.push(`/user/interview/${exp.id}`)}
                  style={{
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: 16, padding: '18px',
                    display: 'flex', flexDirection: 'column', height: '100%',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    animation: `ieCardIn 0.2s ease ${i * 0.04}s both`,
                    cursor: 'pointer',
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
                  {/* ── Top: avatar + role + result ── */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 11, flexShrink: 0,
                      background: 'var(--orange-dim)', border: '1px solid rgba(241,90,34,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14, fontWeight: 800, color: 'var(--orange)',
                    }}>
                      {initials}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ margin: '0 0 3px', fontSize: 15, fontWeight: 700, color: 'var(--text)', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {exp.role}
                      </h3>
                      <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>{exp.company}</p>
                    </div>
                    <span style={{
                      flexShrink: 0, fontSize: 11, fontWeight: 700, padding: '4px 9px',
                      borderRadius: 20, whiteSpace: 'nowrap',
                      background: resultBg[exp.result] ?? resultBg.Pending,
                      color: resultColor[exp.result] ?? resultColor.Pending,
                      border: `1px solid ${(resultColor[exp.result] ?? resultColor.Pending)}33`,
                      display: 'flex', alignItems: 'center', gap: 4,
                    }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: resultColor[exp.result] ?? resultColor.Pending, display: 'inline-block' }} />
                      {exp.result}
                    </span>
                  </div>

                  {/* ── Divider ── */}
                  <div style={{ height: 1, background: 'var(--border)', marginBottom: 14 }} />

                  {/* ── Info rows ── */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 13, width: 16, textAlign: 'center' }}>🎓</span>
                      <span style={{ fontSize: 13, color: 'var(--muted)' }}>{exp.level}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 13, width: 16, textAlign: 'center' }}>🔄</span>
                      <span style={{ fontSize: 13, color: 'var(--muted)' }}>{exp.rounds}</span>
                    </div>
                  </div>

                  {/* ── Description ── */}
                  <p style={{
                    margin: '0 0 12px', fontSize: 13, lineHeight: 1.65, color: 'var(--muted)',
                    display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {exp.description}
                  </p>

                  {/* ── Tags ── */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
                    {exp.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 20,
                        background: 'var(--surface2)', color: 'var(--muted)', border: '1px solid var(--border)',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* ── Footer ── */}
                  <div style={{ marginTop: 'auto', paddingTop: 10, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>Posted {exp.postedAt}</span>
                    <span style={{ fontSize: 12, color: 'var(--orange)', fontWeight: 600 }}>Read more →</span>
                  </div>
                </article>
              );
            })}
          </div>
        )
      )}

      {/* ── Share modal ── */}
      {shareOpen && (
        <>
          <div
            onClick={() => setShareOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)', zIndex: 40 }}
          />
          <div style={{
            position: 'fixed', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 'min(460px, calc(100vw - 32px))',
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 18, padding: '28px 24px 20px', zIndex: 50,
            boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
            animation: 'shareModalIn 0.2s ease',
            maxHeight: '90vh', overflowY: 'auto',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>Share Your Experience</h3>
              <button
                onClick={() => setShareOpen(false)}
                style={{
                  width: 30, height: 30, borderRadius: 8,
                  background: 'var(--surface2)', border: '1px solid var(--border)',
                  color: 'var(--muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M9 2L2 9M2 2l7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Role', key: 'role', placeholder: 'e.g. Software Engineer' },
                { label: 'Company', key: 'company', placeholder: 'e.g. Google' },
                { label: 'Rounds', key: 'rounds', placeholder: 'e.g. 3 rounds (DSA, System Design, HR)' },
                { label: 'Tags', key: 'tags', placeholder: 'e.g. DSA, React, System Design (comma-separated)' },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 4 }}>{label}</label>
                  <input
                    required
                    value={form[key as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    style={{ width: '100%', padding: '8px 11px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface2)', color: 'var(--text)', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              ))}

              <div style={{ display: 'flex', gap: 10 }}>
                {[
                  { label: 'Level', key: 'level', options: ['Fresher', 'Experienced'] },
                  { label: 'Result', key: 'result', options: ['Pending', 'Selected', 'Rejected'] },
                ].map(({ label, key, options }) => (
                  <div key={key} style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 4 }}>{label}</label>
                    <select
                      value={form[key as keyof typeof form]}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      style={{ width: '100%', padding: '8px 11px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface2)', color: 'var(--text)', fontSize: 13, outline: 'none' }}
                    >
                      {options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 4 }}>Description</label>
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Describe the interview process, questions asked, tips…"
                  style={{ width: '100%', padding: '8px 11px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface2)', color: 'var(--text)', fontSize: 13, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <button
                  type="button"
                  onClick={() => setShareOpen(false)}
                  style={{ flex: 1, padding: '10px 0', borderRadius: 10, background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, padding: '10px 0', borderRadius: 10, background: 'var(--orange)', border: 'none', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}