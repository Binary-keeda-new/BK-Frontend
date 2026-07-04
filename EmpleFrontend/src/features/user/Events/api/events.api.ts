import { apiRequest } from '@/shared/utils/api'

export const fetchAllEvents = async () => {
  const res = await apiRequest('/api/v1/events') as { data: any[] }
  return res.data || []
}

export const fetchEventById = async (id: string) => {
  const res = await apiRequest(`/api/v1/events/${id}`) as { data: any }
  return res.data
}

export const fetchRegistrationStatus = async (id: string) => {
  const res = await apiRequest(`/api/v1/events/${id}/registrations/status`) as { data: any }
  return res.data
}

export const registerForEvent = async (id: string, body: { name: string; email: string; phone?: string }) => {
  const res = await apiRequest(`/api/v1/events/${id}/registrations`, {
    method: 'POST',
    body: JSON.stringify(body),
  }) as { data: any }
  return res.data
}

export const fetchSubmissionStatus = async (id: string) => {
  const res = await apiRequest(`/api/v1/events/${id}/submissions/status`) as { data: any }
  return res.data
}

export const submitSolution = async (id: string, body: {
  githubLink: string
  videoLink: string
}) => {
  const res = await apiRequest(`/api/v1/events/${id}/submissions`, {
    method: 'POST',
    body: JSON.stringify(body),
  }) as { data: any }
  return res.data
}