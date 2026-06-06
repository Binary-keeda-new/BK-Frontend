'use client';

import React, { useEffect, useState } from 'react';
import type { ScoreRingProps } from '../types/ats.types';

export default function ScoreRing({ score, size = 140, strokeWidth = 10, label, sublabel, color }: ScoreRingProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedScore = Math.min(100, Math.max(0, score));
  const offset = circumference - (clampedScore / 100) * circumference;

  const resolvedColor = color || (clampedScore >= 70 ? '#4ade80' : clampedScore >= 40 ? '#f59e0b' : '#f87171');

  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const duration = 1200;

    function animate(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * clampedScore));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [clampedScore]);

  return (
    <div className="ats-score-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle className="ats-score-ring__track" cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} />
        <circle className="ats-score-ring__fill" cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} stroke={resolvedColor} strokeDasharray={circumference} strokeDashoffset={offset} style={{ filter: `drop-shadow(0 0 8px ${resolvedColor}40)` }} />
      </svg>
      <div className="ats-score-ring__value">
        <span className="ats-score-ring__number" style={{ fontSize: size * 0.28, color: resolvedColor }}>
          {animatedScore}<span style={{ fontSize: '0.45em', opacity: 0.7 }}>%</span>
        </span>
        {label && <span className="ats-score-ring__label">{label}</span>}
        {sublabel && <span className="ats-score-ring__label" style={{ fontSize: '10px', marginTop: 0 }}>{sublabel}</span>}
      </div>
    </div>
  );
}
