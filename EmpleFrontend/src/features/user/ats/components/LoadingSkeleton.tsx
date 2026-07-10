'use client';

import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '32px' }}>
      <div className="ats-skeleton ats-skeleton--text" style={{ width: '120px', height: '12px', marginBottom: '8px' }} />
      <div className="ats-skeleton ats-skeleton--text" style={{ width: '280px', height: '28px', marginBottom: '32px' }} />
      <div className="ats-skeleton ats-skeleton--card" style={{ height: '180px' }} />
      <div className="ats-grid-3" style={{ marginBottom: '20px' }}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="ats-skeleton ats-skeleton--card" style={{ height: '200px' }} />
        ))}
      </div>
      <div className="ats-grid-2" style={{ marginBottom: '20px' }}>
        <div className="ats-skeleton ats-skeleton--card" style={{ height: '160px' }} />
        <div className="ats-skeleton ats-skeleton--card" style={{ height: '160px' }} />
      </div>
      <div className="ats-skeleton ats-skeleton--card" style={{ height: '140px' }} />
      <div className="ats-skeleton ats-skeleton--card" style={{ height: '140px' }} />
    </div>
  );
}
