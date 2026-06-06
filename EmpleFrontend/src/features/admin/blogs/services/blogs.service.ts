import { apiRequest } from '@/shared/utils/api';
import { Blog, BlogPayload } from '../types/blogs.types';

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export async function fetchBlogs(): Promise<Blog[]> {
  const data = await apiRequest<ApiResponse<Blog[]>>(
    '/api/v1/admin/blogs',
    {
      method: 'GET',
    }
  );

  return data.data;
}

export async function createBlog(payload: BlogPayload): Promise<Blog> {
  const data = await apiRequest<ApiResponse<Blog>>(
    '/api/v1/admin/blogs',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    }
  );

  return data.data;
}

export async function updateBlog(
  id: string,
  payload: Partial<BlogPayload>
): Promise<Blog> {
  const data = await apiRequest<ApiResponse<Blog>>(
    `/api/v1/admin/blogs/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(payload),
    }
  );

  return data.data;
}

export async function deleteBlog(id: string): Promise<void> {
  await apiRequest<ApiResponse<null>>(
    `/api/v1/admin/blogs/${id}`,
    {
      method: 'DELETE',
    }
  );
}
