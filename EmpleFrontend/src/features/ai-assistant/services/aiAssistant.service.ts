const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function handleResponse(response: Response) {
  const data = await response.json();
  
  if (!response.ok || !data.success) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }
  
  return data;
}

export async function checkConnectionStatus(sessionToken?: string): Promise<boolean> {
  const headers: Record<string, string> = {};
  if (sessionToken) {
    headers['Authorization'] = `Bearer ${sessionToken}`;
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/ai-assistant/status`, {
    method: 'GET',
    headers,
  });

  const data = await handleResponse(response);
  return data.connected;
}

export async function connectGemini(apiKey: string, sessionToken?: string): Promise<string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (sessionToken) {
    headers['Authorization'] = `Bearer ${sessionToken}`;
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/ai-assistant/connect`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ apiKey }),
  });

  const data = await handleResponse(response);
  return data.message;
}

export async function disconnectGemini(sessionToken?: string): Promise<string> {
  const headers: Record<string, string> = {};
  if (sessionToken) {
    headers['Authorization'] = `Bearer ${sessionToken}`;
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/ai-assistant/disconnect`, {
    method: 'DELETE',
    headers,
  });

  const data = await handleResponse(response);
  return data.message;
}

export async function chatWithGemini(message: string, sessionToken?: string): Promise<string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (sessionToken) {
    headers['Authorization'] = `Bearer ${sessionToken}`;
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/ai-assistant/chat`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ message }),
  });

  const data = await handleResponse(response);
  return data.response;
}
