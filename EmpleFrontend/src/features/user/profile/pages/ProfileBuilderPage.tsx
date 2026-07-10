// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import { Profile, DEFAULT_PROFILE, TemplateId } from '../types/profile.types';
import { Education } from '../types/profile.types';
import { Experience } from '../types/profile.types';
import { getMyProfile, upsertProfile } from '../services/profile.service';
import ProfileForm from '../components/ProfileForm';
import EducationForm from '../components/EducationForm';
import ExperienceForm from '../components/ExperienceForm';
import TemplateSelector from '../components/TemplateSelector';
import ProfilePreview from '../components/ProfilePreview';

type Tab = 'build' | 'preview';

export default function ProfileBuilderPage() {
  const [profile, setProfile]   = useState<Profile>({ ...DEFAULT_PROFILE });
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');
  const [tab, setTab]           = useState<Tab>('build');

  useEffect(() => {
    getMyProfile()
      .then(p => { if (p) setProfile(p); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function patch(p: Partial<Profile>) { setProfile(prev => ({ ...prev, ...p })); }

  async function handleSave() {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const saved = await upsertProfile(profile);
      setProfile(saved);
      setSuccess('Profile saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save profile.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <div style={{ textAlign: 'center', color: 'var(--muted)' }}>
        <div style={{ width: 32, height: 32, border: '3px solid var(--border)', borderTopColor: 'var(--orange)', borderRadius: '50%', animation: 'spin 0.7s linear infinite', margin: '0 auto 12px' }} />
        <p style={{ margin: 0, fontSize: 14 }}>Loading profile…</p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '28px 24px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, gap: 16, flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>Profile Builder</h1>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--muted)' }}>Build and customise your public profile</p>
        </div>
        <button onClick={handleSave} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', borderRadius: 10, background: saving ? 'var(--orange-dim)' : 'var(--orange)', border: 'none', color: '#fff', fontSize: 13, fontWeight: 700, cursor: saving ? 'default' : 'pointer', opacity: saving ? 0.7 : 1, transition: 'opacity 0.15s' }}>
          {saving ? 'Saving…' : 'Save Profile'}
        </button>
      </div>

      {error   && <div style={{ padding: '12px 16px', borderRadius: 10, marginBottom: 16, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', fontSize: 13 }}>{error}</div>}
      {success && <div style={{ padding: '12px 16px', borderRadius: 10, marginBottom: 16, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', color: '#22c55e', fontSize: 13 }}>{success}</div>}

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 24, padding: '8px 10px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, width: 'fit-content' }}>
        {(['build', 'preview'] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: '7px 18px', borderRadius: 8, fontSize: 13, fontWeight: tab === t ? 700 : 500, cursor: 'pointer', transition: 'all 0.15s', border: tab === t ? '1.5px solid var(--orange)' : '1px solid transparent', background: tab === t ? 'var(--orange-dim)' : 'transparent', color: tab === t ? 'var(--orange)' : 'var(--muted)', textTransform: 'capitalize' }}>
            {t === 'build' ? '✏️ Build' : '👁 Preview'}
          </button>
        ))}
      </div>

      {tab === 'build' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 780 }}>
          <ProfileForm  profile={profile} onChange={patch} />
          <EducationForm  education={profile.education}   onChange={edu  => patch({ education: edu })} />
          <ExperienceForm experience={profile.experience} onChange={exp  => patch({ experience: exp })} />
          <TemplateSelector selected={profile.template} onSelect={t => patch({ template: t })} />
        </div>
      )}

      {tab === 'preview' && (
        <div style={{ maxWidth: 780 }}>
          <ProfilePreview profile={profile} />
        </div>
      )}
    </div>
  );
}
