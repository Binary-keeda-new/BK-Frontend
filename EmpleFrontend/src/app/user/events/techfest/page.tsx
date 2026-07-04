'use client'

import { useRouter } from 'next/navigation'
import { useEventsByCategory } from '@/features/user/events/hooks/useEvents'
import EventCard from '@/features/user/Events/components/EventCard'
import { Sparkles } from 'lucide-react'

export default function TechfestPage() {
  const router = useRouter()
  const { events, loading } = useEventsByCategory('techfest')

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-[22px_24px]">
      <button
        onClick={() => router.push('/user/events')}
        className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition mb-6"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to Events
      </button>

      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
          <Sparkles size={16} />
        </div>
        <div>
          <h1 className="text-white text-2xl font-bold">Techfest</h1>
          <p className="text-white/40 text-sm">Explore tech festivals with workshops and competitions.</p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-72 bg-[rgb(19,20,27)] rounded-2xl animate-pulse ring-1 ring-white/5" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <p className="text-white/30 text-sm text-center py-16">
          No techfest events available right now. Check back soon!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}