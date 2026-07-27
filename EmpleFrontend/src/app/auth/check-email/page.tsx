'use client'

import { useSearchParams } from 'next/navigation'
import { useState, Suspense, useEffect } from 'react'
import Link from 'next/link'
import AuthLayout from '@/features/auth/layouts/AuthLayout'
import '@/features/auth/auth.css'

const COOLDOWN_SECONDS = 120
const STORAGE_KEY = 'verificationEmailCooldown'

function CheckEmailContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''

  const [resending, setResending] = useState(false)
  const [resent, setResent] = useState(false)
  const [error, setError] = useState('')
  const [resendCooldown, setResendCooldown] = useState(0)

  // Start / Resume cooldown when page loads
  useEffect(() => {
    const storedTime = localStorage.getItem(STORAGE_KEY)

    if (!storedTime) {
      // First time landing on this page after signup
      const expiresAt = Date.now() + COOLDOWN_SECONDS * 1000
      localStorage.setItem(STORAGE_KEY, expiresAt.toString())
      setResendCooldown(COOLDOWN_SECONDS)
      return
    }

    const remaining = Math.max(
      0,
      Math.ceil((Number(storedTime) - Date.now()) / 1000)
    )

    setResendCooldown(remaining)
  }, [])

  // Countdown timer
  useEffect(() => {
    if (resendCooldown <= 0) {
      localStorage.removeItem(STORAGE_KEY)
      return
    }

    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [resendCooldown])

  const handleResend = async () => {
    setResending(true)
    setError('')
    setResent(false)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/send-verification`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      )

      if (res.ok) {
        setResent(true)

        const expiresAt = Date.now() + COOLDOWN_SECONDS * 1000
        localStorage.setItem(STORAGE_KEY, expiresAt.toString())
        setResendCooldown(COOLDOWN_SECONDS)
      } else {
        setError('Failed to resend email. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setResending(false)
    }
  }

  return (
    <AuthLayout>
      <div className="auth-card-wrap">
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'rgba(99,102,241,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6366f1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>

          <h1 className="auth-title">
            Check your <em>email</em>
          </h1>

          <p className="auth-subtitle" style={{ marginBottom: 8 }}>
            We sent a verification link to
          </p>

          <p
            style={{
              color: 'var(--clr-accent)',
              fontWeight: 600,
              marginBottom: 24,
              fontSize: 15,
            }}
          >
            {email}
          </p>

          <p className="auth-subtitle" style={{ marginBottom: 32 }}>
            Click the link in the email to verify your account and access your dashboard.
          </p>

          {resent && (
            <div
              style={{
                marginBottom: 16,
                color: '#22c55e',
                background: 'rgba(34,197,94,0.1)',
                border: '1px solid rgba(34,197,94,0.2)',
                borderRadius: 8,
                padding: '10px 16px',
              }}
            >
              ✓ Verification email resent!
            </div>
          )}

          {error && (
            <div className="auth-alert error" style={{ marginBottom: 16 }}>
              <span>{error}</span>
            </div>
          )}

          <button
            className="auth-submit"
            onClick={handleResend}
            disabled={resending || resendCooldown > 0}
            type="button"
            style={{ marginBottom: 16 }}
          >
            {resending
              ? 'Resending...'
              : resendCooldown > 0
              ? `Resend in ${resendCooldown}s`
              : 'Resend verification email'}
          </button>

          <p className="auth-redirect">
            Already verified?{' '}
            <Link href="/auth/login" className="auth-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}

export default function CheckEmailPage() {
  return (
    <Suspense>
      <CheckEmailContent />
    </Suspense>
  )
}