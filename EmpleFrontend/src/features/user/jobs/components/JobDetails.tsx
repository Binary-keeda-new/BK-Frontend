'use client';

import React from 'react';
import { Job } from '../types/jobs.types';

interface JobDetailsProps {
  job: Job;
  onApply: (link: string) => void;
  onBack: () => void;
}

export default function JobDetails({ job, onApply, onBack }: JobDetailsProps) {
  const isGov = job.type === 'government';
  const releasedCount = job.stages?.filter(s => s.status === 'released').length ?? 0;
  const totalCount = job.stages?.length ?? 0;
  const progressPct = totalCount > 0 ? Math.round((releasedCount / totalCount) * 100) : 0;
  const statusLabel = job.lastDate ? 'Closing Soon' : 'Open';
  const statusColor = job.lastDate ? '#f59e0b' : '#4ade80';
  const statusBg = job.lastDate ? 'rgba(245,158,11,0.12)' : 'rgba(74,222,128,0.12)';
  const statusBorder = job.lastDate ? 'rgba(245,158,11,0.3)' : 'rgba(74,222,128,0.3)';

  // Generate a simple letter-based company avatar
  const initials = job.company
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();

  return (
    <>
      <style>{`
        @keyframes panelSlide {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes backdropFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .job-panel-scroll::-webkit-scrollbar { width: 4px; }
        .job-panel-scroll::-webkit-scrollbar-track { background: transparent; }
        .job-panel-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={onBack}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(2px)',
          zIndex: 40,
          animation: 'backdropFade 0.2s ease',
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100dvh',
          width: 'min(460px, 100vw)',
          background: '#13141a',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          animation: 'panelSlide 0.3s cubic-bezier(0.22,1,0.36,1)',
          boxShadow: '-12px 0 48px rgba(0,0,0,0.5)',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* ── Top bar ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 700, color: '#f0f0f4' }}>Job Details</span>
          <button
            onClick={onBack}
            aria-label="Close"
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#9a9aaa',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div
          className="job-panel-scroll"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {/* ── Company + title ── */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            {/* Company avatar */}
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(241,90,34,0.15)',
                border: '1px solid rgba(241,90,34,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                fontWeight: 800,
                color: 'var(--orange)',
                flexShrink: 0,
                letterSpacing: '-0.02em',
              }}
            >
              {initials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2
                style={{
                  margin: '0 0 4px',
                  fontSize: 19,
                  fontWeight: 800,
                  color: '#f0f0f4',
                  lineHeight: 1.25,
                  letterSpacing: '-0.02em',
                }}
              >
                {job.title}
              </h2>
              <p style={{ margin: '0 0 8px', fontSize: 13, color: '#666', fontWeight: 500 }}>
                {job.company}{job.department ? ` · ${job.department}` : ''}
              </p>
              {/* Status badge */}
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  fontSize: 12,
                  fontWeight: 600,
                  padding: '4px 10px',
                  borderRadius: 20,
                  background: statusBg,
                  color: statusColor,
                  border: `1px solid ${statusBorder}`,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: statusColor,
                    display: 'inline-block',
                  }}
                />
                {statusLabel}
              </span>
            </div>
          </div>

          {/* ── Info grid 2×2 ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              {
                emoji: '📍',
                label: 'Location',
                value: job.location || 'Not specified',
              },
              {
                emoji: '💰',
                label: 'Salary',
                value: job.salary || 'Not disclosed',
              },
              {
                emoji: '💼',
                label: 'Type',
                value: isGov ? 'Govt / PSU' : 'Full-time',
              },
              {
                emoji: '🎯',
                label: 'Experience',
                value: isGov ? 'As notified' : '2–5 years',
              },
            ].map(({ emoji, label, value }) => (
              <div
                key={label}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 12,
                  padding: '13px 14px',
                }}
              >
                <p
                  style={{
                    margin: '0 0 4px',
                    fontSize: 11,
                    color: '#555',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                  }}
                >
                  <span>{emoji}</span> {label}
                </p>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#f0f0f4' }}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* ── Gov: Stage progress ── */}
          {isGov && job.stages && job.stages.length > 0 && (
            <div
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 12,
                padding: '16px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  Stages
                </span>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#4ade80' }}>
                  {releasedCount}/{totalCount} released
                </span>
              </div>
              {/* Bar */}
              <div
                style={{
                  height: 5,
                  borderRadius: 3,
                  background: 'rgba(255,255,255,0.08)',
                  overflow: 'hidden',
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${progressPct}%`,
                    borderRadius: 3,
                    background: 'linear-gradient(90deg, #22c55e, #4ade80)',
                  }}
                />
              </div>
              {/* Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {job.stages.map((s, i) => {
                  const released = s.status === 'released';
                  return (
                    <span
                      key={s.name || s.label || i}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 5,
                        fontSize: 12,
                        fontWeight: 600,
                        padding: '4px 10px',
                        borderRadius: 20,
                        background: released ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.04)',
                        color: released ? '#4ade80' : '#555',
                        border: `1px solid ${released ? 'rgba(34,197,94,0.25)' : 'rgba(255,255,255,0.07)'}`,
                      }}
                    >
                      {released ? (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2 2 4-4" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#333', display: 'inline-block' }} />
                      )}
                      {s.name || s.label}
                      {released && s.link && (
                        <a
                          href={s.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: 'var(--orange)', textDecoration: 'none', fontWeight: 700, fontSize: 11 }}
                        >
                          ↗
                        </a>
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Gov: Important Links ── */}
          {isGov && job.links && job.links.length > 0 && (
            <div
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 12,
                padding: '16px',
              }}
            >
              <p
                style={{
                  margin: '0 0 12px',
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#555',
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                }}
              >
                Important Links
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {job.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: 10,
                      background: 'rgba(241,90,34,0.06)',
                      border: '1px solid rgba(241,90,34,0.18)',
                      color: '#f0f0f4',
                      textDecoration: 'none',
                      fontSize: 13,
                      fontWeight: 600,
                      transition: 'background 0.15s, border-color 0.15s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(241,90,34,0.14)';
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(241,90,34,0.4)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(241,90,34,0.06)';
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(241,90,34,0.18)';
                    }}
                  >
                    <span>{link.label}</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M3 11L11 3M11 3H6M11 3V8" stroke="var(--orange)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* ── Skills ── */}
          {job.tags && job.tags.length > 0 && (
            <div>
              <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                Skills
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {job.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      padding: '6px 14px',
                      borderRadius: 20,
                      background: 'rgba(241,90,34,0.1)',
                      color: 'var(--orange)',
                      border: '1px solid rgba(241,90,34,0.2)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── Description ── */}
          <div>
            <p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              Description
            </p>
            <div style={{ color: '#8a8a9a', fontSize: 13, lineHeight: 1.75 }}>
              {(() => {
                if (!job.description) return null;
                const lines = job.description.split('\n');
                const elements = [];
                let listType: 'ul' | 'ol' | null = null;
                let items: string[] = [];
                
                const pushList = () => {
                  if (items.length > 0) {
                    if (listType === 'ul') {
                      elements.push(<ul key={`ul-${elements.length}`} style={{ listStyleType: 'disc', paddingLeft: '20px', margin: '8px 0', color: '#8a8a9a' }}>{items.map((item, i) => <li key={i}>{item}</li>)}</ul>);
                    } else {
                      elements.push(<ol key={`ol-${elements.length}`} style={{ listStyleType: 'decimal', paddingLeft: '20px', margin: '8px 0', color: '#8a8a9a' }}>{items.map((item, i) => <li key={i}>{item}</li>)}</ol>);
                    }
                    items = [];
                    listType = null;
                  }
                };

                lines.forEach((line, index) => {
                  const trimmed = line.trim();
                  if (trimmed.startsWith('- ') || trimmed.startsWith('• ') || trimmed.startsWith('* ')) {
                    if (listType !== 'ul') pushList();
                    listType = 'ul';
                    items.push(trimmed.substring(2));
                  } else if (/^\d+\.\s/.test(trimmed)) {
                    if (listType !== 'ol') pushList();
                    listType = 'ol';
                    items.push(trimmed.replace(/^\d+\.\s/, ''));
                  } else {
                    pushList();
                    if (trimmed === '') {
                      elements.push(<div key={`br-${index}`} style={{ height: '8px' }} />);
                    } else {
                      elements.push(<p key={`p-${index}`} style={{ margin: '0 0 8px', color: '#8a8a9a', whiteSpace: 'pre-wrap' }}>{line}</p>);
                    }
                  }
                });
                pushList();
                
                return elements;
              })()}
            </div>
          </div>

          {/* Posted at */}
          {job.postedAt && (
            <p style={{ margin: 0, fontSize: 12, color: '#444' }}>
              Posted {job.postedAt}
            </p>
          )}

          {/* Spacer so content clears sticky footer */}
          <div style={{ height: 8 }} />
        </div>

        {/* ── Sticky footer ── */}
        <div
          style={{
            padding: '14px 20px',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            display: 'flex',
            gap: 10,
            flexShrink: 0,
            background: '#13141a',
          }}
        >
          <button
            onClick={onBack}
            style={{
              flex: '0 0 120px',
              padding: '13px 0',
              borderRadius: 12,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#f0f0f4',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)'; }}
          >
            Back
          </button>
          <button
            onClick={() => onApply(job.applyLink)}
            style={{
              flex: 1,
              padding: '13px 0',
              borderRadius: 12,
              background: 'var(--orange)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
          >
            Apply Now
          </button>
        </div>
      </div>
    </>
  );
}