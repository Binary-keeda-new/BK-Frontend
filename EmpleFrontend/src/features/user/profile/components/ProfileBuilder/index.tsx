'use client';

import React, { useState, useEffect } from 'react';
import { UserProfile, TemplateType } from '../../types';
import { getMyProfile, upsertProfile } from '../../services/profile.service';
import { PersonalInfoForm, AboutForm, SkillsForm, SocialLinksForm } from './SectionForms';
import { EducationForm, ExperienceForm, ProjectsForm, CertificationsForm } from './ArrayForms';
import { ResumeUploadForm } from './ResumeUploadForm';
import { TemplateSelector } from './TemplateSelector';
import { User, FileText, GraduationCap, Briefcase, Code, Award, Share2, Image, LayoutTemplate, CheckCircle } from 'lucide-react';

const TABS = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'about', label: 'About', icon: FileText },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: Code },
  { id: 'skills', label: 'Skills', icon: Award },
  { id: 'certifications', label: 'Certifications', icon: CheckCircle },
  { id: 'social', label: 'Social Links', icon: Share2 },
  { id: 'resume', label: 'Resume & Media', icon: Image },
  { id: 'template', label: 'Template Selection', icon: LayoutTemplate },
];

export default function ProfileBuilder() {
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    template: 'modern-developer',
    personalInfo: {},
    about: {},
    education: [],
    experience: [],
    projects: [],
    skills: { frontend: [], backend: [], ai_ml: [], cloud: [], devops: [], languages: [], tools: [] },
    certifications: [],
    achievements: [],
    socialLinks: {},
  });
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getMyProfile();
      if (res.success && res.data) {
        setProfile((prev) => ({ ...prev, ...res.data }));
      }
    } catch (error: any) {
      // It's normal for the profile to not exist initially (404 Profile not found)
      if (error.message === 'Failed to fetch') {
        setMessage({ text: 'Cannot connect to server. Is the backend running?', type: 'error' });
      } else if (error.message !== 'Profile not found') {
        console.error('Failed to fetch profile', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (publish = false) => {
    setSaving(true);
    setMessage({ text: '', type: '' });
    try {
      const dataToSave = { ...profile, isPublished: publish || profile.isPublished };
      const res = await upsertProfile(dataToSave);
      if (res.success) {
        setProfile(res.data);
        setMessage({ text: publish ? 'Profile published successfully!' : 'Profile saved successfully!', type: 'success' });
      }
    } catch (error: any) {
      setMessage({ text: error.message || 'Failed to save profile', type: 'error' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
  };

  const handleChange = (section: keyof UserProfile, value: any) => {
    setProfile((prev) => ({ ...prev, [section]: value }));
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'personal': return <PersonalInfoForm data={profile.personalInfo || {}} onChange={(v) => handleChange('personalInfo', v)} username={profile.username || ''} onUsernameChange={(v) => handleChange('username', v)} />;
      case 'about': return <AboutForm data={profile.about || {}} onChange={(v) => handleChange('about', v)} />;
      case 'education': return <EducationForm data={profile.education || []} onChange={(v) => handleChange('education', v)} />;
      case 'experience': return <ExperienceForm data={profile.experience || []} onChange={(v) => handleChange('experience', v)} />;
      case 'projects': return <ProjectsForm data={profile.projects || []} onChange={(v) => handleChange('projects', v)} />;
      case 'skills': return <SkillsForm data={profile.skills || {}} onChange={(v) => handleChange('skills', v)} />;
      case 'certifications': return <CertificationsForm data={profile.certifications || []} onChange={(v) => handleChange('certifications', v)} />;
      case 'social': return <SocialLinksForm data={profile.socialLinks || {}} onChange={(v) => handleChange('socialLinks', v)} />;
      case 'resume': return <ResumeUploadForm profile={profile} onChange={(v) => setProfile(prev => ({ ...prev, ...v }))} />;
      case 'template': return <TemplateSelector selected={profile.template || 'modern-developer'} onChange={(v) => handleChange('template', v)} username={profile.username} isPublished={profile.isPublished} />;
      default: return null;
    }
  };

  const calculateCompletion = () => {
    let score = 0;
    if (profile.personalInfo?.fullName) score += 10;
    if (profile.about?.bio) score += 10;
    if (profile.education && profile.education.length > 0) score += 10;
    if (profile.experience && profile.experience.length > 0) score += 10;
    if (profile.projects && profile.projects.length > 0) score += 10;
    if (profile.skills && Object.values(profile.skills).some((arr: any) => arr?.length > 0)) score += 10;
    if (profile.certifications && profile.certifications.length > 0) score += 10;
    if (profile.socialLinks && Object.values(profile.socialLinks).some(link => !!link)) score += 10;
    if (profile.resumeUrl || profile.profilePhoto) score += 10;
    if (profile.template) score += 10;
    return score;
  };

  const completion = calculateCompletion();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 p-6 rounded-2xl shadow-lg" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex-1 mb-4 md:mb-0">
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>Profile Builder</h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>Complete your profile to generate a stunning portfolio.</p>
          
          <div className="mt-4 flex items-center gap-4">
            <div className="w-full max-w-xs bg-gray-800 rounded-full h-2.5 overflow-hidden border border-gray-700">
              <div className="h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${completion}%`, background: 'var(--orange)' }}></div>
            </div>
            <span className="text-xs font-semibold" style={{ color: 'var(--orange)' }}>{completion}% Complete</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 items-center">
          {message.text && (
            <span className={`text-sm font-medium ${message.type === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>
              {message.text}
            </span>
          )}
          
          {profile.isPublished && profile.username && (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border" style={{ background: 'var(--surface2)', borderColor: 'var(--border)' }}>
              <span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>Public URL:</span>
              <a href={`/u/${profile.username}`} target="_blank" rel="noreferrer" className="text-sm font-bold hover:underline transition-all" style={{ color: 'var(--orange)' }}>
                emple.com/u/{profile.username}
              </a>
            </div>
          )}

          <button onClick={() => handleSave(false)} disabled={saving} className="px-6 py-2.5 font-medium rounded-xl transition-all shadow-sm flex items-center gap-2 disabled:opacity-50" style={{ background: 'var(--surface2)', color: 'var(--text)', border: '1px solid var(--border)' }}>
            Save Draft
          </button>
          <button onClick={() => handleSave(true)} disabled={saving} className="px-6 py-2.5 font-semibold rounded-xl transition-all shadow-lg flex items-center gap-2 disabled:opacity-50" style={{ background: 'var(--orange)', color: '#fff', border: 'none' }}>
            Publish Portfolio
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 flex-shrink-0">
          <nav className="space-y-1.5 p-3 rounded-2xl shadow-lg sticky top-8" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium rounded-xl transition-all ${
                    isActive ? 'shadow-sm' : 'hover:bg-opacity-50'
                  }`}
                  style={{
                    background: isActive ? 'var(--orange-dim)' : 'transparent',
                    color: isActive ? 'var(--orange)' : 'var(--muted)',
                    border: isActive ? '1px solid rgba(241,90,34,0.2)' : '1px solid transparent'
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: isActive ? 'var(--orange)' : 'var(--muted2)' }} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 p-8 rounded-2xl shadow-lg min-h-[600px]" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
}
