'use client'

import { useEffect, useState } from 'react'
import { useSession } from '@descope/nextjs-sdk/client'
import { useRouter } from 'next/navigation'
import ActivityCalendar from '@/features/user/dashboard/components/ActivityCalendar'
import Leaderboard from '@/features/user/dashboard/components/Leaderboard'
import PromoCard from '@/features/user/dashboard/components/PromoCard'
import SubmissionsPanel from '@/features/user/dashboard/components/SubmissionsPanel'

type User = {
  name?: string
  email?: string
}

const baseurl =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'


export default function DashboardPage() {
  const { sessionToken, isAuthenticated, isSessionLoading } = useSession()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  
  useEffect(() => {
    console.log('dashboard state ->', {
      isSessionLoading,
      isAuthenticated,
      hasSessionToken: !!sessionToken,
      apiUrl: baseurl,
    })

    if (!isSessionLoading && !isAuthenticated) {
      console.log('Not authenticated, redirecting to /auth/login')
      router.replace('/auth/login')
      return
    }

    const fetchUser = async () => {
      const token = sessionToken

      if (!token) {
        console.log('No session token found')
        return
      }
      
      const url = `${baseurl}/api/v1/users/me`
      console.log('Fetching /me from:', url)

      try {
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const text = await res.text()

        console.log('/me response ->', {
          status: res.status,
          ok: res.ok,
          body: text,
        })

        if (!res.ok) {
          console.log('/me failed, redirecting to /auth/login')
          router.replace('/auth/login')
          return
        }

        const data = JSON.parse(text)
        console.log('/me parsed data ->', data)

        setUser(data.user)
      } catch (error) {
        console.error('Error fetching /me ->', error)
        router.replace('/auth/login')
      }
    }

    if (isAuthenticated) {
      fetchUser()
    }
  }, [sessionToken, isAuthenticated, isSessionLoading, router, baseurl])

  if (isSessionLoading || !user) {
    return <div className="p-6">Loading dashboard...</div>
  }

  const displayName =
    user.name ||
    (user.email
      ? user.email.split('@')[0].charAt(0).toUpperCase() +
        user.email.split('@')[0].slice(1)
      : 'User')

  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-[22px_24px]">
      <h2 className="text-white text-lg font-medium drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] mb-4">
        Welcome,{' '}
        <span className="underline decoration-orange-500 underline-offset-4">
          {displayName}
        </span>
      </h2>

      <div
        className="grid gap-[18px]
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-[1fr_1fr_300px]"
      >
        <ActivityCalendar />
        <Leaderboard />

        <div className="md:col-span-2 xl:col-span-1">
          <PromoCard />
        </div>

        <div className="col-span-1 md:col-span-2 xl:col-span-3">
          <SubmissionsPanel />
        </div>
      </div>
    </main>
  )
}