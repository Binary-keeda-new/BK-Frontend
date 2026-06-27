'use client';

import React from 'react';
import { PersonalInfo, About, Skills, SocialLinks } from '../../types';

export function PersonalInfoForm({ data, onChange, username, onUsernameChange }: { data: PersonalInfo, onChange: (d: PersonalInfo) => void, username: string, onUsernameChange: (v: string) => void }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...data, [e.target.name]: e.target.value });

  const inputClass = "w-full p-3 border rounded-xl focus:ring-1 focus:ring-[var(--orange)] focus:border-[var(--orange)] outline-none transition-all placeholder:text-gray-500";
  const inputStyle = { background: 'var(--surface2)', borderColor: 'var(--border)', color: 'var(--text)' };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h2 className="text-2xl font-bold pb-4 border-b" style={{ color: 'var(--text)', borderColor: 'var(--border)' }}>Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>Full Name</label>
          <input type="text" name="fullName" value={data.fullName || ''} onChange={handleChange} className={inputClass} style={inputStyle} placeholder="John Doe" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>Username (Unique URL)</label>
          <input type="text" value={username} onChange={(e) => onUsernameChange(e.target.value)} className={inputClass} style={inputStyle} placeholder="johndoe" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>Headline</label>
          <input type="text" name="headline" value={data.headline || ''} onChange={handleChange} className={inputClass} style={inputStyle} placeholder="Full Stack Developer" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>Email</label>
          <input type="email" name="email" value={data.email || ''} onChange={handleChange} className={inputClass} style={inputStyle} placeholder="john@example.com" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>Phone</label>
          <input type="text" name="phone" value={data.phone || ''} onChange={handleChange} className={inputClass} style={inputStyle} placeholder="+1 234 567 890" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>Location</label>
          <input type="text" name="location" value={data.location || ''} onChange={handleChange} className={inputClass} style={inputStyle} placeholder="San Francisco, CA" />
        </div>
      </div>
    </div>
  );
}

export function AboutForm({ data, onChange }: { data: About, onChange: (d: About) => void }) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange({ ...data, [e.target.name]: e.target.value });
  
  const inputClass = "w-full p-3 border rounded-xl focus:ring-1 focus:ring-[var(--orange)] focus:border-[var(--orange)] outline-none transition-all placeholder:text-gray-500";
  const inputStyle = { background: 'var(--surface2)', borderColor: 'var(--border)', color: 'var(--text)' };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h2 className="text-2xl font-bold pb-4 border-b" style={{ color: 'var(--text)', borderColor: 'var(--border)' }}>About You</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>Bio</label>
          <textarea name="bio" value={data.bio || ''} onChange={handleChange} rows={3} className={inputClass} style={inputStyle} placeholder="Short introduction..." />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>Professional Summary</label>
          <textarea name="professionalSummary" value={data.professionalSummary || ''} onChange={handleChange} rows={5} className={inputClass} style={inputStyle} placeholder="Detailed professional experience summary..." />
        </div>
      </div>
    </div>
  );
}

export function SkillsForm({ data, onChange }: { data: Skills, onChange: (d: Skills) => void }) {
  const categories: (keyof Skills)[] = ['frontend', 'backend', 'ai_ml', 'cloud', 'devops', 'languages', 'tools'];
  
  const handleUpdate = (cat: keyof Skills, val: string) => {
    const arr = val.split(',').map(s => s.trim()).filter(s => s);
    onChange({ ...data, [cat]: arr });
  };

  const inputClass = "w-full p-3 border rounded-xl focus:ring-1 focus:ring-[var(--orange)] focus:border-[var(--orange)] outline-none transition-all placeholder:text-gray-500";
  const inputStyle = { background: 'var(--surface2)', borderColor: 'var(--border)', color: 'var(--text)' };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h2 className="text-2xl font-bold pb-4 border-b" style={{ color: 'var(--text)', borderColor: 'var(--border)' }}>Skills</h2>
      <p className="text-sm" style={{ color: 'var(--muted2)' }}>Enter skills separated by commas (e.g., React, Next.js, Tailwind)</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <div key={cat} className="space-y-2">
            <label className="text-sm font-semibold capitalize" style={{ color: 'var(--muted)' }}>{cat.replace('_', ' ')}</label>
            <input type="text" value={(data[cat] || []).join(', ')} onChange={(e) => handleUpdate(cat, e.target.value)} className={inputClass} style={inputStyle} placeholder={`Add ${cat} skills...`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SocialLinksForm({ data, onChange }: { data: SocialLinks, onChange: (d: SocialLinks) => void }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...data, [e.target.name]: e.target.value });
  const platforms = ['github', 'linkedin', 'twitter', 'youtube', 'leetcode', 'hackerrank', 'codeforces', 'kaggle'];
  
  const inputClass = "w-full p-3 border rounded-xl focus:ring-1 focus:ring-[var(--orange)] focus:border-[var(--orange)] outline-none transition-all placeholder:text-gray-500";
  const inputStyle = { background: 'var(--surface2)', borderColor: 'var(--border)', color: 'var(--text)' };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h2 className="text-2xl font-bold pb-4 border-b" style={{ color: 'var(--text)', borderColor: 'var(--border)' }}>Social Links</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {platforms.map(platform => (
          <div key={platform} className="space-y-2">
            <label className="text-sm font-semibold capitalize" style={{ color: 'var(--muted)' }}>{platform}</label>
            <input type="url" name={platform} value={(data as any)[platform] || ''} onChange={handleChange} className={inputClass} style={inputStyle} placeholder={`https://${platform}.com/...`} />
          </div>
        ))}
      </div>
    </div>
  );
}
