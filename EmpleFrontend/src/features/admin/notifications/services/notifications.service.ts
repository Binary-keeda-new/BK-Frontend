const BASE = process.env.NEXT_PUBLIC_API_URL ?? '';

export async function fetchNotifications() {
  const res = await fetch(`${BASE}/api/v1/admin/notifications`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch notifications');
  const json = await res.json();
  return json.data ?? [];
}

export async function createNotification(data: any) {
  const res = await fetch(`${BASE}/api/v1/admin/notifications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create notification');
  const json = await res.json();
  return json.data;
}

export async function updateNotification(id: string, data: any) {
  const res = await fetch(`${BASE}/api/v1/admin/notifications/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update notification');
  const json = await res.json();
  return json.data;
}

export async function deleteNotification(id: string) {
  const res = await fetch(`${BASE}/api/v1/admin/notifications/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete notification');
  return res.json();
}

export async function toggleLive(id: string) {
  const res = await fetch(`${BASE}/api/v1/admin/notifications/${id}/toggle-live`, { method: 'PATCH' });
  if (!res.ok) throw new Error('Failed to toggle notification');
  const json = await res.json();
  return json.data;
}