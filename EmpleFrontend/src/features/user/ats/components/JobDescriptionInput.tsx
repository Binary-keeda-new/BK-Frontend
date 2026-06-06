'use client';

import React from 'react';
import { FileText, X } from 'lucide-react';

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function JobDescriptionInput({ value, onChange, error }: JobDescriptionInputProps) {
  const charCount = value.length;
  const MAX_CHARS = 10000;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <FileText size={20} style={{ color: 'var(--orange)' }} />
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted2)' }}>
            Job Description
          </h2>
        </div>
        <span style={{ fontSize: '11px', color: charCount > MAX_CHARS ? '#f87171' : 'var(--muted)', fontWeight: 600 }}>
          {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
        </span>
      </div>

      <div style={{ position: 'relative' }}>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste the complete job description or requirements here..."
          style={{
            width: '100%',
            height: '280px',
            padding: '24px',
            paddingBottom: '48px',
            borderRadius: '16px',
            border: '1px solid var(--border)',
            background: 'var(--surface2)',
            color: 'var(--text)',
            fontSize: '13px',
            lineHeight: '1.7',
            resize: 'none',
            outline: 'none',
            fontFamily: "'Inter', sans-serif",
            boxSizing: 'border-box',
            transition: 'border-color 0.2s',
          }}
          id="ats-job-description"
          maxLength={MAX_CHARS}
          onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--orange)'; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
        />
        {value.length > 0 && (
          <button onClick={() => onChange('')} style={{ position: 'absolute', bottom: '14px', right: '14px', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--muted)', fontWeight: 600, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '50px', padding: '4px 12px', cursor: 'pointer', transition: 'color 0.18s, border-color 0.18s' }} type="button">
            <X size={12} /> Clear
          </button>
        )}
      </div>

      {error && (
        <div className="ats-error-banner" style={{ marginTop: '12px' }}>{error}</div>
      )}
    </div>
  );
}
