'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart3, Search, LayoutTemplate, Calculator } from 'lucide-react';
import { useSession } from '@descope/nextjs-sdk/client';
import type { StandardATSResult as StandardATSResultType, ATSAnalysisState } from '../types/ats.types';
import { analyzeStandard } from '../services/ats.service';
import ResumeUploader from '../components/ResumeUploader';
import JobDescriptionInput from '../components/JobDescriptionInput';
import StandardATSResultView from '../components/StandardATSResult';
import LoadingSkeleton from '../components/LoadingSkeleton';
import '../styles/ats.css';

function dataURLtoFile(dataUrl: string, name: string, type: string): File {
  const arr = dataUrl.split(',');
  const bstr = atob(arr[1]);
  const u8arr = new Uint8Array(bstr.length);
  for (let i = 0; i < bstr.length; i++) u8arr[i] = bstr.charCodeAt(i);
  return new File([u8arr], name, { type });
}

export default function StandardATSPage() {
  const router = useRouter();
  const { sessionToken } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [state, setState] = useState<ATSAnalysisState>('idle');
  const [result, setResult] = useState<StandardATSResultType | null>(null);
  const [error, setError] = useState('');

  const runAnalysis = useCallback(async (resumeFile: File, jd: string, token?: string) => {
    setState('loading');
    setError('');
    setResult(null);

    try {
      const data = await analyzeStandard(resumeFile, jd, token);
      setResult(data);
      setState('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed. Please try again.');
      setState('error');
    }
  }, []);

  useEffect(() => {
    try {
      const storedResume = sessionStorage.getItem('ats_resume_data');
      const storedJD = sessionStorage.getItem('ats_job_description');
      if (storedResume && storedJD) {
        const parsed = JSON.parse(storedResume);
        const restored = dataURLtoFile(parsed.data, parsed.name, parsed.type);
        setFile(restored);
        setJobDescription(storedJD);
        runAnalysis(restored, storedJD, sessionToken);
        sessionStorage.removeItem('ats_resume_data');
        sessionStorage.removeItem('ats_job_description');
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  function handleAnalyze() {
    setError('');
    if (!file) { setError('Please upload your resume.'); return; }
    if (!jobDescription.trim()) { setError('Please paste a job description.'); return; }
    runAnalysis(file, jobDescription, sessionToken);
  }

  function handleBack() {
    router.push('/user/ats');
  }

  if (state === 'loading') return <LoadingSkeleton />;
  if (state === 'success' && result) return <StandardATSResultView data={result} onBack={handleBack} />;

  return (
    <div className="ats-page">
      <button className="ats-page__back" onClick={handleBack}>← Back to ATS Home</button>
      
      <div className="ats-page__header">
        <p className="section-label">Standard ATS</p>
        <h1 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>
          Standard Match Analysis
        </h1>
      </div>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto 40px' }}>
        <div className="ats-grid-2">
          <JobDescriptionInput value={jobDescription} onChange={setJobDescription} />
          <ResumeUploader file={file} onFileSelect={setFile} />
        </div>
      </div>
      
      <div style={{ maxWidth: 480, margin: '0 auto 80px' }}>
        <button className="ats-analyze-btn" onClick={handleAnalyze} id="ats-standard-analyze" style={{ padding: '24px', fontSize: '20px', borderRadius: 16 }}>
          <BarChart3 size={24} />
          Analyze Match Score
        </button>
        {error && <div className="ats-error-banner" style={{ marginTop: 16 }}>{error}</div>}
      </div>

      {/* Informational Cards */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '60px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text)', marginBottom: '24px', textAlign: 'center', fontFamily: "'Inter', sans-serif" }}>
          How Standard ATS Works
        </h2>
        <div className="ats-grid-3">
          <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(241,90,34,0.1)', color: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Search size={20} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>What We Check</h3>
            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
              Our engine scans for exact keyword matches, hard skills, tools, and experience markers required by the job description.
            </p>
          </div>
          
          <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(74,222,128,0.1)', color: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <LayoutTemplate size={20} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>Formatting Tips</h3>
            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
              Avoid complex tables, columns, or graphics. Standard ATS systems prefer simple, single-column text layouts for accurate parsing.
            </p>
          </div>

          <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(124,111,205,0.1)', color: '#7c6fcd', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Calculator size={20} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>Score Calculation</h3>
            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
              Scores are weighted based on keyword coverage (70%) and required years of experience alignment (30%).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
