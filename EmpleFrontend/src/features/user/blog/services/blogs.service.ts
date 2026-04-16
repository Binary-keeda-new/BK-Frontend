import { Blog } from '../types/blogs.types';

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/blogs`;

export async function fetchBlogs(): Promise<Blog[]> {
  const res = await fetch(API_BASE, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status}`);
  const data = await res.json();
  return data.data;
}

export async function fetchBlogById(id: string): Promise<Blog> {
  const res = await fetch(`${API_BASE}/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch blog: ${res.status}`);
  const data = await res.json();
  return data.data;
}
