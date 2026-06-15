import { Profile } from '../types/profile.types';
import { getSessionToken } from '@descope/nextjs-sdk/client' 

const baseurl =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

const API_BASE = `${baseurl}/profile`;

async function req<T>(url: string, options?: RequestInit): Promise<T> {
  // ✅ get token from Descope session
  const session = await getSession();
  const token = session?.sessionJwt;

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}), // ✅ attach token
    },
  });

  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export async function getProfile(): Promise<Profile | null> {
  try {
    const data = await req<{ data: Profile }>(API_BASE, { cache: 'no-store' });
    return data.data;
  } catch {
    return null;
  }
}

export async function saveProfile(profile: Profile): Promise<Profile> {
  const method = profile._id ? 'PUT' : 'POST';

  const data = await req<{ data: Profile }>(API_BASE, {
    method,
    body: JSON.stringify(profile),
  });

  return data.data;
}