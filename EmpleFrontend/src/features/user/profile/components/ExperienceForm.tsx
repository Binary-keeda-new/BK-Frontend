'use client';

import React from 'react';
import { Experience, BLANK_EXPERIENCE } from '../types/profile.types';
import { Section, Field } from './ProfileForm';

const inp: React.CSSProperties = {
  width: '100%', padding: '9px 12px', borderRadius: 9,
  border: '1px solid var(--border)', background: 'var(--surface2)',
  color: 'var(--text)', fontSize: 13, outline: 'none', boxSizing: 'border-box',
};

interface Props {
  experience: Experience[];
  onChange: (experience: Experience[]) => void;
}

export default function ExperienceForm({ experience, onChange }: Props) {
  function update(i: number, patch: Partial<Experience>) {
    onChange(experience.map((e, idx) => idx === i ? { ...e, ...patch } : e));
  }
  function remove(i: number) { onChange(experience.filter((_, idx) => idx !== i)); }
  function add() { onChange([...experience, { ...BLANK_EXPERIENCE }]); }

  return (
    <Section title="Experience">
      {experience.map((exp, i) => (
        <div key={i} style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 12, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
            <Field label="Company"><input style={inp} value={exp.company} onChange={e => update(i, { company: e.target.value })} placeholder="Acme Inc." /></Field>
            <Field label="Role"><input style={inp} value={exp.role} onChange={e => update(i, { role: e.target.value })} placeholder="Software Engineer" /></Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 8px' }}>
              <Field label="Start"><input style={inp} value={exp.startYear} onChange={e => update(i, { startYear: e.target.value })} placeholder="2022" /></Field>
              <Field label="End"><input style={inp} value={exp.endYear} onChange={e => update(i, { endYear: e.target.value })} placeholder="Present" /></Field>
            </div>
          </div>
          <Field label="Description">
            <textarea style={{ ...inp, minHeight: 60, resize: 'vertical' }} value={exp.description} onChange={e => update(i, { description: e.target.value })} placeholder="Key responsibilities…" />
          </Field>
          <button type="button" onClick={() => remove(i)} style={{ alignSelf: 'flex-end', padding: '5px 12px', borderRadius: 7, background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.15)', color: '#f87171', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={add} style={{ padding: '9px 0', borderRadius: 9, background: 'var(--surface2)', border: '1px dashed var(--border)', color: 'var(--muted)', fontSize: 13, fontWeight: 600, cursor: 'pointer', width: '100%' }}>
        + Add Experience
      </button>
    </Section>
  );
}
