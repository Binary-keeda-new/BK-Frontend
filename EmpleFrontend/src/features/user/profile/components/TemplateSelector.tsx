'use client';

import React from 'react';
import { TemplateId } from '../types/profile.types';

const TEMPLATES: { id: TemplateId; label: string; desc: string }[] = [
  { id: 'minimal', label: 'Minimal', desc: 'Clean resume style, black & white' },
  { id: 'modern', label: 'Modern', desc: 'Bold sections with visual emphasis' },
  { id: 'card', label: 'Card', desc: 'Boxed layout with distinct sections' },
];

interface Props {
  selected: TemplateId;
  onSelect: (t: TemplateId) => void;
}

export default function TemplateSelector({ selected, onSelect }: Props) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '18px 20px' }}>
      <p style={{ margin: '0 0 14px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--muted)' }}>Profile Template</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
        {TEMPLATES.map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => onSelect(t.id)}
            style={{
              padding: '14px 12px', borderRadius: 12, cursor: 'pointer', textAlign: 'left',
              border: selected === t.id ? '1.5px solid var(--orange)' : '1px solid var(--border)',
              background: selected === t.id ? 'var(--orange-dim)' : 'var(--surface2)',
              transition: 'all 0.15s',
            }}
          >
            <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 700, color: selected === t.id ? 'var(--orange)' : 'var(--text)' }}>{t.label}</p>
            <p style={{ margin: 0, fontSize: 11, color: 'var(--muted)', lineHeight: 1.4 }}>{t.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
