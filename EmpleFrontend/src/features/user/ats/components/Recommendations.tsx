'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react';

interface RecommendationsProps {
  immediateChanges: string[];
  contentImprovements: string[];
  formattingTips: string[];
}

interface RecSectionProps {
  title: string;
  items: string[];
  icon: React.ReactNode;
  variant: 'warning' | 'success' | 'default';
  bulletColor: string;
}

function RecSection({ title, items, icon, variant, bulletColor }: RecSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, 4);
  const hasMore = items.length > 4;
  if (items.length === 0) return null;

  return (
    <div className={`ats-feedback-card ats-feedback-card--${variant}`}>
      <div className="ats-feedback-card__title">{icon}{title}</div>
      <div>
        {visible.map((item, idx) => (
          <div key={idx} className="ats-feedback-item">
            <span className="ats-feedback-item__bullet" style={{ color: bulletColor }}>→</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
      {hasMore && (
        <button className="ats-view-more" onClick={() => setExpanded(!expanded)}>
          {expanded ? <><ChevronUp size={14} /> View Less</> : <><ChevronDown size={14} /> View More ({items.length - 4} more)</>}
        </button>
      )}
    </div>
  );
}

export default function Recommendations({ immediateChanges, contentImprovements, formattingTips }: RecommendationsProps) {
  return (
    <div>
      <RecSection title="Immediate Changes" items={immediateChanges} icon={<AlertTriangle size={18} style={{ color: 'var(--orange)' }} />} variant="warning" bulletColor="var(--orange)" />
      <RecSection title="Content Improvements" items={contentImprovements} icon={<Lightbulb size={18} style={{ color: '#4ade80' }} />} variant="success" bulletColor="#4ade80" />
      <RecSection title="Formatting Tips" items={formattingTips} icon={<CheckCircle size={18} style={{ color: 'var(--muted2)' }} />} variant="default" bulletColor="var(--orange)" />
    </div>
  );
}
