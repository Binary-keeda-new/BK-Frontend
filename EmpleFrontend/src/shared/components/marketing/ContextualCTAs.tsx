'use client';

import React from 'react';
import Link from 'next/link';

export default function ContextualCTAs() {
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '40px auto',
      padding: '24px',
      background: 'var(--surface, #13141c)',
      border: '1px solid var(--border, #2a2d3d)',
      borderRadius: '16px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '24px'
    }}>
      <div>
        <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>🚀 Try ATS Scanner</h4>
        <p style={{ fontSize: '13px', color: 'var(--muted2)', marginBottom: '16px' }}>See how your resume performs against industry ATS systems.</p>
        <Link href="/user/ats" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--orange)', textDecoration: 'none' }}>Scan Resume →</Link>
      </div>
      <div>
        <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>🤖 Mock Interview</h4>
        <p style={{ fontSize: '13px', color: 'var(--muted2)', marginBottom: '16px' }}>Practice with our AI interviewer and get instant feedback.</p>
        <Link href="/user/ai-interview" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--orange)', textDecoration: 'none' }}>Start Practice →</Link>
      </div>
      <div>
        <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>⭐ Create Free Account</h4>
        <p style={{ fontSize: '13px', color: 'var(--muted2)', marginBottom: '16px' }}>Save progress, unlock premium roadmaps, and more.</p>
        <Link href="/auth/signup" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--orange)', textDecoration: 'none' }}>Sign Up Now →</Link>
      </div>
    </div>
  );
}
