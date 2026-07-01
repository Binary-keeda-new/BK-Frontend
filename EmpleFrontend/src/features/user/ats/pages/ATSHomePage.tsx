'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart3, Sparkles, CheckCircle2, ShieldCheck, FileSearch, Target, Cpu, TrendingUp, Key } from 'lucide-react';
import type { ATSMode } from '../types/ats.types';
import AtsModeSwitcher from '../components/AtsModeSwitcher';
import ResumeUploader from '../components/ResumeUploader';
import JobDescriptionInput from '../components/JobDescriptionInput';
import '../styles/ats.css';

export default function ATSHomePage() {
  const router = useRouter();
  const [mode, setMode] = useState<ATSMode>('standard');
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [error, setError] = useState('');

  function handleAnalyze() {
    setError('');

    if (!file) {
      setError('Please upload your resume first.');
      return;
    }
    if (!jobDescription.trim()) {
      setError('Please paste a job description.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      sessionStorage.setItem('ats_resume_data', JSON.stringify({
        name: file.name,
        type: file.type,
        size: file.size,
        data: reader.result,
      }));
      sessionStorage.setItem('ats_job_description', jobDescription);
      router.push(`/user/ats/${mode}`);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="ats-page" style={{ paddingBottom: '100px' }}>
      
      {/* Premium Hero Section */}
      <div style={{ textAlign: 'center', margin: '20px 0 50px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 50, background: 'var(--orange-dim)', color: 'var(--orange)', fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20, border: '1px solid rgba(241,90,34,0.2)' }}>
          <Sparkles size={14} /> Resume Intelligence
        </div>
        <h1 style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 900, color: 'var(--text)', lineHeight: 1.05, letterSpacing: '-0.04em', fontFamily: "'Inter', sans-serif", marginBottom: 20 }}>
          Optimize Your Resume <br />
          <span style={{ color: 'var(--orange)' }}>for Every Job</span>
        </h1>
        <p style={{ fontSize: '18px', color: 'var(--muted)', maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>
          Compare your resume against the exact job requirements. Identify missing keywords, bridge experience gaps, and submit your application with absolute confidence.
        </p>

        {/* Statistics Cards */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24, marginTop: 40 }}>
          {[
            { label: 'Engine Accuracy', value: '98%', icon: <CheckCircle2 size={18} color="#4ade80" /> },
            { label: 'Data Privacy', value: '100%', icon: <ShieldCheck size={18} color="#7c6fcd" /> }
          ].map((stat, i) => (
            <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', minWidth: '220px' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--surface2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {stat.icon}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: 'var(--text)', fontFamily: "'Inter', sans-serif", lineHeight: 1.2 }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mode Switcher */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
        <AtsModeSwitcher mode={mode} onChange={setMode} />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
        <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: '20px', color: 'var(--text)', marginBottom: '8px' }}>
          {mode === 'standard' ? 'Standard ATS Analysis' : 'AI-Powered Analysis'}
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6 }}>
          {mode === 'standard' 
            ? 'Fast keyword matching with skill scores, experience alignment, and detailed skill breakdown.' 
            : 'Deep Gemini-powered evaluation with writing quality, semantic matching, and actionable recommendations.'}
        </p>
      </div>

      {/* Input Section - Wider Layout */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 32px' }}>
        <div className="ats-grid-2">
          <JobDescriptionInput value={jobDescription} onChange={setJobDescription} />
          <ResumeUploader file={file} onFileSelect={setFile} />
        </div>
      </div>

      {/* Analyze Button */}
      <div style={{ maxWidth: 480, margin: '0 auto 80px' }}>
        <button className="ats-analyze-btn" onClick={handleAnalyze} id="ats-analyze-btn" style={{ padding: '24px', fontSize: '20px', borderRadius: 16 }}>
          {mode === 'ai' ? <Sparkles size={24} /> : <BarChart3 size={24} />}
          {mode === 'ai' ? 'Analyze with AI' : 'Scan Resume Now'}
        </button>
        {error && <div className="ats-error-banner" style={{ marginTop: 16 }}>{error}</div>}
      </div>

      {/* Feature Highlights Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid var(--border)', paddingTop: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text)', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Enterprise-Grade Analysis Engine
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '600px', margin: '0 auto' }}>
            Our platform evaluates your resume using the same parsing logic and algorithms utilized by Fortune 500 recruiting systems.
          </p>
        </div>

        <div className="ats-features-grid">
          {[
            { title: 'Keyword Matching', desc: 'Precise extraction and comparison against job requirements.' },
            { title: 'Resume Parsing', desc: 'Flawless extraction from PDF, handling complex formatting.' },
            { title: 'Experience Analysis', desc: 'Evaluates required years vs your actual timeline.' },
            { title: 'Skill Gap Detection', desc: 'Instantly identifies missing critical technologies.' },
            { title: 'AI Recommendations', desc: 'Actionable feedback to improve phrasing and impact.' },
          ].map((feat, i) => (
            <div key={i} className="ats-feature-card">
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text)', margin: 0, fontFamily: "'Inter', sans-serif" }}>{feat.title}</h3>
              <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
