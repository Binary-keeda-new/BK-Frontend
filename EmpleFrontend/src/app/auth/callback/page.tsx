'use client'

import { useEffect } from 'react'
import { useDescope, getSessionToken } from '@descope/nextjs-sdk/client'

export default function CallbackPage() {
  const sdk = useDescope()

  useEffect(() => {
    const handleCallback = async () => {
      try {
         console.log('callback started')
        const params = new URLSearchParams(window.location.search)
        const code = params.get('code')
          console.log('code:', code)

        if (!code) {
          window.location.replace('/auth/login?error=missing_code')
          return
        }

        const resp = await sdk.oauth.exchange(code)
        console.log('exchange response:', resp)

        if (!resp?.ok) {
          console.log('exchange failed')
          window.location.replace('/auth/login?error=exchange_failed')
          return
        }

        const token = getSessionToken()
        console.log('TOKEN:', token)
         console.log('token after exchange:', token)

        if (!token) {
          console.log('token missing after exchange')
          window.location.replace('/auth/login?error=no_token')
          return
        }
        console.log("BEFORE SYNC CALL");
        const syncRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/sync`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })
        console.log('sync status:', syncRes.status)

        if (!syncRes.ok) {
          console.error('Sync failed:', await syncRes.text())
          window.location.replace('/auth/login?error=sync_failed')
          return
        }
        console.log('sync success')
        window.location.replace('/user/dashboard')
      } catch (err) {
        console.error('Callback error:', err)
        window.location.replace('/auth/login?error=failed')
      }
    }

    handleCallback()
  }, [sdk])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: '#0f0f0f',
      gap: '16px'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid #2a2a2a',
        borderTop: '3px solid #6366f1',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p style={{ color: '#6b7280', fontSize: '14px', fontFamily: 'sans-serif' }}>
        Signing you in...
      </p>
    </div>
  )
}