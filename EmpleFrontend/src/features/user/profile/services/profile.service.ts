import { getSessionToken } from '@descope/nextjs-sdk/client'
import { Profile } from '../types/profile.types'

const baseurl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

// Change this path if your backend profile route is different
const API_BASE = `${baseurl}/api/v1/profile`

async function req<T>(url: string, options?: RequestInit): Promise<T> {
  const token = getSessionToken()

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: 'include',
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`)
  }

  return res.json()
}

export async function getProfile(): Promise<Profile | null> {
  try {
    const data = await req<{ data: Profile }>(API_BASE, {
      method: 'GET',
    })

    return data.data
  } catch {
    return null
  }
}

export async function saveProfile(profile: Profile): Promise<Profile> {
  const method = profile._id ? 'PUT' : 'POST'

  const data = await req<{ data: Profile }>(API_BASE, {
    method,
    body: JSON.stringify(profile),
  })

  return data.data
}