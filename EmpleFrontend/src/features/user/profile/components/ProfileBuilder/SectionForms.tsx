'use client';

import React, { useEffect, useRef } from 'react';
import { PersonalInfo, About, Skills, SocialLinks } from '../../types';
import { AlertCircle } from 'lucide-react';

interface FormProps<T> {
  data: T;
  onChange: (d: T) => void;
  errors?: string[];
  autoFocusField?: string;
}

const inputClass = "w-full p-3 border rounded-xl focus:ring-1 focus:ring-[var(--orange)] outline-none transition-all placeholder:text-gray-500";
const inputStyle = { background: 'var(--surface2)', color: 'var(--text)' };

const getBorderColor = (hasError: boolean) => hasError ? 'red' : 'var(--border)';

function ErrorMsg({ show, text = "This field is required for publishing." }: { show: boolean, text?: string }) {
  if (!show) return null;
  return (
    <div className="flex items-center gap-1 mt-1 text-red-500 text-xs font-medium animate-in fade-in slide-in-from-top-1">
      <AlertCircle className="w-3 h-3" />
      <span>{text}</span>
    </div>
  );
}

export function PersonalInfoForm({ data, onChange, username, onUsernameChange, errors = [], autoFocusField }: FormProps<PersonalInfo> & { username: string, onUsernameChange: (v: string) => void }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...data, [e.target.name]: e.target.value });
  
  const refs: Record<string, any> = {
    fullName: useRef<HTMLInputElement>(null),
    username: useRef<HTMLInputElement>(null),
    headline: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    location: useRef<HTMLInputElement>(null),
  };

  useEffect(() => {
    if (autoFocusField && refs[autoFocusField]?.current) {
      refs[autoFocusField].current.focus();
      refs[autoFocusField].current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [autoFocusField]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h2 className="text-2xl font-bold pb-4 border-b" style={{ color: 'var(--text)', borderColor: 'var(--border)' }}>Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>Full Name <span style={{ color: 'var(--orange)' }}>*</span></label>
          <input ref={refs.fullName} type="text" name="fullName" value={data.fullName || ''} onChange={handleChange} className={inputClass} style={{ ...inputStyle, borderColor: getBorderColor(errors.includes('fullName')) }} placeholder="John Doe" />
          <ErrorMsg show={errors.includes('fullName')} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>Username (Unique URL) <span style={{ color: 'var(--orange)' }}>*</span></label>
          <input ref={refs.username} type="text" value={username} onChange={(e) => onUsernameChange(e.target.value)} className={inputClass} style={{ ...inputStyle, borderColor: getBorderColor(errors.includes('username')) }} placeholder="johndoe" />
          <ErrorMsg show={errors.includes('username')} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>Headline <span style={{ color: 'var(--orange)' }}>*</span></label>
          <input ref={refs.headline} type="text" name="headline" value={data.headline || ''} onChange={handleChange} className={inputClass} style={{ ...inputStyle, borderColor: getBorderColor(errors.includes('headline')) }} placeholder="Full Stack Developer" />
          <ErrorMsg show={errors.includes('headline')} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>Email <span style={{ color: 'var(--orange)' }}>*</span></label>
          <input ref={refs.email} type="email" name="email" value={data.email || ''} onChange={handleChange} className={inputClass} style={{ ...inputStyle, borderColor: getBorderColor(errors.includes('email')) }} placeholder="john@example.com" />
          <ErrorMsg show={errors.includes('email')} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>Phone <span style={{ color: 'var(--orange)' }}>*</span></label>
          <input ref={refs.phone} type="text" name="phone" value={data.phone || ''} onChange={handleChange} className={inputClass} style={{ ...inputStyle, borderColor: getBorderColor(errors.includes('phone')) }} placeholder="+1 234 567 890" />
          <ErrorMsg show={errors.includes('phone')} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>Location <span style={{ color: 'var(--orange)' }}>*</span></label>
          <input ref={refs.location} type="text" name="location" value={data.location || ''} onChange={handleChange} className={inputClass} style={{ ...inputStyle, borderColor: getBorderColor(errors.includes('location')) }} placeholder="San Francisco, CA" />
          <ErrorMsg show={errors.includes('location')} />
        </div>
      </div>
    </div>
  );
}

export function AboutForm({ data, onChange, errors = [], autoFocusField }: FormProps<About>) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange({ ...data, [e.target.name]: e.target.value });
  
  const bioRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocusField === 'bio' && bioRef.current) {
      bioRef.current.focus();
      bioRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [autoFocusField]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h2 className="text-2xl font-bold pb-4 border-b" style={{ color: 'var(--text)', borderColor: 'var(--border)' }}>About You</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>Bio <span style={{ color: 'var(--orange)' }}>*</span> <span style={{ color: 'var(--muted2)', fontWeight: 400 }}>(min 50 characters)</span></label>
          <textarea ref={bioRef} name="bio" value={data.bio || ''} onChange={handleChange} rows={3} className={inputClass} style={{ ...inputStyle, borderColor: getBorderColor(errors.includes('bio')) }} placeholder="Short introduction..." />
          <ErrorMsg show={errors.includes('bio')} text="Bio must be at least 50 characters." />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>Professional Summary</label>
          <textarea name="professionalSummary" value={data.professionalSummary || ''} onChange={handleChange} rows={5} className={inputClass} style={{ ...inputStyle, borderColor: 'var(--border)' }} placeholder="Detailed professional experience summary..." />
        </div>
      </div>
    </div>
  );
}

export function SkillsForm({ data, onChange, errors = [], autoFocusField }: FormProps<Skills>) {
  const categories: (keyof Skills)[] = ['frontend', 'backend', 'ai_ml', 'cloud', 'devops', 'languages', 'tools'];
  
  const handleUpdate = (cat: keyof Skills, val: string) => {
    const arr = val.split(',').map(s => s.trim()).filter(s => s);
    onChange({ ...data, [cat]: arr });
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoFocusField === 'skills_list' && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // focus first input
      const firstInput = containerRef.current.querySelector('input');
      if (firstInput) firstInput.focus();
    }
  }, [autoFocusField]);

  const hasError = errors.includes('skills_list');

  return (
    <div ref={containerRef} className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h2 className="text-2xl font-bold pb-4 border-b" style={{ color: 'var(--text)', borderColor: 'var(--border)' }}>Skills <span style={{ color: 'var(--orange)' }}>*</span></h2>
      <p className="text-sm" style={{ color: 'var(--muted2)' }}>Enter skills separated by commas (e.g., React, Next.js, Tailwind). At least one category is required.</p>
      
      <ErrorMsg show={hasError} text="Please add at least one skill to any category." />

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl ${hasError ? 'border-2 border-red-500 bg-red-500/5' : ''}`}>
        {categories.map((cat) => (
          <div key={cat} className="space-y-2">
            <label className="text-sm font-semibold capitalize" style={{ color: 'var(--muted)' }}>{cat.replace('_', ' ')}</label>
            <input type="text" value={(data[cat] || []).join(', ')} onChange={(e) => handleUpdate(cat, e.target.value)} className={inputClass} style={{ ...inputStyle, borderColor: 'var(--border)' }} placeholder={`Add ${cat} skills...`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SocialLinksForm({ data, onChange, errors = [], autoFocusField }: FormProps<SocialLinks>) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...data, [e.target.name]: e.target.value });
  const platforms = ['github', 'linkedin', 'twitter', 'youtube', 'leetcode', 'hackerrank', 'codeforces', 'kaggle'];
  const mandatoryPlatforms = ['github', 'linkedin'];
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoFocusField === 'github_or_linkedin' && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const firstInput = containerRef.current.querySelector('input');
      if (firstInput) firstInput.focus();
    }
  }, [autoFocusField]);

  const hasError = errors.includes('github_or_linkedin');

  return (
    <div ref={containerRef} className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h2 className="text-2xl font-bold pb-4 border-b" style={{ color: 'var(--text)', borderColor: 'var(--border)' }}>Social Links <span style={{ color: 'var(--orange)' }}>*</span></h2>
      <p className="text-sm" style={{ color: 'var(--muted2)' }}>GitHub or LinkedIn is required.</p>
      
      <ErrorMsg show={hasError} text="Either GitHub or LinkedIn URL is required." />

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl ${hasError ? 'border-2 border-red-500 bg-red-500/5' : ''}`}>
        {platforms.map(platform => (
          <div key={platform} className="space-y-2">
            <label className="text-sm font-semibold capitalize" style={{ color: 'var(--muted)' }}>
              {platform}
              {mandatoryPlatforms.includes(platform) && <span style={{ color: 'var(--orange)' }}> *</span>}
            </label>
            <input type="url" name={platform} value={(data as any)[platform] || ''} onChange={handleChange} className={inputClass} style={{ ...inputStyle, borderColor: (hasError && mandatoryPlatforms.includes(platform)) ? 'red' : 'var(--border)' }} placeholder={`https://${platform}.com/...`} />
          </div>
        ))}
      </div>
    </div>
  );
}
