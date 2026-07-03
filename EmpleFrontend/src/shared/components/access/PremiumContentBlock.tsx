'use client';

import React from 'react';
import { useSession } from '@descope/nextjs-sdk/client';
import LoginGate from './LoginGate';

interface PremiumContentBlockProps {
  children: React.ReactNode;
  gateTitle?: string;
  gateMessage?: string;
}

export default function PremiumContentBlock({ 
  children, 
  gateTitle, 
  gateMessage 
}: PremiumContentBlockProps) {
  const { isAuthenticated, isSessionLoading } = useSession();

  if (isSessionLoading) {
    return <div style={{ padding: '20px', textAlign: 'center', color: 'var(--muted2)' }}>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div style={{ position: 'relative' }}>
        <div style={{ 
          filter: 'blur(8px)', 
          opacity: 0.4, 
          pointerEvents: 'none', 
          userSelect: 'none' 
        }}>
          {children}
        </div>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '500px',
          padding: '0 20px'
        }}>
          <LoginGate title={gateTitle} message={gateMessage} />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
