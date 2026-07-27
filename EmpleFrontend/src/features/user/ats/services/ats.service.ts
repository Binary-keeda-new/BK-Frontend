import type {
  StandardATSResult,
  AIATSResult,
  ATSApiResponse,
} from '../types/ats.types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';


   //HELPERS

async function handleResponse<T>(response: Response): Promise<T> {
  const data: ATSApiResponse<T> = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  if (!data.data) {
    throw new Error('No data returned from the server');
  }

  return data.data;
}


   //STANDARD ATS


export async function analyzeStandard(
  file: File,
  jobDescription: string,
  sessionToken?: string,
  idempotencyKey?: string
): Promise<StandardATSResult> {
  const formData = new FormData();
  formData.append('resume', file);
  formData.append('jobDescription', jobDescription);
  if (idempotencyKey) {
    formData.append('idempotencyKey', idempotencyKey);
  }

  const headers: Record<string, string> = {};
  if (sessionToken) {
    headers['Authorization'] = `Bearer ${sessionToken}`;
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/ats/standard`, {
    method: 'POST',
    headers,
    body: formData,
  });

  return handleResponse<StandardATSResult>(response);
}


   //AI ATS


export async function analyzeAI(
  file: File,
  jobDescription: string,
  sessionToken?: string,
  idempotencyKey?: string
): Promise<AIATSResult> {
  const formData = new FormData();
  formData.append('resume', file);
  formData.append('jobDescription', jobDescription);
  if (idempotencyKey) {
    formData.append('idempotencyKey', idempotencyKey);
  }

  const headers: Record<string, string> = {};
  if (sessionToken) {
    headers['Authorization'] = `Bearer ${sessionToken}`;
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/ats/ai`, {
    method: 'POST',
    headers,
    body: formData,
  });

  return handleResponse<AIATSResult>(response);
}
