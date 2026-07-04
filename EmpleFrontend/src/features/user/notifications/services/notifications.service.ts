const BASE = process.env.NEXT_PUBLIC_API_URL ?? '';

export async function fetchLiveNotifications() {
  const res = await fetch(`${BASE}/api/v1/notifications`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch notifications');
  const json = await res.json();
  return json.data ?? [];
}