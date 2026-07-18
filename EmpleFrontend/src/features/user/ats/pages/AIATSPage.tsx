'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, BrainCircuit, Lightbulb, Target } from 'lucide-react';
import { useSession } from '@descope/nextjs-sdk/client';
import type { AIATSResult as AIATSResultType, ATSAnalysisState } from '../types/ats.types';
import { analyzeAI } from '../services/ats.service';
import ResumeUploader from '../components/ResumeUploader';
import JobDescriptionInput from '../components/JobDescriptionInput';
import AIATSResultView from '../components/AIATSResult';
import { useWallet } from "@/providers/WalletProvider";
import InsufficientCoinsDialog from "@/features/wallet/components/InsufficientCoinsDialog";
import { useNotification } from "@/providers/NotificationProvider";
import AnalysisProgressModal from '../components/AnalysisProgressModal';
import '../styles/ats.css';

function dataURLtoFile(dataUrl: string, name: string, type: string): File {
  const arr = dataUrl.split(',');
  const bstr = atob(arr[1]);
  const u8arr = new Uint8Array(bstr.length);
  for (let i = 0; i < bstr.length; i++) u8arr[i] = bstr.charCodeAt(i);
  return new File([u8arr], name, { type });
}

export default function AIATSPage() {
  const router = useRouter();
  const { sessionToken } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [state, setState] = useState<ATSAnalysisState>('idle');
  const [result, setResult] = useState<AIATSResultType | null>(null);
  const [error, setError] = useState('');

  const { balance, config, refreshWallet } = useWallet();
  const { notifyDeduction, notifyRefund } = useNotification();
  const [showInsufficientDialog, setShowInsufficientDialog] = useState(false);
  const cost = config?.ATS?.AI_COST || 10;

  const runAnalysis = useCallback(async (resumeFile: File, jd: string, token?: string, providedKey?: string) => {
    setState('loading');
    setError('');
    setResult(null);

    const idempotencyKey = providedKey || crypto.randomUUID();

    notifyDeduction("AI ATS Scanner", "Analyzing resume...", cost);

    try {
      const data = await analyzeAI(resumeFile, jd, token, idempotencyKey);
      refreshWallet();
      setResult(data);
      setState('success');
    } catch (err) {
      notifyRefund("AI Service Unavailable", "Your coins have been restored.", cost);
      refreshWallet();
      setError(err instanceof Error ? err.message : 'AI analysis failed. Please try again.');
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
    if (state === 'loading') return;
    setError('');
    if (!file) { setError('Please upload your resume.'); return; }
    if (!jobDescription.trim()) { setError('Please paste a job description.'); return; }
    
    if (balance < cost) {
      setShowInsufficientDialog(true);
      return;
    }
    
    runAnalysis(file, jobDescription, sessionToken);
  }

  function handleBack() {
    router.push('/user/ats');
  }

  if (state === 'success' && result) return <AIATSResultView data={result} onBack={handleBack} />;

  return (
    <div className="ats-page relative">
      <AnalysisProgressModal isOpen={state === 'loading'} mode="ai" />
      
      <button className="ats-page__back" onClick={handleBack}>← Back to ATS Home</button>
      
      <div className="ats-page__header">
        <p className="section-label">AI-Powered</p>
        <h1 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>
          Deep Semantic Analysis
        </h1>
      </div>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto 40px' }}>
        <div className="ats-grid-2">
          <JobDescriptionInput value={jobDescription} onChange={setJobDescription} />
          <ResumeUploader file={file} onFileSelect={setFile} />
        </div>
      </div>
      
      <div style={{ maxWidth: 480, margin: '0 auto 80px' }}>
        <button type="button" className="ats-analyze-btn flex items-center justify-center gap-3" onClick={handleAnalyze} id="ats-ai-analyze" style={{ padding: '24px', fontSize: '20px', borderRadius: 16, width: '100%', background: 'linear-gradient(135deg, #f15a22, #6c63ff)' }}>
          <div className="flex items-center gap-1.5 text-sm font-bold bg-white/20 px-3 py-1 rounded-lg mr-2">
            🪙 {cost} Coins
          </div>
          <Sparkles size={24} />
          Analyze with AI
        </button>
        {error && <div className="ats-error-banner" style={{ marginTop: 16 }}>{error}</div>}
      </div>

      <InsufficientCoinsDialog
        isOpen={showInsufficientDialog}
        onClose={() => setShowInsufficientDialog(false)}
        requiredCoins={cost}
        onRetry={handleAnalyze}
      />

      {/* Informational Cards */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '60px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text)', marginBottom: '24px', textAlign: 'center', fontFamily: "'Inter', sans-serif" }}>
          Why Use AI Analysis?
        </h2>
        <div className="ats-grid-3">
          <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(241,90,34,0.1)', color: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <BrainCircuit size={20} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>Semantic Matching</h3>
            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
              AI understands context. It knows that "React.js" and "ReactJS" are the same, and evaluates your actual experience instead of just counting exact words.
            </p>
          </div>
          
          <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(6,182,212,0.1)', color: '#06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Lightbulb size={20} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>Actionable Insights</h3>
            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
              Get detailed feedback on your resume's strengths and weaknesses, along with immediate changes you can make to improve your score.
            </p>
          </div>

          <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(245,158,11,0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Target size={20} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>Writing Quality</h3>
            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
              Our AI evaluates the clarity, impact, and professionalism of your bullet points to ensure they resonate with recruiters.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
