'use client';

import React, { useState } from 'react';
import { ArrowLeft, Target, Briefcase, PenTool, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import type { AIATSResult } from '../types/ats.types';
import ScoreRing from './ScoreRing';
import ScoreCard from './ScoreCard';
import SkillsAnalysis from './SkillsAnalysis';
import Recommendations from './Recommendations';

interface AIATSResultProps {
  data: AIATSResult;
  onBack: () => void;
}

function FeedbackSection({ title, text, variant, bulletColor }: {
  title: string; text: string; variant: string; bulletColor: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const items = text ? text.split('. ').filter((t) => t.trim() !== '') : [];
  if (items.length === 0) return null;
  const visible = expanded ? items : items.slice(0, 3);
  const hasMore = items.length > 3;

  return (
    <div className={`ats-feedback-card ats-feedback-card--${variant}`} style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: `color-mix(in srgb, ${bulletColor} 15%, transparent)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Sparkles size={16} color={bulletColor} />
        </div>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text)', margin: 0, fontFamily: "'Inter', sans-serif" }}>
          {title}
        </h3>
      </div>
      <div>
        {visible.map((item, idx) => (
          <div key={idx} className="ats-feedback-item" style={{ fontSize: '14px', lineHeight: 1.6, marginBottom: '12px' }}>
            <span className="ats-feedback-item__bullet" style={{ color: bulletColor, marginRight: '10px' }}>→</span>
            <span>{item.trim()}{!item.endsWith('.') ? '.' : ''}</span>
          </div>
        ))}
      </div>
      {hasMore && (
        <button className="ats-view-more" onClick={() => setExpanded(!expanded)} style={{ marginTop: '12px' }}>
          {expanded ? <><ChevronUp size={14} /> View Less</> : <><ChevronDown size={14} /> View More ({items.length - 3} more)</>}
        </button>
      )}
    </div>
  );
}

export default function AIATSResultView({ data, onBack }: AIATSResultProps) {
  const evaluation = data.evaluation ?? ({} as AIATSResult['evaluation']);
  const feedback = evaluation.detailed_feedback ?? {} as AIATSResult['evaluation']['detailed_feedback'];
  const skillAlignment = evaluation.skill_alignment ?? { semantic_score: 0, matched: [], missing_critical: [] };
  const expRelevance = evaluation.experience_relevance ?? { relevance_score: 0, gaps: [] };
  const writingQuality = evaluation.writing_quality ?? { quality_score: 0, issues: [] };
  const overallFit = evaluation.overall_fit ?? { fit_score: 0, indicators: [] };
  const keywordAnalysis = feedback.keyword_analysis ?? { missing_important_keywords: [], keywords_found: [] };
  const skillGap = feedback.skill_gap_analysis ?? { critical_missing_skills: [], recommended_skills_to_add: [], skills_to_emphasize_more: [] };
  const feedbackParagraphs = feedback.feedback_paragraphs ?? { strengths: '', weaknesses: '', overall_assessment: '', improvement_suggestions: '' };
  const actionableRecs = feedback.actionable_recommendations ?? { immediate_changes: [], content_improvements: [], formatting_tips: [] };

  const overallScore = Math.round(data.final_score_percent ?? 0);
  const toPercent = (v: number) => Math.round((v <= 1 ? v * 100 : v));

  return (
    <div className="ats-page">
      <button className="ats-page__back" onClick={onBack}>
        <ArrowLeft size={16} /> Back to Analyzer
      </button>

      <div className="ats-page__header">
        <p className="section-label">AI-Powered</p>
        <h1 className="section-title" style={{ fontSize: 'clamp(24px,3.5vw,40px)' }}>
          AI Analysis Results
        </h1>
      </div>

      <div className="ats-hero-score">
        <div>
          <h2 className="ats-hero-score__label">Overall AI ATS Score</h2>
          <p className="ats-hero-score__sublabel">Comprehensive AI-driven evaluation</p>
        </div>
        <ScoreRing score={overallScore} size={160} strokeWidth={12} />
      </div>

      <div className="ats-grid-4" style={{ marginBottom: '32px' }}>
        <ScoreCard title="Skill Alignment" score={toPercent(skillAlignment.semantic_score)} subtitle="Semantic match" icon={<Target size={18} style={{ color: 'var(--orange)' }} />} ringSize={90} />
        <ScoreCard title="Experience" score={toPercent(expRelevance.relevance_score)} subtitle="Role relevance" icon={<Briefcase size={18} style={{ color: 'var(--orange)' }} />} color="#7c6fcd" ringSize={90} />
        <ScoreCard title="Writing Quality" score={toPercent(writingQuality.quality_score)} subtitle="Content clarity" icon={<PenTool size={18} style={{ color: 'var(--orange)' }} />} color="#f59e0b" ringSize={90} />
        <ScoreCard title="Overall Fit" score={toPercent(overallFit.fit_score)} subtitle="Position match" icon={<Sparkles size={18} style={{ color: 'var(--orange)' }} />} color="#06b6d4" ringSize={90} />
      </div>

      <FeedbackSection title="Overall Assessment" text={feedbackParagraphs.overall_assessment} variant="default" bulletColor="var(--orange)" />
      <FeedbackSection title="Resume Strengths" text={feedbackParagraphs.strengths} variant="success" bulletColor="#4ade80" />
      <FeedbackSection title="Resume Weaknesses" text={feedbackParagraphs.weaknesses} variant="danger" bulletColor="#f87171" />
      <FeedbackSection title="Improvement Suggestions" text={feedbackParagraphs.improvement_suggestions} variant="warning" bulletColor="var(--orange)" />

      <SkillsAnalysis
        matchedSkills={keywordAnalysis.keywords_found}
        missingSkills={keywordAnalysis.missing_important_keywords}
        extraSkills={skillGap.recommended_skills_to_add}
      />

      {skillGap.critical_missing_skills.length > 0 && (
        <div className="ats-feedback-card ats-feedback-card--danger" style={{ marginTop: '32px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(248,113,113,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Target size={16} color="#f87171" />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text)', margin: 0, fontFamily: "'Inter', sans-serif" }}>
              Critical Missing Skills
            </h3>
          </div>
          <div className="ats-chips-container">
            {skillGap.critical_missing_skills.map((skill) => (
              <span key={skill} className="ats-chip ats-chip--missing">{skill}</span>
            ))}
          </div>
        </div>
      )}

      {expRelevance.gaps.length > 0 && (
        <div className="ats-feedback-card ats-feedback-card--default" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(241,90,34,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Briefcase size={16} color="var(--orange)" />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text)', margin: 0, fontFamily: "'Inter', sans-serif" }}>
              Experience Gaps
            </h3>
          </div>
          <div>
            {expRelevance.gaps.map((gap, i) => (
              <div key={i} className="ats-feedback-item" style={{ fontSize: '14px', lineHeight: 1.6, marginBottom: '12px' }}>
                <span className="ats-feedback-item__bullet" style={{ color: 'var(--orange)', marginRight: '10px' }}>→</span>
                <span>{gap}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <Recommendations
          immediateChanges={actionableRecs.immediate_changes}
          contentImprovements={actionableRecs.content_improvements}
          formattingTips={actionableRecs.formatting_tips}
        />
      </div>
    </div>
  );
}
