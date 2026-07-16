'use client'

import { useEffect } from 'react'
import { useDescope, getSessionToken } from '@descope/nextjs-sdk/client'

export default function CallbackPage() {
  const sdk = useDescope()

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

        const syncRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/sync`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        )

        if (!syncRes.ok) {
          window.location.replace('/auth/login?error=sync_failed')
          return
        }

        const meRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/me`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
          }
        )

        if (!meRes.ok) {
          window.location.replace('/auth/login?error=me_failed')
          return
        }

        const meData = await meRes.json()
        const role = meData?.user?.role

        if (role === 'admin') {
          window.location.replace('/dashboard')
        } else {
          window.location.replace('/user/dashboard')
        }
      } catch (err) {
        console.error('Callback error:', err)
        window.location.replace('/auth/login?error=failed')
      }
    }

    handleCallback()
  }, [sdk])

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      Signing you in...
    </div>
  )
}