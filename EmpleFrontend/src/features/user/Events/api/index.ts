import { apiRequest } from '@/shared/utils/api'
import { Event, EventType } from '../types'

export const fetchEventsByCategory = async (type: EventType): Promise<Event[]> => {
  const json = await apiRequest<{ success: boolean; data: Event[] }>(
    `/api/v1/events/${type}`
  )
  return json.data
}

export const fetchUpcomingEvents = async (): Promise<Event[]> => {
  const json = await apiRequest<{ success: boolean; data: Event[] }>(
    `/api/v1/events/upcoming`
  )
  return json.data
}