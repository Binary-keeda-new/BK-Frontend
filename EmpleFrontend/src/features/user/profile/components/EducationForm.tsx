'use client';

import React from 'react';
import { Education, BLANK_EDUCATION } from '../types/profile.types';
import { Section, Field } from './ProfileForm';

const inp: React.CSSProperties = {
  width: '100%', padding: '9px 12px', borderRadius: 9,
  border: '1px solid var(--border)', background: 'var(--surface2)',
  color: 'var(--text)', fontSize: 13, outline: 'none', boxSizing: 'border-box',
};

interface Props {
  education: Education[];
  onChange: (education: Education[]) => void;
}

export default function EducationForm({ education, onChange }: Props) {
  function update(i: number, patch: Partial<Education>) {
    onChange(education.map((e, idx) => idx === i ? { ...e, ...patch } : e));
  }
  function remove(i: number) { onChange(education.filter((_, idx) => idx !== i)); }
  function add() { onChange([...education, { ...BLANK_EDUCATION }]); }

  return (
    <Section title="Education">
      {education.map((edu, i) => (
        <div key={i} style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 12, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
            <Field label="Institution"><input style={inp} value={edu.institution} onChange={e => update(i, { institution: e.target.value })} placeholder="MIT" /></Field>
            <Field label="Degree"><input style={inp} value={edu.degree} onChange={e => update(i, { degree: e.target.value })} placeholder="B.Tech" /></Field>
            <Field label="Field of Study"><input style={inp} value={edu.field} onChange={e => update(i, { field: e.target.value })} placeholder="Computer Science" /></Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 8px' }}>
              <Field label="Start"><input style={inp} value={edu.startYear} onChange={e => update(i, { startYear: e.target.value })} placeholder="2018" /></Field>
              <Field label="End"><input style={inp} value={edu.endYear} onChange={e => update(i, { endYear: e.target.value })} placeholder="2022" /></Field>
            </div>
          </div>
          <button type="button" onClick={() => remove(i)} style={{ alignSelf: 'flex-end', padding: '5px 12px', borderRadius: 7, background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.15)', color: '#f87171', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={add} style={{ padding: '9px 0', borderRadius: 9, background: 'var(--surface2)', border: '1px dashed var(--border)', color: 'var(--muted)', fontSize: 13, fontWeight: 600, cursor: 'pointer', width: '100%' }}>
        + Add Education
      </button>
    </Section>
  );
}
