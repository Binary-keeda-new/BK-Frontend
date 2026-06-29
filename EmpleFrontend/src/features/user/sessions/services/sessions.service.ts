const BASE = process.env.NEXT_PUBLIC_API_URL ?? '';

export async function fetchSessions() {
  const res = await fetch(`${BASE}/api/v1/sessions`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch sessions');
  const json = await res.json();
  return json.data ?? [];
}