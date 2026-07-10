'use client';

import React from 'react';
import ScoreRing from './ScoreRing';

interface ScoreCardProps {
  title: string;
  score: number;
  subtitle?: string;
  icon?: React.ReactNode;
  color?: string;
  ringSize?: number;
}

export default function ScoreCard({ title, score, subtitle, icon, color, ringSize = 120 }: ScoreCardProps) {
  return (
    <div className="ats-score-card" id={`ats-score-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      {icon && (
        <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--orange-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {icon}
        </div>
      )}
      <ScoreRing score={score} size={ringSize} color={color} />
      <div>
        <p className="ats-score-card__title">{title}</p>
        {subtitle && <p className="ats-score-card__subtitle">{subtitle}</p>}
      </div>
    </div>
  );
}
