'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useDescope, getSessionToken } from '@descope/nextjs-sdk/client'
import { getDeviceId } from '@/shared/utils/deviceId'
import { API_BASE_URL, apiRequest } from '@/shared/utils/api'
import { useAppAuth } from '@/providers/AppAuthProvider'

type ConflictInfo = {
  newDeviceLabel: string
  newDeviceId: string
} | null

const DeviceSessionContext = createContext<{ socket: Socket | null }>({
  socket: null,
})

export function DeviceSessionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAppAuth()
  const sdk = useDescope()

  const [conflict, setConflict] = useState<ConflictInfo>(null)

  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    if (loading || !user) return

    // Prevent duplicate sockets
    if (socketRef.current) {
      socketRef.current.disconnect()
      socketRef.current = null
    }

    const token = getSessionToken();

    console.log("========== Socket Init ==========");
    console.log("Token exists:", !!token);
    console.log("Token:", token); // Temporary, remove after debugging
    console.log("Device ID:", getDeviceId());
    console.log("================================");
    
    const s = io(API_BASE_URL, {
      autoConnect: false,

      auth: {
        token: getSessionToken(),
        deviceId: getDeviceId(),
      },

      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    })

    socketRef.current = s

    s.on('connect', () => {
      console.log('✅ Socket connected')
    })

    s.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected:', reason)
    })

    s.on('connect_error', async (err: any) => {
      console.warn('Socket connect error:', err.message)

      if (
        err.message === 'TOKEN_EXPIRED' ||
        err.message === 'UNAUTHORIZED'
      ) {
        try {
          await sdk.refresh()

          s.auth = {
            token: getSessionToken(),
            deviceId: getDeviceId(),
          }

          if (s.disconnected) {
            s.connect()
          }
        } catch (e) {
          console.error('Unable to refresh session', e)
          window.location.replace('/auth/login')
        }
      }
    })

    s.on('new_device_login', (payload: ConflictInfo) => {
      console.log('📢 New device login detected')
      setConflict(payload)
    })

    s.on('force_logout', () => {
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('sessionExpiry')

      window.location.replace('/auth/login?notice=force_logout')
    })

    s.connect()

    const handleVisibility = async () => {
      if (document.visibilityState !== 'visible') return

      try {
        await sdk.refresh()

        s.auth = {
          token: getSessionToken(),
          deviceId: getDeviceId(),
        }

        if (s.disconnected) {
          s.connect()
        }
      } catch (e) {
        console.error('Unable to refresh session', e)
        window.location.replace('/auth/login')
      }
    }

    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      document.removeEventListener(
        'visibilitychange',
        handleVisibility
      )

      s.removeAllListeners()
      s.disconnect()

      socketRef.current = null
    }
  }, [loading, user])

  const handleContinueHere = () => {
    if (conflict && socketRef.current) {
      socketRef.current.emit('kick_device', {
        targetDeviceId: conflict.newDeviceId,
      })
    }

    setConflict(null)
  }

  const handleLogoutHere = async () => {
    try {
      await apiRequest('/api/v1/users/logout-device', {
        method: 'POST',
        body: JSON.stringify({
          deviceId: getDeviceId(),
        }),
      })
    } catch {}

    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('sessionExpiry')

    window.location.replace('/auth/login')
  }

  return (
    <DeviceSessionContext.Provider
      value={{ socket: socketRef.current }}
    >
      {children}

      {conflict && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: '#111',
              border: '1px solid #333',
              borderRadius: 12,
              padding: 28,
              maxWidth: 380,
              textAlign: 'center',
            }}
          >
            <h3
              style={{
                color: '#fff',
                marginBottom: 12,
              }}
            >
              New login detected
            </h3>

            <p
              style={{
                color: '#aaa',
                fontSize: 14,
                marginBottom: 20,
              }}
            >
              Your account was just logged into on a{' '}
              {conflict.newDeviceLabel}.
              <br />
              Continue using this device or log out here.
            </p>

            <div
              style={{
                display: 'flex',
                gap: 10,
                justifyContent: 'center',
              }}
            >
              <button
                onClick={handleContinueHere}
                style={{
                  background: '#f97316',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Continue here
              </button>

              <button
                onClick={handleLogoutHere}
                style={{
                  background: 'transparent',
                  color: '#aaa',
                  border: '1px solid #444',
                  padding: '10px 18px',
                  borderRadius: 8,
                  cursor: 'pointer',
                }}
              >
                Logout here
              </button>
            </div>
          </div>
        </div>
      )}
    </DeviceSessionContext.Provider>
  )
}

export const useDeviceSession = () => useContext(DeviceSessionContext)