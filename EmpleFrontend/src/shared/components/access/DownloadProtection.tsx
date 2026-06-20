'use client';

import React, { useState } from 'react';
import { useSession } from '@descope/nextjs-sdk/client';
import LoginGate from './LoginGate';

interface DownloadProtectionProps {
  children: React.ReactNode;
  onDownloadAction: () => void;
  gateTitle?: string;
  gateMessage?: string;
}

export default function DownloadProtection({
  children,
  onDownloadAction,
  gateTitle = "Free Account Required to Download",
  gateMessage = "Create a free Emple account to download files and access premium resources."
}: DownloadProtectionProps) {
  const { isAuthenticated } = useSession();
  const [showModal, setShowModal] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAuthenticated) {
      onDownloadAction();
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <div onClick={handleClick} style={{ display: 'inline-block' }}>
        {children}
      </div>

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
            <button 
              onClick={(e) => { e.stopPropagation(); setShowModal(false); }}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'transparent',
                border: 'none',
                color: 'var(--muted2)',
                fontSize: '24px',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              &times;
            </button>
            <LoginGate title={gateTitle} message={gateMessage} />
          </div>
        </div>
      )}
    </>
  );
}
