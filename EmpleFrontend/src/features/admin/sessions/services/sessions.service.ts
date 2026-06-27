const BASE = process.env.NEXT_PUBLIC_API_URL ?? '';

export async function fetchSessions() {
  const res = await fetch(`${BASE}/api/v1/admin/sessions`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch sessions');
  const json = await res.json();
  return json.data ?? [];
}

export async function createSession(data: any) {
  const res = await fetch(`${BASE}/api/v1/admin/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create session');
  const json = await res.json();
  return json.data;
}

export async function updateSession(id: string, data: any) {
  const res = await fetch(`${BASE}/api/v1/admin/sessions/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update session');
  const json = await res.json();
  return json.data;
}

export async function deleteSession(id: string) {
  const res = await fetch(`${BASE}/api/v1/admin/sessions/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete session');
  const json = await res.json();
  return json.data;
}