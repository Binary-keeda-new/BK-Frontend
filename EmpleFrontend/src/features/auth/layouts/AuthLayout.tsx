
'use client'

import Link from 'next/link'
import { ReactNode, useEffect, useState } from 'react'
import '@/features/auth/auth.css'

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light') {
      setDark(false)
      document.documentElement.classList.add('light')
    } else {
      setDark(true)
      document.documentElement.classList.remove('light')
    }
  }, [])

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    if (next) {
      document.documentElement.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.add('light')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <div className="auth-root">
      {/* Animated background grid */}
      <div className="auth-grid" />

      {/* Ambient glows */}
      <div className="auth-glow-a" />
      <div className="auth-glow-b" />

      {/* Floating decorative orbs */}
      <div className="auth-orb auth-orb-1" />
      <div className="auth-orb auth-orb-2" />
      <div className="auth-orb auth-orb-3" />

      {/* Navbar */}
      <nav className="auth-nav" style={{ justifyContent: 'space-between' }}>
        <Link href="/" className="nav-brand">
          <div className="nav-logo-box"><span>e</span></div>
          <span className="nav-wordmark"><em>e</em>mple</span>
        </Link>

        {/* Dark/Light Toggle Button */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          style={{
            background: 'var(--clr-surface2)',
            border: '1.5px solid var(--clr-border2)',
            borderRadius: '50px',
            padding: '6px 14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--clr-text2)',
            transition: 'all 0.2s',
            fontFamily: 'inherit',
          }}
        >
          <span style={{ fontSize: '16px' }}>{dark ? '☀️' : '🌙'}</span>
          {dark ? 'Light' : 'Dark'}
        </button>
      </nav>

      {/* Main content */}
      <main className="auth-main">
        {children}
      </main>

      {/* Footer strip */}
      <div className="auth-footer">
        <span>© 2026 <em style={{ color: 'var(--clr-accent)', fontStyle: 'normal' }}>Emple</em>. All rights reserved.</span>
        <div className="auth-footer-links">
          <Link href="#">Privacy</Link>
          <Link href="#">Terms</Link>
          <Link href="#">Help</Link>
        </div>
      </div>
    </div>
  )
}