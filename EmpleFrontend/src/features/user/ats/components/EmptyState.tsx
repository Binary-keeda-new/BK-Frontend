'use client';

import React from 'react';
import { FileSearch } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = 'No Analysis Yet',
  description = 'Upload your resume and paste a job description to get started with your ATS analysis.',
}: EmptyStateProps) {
  return (
    <div className="ats-empty-state" id="ats-empty-state">
      <div className="ats-empty-state__icon">
        <FileSearch size={36} style={{ color: 'var(--orange)' }} />
      </div>
      <h3 className="ats-empty-state__title">{title}</h3>
      <p className="ats-empty-state__description">{description}</p>
    </div>
  );
}
