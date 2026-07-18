'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDescope } from '@descope/nextjs-sdk/client'
import AuthLayout from '@/features/auth/layouts/AuthLayout'
import '@/features/auth/auth.css'

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(true)
  const [readyToReset, setReadyToReset] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const [refreshToken, setRefreshToken] = useState('')
  const [loginId, setLoginId] = useState('')

  const sdk = useDescope()
  const router = useRouter()

  // Only checks that a token is present in the URL — does NOT consume it.
  // Consuming happens on button click, to avoid email link-scanners
  // (Outlook Safe Links, Gmail, antivirus) burning the one-time token
  // before the actual user clicks it.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('t') || ''
    if (!token) {
      setError('Invalid or expired reset link.')
    }
    setVerifying(false)
  }, [])

  const handleVerifyClick = async () => {
    setVerifying(true)
    setError('')

    try {
      const params = new URLSearchParams(window.location.search)
      const token = params.get('t') || ''

      const resp = await sdk.magicLink.verify(token)

      if (!resp?.ok) {
        setError(
          resp?.error?.errorDescription ||
            'Reset link invalid, expired, or already used.'
        )
        setVerifying(false)
        return
      }

      const resolvedLoginId =
        resp.data?.user?.loginIds?.[0] || resp.data?.user?.email || ''
      const resolvedRefreshToken = resp.data?.refreshJwt || ''

      if (!resolvedLoginId || !resolvedRefreshToken) {
        setError('Could not validate reset session. Please request a new link.')
        setVerifying(false)
        return
      }

      setLoginId(resolvedLoginId)
      setRefreshToken(resolvedRefreshToken)
      setReadyToReset(true)
    } catch {
      setError('Something went wrong while verifying the reset link.')
    } finally {
      setVerifying(false)
    }
  }

  const validatePassword = (pass: string) => {
    if (pass.length < 8) return 'Password must be at least 8 characters.'
    if (!/[A-Z]/.test(pass))
      return 'Password must contain at least one uppercase letter.'
    if (!/[0-9]/.test(pass))
      return 'Password must contain at least one number.'
    if (!/[^a-zA-Z0-9]/.test(pass))
      return 'Password must contain at least one special character.'
    return ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const validationError = validatePassword(newPassword)
    if (validationError) {
      setError(validationError)
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (!loginId || !refreshToken) {
      setError('Invalid reset session. Please request a new link.')
      return
    }

    setLoading(true)
    try {
      const resp = await sdk.password.update(loginId, newPassword, refreshToken)

      if (!resp?.ok) {
        setError(resp?.error?.errorMessage || 'Failed to reset password.')
        return
      }

      setSuccess(true)
      setTimeout(() => router.push('/auth/login'), 2000)
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
            <div className="auth-success-state">
              <div className="auth-success-icon">🎉</div>
              <div className="auth-success-title">Password Reset!</div>
              <p className="auth-success-desc">
                Your password has been updated successfully. Redirecting to sign
                in...
              </p>

              <Link
                href="/auth/login"
                className="auth-submit"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  textDecoration: 'none',
                  borderRadius: 999,
                }}
              >
                Go to Sign In →
              </Link>
            </div>
          ) : verifying ? (
            <div className="auth-success-state">
              <div className="auth-success-icon">🔄</div>
              <div className="auth-success-title">Verifying reset link...</div>
              <p className="auth-success-desc">
                Please wait while we validate your password reset link.
              </p>
            </div>
          ) : !readyToReset && !error ? (
            <div className="auth-success-state">
              <div className="auth-success-icon">🔑</div>
              <div className="auth-success-title">Reset your password</div>
              <p className="auth-success-desc">
                Click continue to verify this link and set a new password.
              </p>
              <button
                className="auth-submit"
                onClick={handleVerifyClick}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  borderRadius: 999,
                }}
              >
                Continue →
              </button>
            </div>
          ) : error && (!loginId || !refreshToken) ? (
            <div className="auth-success-state">
              <div className="auth-success-icon">⚠️</div>
              <div className="auth-success-title">Reset link invalid</div>
              <p className="auth-success-desc">{error}</p>

              <Link
                href="/auth/forgot-password"
                className="auth-submit"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  textDecoration: 'none',
                  borderRadius: 999,
                }}
              >
                Request new link →
              </Link>
            </div>
          ) : (
            <>
              <div className="auth-header">
                <h1 className="auth-title">
                  Reset your <em>password</em>
                </h1>

                <p className="auth-subtitle">
                  Create a strong password you can remember and keep secure.
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
                      onClick={() => setShowNew((prev) => !prev)}
                      aria-label={showNew ? 'Hide password' : 'Show password'}
                    >
                      {showNew ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

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
                      onClick={() => setShowConfirm((prev) => !prev)}
                      aria-label={
                        showConfirm
                          ? 'Hide password confirmation'
                          : 'Show password confirmation'
                      }
                    >
                      {showConfirm ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    background: 'var(--clr-bg2)',
                    border: '1px solid var(--clr-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px 14px',
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      color: 'var(--clr-text2)',
                      marginBottom: 8,
                    }}
                  >
                    Password must include:
                  </div>

                  {[
                    { label: 'At least 8 characters', check: newPassword.length >= 8 },
                    { label: 'One uppercase letter', check: /[A-Z]/.test(newPassword) },
                    { label: 'One number', check: /[0-9]/.test(newPassword) },
                    { label: 'One special character', check: /[^a-zA-Z0-9]/.test(newPassword) },
                  ].map(({ label, check }) => (
                    <div
                      key={label}
                      style={{
                        display: 'flex',
                        gap: 8,
                        alignItems: 'center',
                        marginBottom: 4,
                      }}
                    >
                      <span
                        style={{
                          color: check ? '#22c55e' : 'var(--clr-text3)',
                          fontSize: 12,
                        }}
                      >
                        {check ? '✓' : '○'}
                      </span>
                      <span
                        style={{
                          fontSize: 'var(--text-xs)',
                          color: check ? '#22c55e' : 'var(--clr-text3)',
                        }}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="auth-submit" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      >
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 12 12"
                            to="360 12 12"
                            dur="0.8s"
                            repeatCount="indefinite"
                          />
                        </path>
                      </svg>
                      Resetting password...
                    </>
                  ) : (
                    <>Reset Password</>
                  )}
                </button>
              </form>

              <p className="auth-redirect">
                Remember your password?{' '}
                <Link href="/auth/login" className="auth-link">
                  Back to Sign In →
                </Link>
              </p>
            </>
          )}
        </div>

        <div
          style={{
            textAlign: 'center',
            marginTop: 'var(--space-4)',
            animation: 'authCardIn 0.5s 0.25s var(--ease-out) both',
          }}
        >
          <Link
            href="/"
            style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--clr-text3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              transition: 'color var(--t-fast)',
            }}
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