import { Blog, BlogPayload } from '../types/blogs.types';

const BASE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/blogs`;

async function req<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Request failed: ${res.status}`);
  }
  return res.json();
}

export async function fetchBlogs(): Promise<Blog[]> {
  const data = await req<{ data: Blog[] }>(BASE);
  return data.data;
}

export async function createBlog(payload: BlogPayload): Promise<Blog> {
  const data = await req<{ data: Blog }>(BASE, { method: 'POST', body: JSON.stringify(payload) });
  return data.data;
}

export async function updateBlog(id: string, payload: Partial<BlogPayload>): Promise<Blog> {
  const data = await req<{ data: Blog }>(`${BASE}/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
  return data.data;
}

export async function deleteBlog(id: string): Promise<void> {
  await req(`${BASE}/${id}`, { method: 'DELETE' });
}
