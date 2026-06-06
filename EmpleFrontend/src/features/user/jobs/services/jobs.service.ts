import { Job } from '../types/jobs.types';

export async function fetchJobs(): Promise<Job[]> {
  const res = await fetch('http://localhost:5000/api/v1/jobs', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch jobs');
  }

  return res.json();
}