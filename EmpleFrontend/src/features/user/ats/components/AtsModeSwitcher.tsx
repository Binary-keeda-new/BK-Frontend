'use client';

import React, { useRef, useEffect, useState } from 'react';
import type { ATSMode } from '../types/ats.types';
import { Zap, Brain } from 'lucide-react';

interface AtsModeSwitcherProps {
  mode: ATSMode;
  onChange: (mode: ATSMode) => void;
}

export default function AtsModeSwitcher({ mode, onChange }: AtsModeSwitcherProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const standardRef = useRef<HTMLButtonElement>(null);
  const aiRef = useRef<HTMLButtonElement>(null);

  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const activeBtn = mode === 'standard' ? standardRef.current : aiRef.current;
    const container = containerRef.current;

    if (activeBtn && container) {
      const containerRect = container.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();

      setIndicatorStyle({
        left: btnRect.left - containerRect.left,
        width: btnRect.width,
      });
    }
  }, [mode]);

  return (
    <div className="ats-mode-switcher" ref={containerRef}>
      <div className="ats-mode-indicator" style={indicatorStyle} />
      <button ref={standardRef} className={`ats-mode-btn ${mode === 'standard' ? 'active' : ''}`} onClick={() => onChange('standard')} type="button" id="ats-mode-standard">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Zap size={16} /> Standard ATS
        </span>
      </button>
      <button ref={aiRef} className={`ats-mode-btn ${mode === 'ai' ? 'active' : ''}`} onClick={() => onChange('ai')} type="button" id="ats-mode-ai">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Brain size={16} /> AI ATS
        </span>
      </button>
    </div>
  );
}
