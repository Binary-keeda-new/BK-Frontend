'use client';

import { useState } from 'react';
import TestList from './TestList';

export default function TestHome() {
  const [isTestFullscreenMode, setIsTestFullscreenMode] = useState(false);

  return (
    <div className={isTestFullscreenMode ? 'fixed inset-0 z-[999] bg-[var(--bg)] overflow-y-auto' : ''}>
      <TestList onFullscreenModeChange={setIsTestFullscreenMode} />
    </div>
  );
}