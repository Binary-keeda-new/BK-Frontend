'use client';

import React from 'react';
import { Profile } from '../types/profile.types';

const inp: React.CSSProperties = {
  width: '100%', padding: '9px 12px', borderRadius: 9,
  border: '1px solid var(--border)', background: 'var(--surface2)',
  color: 'var(--text)', fontSize: 13, outline: 'none', boxSizing: 'border-box',
};

interface Props {
  profile: Profile;
  onChange: (patch: Partial<Profile>) => void;
}

export default function ProfileForm({ profile, onChange }: Props) {
  const [skillInput, setSkillInput] = React.useState('');

  function addSkill() {
    const s = skillInput.trim();
    if (!s || profile.skills.includes(s)) return;
    onChange({ skills: [...profile.skills, s] });
    setSkillInput('');
  }

  function removeSkill(s: string) {
    onChange({ skills: profile.skills.filter(x => x !== s) });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Section title="Basic Info">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 14px' }}>
          <Field label="Full Name">
            <input style={inp} value={profile.name} onChange={e => onChange({ name: e.target.value })} placeholder="Jane Doe" />
          </Field>
          <Field label="Email">
            <input style={inp} type="email" value={profile.email} onChange={e => onChange({ email: e.target.value })} placeholder="jane@example.com" />
          </Field>
        </div>
        <Field label="Bio">
          <textarea style={{ ...inp, minHeight: 80, resize: 'vertical' }} value={profile.bio} onChange={e => onChange({ bio: e.target.value })} placeholder="Short introduction…" />
        </Field>
      </Section>

      <Section title="Skills">
        <div style={{ display: 'flex', gap: 8 }}>
          <input style={{ ...inp, flex: 1 }} value={skillInput} onChange={e => setSkillInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            placeholder="Type a skill and press Enter" />
          <button type="button" onClick={addSkill} style={{ padding: '9px 16px', borderRadius: 9, background: 'var(--orange)', border: 'none', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            Add
          </button>
        </div>
        {profile.skills.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
            {profile.skills.map(s => (
              <span key={s} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 20, background: 'var(--orange-dim)', border: '1px solid rgba(241,90,34,0.2)', color: 'var(--orange)', fontSize: 12, fontWeight: 600 }}>
                {s}
                <button type="button" onClick={() => removeSkill(s)} style={{ background: 'none', border: 'none', color: 'var(--orange)', cursor: 'pointer', padding: 0, lineHeight: 1, fontSize: 14, marginLeft: 2 }}>×</button>
              </span>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '18px 20px' }}>
      <p style={{ margin: '0 0 14px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--muted)' }}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{children}</div>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 5 }}>{label}</label>
      {children}
    </div>
  );
}
