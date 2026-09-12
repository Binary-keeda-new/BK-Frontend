"use client";

import React from "react";
import { ArrowLeft, ClipboardList, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TestHome() {
  const router = useRouter();

  const t: Record<string, string> = {
    border: 'var(--border)',
    surface: 'var(--surface)',
    surface2: 'var(--surface2)',
    text: 'var(--text)',
    muted: 'var(--muted2)',
    brand: '#a855f7',
  };

  return (
    <div className="fade-in flex-1 overflow-y-auto p-4 sm:p-6 md:p-[22px_24px] h-full" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Back Button */}
      <button 
        onClick={() => router.push('/user/practice')}
        style={{
          display: 'flex', alignItems: 'center', gap: 8, background: 'transparent',
          border: 'none', color: t.muted, cursor: 'pointer', fontSize: '14px',
          fontWeight: 600, padding: 0, marginBottom: '32px',
          transition: 'color 0.2s'
        }}
        onMouseEnter={e => (e.currentTarget.style.color = t.text)}
        onMouseLeave={e => (e.currentTarget.style.color = t.muted)}
      >
        <ArrowLeft size={16} /> Return to Practice
      </button>

      {/* Main Content */}
      <div style={{
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: '24px',
        padding: '64px 24px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '500px'
      }}>
        <div style={{
          width: "96px",
          height: "96px",
          borderRadius: "24px",
          background: `${t.brand}15`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: '32px',
          border: `1px solid ${t.brand}30`
        }}>
          <ClipboardList size={48} style={{ color: t.brand }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <h1 style={{ fontFamily: "var(--font-syne, sans-serif)", fontSize: "32px", fontWeight: 800, color: "var(--text)", margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Tests
          </h1>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 700,
            background: `${t.brand}15`,
            color: t.brand,
            border: `1px solid ${t.brand}30`,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            <Clock size={12} /> Coming Soon
          </span>
        </div>

        <p style={{ color: t.muted, fontSize: "16px", maxWidth: "500px", lineHeight: 1.6, marginTop: "8px" }}>
          We're preparing interactive tests and assessments to help you practice, evaluate your skills, and track your progress. Check back soon!
        </p>

        <button 
          onClick={() => router.push('/user/practice')}
          style={{
            marginTop: '32px',
            background: t.brand,
            border: 'none',
            padding: '12px 24px',
            borderRadius: '12px',
            color: 'white',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '15px',
            transition: 'all 0.2s',
            boxShadow: `0 4px 12px ${t.brand}40`
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = `0 6px 16px ${t.brand}60`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 4px 12px ${t.brand}40`;
          }}
        >
          Return to Practice
        </button>
      </div>
    </div>
  );
}