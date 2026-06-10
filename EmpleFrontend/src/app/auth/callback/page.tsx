'use client'
import { useEffect } from 'react'
import { useDescope, getSessionToken } from '@descope/nextjs-sdk/client'

export default function CallbackPage() {
  const sdk = useDescope()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log('Starting callback...')
        const params = new URLSearchParams(window.location.search)
        const code = params.get('code')
        console.log('OAuth code:', code)

        if (!code) {
          window.location.replace('/auth/login?error=missing_code')
          return
        }

        const resp = await sdk.oauth.exchange(code)

        console.log('Exchange response:', resp)
        if (!resp?.ok) {
          window.location.replace('/auth/login?error=exchange_failed')
          return
        }

        const token = getSessionToken()
        console.log('Session token:', token)

        if (!token) {
          window.location.replace('/auth/login?error=no_token')
          return
        }

        const syncUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/sync`
        console.log('Calling:', syncUrl)

        const syncRes = await fetch(syncUrl, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      )

        console.log('Sync status:', syncRes.status)
        const syncText = await syncRes.text()
        console.log('Sync response:', syncText)
        
        if (!syncRes.ok) {
          alert(`Sync failed: ${syncRes.status}\n${syncText}`)
          return
        }
        let syncData
        try {
          syncData = JSON.parse(syncText)
        } catch {
          console.error('Invalid JSON returned')
          return
        }
        console.log('Parsed sync data:', syncData)
        const user =
          syncData?.data?.user ||
          syncData?.user ||
          syncData?.data ||
          null
        const role = user?.role || 'user'
        console.log('Role:', role)
        localStorage.setItem('token', token)
        localStorage.setItem('role', role)
        if (role === 'admin') {
          window.location.replace('/dashboard')
        } else {
          window.location.replace('/user/dashboard')
        }
      } catch (err) {
        console.error('Callback error:', err)
        alert(`Callback error: ${String(err)}`)
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