
'use client'

import { Fragment, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDescope, useSession } from '@descope/nextjs-sdk/client'
import AuthLayout from '@/features/auth/layouts/AuthLayout'
import '@/features/auth/auth.css'


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const sdk = useDescope()
  const { session, isSessionLoading } = useSession() as any

  // Agar already logged in hai toh dashboard pe bhejo
  useEffect(() => {
    if (!isSessionLoading && session?.token) {
      router.replace('/user/dashboard')
    }
  }, [session, isSessionLoading])

  // Session load hone tak kuch render mat karo
  if (isSessionLoading) return null

  const handleSocialLogin = async (provider: 'google' | 'github' | 'microsoft') => {
    try {
      const redirectUrl = `${window.location.origin}/auth/callback`
      const result = await sdk.oauth.start(provider, redirectUrl + '?prompt=select_account')
      if (result.ok && result.data?.url) {
        window.location.href = result.data.url
      }
    } catch (err) {
      console.error('OAuth error:', err)
      setError('Failed to start social login. Please try again.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    try {
      const response = await fetch('https://api.descope.com/v1/auth/signin/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          loginId: email,
          password,
          projectId: process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID,
        }),
      })
      if (response.ok) {
        router.replace('/user/dashboard')
      } else {
        setError('Invalid email or password. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="auth-card-wrap">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo-badge"><span>e</span></div>
            <h1 className="auth-title">Welcome <em>back</em></h1>
            <p className="auth-subtitle">Sign in to continue your placement journey</p>
          </div>

          {error && (
            <div className="auth-alert error" style={{ marginBottom: 20 }}>
              <span className="auth-alert-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <div className="auth-socials-row">
            <button className="auth-social-icon-btn google" onClick={() => handleSocialLogin('google')} title="Continue with Google" type="button">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>
            <button className="auth-social-icon-btn github" onClick={() => handleSocialLogin('github')} title="Continue with GitHub" type="button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </button>
            <button className="auth-social-icon-btn microsoft" onClick={() => handleSocialLogin('microsoft')} title="Continue with Microsoft" type="button">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#f25022" d="M1 1h10v10H1z"/>
                <path fill="#00a4ef" d="M13 1h10v10H13z"/>
                <path fill="#7fba00" d="M1 13h10v10H1z"/>
                <path fill="#ffb900" d="M13 13h10v10H13z"/>
              </svg>
            </button>
          </div>

          <div className="auth-divider">
            <span>or continue with email</span>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label className="auth-label">Email Address</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">✉️</span>
                <input className="auth-input" type="email" placeholder="you@example.com"
                  value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
              </div>
            </div>

            <div className="auth-field">
              <div className="auth-row">
                <label className="auth-label">Password</label>
                <Link href="/auth/forgot-password" className="auth-link" style={{ fontSize: 'var(--text-xs)' }}>
                  Forgot password?
                </Link>
              </div>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">🔒</span>
                <input className="auth-input has-toggle"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password" />
                <button type="button" className="auth-input-toggle"
                  onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <label className="auth-check-wrap">
              <input type="checkbox" className="auth-check" checked={remember}
                onChange={(e) => setRemember(e.target.checked)} />
              <span className="auth-check-label">Keep me signed in for 30 days</span>
            </label>

            <button className="auth-submit" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
                      <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/>
                    </path>
                  </svg>
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          <p className="auth-redirect">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="auth-link">Create one free →</Link>
          </p>
        </div>

        <div className="auth-stats-strip">
          {[
            { val: '50K+', lbl: 'Users' },
            { val: '12K+', lbl: 'Placed' },
            { val: '4.9★', lbl: 'Rating' },
          ].map((s, i) => (
            <Fragment key={s.lbl}>
              {i > 0 && <div className="auth-stat-div" />}
              <div className="auth-stat">
                <div className="auth-stat-val">{s.val}</div>
                <div className="auth-stat-lbl">{s.lbl}</div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </AuthLayout>
  )
}