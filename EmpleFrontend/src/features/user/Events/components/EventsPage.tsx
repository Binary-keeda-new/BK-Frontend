'use client'

import { Clock } from 'lucide-react'
import EventCategoryCard from './EventCategoryCard'
import UpcomingEventRow from './UpcomingEventRow'
import { EVENT_CATEGORIES } from '../constants'
import { useUpcomingEvents } from '../hooks/useEvents'

export default function EventsPage() {
  const { events: upcomingEvents, loading } = useUpcomingEvents()

  return (
    <div className="p-7">
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold mb-1">
          Explore <span className="text-[rgb(241,90,34)]">Events</span>
        </h1>
        <p className="text-white/40 text-sm">
          Discover hackathons, tech fests, and competitions tailored for you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {EVENT_CATEGORIES.map((cat) => (
          <EventCategoryCard key={cat.id} {...cat} />
        ))}
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Clock size={16} className="text-[rgb(241,90,34)]" />
          <h2 className="text-white text-sm font-semibold">Upcoming events</h2>
          <div className="flex-1 h-px bg-white/8" />
        </div>

        {loading ? (
          <div className="flex flex-col gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-[rgb(19,20,27)] rounded-2xl animate-pulse ring-1 ring-white/5" />
            ))}
          </div>
        ) : upcomingEvents.length === 0 ? (
          <p className="text-white/30 text-sm text-center py-10">
            No upcoming events right now. Check back soon!
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {upcomingEvents.map((event) => (
              <UpcomingEventRow key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}