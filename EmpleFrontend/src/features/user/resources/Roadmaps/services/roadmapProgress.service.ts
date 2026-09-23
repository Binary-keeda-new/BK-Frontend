const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const BASE = `${API_URL}/api/v1/roadmap-progress`;

export async function recordRoadmapActivityAPI(
  roadmapId: string,
  sessionToken: string
): Promise<void> {
  try {
    const res = await fetch(`${BASE}/record`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionToken}`,
      },
      body: JSON.stringify({ roadmapId }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('[RoadmapProgress] Failed to record activity. Status:', res.status, 'Response:', errorText);
    }
  } catch (error) {
    console.error('[RoadmapProgress] Error calling record API:', error);
  }
}

export async function submitRoadmapRatingAPI(
  roadmapId: string,
  week: number,
  rating: number,
  sessionToken: string
): Promise<void> {
  try {
    const res = await fetch(`${BASE}/rating`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionToken}`,
      },
      body: JSON.stringify({ roadmapId, week, rating }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('[RoadmapProgress] Failed to submit rating. Status:', res.status, 'Response:', errorText);
    }
  } catch (error) {
    console.error('[RoadmapProgress] Error calling rating API:', error);
  }
}

export async function fetchRoadmapRatingsAPI(): Promise<any> {
  try {
    const res = await fetch(`${BASE}/ratings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!res.ok) return { globalAverage: 0, roadmapRatings: {} };
    
    const data = await res.json();
    return data.data || { globalAverage: 0, roadmapRatings: {} };
  } catch (error) {
    console.error('[RoadmapProgress] Error fetching ratings:', error);
    return { globalAverage: 0, roadmapRatings: {} };
  }
}

export const fetchActivePathsCountAPI = async (token: string): Promise<number> => {
  try {
    const res = await fetch(`${BASE}/active-paths`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!res.ok) return 0;
    
    const data = await res.json();
    return data.count || 0;
  } catch (error) {
    console.error('[RoadmapProgress] Error fetching active paths count:', error);
    return 0;
  }
};

// Fetches the total distinct learners count
export async function fetchLearnersCountAPI(): Promise<number> {
  try {
    const res = await fetch(`${BASE}/learners-count`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Disable caching to ensure we get fresh data every time
      cache: 'no-store',
    });
    
    if (!res.ok) return 0;
    
    const data = await res.json();
    return data.count || 0;
  } catch (error) {
    console.error('[RoadmapProgress] Error fetching learners count:', error);
    return 0;
  }
}
