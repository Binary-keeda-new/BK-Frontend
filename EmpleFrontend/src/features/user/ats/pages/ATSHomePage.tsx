'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart3, Sparkles, CheckCircle2, ShieldCheck, FileSearch, Target, Cpu, TrendingUp, Key } from 'lucide-react';
import type { ATSMode } from '../types/ats.types';
import AtsModeSwitcher from '../components/AtsModeSwitcher';
import ResumeUploader from '../components/ResumeUploader';
import JobDescriptionInput from '../components/JobDescriptionInput';
import { useWallet } from "@/providers/WalletProvider";
import '../styles/ats.css';

export default function ATSHomePage() {
  const router = useRouter();
  const [mode, setMode] = useState<ATSMode>('standard');
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [error, setError] = useState('');

  const { config } = useWallet();
  const standardCost = config?.ATS?.STANDARD_COST || 5;
  const aiCost = config?.ATS?.AI_COST || 10;
  const scanCost = mode === 'ai' ? aiCost : standardCost;

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
            : 'Deep AI-powered evaluation with writing quality, semantic matching, and actionable recommendations.'}
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
      <div style={{ maxWidth: 480, margin: '0 auto 80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <button type="button" className="ats-analyze-btn" onClick={handleAnalyze} id="ats-analyze-btn" style={{ padding: '16px 28px', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '18px', fontWeight: 600, opacity: 0.95 }}>
            <span>🪙</span> {scanCost}
          </div>
          <div style={{ width: '1px', height: '22px', background: 'rgba(255, 255, 255, 0.2)' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '20px', fontWeight: 800 }}>
            {mode === 'ai' ? <Sparkles size={22} /> : <BarChart3 size={22} />}
            {mode === 'ai' ? 'Analyze with AI' : 'Scan Resume Now'}
          </div>
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
