'use client';

import React from 'react';
import Link from 'next/link';

interface LoginGateProps {
  title?: string;
  message?: string;
}

export default function LoginGate({ 
  title = "Free Account Required", 
  message = "Create a free Emple account to track progress, download files, and access premium resources."
}: LoginGateProps) {
  return (
    <div style={{
      background: 'var(--surface, #13141c)',
      border: '1px solid var(--border, #2a2d3d)',
      borderRadius: '16px',
      padding: '32px',
      textAlign: 'center',
      margin: '24px 0',
      boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
    }}>
      <h3 style={{
        fontSize: '20px',
        fontWeight: 700,
        color: 'var(--text, #fff)',
        marginBottom: '12px'
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: '15px',
        color: 'var(--muted2, #8a8a9a)',
        marginBottom: '24px',
        maxWidth: '400px',
        marginLeft: 'auto',
        marginRight: 'auto',
        lineHeight: 1.5
      }}>
        {message}
      </p>
      <div style={{
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <Link href="/auth/signup" style={{
          padding: '10px 24px',
          background: 'var(--orange, #f15a22)',
          color: '#fff',
          borderRadius: '8px',
          fontWeight: 600,
          textDecoration: 'none',
          transition: 'opacity 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          Create Account
        </Link>
        <Link href="/auth/login" style={{
          padding: '10px 24px',
          background: 'transparent',
          border: '1px solid var(--border, #2a2d3d)',
          color: 'var(--text, #fff)',
          borderRadius: '8px',
          fontWeight: 600,
          textDecoration: 'none',
          transition: 'background 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          Login
        </Link>
      </div>
    </div>
  );
}
