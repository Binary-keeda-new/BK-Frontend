import React from 'react';
import { ChatMessage } from '../types/aiAssistant.types';
import { Sparkles, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatBubbleProps {
  message: ChatMessage;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div 
      className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
      style={{ animation: 'message-in 0.3s ease forwards' }}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 mt-1">
        {isUser ? (
          <div className="w-8 h-8 rounded-full bg-[var(--surface2)] flex items-center justify-center border border-[var(--border)]">
            <User className="w-4 h-4 text-[var(--muted2)]" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--orange)] to-orange-400 flex items-center justify-center shadow-[0_0_15px_rgba(241,90,34,0.3)]">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      {/* Bubble */}
      <div 
        className={`rounded-2xl p-4 text-sm leading-relaxed ${
          isUser 
            ? 'bg-gradient-to-br from-[var(--orange)] to-orange-500 text-white shadow-md' 
            : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]'
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="prose prose-sm prose-invert max-w-none 
            prose-p:leading-relaxed prose-p:mb-3 last:prose-p:mb-0 
            prose-li:my-1 prose-ul:my-3 prose-ol:my-3 
            prose-a:text-[var(--orange)] hover:prose-a:underline
            prose-strong:text-white prose-strong:font-semibold">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
