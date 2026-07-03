'use client'

import { useEffect, useState } from 'react'
import { useSession } from '@descope/nextjs-sdk/client'
import { useRouter } from 'next/navigation'
import ActivityCalendar from '@/features/user/dashboard/components/ActivityCalendar'
import Leaderboard from '@/features/user/dashboard/components/Leaderboard'
import HealthFinanceCard from '@/features/user/dashboard/components/HealthFinanceCard'
import SubmissionsPanel from '@/features/user/dashboard/components/SubmissionsPanel'

type User = {
  name?: string
  email?: string
}

const baseurl =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

type Activity = {
  visitedDates: string[]
  currentStreak: number
  highestStreak: number
  lastVisitedDate: string | null
}


export default function DashboardPage() {
  const { sessionToken, isAuthenticated, isSessionLoading } = useSession()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [activity, setActivity] = useState<Activity | null>(null)
  
  useEffect(() => {

    if (!isSessionLoading && !isAuthenticated) {
      router.replace('/auth/login')
      return
    }

    const fetchUser = async () => {
      const token = sessionToken

      if (!token) {
        return
      }
      
      const url = `${baseurl}/api/v1/users/me`

      try {
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const text = await res.text()


        if (!res.ok) {
          router.replace('/auth/login')
          return
        }

        const data = JSON.parse(text)

        setUser(data.user)
        const activityRes = await fetch(`${baseurl}/api/v1/activity/visit`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

        const activityText = await activityRes.text()

        if (activityRes.ok) {
          const activityData = JSON.parse(activityText)
          setActivity(activityData.data)
        }
      } catch (error) {
        console.error('Error fetching /me ->', error)
        router.replace('/auth/login')
      }
    }

    if (isAuthenticated) {
      fetchUser()
    }
  }, [sessionToken, isAuthenticated, isSessionLoading, router])

  if (isSessionLoading || !user || !activity) {
  return <div className="p-6">Loading dashboard...</div>
}

  const fullName = user.name?.trim() || ''
  const firstName = fullName ? fullName.split(' ')[0] : ''



  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-[22px_24px]">
      <h2 className="text-white text-lg font-medium drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] mb-4">
        Welcome back{firstName ? `, ` : ''}
        {firstName && (
          <span className="underline decoration-orange-500 underline-offset-4">
            {firstName}
          </span>
        )}
        {' '}👋
      </h2>

      <div
        className="grid gap-[18px]
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-[1fr_1fr_300px]"
      >
       <ActivityCalendar
  activity={activity}
  token={sessionToken}
  baseurl={baseurl}
  onActivityUpdate={setActivity}
/>
        <Leaderboard />

        <div className="md:col-span-2 xl:col-span-1">
          <HealthFinanceCard />
        </div>

        <div className="col-span-1 md:col-span-2 xl:col-span-3">
          <SubmissionsPanel />
        </div>
      </div>
    </main>
  )
}