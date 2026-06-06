import { getSessionToken } from '@descope/nextjs-sdk/client'

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export const parseJsonResponse = async <T>(res: Response): Promise<T> => {
  const contentType = res.headers.get('content-type') || ''

  if (!contentType.includes('application/json')) {
    const text = await res.text()

    const cleaned = text
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()

    throw new Error(cleaned.slice(0, 140) || 'Server did not return JSON')
  }

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data?.message || 'Request failed')
  }

  return data
}

export function buildApiUrl(path: string) {
  return `${API_BASE_URL}${path}`
}

export function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (typeof window !== 'undefined') {
    const token = getSessionToken()

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
  }

  return headers
}

export async function apiRequest<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(buildApiUrl(path), {
    ...init,
    headers: {
      ...getAuthHeaders(),
      ...(init?.headers || {}),
    },
    credentials: 'include',
    cache: 'no-store',
  })

  return parseJsonResponse<T>(res)
}