import { apiRequest } from '@/shared/utils/api'
import { Registration, Submission } from '../types'

export const getEventRegistrations = async (eventId: string): Promise<Registration[]> => {
  const res = await apiRequest(`/api/v1/admin/events/${eventId}/registrations`) as { data: Registration[] }
  return res.data || []
}

export const getEventSubmissions = async (eventId: string): Promise<Submission[]> => {
  const res = await apiRequest(`/api/v1/admin/events/${eventId}/submissions`) as { data: Submission[] }
  return res.data || []
}