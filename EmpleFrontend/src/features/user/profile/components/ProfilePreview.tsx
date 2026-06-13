'use client';

import React from 'react';
import { Profile } from '../types/profile.types';

interface Props { profile: Profile; }

// ── Minimal template ─────────────────────────────────────────────────────────
function MinimalTemplate({ profile }: Props) {
  return (
    <div style={{ fontFamily: 'serif', color: '#111', background: '#fff', padding: '32px 36px', borderRadius: 12, border: '1px solid #ddd', minHeight: 400 }}>
      <h1 style={{ margin: '0 0 2px', fontSize: 22, fontWeight: 700 }}>{profile.name || 'Your Name'}</h1>
      <p style={{ margin: '0 0 4px', fontSize: 13, color: '#555' }}>{profile.email}</p>
      {profile.bio && <p style={{ margin: '8px 0 16px', fontSize: 13, color: '#444', lineHeight: 1.6 }}>{profile.bio}</p>}
      {profile.skills.length > 0 && <><HR /><Block title="Skills"><p style={{ margin: 0, fontSize: 13, color: '#444' }}>{profile.skills.join(' · ')}</p></Block></>}
      {profile.education.length > 0 && <><HR /><Block title="Education">{profile.education.map((e, i) => <div key={i} style={{ marginBottom: 8 }}><p style={{ margin: 0, fontWeight: 600, fontSize: 13 }}>{e.institution}</p><p style={{ margin: 0, fontSize: 12, color: '#666' }}>{e.degree} in {e.field} · {e.startYear}–{e.endYear}</p></div>)}</Block></>}
      {profile.experience.length > 0 && <><HR /><Block title="Experience">{profile.experience.map((e, i) => <div key={i} style={{ marginBottom: 10 }}><p style={{ margin: 0, fontWeight: 600, fontSize: 13 }}>{e.role} @ {e.company}</p><p style={{ margin: '1px 0 3px', fontSize: 12, color: '#888' }}>{e.startYear}–{e.endYear}</p><p style={{ margin: 0, fontSize: 12, color: '#555' }}>{e.description}</p></div>)}</Block></>}
    </div>
  );
}

// ── Modern template ───────────────────────────────────────────────────────────
function ModernTemplate({ profile }: Props) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', minHeight: 400 }}>
      <div style={{ background: 'var(--orange)', padding: '24px 28px' }}>
        <h1 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, color: '#fff' }}>{profile.name || 'Your Name'}</h1>
        <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{profile.email}</p>
      </div>
      <div style={{ padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {profile.bio && <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{profile.bio}</p>}
        {profile.skills.length > 0 && <MBlock title="Skills"><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{profile.skills.map(s => <span key={s} style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: 'var(--orange-dim)', color: 'var(--orange)', border: '1px solid rgba(241,90,34,0.2)' }}>{s}</span>)}</div></MBlock>}
        {profile.education.length > 0 && <MBlock title="Education">{profile.education.map((e, i) => <div key={i} style={{ marginBottom: 6 }}><p style={{ margin: 0, fontWeight: 700, fontSize: 13, color: 'var(--text)' }}>{e.institution}</p><p style={{ margin: 0, fontSize: 12, color: 'var(--muted)' }}>{e.degree} · {e.field} · {e.startYear}–{e.endYear}</p></div>)}</MBlock>}
        {profile.experience.length > 0 && <MBlock title="Experience">{profile.experience.map((e, i) => <div key={i} style={{ marginBottom: 10 }}><p style={{ margin: 0, fontWeight: 700, fontSize: 13, color: 'var(--text)' }}>{e.role}</p><p style={{ margin: '1px 0 3px', fontSize: 12, color: 'var(--orange)', fontWeight: 600 }}>{e.company} · {e.startYear}–{e.endYear}</p><p style={{ margin: 0, fontSize: 12, color: 'var(--muted)' }}>{e.description}</p></div>)}</MBlock>}
      </div>
    </div>
  );
}

// ── Card template ─────────────────────────────────────────────────────────────
function CardTemplate({ profile }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 400 }}>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--orange-dim)', border: '1px solid rgba(241,90,34,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800, color: 'var(--orange)', flexShrink: 0 }}>
          {(profile.name || 'U').charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 style={{ margin: '0 0 3px', fontSize: 18, fontWeight: 800, color: 'var(--text)' }}>{profile.name || 'Your Name'}</h2>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>{profile.email}</p>
        </div>
      </div>
      {profile.bio && <CCard title="About"><p style={{ margin: 0, fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{profile.bio}</p></CCard>}
      {profile.skills.length > 0 && <CCard title="Skills"><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{profile.skills.map(s => <span key={s} style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: 'var(--surface2)', color: 'var(--muted)', border: '1px solid var(--border)' }}>{s}</span>)}</div></CCard>}
      {profile.education.length > 0 && <CCard title="Education">{profile.education.map((e, i) => <div key={i} style={{ paddingBottom: 8, borderBottom: i < profile.education.length - 1 ? '1px solid var(--border)' : 'none', marginBottom: i < profile.education.length - 1 ? 8 : 0 }}><p style={{ margin: 0, fontWeight: 700, fontSize: 13, color: 'var(--text)' }}>{e.degree} in {e.field}</p><p style={{ margin: 0, fontSize: 12, color: 'var(--muted)' }}>{e.institution} · {e.startYear}–{e.endYear}</p></div>)}</CCard>}
      {profile.experience.length > 0 && <CCard title="Experience">{profile.experience.map((e, i) => <div key={i} style={{ paddingBottom: 10, borderBottom: i < profile.experience.length - 1 ? '1px solid var(--border)' : 'none', marginBottom: i < profile.experience.length - 1 ? 10 : 0 }}><p style={{ margin: 0, fontWeight: 700, fontSize: 13, color: 'var(--text)' }}>{e.role} @ {e.company}</p><p style={{ margin: '2px 0', fontSize: 12, color: 'var(--muted)' }}>{e.startYear}–{e.endYear}</p><p style={{ margin: 0, fontSize: 12, color: 'var(--muted)' }}>{e.description}</p></div>)}</CCard>}
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function HR() { return <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '12px 0' }} />; }
function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return <div style={{ marginBottom: 4 }}><p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#888' }}>{title}</p>{children}</div>;
}
function MBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return <div><p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--muted)' }}>{title}</p>{children}</div>;
}
function CCard({ title, children }: { title: string; children: React.ReactNode }) {
  return <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px 20px' }}><p style={{ margin: '0 0 10px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--muted)' }}>{title}</p>{children}</div>;
}

// ── ProfilePreview ────────────────────────────────────────────────────────────
export default function ProfilePreview({ profile }: Props) {
  return (
    <div>
      {profile.template === 'minimal' && <MinimalTemplate profile={profile} />}
      {profile.template === 'modern'  && <ModernTemplate  profile={profile} />}
      {profile.template === 'card'    && <CardTemplate    profile={profile} />}
    </div>
  );
}
