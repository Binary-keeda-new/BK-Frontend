import { useState, useEffect } from 'react'
import { Event, EventType } from '../types'
import { fetchUpcomingEvents, fetchEventsByCategory } from '../api'

export const useUpcomingEvents = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUpcomingEvents()
      .then(setEvents)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return { events, loading }
}

export const useEventsByCategory = (type: EventType) => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEventsByCategory(type)
      .then(setEvents)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [type])

  return { events, loading }
}