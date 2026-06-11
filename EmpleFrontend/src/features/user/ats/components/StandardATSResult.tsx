'use client';

import React from 'react';
import { ArrowLeft, Target, BarChart3, TrendingUp } from 'lucide-react';
import type { StandardATSResult } from '../types/ats.types';
import ScoreRing from './ScoreRing';
import ScoreCard from './ScoreCard';
import SkillsAnalysis from './SkillsAnalysis';

interface StandardATSResultProps {
  data: StandardATSResult;
  onBack: () => void;
}

export default function StandardATSResultView({ data, onBack }: StandardATSResultProps) {
  const score = Math.round(data.score ?? 0);
  const skillScore = Math.round(data.skill_match_score ?? 0);
  const expScore = Math.round(data.experience_match_score ?? 0);

  return (
    <div className="ats-page">
      <button className="ats-page__back" onClick={onBack}>
        <ArrowLeft size={16} /> Back to Analyzer
      </button>
      <div className="ats-page__header">
        <p className="section-label">Standard ATS</p>
        <h1 className="section-title" style={{ fontSize: 'clamp(24px,3.5vw,40px)' }}>Skill Analysis Results</h1>
      </div>

      <div className="ats-hero-score">
        <div>
          <h2 className="ats-hero-score__label">Overall Match Score</h2>
          <p className="ats-hero-score__sublabel">Based on direct keyword and experience matching</p>
        </div>
        <ScoreRing score={score} size={160} strokeWidth={12} />
      </div>

      <div className="ats-grid-3" style={{ marginBottom: '32px' }}>
        <ScoreCard title="ATS Score" score={score} subtitle="Weighted overall" icon={<Target size={18} style={{ color: 'var(--orange)' }} />} ringSize={100} />
        <ScoreCard title="Skill Match" score={skillScore} subtitle="Keyword coverage" icon={<BarChart3 size={18} style={{ color: 'var(--orange)' }} />} color="#7c6fcd" ringSize={100} />
        <ScoreCard title="Experience Match" score={expScore} subtitle="Years alignment" icon={<TrendingUp size={18} style={{ color: 'var(--orange)' }} />} color="#f59e0b" ringSize={100} />
      </div>

      <div className="ats-result-section" style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(241,90,34,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BarChart3 size={20} color="var(--orange)" />
          </div>
          <h3 style={{ fontSize: '22px', fontWeight: 900, color: 'var(--text)', margin: 0, fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}>
            Detailed Score Breakdown
          </h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            { label: 'Skill Match', value: skillScore, variant: '' },
            { label: 'Experience Match', value: expScore, variant: '--green' },
            { label: 'Overall Score', value: score, variant: '--purple' },
          ].map(({ label, value, variant }) => (
            <div key={label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', color: 'var(--muted2)', fontWeight: 600 }}>{label}</span>
                <span style={{ fontSize: '13px', fontFamily: "'Inter', sans-serif", fontWeight: 900, color: 'var(--orange)' }}>{value}%</span>
              </div>
              <div className="ats-progress-bar">
                <div className={`ats-progress-bar__fill${variant ? ` ats-progress-bar__fill${variant}` : ''}`} style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <SkillsAnalysis matchedSkills={data.matched_skills} missingSkills={data.missing_skills} extraSkills={data.extra_skills} />
    </div>
  );
}
