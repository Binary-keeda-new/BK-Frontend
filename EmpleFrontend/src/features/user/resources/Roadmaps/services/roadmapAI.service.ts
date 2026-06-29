import {
  GeneratedRoadmap,
  RoadmapAnswers,
  PersonalizedRoadmapSummary,
} from '../types/roadmapAI.types';

const BASE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/roadmap-ai`;

function authHeaders(sessionToken: string) {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionToken}`,
  };
}

async function handleResponse(res: Response) {
  if (!res.ok) {
    let detail = '';
    try {
      const errBody = await res.json();
      detail = errBody?.message || errBody?.error || JSON.stringify(errBody);
    } catch {
      detail = await res.text().catch(() => '');
    }
    console.error(`[RoadmapAI] Backend responded ${res.status}:`, detail);
    throw new Error(`Request failed (${res.status}): ${detail || 'no detail returned'}`);
  }
  return res.json();
}

/** Generates a PREVIEW roadmap only — does NOT save to DB. */
export async function generateRoadmapAPI(
  answers: RoadmapAnswers,
  sessionToken: string
): Promise<GeneratedRoadmap> {
  const res = await fetch(`${BASE}/generate`, {
    method: 'POST',
    headers: authHeaders(sessionToken),
    cache: 'no-store',
    body: JSON.stringify(answers),
  });
  const data = await handleResponse(res);
  return data.data as GeneratedRoadmap;
}

/** Permanently saves a previewed roadmap once the user finalizes it. */
export async function finalizeRoadmapAPI(
  roadmap: GeneratedRoadmap,
  sessionToken: string
): Promise<{ id: string; title: string }> {
  const res = await fetch(`${BASE}/finalize`, {
    method: 'POST',
    headers: authHeaders(sessionToken),
    cache: 'no-store',
    body: JSON.stringify(roadmap),
  });
  const data = await handleResponse(res);
  return data.data;
}

/** Fetches the lightweight list of the user's saved personalized roadmaps. */
export async function fetchMyRoadmapsAPI(
  sessionToken: string
): Promise<PersonalizedRoadmapSummary[]> {
  const res = await fetch(`${BASE}/my-roadmaps`, {
    method: 'GET',
    headers: authHeaders(sessionToken),
    cache: 'no-store',
  });
  const data = await handleResponse(res);
  return data.data as PersonalizedRoadmapSummary[];
}

/** Fetches full detail (all sections) for one personalized roadmap. */
export async function fetchMyRoadmapByIdAPI(
  id: string,
  sessionToken: string
): Promise<GeneratedRoadmap> {
  const res = await fetch(`${BASE}/my-roadmaps/${id}`, {
    method: 'GET',
    headers: authHeaders(sessionToken),
    cache: 'no-store',
  });
  const data = await handleResponse(res);
  return data.data as GeneratedRoadmap;
}

/** Deletes a personalized roadmap. */
export async function deleteMyRoadmapAPI(
  id: string,
  sessionToken: string
): Promise<void> {
  const res = await fetch(`${BASE}/my-roadmaps/${id}`, {
    method: 'DELETE',
    headers: authHeaders(sessionToken),
    cache: 'no-store',
  });
  await handleResponse(res);
}