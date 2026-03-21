





'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useDescope } from '@descope/nextjs-sdk/client'
import AuthLayout from '@/view/auth/components/AuthLayout'
import '@/view/auth/auth.css'

export default function ForgotPasswordPage() {
  const [email, setEmail]     = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)
  const [error, setError]     = useState('')
  const [resendTimer, setResendTimer] = useState(0)

  const sdk = useDescope()

  const startResendTimer = () => {
    setResendTimer(30)
    const interval = setInterval(() => {
      setResendTimer((t) => {
        if (t <= 1) { clearInterval(interval); return 0 }
        return t - 1
      })
    }, 1000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setLoading(true)
    try {
      const resp = await sdk.password.sendReset(
        email,
        `${window.location.origin}/auth/reset-password`
      )

      if (resp.ok) {
        setSent(true)
        startResendTimer()
      } else {
        setError('Email not found. Please check and try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (resendTimer > 0) return
    setLoading(true)
    try {
      const resp = await sdk.password.sendReset(
        email,
        `${window.location.origin}/auth/reset-password`
      )

      if (resp.ok) {
        startResendTimer()
      } else {
        setError('Failed to resend. Please try again.')
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

          {!sent ? (
            /* ── STEP 1: Enter email ── */
            <>
              <div className="auth-header">
                <div className="auth-logo-badge" style={{ background: 'var(--clr-surface2)', border: '1.5px solid var(--clr-border2)', boxShadow: 'none' }}>
                  <span style={{ fontSize: 22 }}>🔑</span>
                </div>
                <h1 className="auth-title">Forgot your <em>password?</em></h1>
                <p className="auth-subtitle">
                  No worries — enter your registered email and we&apos;ll send you a reset link instantly.
                </p>
              </div>

              {error && (
                <div className="auth-alert error" style={{ marginBottom: 20 }}>
                  <span className="auth-alert-icon">⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="auth-field">
                  <label className="auth-label">Email Address</label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon">✉️</span>
                    <input
                      className="auth-input"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      autoFocus
                    />
                  </div>
                </div>

                <button className="auth-submit" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
                          <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/>
                        </path>
                      </svg>
                      Sending reset link…
                    </>
                  ) : (
                    <>
                      Send Reset Link
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {/* Tips */}
              <div style={{
                background: 'var(--clr-bg2)',
                border: '1px solid var(--clr-border)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 16px',
                marginTop: 'var(--space-5)',
                position: 'relative',
                zIndex: 1,
              }}>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--clr-text2)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
                  💡 Tips
                </div>
                {[
                  'Check your spam or junk folder',
                  'The link expires after 30 minutes',
                  'You can request a new link after 30 seconds',
                ].map((tip) => (
                  <div key={tip} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 6 }}>
                    <span style={{ color: 'var(--clr-accent)', fontSize: 11, marginTop: 1, flexShrink: 0 }}>▸</span>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--clr-text3)', lineHeight: 1.5 }}>{tip}</span>
                  </div>
                ))}
              </div>

              <p className="auth-redirect">
                Remember your password?{' '}
                <Link href="/auth/login" className="auth-link">Back to Sign In →</Link>
              </p>
            </>
          ) : (
            /* ── STEP 2: Success state ── */
            <>
              <div className="auth-success-state">
                <div className="auth-success-icon">📬</div>
                <div className="auth-success-title">Check your inbox!</div>
                <p className="auth-success-desc">
                  We&apos;ve sent a password reset link to{' '}
                  <strong style={{ color: 'var(--clr-text)' }}>{email}</strong>.
                  {' '}Click the link in the email to reset your password.
                </p>

                {/* Email illustration */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                  padding: '16px 20px',
                  background: 'var(--clr-bg2)',
                  border: '1px solid var(--clr-border)',
                  borderRadius: 'var(--radius-lg)',
                  marginBottom: 'var(--space-6)',
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'rgba(34,197,94,0.12)',
                    border: '1.5px solid rgba(34,197,94,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, flexShrink: 0,
                    animation: 'pulseDot 2s ease-in-out infinite',
                  }}>
                    ✉️
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--clr-text)' }}>
                      Password Reset
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--clr-text3)' }}>
                      from noreply@emple.in · just now
                    </div>
                  </div>
                  <div style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--clr-accent)', fontWeight: 700, background: 'var(--clr-accent3)', padding: '3px 8px', borderRadius: 20 }}>
                    NEW
                  </div>
                </div>

                {/* Resend */}
                <div style={{ marginBottom: 'var(--space-5)' }}>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--clr-text2)' }}>
                    Didn&apos;t receive it?{' '}
                  </span>
                  <button
                    onClick={handleResend}
                    disabled={resendTimer > 0 || loading}
                    style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 700,
                      color: resendTimer > 0 ? 'var(--clr-text3)' : 'var(--clr-accent)',
                      background: 'none',
                      border: 'none',
                      cursor: resendTimer > 0 ? 'not-allowed' : 'pointer',
                      fontFamily: 'inherit',
                      transition: 'color var(--t-fast)',
                    }}
                  >
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend email'}
                  </button>
                </div>

                <Link
                  href="/auth/login"
                  className="auth-submit"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none', borderRadius: 50 }}
                >
                  ← Back to Sign In
                </Link>
              </div>

              <p className="auth-terms">
                Wrong email?{' '}
                <button
                  onClick={() => { setSent(false); setEmail('') }}
                  style={{ color: 'var(--clr-accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'var(--text-xs)', fontWeight: 600 }}
                >
                  Try a different address
                </button>
              </p>
            </>
          )}
        </div>

        {/* Back nav */}
        <div style={{ textAlign: 'center', marginTop: 'var(--space-4)', animation: 'authCardIn 0.5s 0.25s var(--ease-out) both' }}>
          <Link
            href="/"
            style={{ fontSize: 'var(--text-sm)', color: 'var(--clr-text3)', display: 'inline-flex', alignItems: 'center', gap: 6, transition: 'color var(--t-fast)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--clr-accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--clr-text3)')}
          >
            ← Back to Emple home
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}