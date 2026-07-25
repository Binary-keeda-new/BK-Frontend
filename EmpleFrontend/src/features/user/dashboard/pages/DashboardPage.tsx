'use client'

import { useEffect, useState, useRef } from 'react'
import { useSession } from '@descope/nextjs-sdk/client'
import { useRouter } from 'next/navigation'
import { useWallet } from '@/providers/WalletProvider'
import ActivityCalendar from '@/features/user/dashboard/components/ActivityCalendar'
import Leaderboard from '@/features/user/dashboard/components/Leaderboard'
import PortfolioOverviewCard from '@/features/user/dashboard/components/PortfolioOverviewCard'
import SubmissionsPanel from '@/features/user/dashboard/components/SubmissionsPanel'
import { useNotification } from '@/providers/NotificationProvider'

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
  const { config, refreshWallet } = useWallet()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [activity, setActivity] = useState<Activity | null>(null)
  const [isSubmissionsExpanded, setIsSubmissionsExpanded] = useState(false)
  const { notifyReward } = useNotification()
  const fetchedRef = useRef(false)
  
  useEffect(() => {

    if (!isSessionLoading && !isAuthenticated) {
      router.replace('/auth/login')
      return
    }

      const fetchUser = async () => {
      if (fetchedRef.current) return
      fetchedRef.current = true

      const token = sessionToken

      if (!token) {
        fetchedRef.current = false
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
          fetchedRef.current = false
          if (res.status === 401 || res.status === 403) {
            router.replace('/auth/login')
          }
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
          
          const todayStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date());
          if (activityData.data.lastVisitedDate === todayStr) {
            const shownKey = `daily_reward_shown_${todayStr}`;
            if (!localStorage.getItem(shownKey)) {
              notifyReward("Daily Login Reward", "Welcome back!", config?.LOGIN?.DAILY_REWARD || 1);
              localStorage.setItem(shownKey, 'true');
              refreshWallet();
            }
          }
        }
      } catch (error) {
        console.error('Error fetching /me ->', error)
        fetchedRef.current = false
      }
    }

    if (isAuthenticated) {
      fetchUser()
    }
  }, [sessionToken, isAuthenticated, isSessionLoading, router, config?.LOGIN?.DAILY_REWARD, notifyReward, refreshWallet])

  if (isSessionLoading || !user || !activity) {
  return <div className="p-6">Loading dashboard...</div>
}

  const fullName = user.name?.trim() || ''
  const firstName = fullName ? fullName.split(' ')[0] : ''

  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-[22px_24px]">
      {!isSubmissionsExpanded && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
          <h2 className="text-white text-lg font-medium drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
            Welcome back{firstName ? `, ` : ''}
            {firstName && (
              <span className="underline decoration-orange-500 underline-offset-4">
                {firstName}
              </span>
            )}
            {' '}👋
          </h2>
        </div>
      )}

      <div
        className={
          isSubmissionsExpanded
            ? "block"
            : "grid gap-[18px] grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr_1fr_300px]"
        }
      >
        {!isSubmissionsExpanded && (
          <>
            <ActivityCalendar
              activity={activity}
              token={sessionToken}
              baseurl={baseurl}
              onActivityUpdate={setActivity}
            />
            <Leaderboard />

            <div className="md:col-span-2 xl:col-span-1">
              <PortfolioOverviewCard />
            </div>
          </>
        )}

        <div className={isSubmissionsExpanded ? "" : "col-span-1 md:col-span-2 xl:col-span-3"}>
          <SubmissionsPanel
            isExpanded={isSubmissionsExpanded}
            onToggleExpand={() => setIsSubmissionsExpanded(!isSubmissionsExpanded)}
          />
        </div>
      </div>
    </main>
  )
}