import { getSessionToken } from '@descope/nextjs-sdk/client'

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export const parseJsonResponse = async <T>(res: Response): Promise<T> => {
  const contentType = res.headers.get('content-type') || ''
  const text = await res.text()

  let data: any = null

  if (contentType.includes('application/json')) {
    try {
      data = text ? JSON.parse(text) : null
    } catch {
      throw new Error('Invalid JSON response from server')
    }
  } else {
    const cleaned = text
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()

    throw new Error(cleaned.slice(0, 140) || 'Server did not return JSON')
  }

  if (!res.ok) {
    console.error('API error:', res.status, data)

    const detailMessage = Array.isArray(data?.detail)
      ? data.detail
          .map((err: any) => {
            const field = err.loc?.join('.') || 'field'
            return `${field}: ${err.msg}`
          })
          .join(', ')
      : data?.detail

    throw new Error(
      detailMessage || data?.message || data?.error || 'Request failed'
    )
  }

  return data as T
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