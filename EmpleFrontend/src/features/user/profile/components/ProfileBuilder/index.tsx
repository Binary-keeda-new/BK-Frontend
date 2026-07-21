'use client';

import React, { useState, useEffect } from 'react';
import { UserProfile } from '../../types';
import { getMyProfile, upsertProfile } from '../../services/profile.service';
import { PersonalInfoForm, AboutForm, SkillsForm, SocialLinksForm } from './SectionForms';
import { EducationForm, ExperienceForm, ProjectsForm, CertificationsForm } from './ArrayForms';
import { ResumeUploadForm } from './ResumeUploadForm';
import { TemplateSelector } from './TemplateSelector';
import { validateProfile } from '../../utils/validation';
import { User, FileText, GraduationCap, Briefcase, Code, Award, Share2, Image, LayoutTemplate, CheckCircle } from 'lucide-react';
import { ShareProfileButton } from '../ShareProfileButton';
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
    template: 'editorial-minimalist',
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
  
  // Validation state
  const [hasAttemptedPublish, setHasAttemptedPublish] = useState(false);
  const [autoFocusField, setAutoFocusField] = useState<string | undefined>(undefined);

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
      if (error.message === 'Failed to fetch') {
        setMessage({ text: 'Cannot connect to server. Is the backend running?', type: 'error' });
      } else if (error.message !== 'Profile not found') {
        console.error('Failed to fetch profile', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const validationResult = validateProfile(profile);

  // If user attempted publish and validation fails, auto-scroll/focus the first error
  useEffect(() => {
    if (hasAttemptedPublish && !validationResult.isValid) {
      // Find the first tab that has an error based on TABS order
      for (const tab of TABS) {
        if (validationResult.missingFieldsMap[tab.id]?.length > 0) {
          if (activeTab !== tab.id) {
            setActiveTab(tab.id);
          }
          setAutoFocusField(validationResult.missingFieldsMap[tab.id][0]);
          // Reset autoFocus after a short delay so it doesn't keep stealing focus on re-renders
          setTimeout(() => setAutoFocusField(undefined), 1000);
          break;
        }
      }
      setHasAttemptedPublish(false); // Reset attempt flag
    }
  }, [hasAttemptedPublish, validationResult.isValid, validationResult.missingFieldsMap, activeTab]);

  const handleSave = async (publish = false) => {
    if (publish) {
      if (!validationResult.isValid) {
        setHasAttemptedPublish(true);
        return;
      }
    }

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

  const currentTabErrors = validationResult.missingFieldsMap[activeTab] || [];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'personal': return <PersonalInfoForm data={profile.personalInfo || {}} onChange={(v) => handleChange('personalInfo', v)} username={profile.username || ''} onUsernameChange={(v) => handleChange('username', v)} errors={currentTabErrors} autoFocusField={autoFocusField} />;
      case 'about': return <AboutForm data={profile.about || {}} onChange={(v) => handleChange('about', v)} errors={currentTabErrors} autoFocusField={autoFocusField} />;
      case 'education': return <EducationForm data={profile.education || []} onChange={(v) => handleChange('education', v)} errors={currentTabErrors} autoFocusField={autoFocusField} />;
      case 'experience': return <ExperienceForm data={profile.experience || []} onChange={(v) => handleChange('experience', v)} errors={currentTabErrors} autoFocusField={autoFocusField} />;
      case 'projects': return <ProjectsForm data={profile.projects || []} onChange={(v) => handleChange('projects', v)} errors={currentTabErrors} autoFocusField={autoFocusField} />;
      case 'skills': return <SkillsForm data={profile.skills || {}} onChange={(v) => handleChange('skills', v)} errors={currentTabErrors} autoFocusField={autoFocusField} />;
      case 'certifications': return <CertificationsForm data={profile.certifications || []} onChange={(v) => handleChange('certifications', v)} errors={currentTabErrors} autoFocusField={autoFocusField} />;
      case 'social': return <SocialLinksForm data={profile.socialLinks || {}} onChange={(v) => handleChange('socialLinks', v)} errors={currentTabErrors} autoFocusField={autoFocusField} />;
      case 'resume': return <ResumeUploadForm profile={profile} onChange={(v) => setProfile(prev => ({ ...prev, ...v }))} errors={currentTabErrors} autoFocusField={autoFocusField} />;
      case 'template': return <TemplateSelector selected={profile.template || 'editorial-minimalist'} onChange={(v) => handleChange('template', v)} username={profile.username} isPublished={profile.isPublished} />;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      
      {/* Live Completion Indicator (Sticky) */}
      <div className="sticky top-4 z-[90] mb-8 bg-surface/90 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-lg border border-border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1 w-full">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>Portfolio Builder</h1>
              <span className="text-sm font-bold" style={{ color: validationResult.completionPercentage === 100 ? 'var(--emerald)' : 'var(--orange)' }}>
                {validationResult.completionPercentage}% Complete
              </span>
            </div>
            
            <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden border border-gray-700">
              <div 
                className="h-2.5 rounded-full transition-all duration-500 ease-out" 
                style={{ 
                  width: `${validationResult.completionPercentage}%`, 
                  background: validationResult.completionPercentage === 100 ? '#10b981' : 'var(--orange)' 
                }}
              />
            </div>

            {validationResult.missingSections.length > 0 && (
              <div className="mt-3 text-sm">
                <span className="font-semibold text-red-400 mr-2">Missing:</span>
                <span className="text-gray-400 space-x-2">
                  {validationResult.missingSections.map((sec, i) => {
                    const tabId = Object.keys(validationResult.missingFieldsMap).find(k => validationResult.missingFieldsMap[k]?.length > 0 && k === sec.toLowerCase().split(' ')[0]) || sec.toLowerCase().split(' ')[0];
                    return (
                      <button 
                        key={i} 
                        onClick={() => { setActiveTab(tabId); setAutoFocusField(validationResult.missingFieldsMap[tabId]?.[0]); setTimeout(() => setAutoFocusField(undefined), 1000); }}
                        className="hover:text-red-300 hover:underline transition-all"
                      >
                        • {sec}
                      </button>
                    );
                  })}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-3 items-center w-full md:w-auto mt-4 md:mt-0 justify-end">
            {message.text && (
              <span className={`text-sm font-medium ${message.type === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>
                {message.text}
              </span>
            )}
            
            {profile.isPublished && profile.username && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border" style={{ background: 'var(--surface2)', borderColor: 'var(--border)' }}>
                  <span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>Public URL:</span>
                  <a href={`/u/${profile.username}`} target="_blank" rel="noreferrer" className="text-sm font-bold hover:underline transition-all" style={{ color: 'var(--orange)' }}>
                    emple.com/u/{profile.username}
                  </a>
                </div>
                <ShareProfileButton 
                  url={typeof window !== 'undefined' ? `${window.location.origin}/u/${profile.username}` : `https://emple.com/u/${profile.username}`} 
                  title={`${profile.personalInfo?.fullName || profile.username}'s Portfolio`}
                  variant="outline"
                  className="py-2.5"
                />
              </div>
            )}

            <button onClick={() => handleSave(false)} disabled={saving} className="px-6 py-2.5 font-medium rounded-xl transition-all shadow-sm flex items-center gap-2 disabled:opacity-50" style={{ background: 'var(--surface2)', color: 'var(--text)', border: '1px solid var(--border)' }}>
              Save Draft
            </button>
            <button onClick={() => handleSave(true)} disabled={saving || (!profile.isPublished && !validationResult.isValid)} className="px-6 py-2.5 font-semibold rounded-xl transition-all shadow-lg flex items-center gap-2 disabled:opacity-50" style={{ background: 'var(--orange)', color: '#fff', border: 'none' }}>
              Publish Portfolio
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 flex-shrink-0">
          <nav className="space-y-1.5 p-3 rounded-2xl shadow-lg sticky top-[160px]" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const hasErrors = validationResult.missingFieldsMap[tab.id]?.length > 0;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium rounded-xl transition-all ${
                    isActive ? 'shadow-sm' : 'hover:bg-opacity-50'
                  }`}
                  style={{
                    background: isActive ? 'var(--orange-dim)' : 'transparent',
                    color: isActive ? 'var(--orange)' : 'var(--muted)',
                    border: isActive ? '1px solid rgba(241,90,34,0.2)' : '1px solid transparent'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" style={{ color: isActive ? 'var(--orange)' : 'var(--muted2)' }} />
                    {tab.label}
                  </div>
                  {hasErrors && <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>}
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
