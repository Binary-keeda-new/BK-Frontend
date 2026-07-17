'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthLayout from '@/features/auth/layouts/AuthLayout'
import '@/features/auth/auth.css'
import Link from 'next/link'

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const params = new URLSearchParams(window.location.search)
        const token = params.get('token')

        if (!token) {
          setError('Invalid verification link.')
          setStatus('error')
          return
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/verify-email?token=${token}`,
          { method: 'GET' }
        )

        const data = await res.json()

        if (res.ok && data.success) {
          setStatus('success')
          setTimeout(() => {
            router.replace('/user/dashboard')
          }, 2000)
        } else {
          setError(data.message || 'Verification failed. The link may have expired.')
          setStatus('error')
        }
      } catch (err) {
        console.error('Verify error:', err)
        setError('Something went wrong. Please try again.')
        setStatus('error')
      }
    }

    verifyToken()
  }, [])

  return (
    <AuthLayout>
      <div className="auth-card-wrap">
        <div className="auth-card" style={{ textAlign: 'center' }}>
          {status === 'loading' && (
            <>
              <div style={{
                width: 40, height: 40,
                border: '3px solid #2a2a2a',
                borderTop: '3px solid #6366f1',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
                margin: '0 auto 24px',
              }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              <h1 className="auth-title">Verifying your <em>email</em></h1>
              <p className="auth-subtitle">Please wait...</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'rgba(34,197,94,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px',
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h1 className="auth-title">Email <em>verified!</em></h1>
              <p className="auth-subtitle">Your account is verified. Redirecting to login...</p>
            </>
          )}

          {status === 'error' && (
            <>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'rgba(239,68,68,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px',
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <h1 className="auth-title">Verification <em>failed</em></h1>
              <p className="auth-subtitle" style={{ marginBottom: 24 }}>{error}</p>
              <Link href="/auth/login" className="auth-submit" style={{ display: 'block', textDecoration: 'none', textAlign: 'center' }}>
                Go to Login
              </Link>
            </>
          )}
        </div>
      </div>
    </AuthLayout>
  )
}