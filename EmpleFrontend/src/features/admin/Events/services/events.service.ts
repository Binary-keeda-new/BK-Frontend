import { apiRequest } from '@/shared/utils/api'
import { Event, EventFormData, EventType } from '../types'

export const createEvent = async (data: EventFormData): Promise<Event> => {
  const json = await apiRequest<{ success: boolean; data: Event }>(
    '/api/v1/admin/events',
    { method: 'POST', body: JSON.stringify(data) }
  )
  return json.data
}

export const getEventsByType = async (type: EventType): Promise<Event[]> => {
  const json = await apiRequest<{ success: boolean; data: Event[] }>(
    `/api/v1/admin/events/${type}`
  )
  return json.data
}

export const updateEvent = async (id: string, data: EventFormData): Promise<Event> => {
  const json = await apiRequest<{ success: boolean; data: Event }>(
    `/api/v1/admin/events/${id}`,
    { method: 'PUT', body: JSON.stringify(data) }
  )
  return json.data
}

export const deleteEvent = async (id: string): Promise<void> => {
  await apiRequest(`/api/v1/admin/events/${id}`, { method: 'DELETE' })
}