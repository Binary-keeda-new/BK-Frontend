import { apiRequest } from '@/shared/utils/api';
import { Job, JobFormData } from '../types/jobs.types';

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export async function getAllJobs(): Promise<Job[]> {
  const result = await apiRequest<ApiResponse<Job[]>>(
    '/api/v1/admin/jobs',
    {
      method: 'GET',
    }
  );

  return result.data;
}

export async function createJob(data: JobFormData): Promise<Job> {
  const result = await apiRequest<ApiResponse<Job>>(
    '/api/v1/admin/jobs',
    {
      method: 'POST',
      body: JSON.stringify(data),
    }
  );

  return result.data;
}

export async function updateJob(
  id: string,
  data: JobFormData
): Promise<Job> {
  const result = await apiRequest<ApiResponse<Job>>(
    `/api/v1/admin/jobs/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(data),
    }
  );

  return result.data;
}

export async function deleteJob(id: string): Promise<void> {
  await apiRequest<ApiResponse<null>>(
    `/api/v1/admin/jobs/${id}`,
    {
      method: 'DELETE',
    }
  );
}