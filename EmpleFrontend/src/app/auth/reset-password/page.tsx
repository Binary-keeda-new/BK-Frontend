'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDescope } from '@descope/nextjs-sdk/client'
import AuthLayout from '@/view/auth/components/AuthLayout'
import '@/view/auth/auth.css'

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword]     = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNew, setShowNew]             = useState(false)
  const [showConfirm, setShowConfirm]     = useState(false)
  const [loading, setLoading]             = useState(false)
  const [error, setError]                 = useState('')
  const [success, setSuccess]             = useState(false)
  const [token, setToken]                 = useState('')

  const sdk = useDescope()
  const router = useRouter()

  // Extract token from URL when user clicks link in email
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const t = params.get('t') || params.get('token') || ''
    setToken(t)
    if (!t) {
      setError('Invalid or expired reset link. Please request a new one.')
    }
  }, [])

  const validatePassword = (pass: string) => {
    if (pass.length < 8) return 'Password must be at least 8 characters.'
    if (!/[A-Z]/.test(pass)) return 'Password must contain at least one uppercase letter.'
    if (!/[0-9]/.test(pass)) return 'Password must contain at least one number.'
    if (!/[^a-zA-Z0-9]/.test(pass)) return 'Password must contain at least one special character.'
    return ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const validationError = validatePassword(newPassword)
    if (validationError) { setError(validationError); return }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (!token) {
      setError('Invalid or expired reset link. Please request a new one.')
      return
    }

    setLoading(true)
    try {
      const resp = await sdk.password.update(token, newPassword)

      if (resp.ok) {
        setSuccess(true)
        setTimeout(() => router.push('/auth/login'), 3000)
      } else {
        setError('Failed to reset password. Link may have expired. Please request a new one.')
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

          {success ? (
            /* ── Success State ── */
            <div className="auth-success-state">
              <div className="auth-success-icon">🎉</div>
              <div className="auth-success-title">Password Reset!</div>
              <p className="auth-success-desc">
                Your password has been successfully updated. Redirecting you to login in 3 seconds...
              </p>
              <Link
                href="/auth/login"
                className="auth-submit"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none', borderRadius: 50 }}
              >
                Go to Sign In →
              </Link>
            </div>
          ) : (
            /* ── Reset Form ── */
            <>
              <div className="auth-header">
                <div className="auth-logo-badge" style={{ background: 'var(--clr-surface2)', border: '1.5px solid var(--clr-border2)', boxShadow: 'none' }}>
                  <span style={{ fontSize: 22 }}>🔒</span>
                </div>
                <h1 className="auth-title">Reset your <em>password</em></h1>
                <p className="auth-subtitle">
                  Enter your new password below. Make sure it's strong and secure!
                </p>
              </div>

              {error && (
                <div className="auth-alert error" style={{ marginBottom: 20 }}>
                  <span className="auth-alert-icon">⚠️</span>
                  <span>{error}</span>
                  {!token && (
                    <Link href="/auth/forgot-password" className="auth-link" style={{ marginLeft: 8 }}>
                      Request new link →
                    </Link>
                  )}
                </div>
              )}

              <form className="auth-form" onSubmit={handleSubmit}>
                {/* New Password */}
                <div className="auth-field">
                  <label className="auth-label">New Password</label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon">🔒</span>
                    <input
                      className="auth-input has-toggle"
                      type={showNew ? 'text' : 'password'}
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      autoComplete="new-password"
                      autoFocus
                    />
                    <button
                      type="button"
                      className="auth-input-toggle"
                      onClick={() => setShowNew(!showNew)}
                    >
                      {showNew ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="auth-field">
                  <label className="auth-label">Confirm Password</label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon">🔒</span>
                    <input
                      className="auth-input has-toggle"
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="auth-input-toggle"
                      onClick={() => setShowConfirm(!showConfirm)}
                    >
                      {showConfirm ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                {/* Password strength hints */}
                <div style={{
                  background: 'var(--clr-bg2)',
                  border: '1px solid var(--clr-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 14px',
                  marginBottom: 8,
                }}>
                  <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--clr-text2)', marginBottom: 8 }}>
                    Password must have:
                  </div>
                  {[
                    { label: 'At least 8 characters', check: newPassword.length >= 8 },
                    { label: 'One uppercase letter', check: /[A-Z]/.test(newPassword) },
                    { label: 'One number', check: /[0-9]/.test(newPassword) },
                    { label: 'One special character', check: /[^a-zA-Z0-9]/.test(newPassword) },
                  ].map(({ label, check }) => (
                    <div key={label} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ color: check ? '#22c55e' : 'var(--clr-text3)', fontSize: 12 }}>
                        {check ? '✓' : '○'}
                      </span>
                      <span style={{ fontSize: 'var(--text-xs)', color: check ? '#22c55e' : 'var(--clr-text3)' }}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="auth-submit" type="submit" disabled={loading || !token}>
                  {loading ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
                          <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/>
                        </path>
                      </svg>
                      Resetting password…
                    </>
                  ) : (
                    <>
                      Reset Password
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>

              <p className="auth-redirect">
                Remember your password?{' '}
                <Link href="/auth/login" className="auth-link">Back to Sign In →</Link>
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