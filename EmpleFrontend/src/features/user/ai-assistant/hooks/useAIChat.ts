import { useState, useCallback } from 'react';
import { ChatMessage } from '../types/aiAssistant.types';
import { sendChatMessage } from '../services/ai.service';
import { useSession } from '@descope/nextjs-sdk/client';

export function useAIChat() {
  const { sessionToken } = useSession();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || !sessionToken) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // Send the entire history EXCEPT the user message we just appended locally
      const reply = await sendChatMessage(content, messages, sessionToken);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [messages, sessionToken]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return { messages, isLoading, error, sendMessage, clearChat };
}
