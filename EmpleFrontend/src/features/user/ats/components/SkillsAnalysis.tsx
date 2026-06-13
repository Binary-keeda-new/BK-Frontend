'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, XCircle, Sparkles } from 'lucide-react';

interface SkillsAnalysisProps {
  matchedSkills: string[];
  missingSkills: string[];
  extraSkills: string[];
}

type SkillVariant = 'matched' | 'missing' | 'extra';

function SkillSection({ title, skills, variant, icon }: { title: string; skills: string[]; variant: SkillVariant; icon: React.ReactNode; }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? skills : skills.slice(0, 10);
  const hasMore = skills.length > 10;

  const borderColor = variant === 'matched' ? 'rgba(34, 197, 94, 0.2)' : variant === 'missing' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(241, 90, 34, 0.2)';

  if (skills.length === 0) {
    return (
      <div className="ats-result-section" style={{ borderColor }}>
        <div className="ats-result-section__title">{icon}{title} (0)</div>
        <p style={{ fontSize: '13px', color: 'var(--muted)', fontStyle: 'italic' }}>None found</p>
      </div>
    );
  }

  return (
    <div className="ats-result-section" style={{ borderColor }}>
      <div className="ats-result-section__title">{icon}{title} ({skills.length})</div>
      <div className="ats-chips-container">
        {visible.map((skill) => (
          <span key={skill} className={`ats-chip ats-chip--${variant}`}>{skill}</span>
        ))}
      </div>
      {hasMore && (
        <button className="ats-view-more" onClick={() => setExpanded(!expanded)}>
          {expanded ? <><ChevronUp size={14} /> View Less</> : <><ChevronDown size={14} /> View More ({skills.length - 10} more)</>}
        </button>
      )}
    </div>
  );
}

export default function SkillsAnalysis({ matchedSkills, missingSkills, extraSkills }: SkillsAnalysisProps) {
  return (
    <div>
      <div className="ats-grid-2" style={{ marginBottom: '20px' }}>
        <SkillSection title="Matched Skills" skills={matchedSkills} variant="matched" icon={<CheckCircle size={18} style={{ color: '#4ade80' }} />} />
        <SkillSection title="Missing Skills" skills={missingSkills} variant="missing" icon={<XCircle size={18} style={{ color: '#f87171' }} />} />
      </div>
      <SkillSection title="Extra Skills Found" skills={extraSkills} variant="extra" icon={<Sparkles size={18} style={{ color: 'var(--orange)' }} />} />
    </div>
  );
}
