'use client'

import { useEffect, useState } from 'react'
import { useDescope, getSessionToken } from '@descope/nextjs-sdk/client'

export default function CallbackPage() {
  const sdk = useDescope()
  const [statusMessage, setStatusMessage] = useState('Signing you in...')

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search)
        const code = params.get('code')

        if (!code) {
          window.location.replace('/auth/login?error=missing_code')
          return
        }

        const resp = await sdk.oauth.exchange(code)
        if (!resp?.ok) {
          window.location.replace('/auth/login?error=exchange_failed')
          return
        }

        const token = getSessionToken()
        if (!token) {
          window.location.replace('/auth/login?error=no_token')
          return
        }

        const intent = sessionStorage.getItem('oauth_intent') || 'login'
        const provider = sessionStorage.getItem('oauth_provider') || undefined

        const syncRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/sync`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ intent, provider }),
        })

        if (syncRes.status === 404) {
          const body = await syncRes.json().catch(() => ({}))
          if (body?.code === 'NO_ACCOUNT_FOUND') {
            // Requirement: tell the user, then send them to the signup page
            // to complete signup themselves — no auto-completion.
            setStatusMessage('No credential found. Redirecting you to sign up...')
            sessionStorage.setItem('auth_notice', 'No credential found. Please sign up to continue.')
            sessionStorage.removeItem('oauth_intent')
            sessionStorage.removeItem('oauth_provider')
            setTimeout(() => window.location.replace('/auth/signup'), 1200)
            return
          }
        }

        if (syncRes.status === 409) {
          const body = await syncRes.json().catch(() => ({}))
          if (body?.code === 'EMAIL_ALREADY_IN_USE') {
            sessionStorage.removeItem('oauth_intent')
            sessionStorage.removeItem('oauth_provider')
            window.location.replace(`/auth/login?error=email_in_use&provider=${encodeURIComponent(body.authProvider || '')}`)
            return
          }
        }
        if (!syncRes.ok) {
          window.location.replace('/auth/login?error=sync_failed')
          return
        }

        const syncData = await syncRes.json()
        if (syncData.isNewUser) {
          sessionStorage.setItem('show_signup_bonus', 'true')
        }

        const meRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/me`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include',
        })

        if (!meRes.ok) {
          window.location.replace('/auth/login?error=me_failed')
          return
        }

        const meData = await meRes.json()
        const role = meData?.user?.role

        const expiry = Date.now() + 3 * 24 * 60 * 60 * 1000
        localStorage.setItem('token', token)
        localStorage.setItem('role', role || 'user')
        localStorage.setItem('sessionExpiry', expiry.toString())

        sessionStorage.removeItem('oauth_intent')
        sessionStorage.removeItem('oauth_provider')

        window.location.replace(role === 'admin' ? '/dashboard' : '/user/dashboard')
      } catch (err) {
        console.error('Callback error:', err)
        window.location.replace('/auth/login?error=failed')
      }
    }

    handleCallback()
  }, [sdk])

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center', padding: '0 20px' }}>
      {statusMessage}
    </div>
  )
}