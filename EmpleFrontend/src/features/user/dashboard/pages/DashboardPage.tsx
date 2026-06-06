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

export default function DashboardPage() {
  const { sessionToken, isAuthenticated, isSessionLoading } = useSession()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    if (!isSessionLoading && !isAuthenticated) {
      router.replace('/auth/login')
      return
    }

    const fetchUser = async () => {
      const token = sessionToken
      if (!token) return

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (!res.ok) throw new Error('API error')

        const data = await res.json()
        console.log('USER DATA:', data)

        setUser(data.user)
      } catch (err) {
        console.error('Fetch failed:', err)

        setUser({
          name: 'User',
          email: 'user@example.com',
        })
      }
    }

    if (isAuthenticated) {
      fetchUser()
    }
  }, [sessionToken, isAuthenticated, isSessionLoading, router])

  if (isSessionLoading) {
    return <div className="p-6">Loading dashboard...</div>
  }

  const displayName =
    user?.name ||
    (user?.email
      ? user.email.split('@')[0].charAt(0).toUpperCase() +
        user.email.split('@')[0].slice(1)
      : 'User')

  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-[22px_24px]">
      <h2 className="mb-4 text-lg font-medium text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
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