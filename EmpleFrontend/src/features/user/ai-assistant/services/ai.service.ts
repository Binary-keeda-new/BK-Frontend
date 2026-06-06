import { ChatMessage } from '../types/aiAssistant.types';

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/ai/chat`;

type AiChatResponse = { success: boolean; message?: string; data: { reply: string } };

export async function sendChatMessage(message: string, history: ChatMessage[], token: string): Promise<string> {
  // Format history for backend
  const formattedHistory = history.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: msg.content
  }));

  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ message, history: formattedHistory })
  });

  const result: AiChatResponse = await res.json();
  
  if (!res.ok || !result.success) {
    throw new Error(result.message || 'Failed to get response from AI');
  }
  
  return result.data.reply;
}
