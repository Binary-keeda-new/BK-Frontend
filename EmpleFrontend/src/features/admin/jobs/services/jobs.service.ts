import { Job, JobFormData } from '../types/jobs.types';

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/admin/jobs`;

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export async function getAllJobs(): Promise<Job[]> {
  const res = await fetch(API_BASE, { cache: 'no-store' });
  const result: ApiResponse<Job[]> = await res.json();

  if (!res.ok) {
    throw new Error(result.message || 'Failed to fetch jobs');
  }

  return result.data;
}

export async function createJob(data: JobFormData): Promise<Job> {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result: ApiResponse<Job> = await res.json();

  if (!res.ok) {
    throw new Error(result.message || 'Failed to create job');
  }

  return result.data;
}

export async function updateJob(id: string, data: JobFormData): Promise<Job> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result: ApiResponse<Job> = await res.json();

  if (!res.ok) {
    throw new Error(result.message || 'Failed to update job');
  }

  return result.data;
}

export async function deleteJob(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || 'Failed to delete job');
  }
}
