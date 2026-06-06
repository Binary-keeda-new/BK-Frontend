import React from 'react';
import { Sparkles } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex gap-3 max-w-[85%] mr-auto" style={{ animation: 'message-in 0.3s ease forwards' }}>
      <div className="flex-shrink-0 mt-1">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--orange)] to-orange-400 flex items-center justify-center shadow-[0_0_15px_rgba(241,90,34,0.3)]">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl py-4 px-5 flex items-center gap-1.5 h-[52px]">
        <div className="w-2 h-2 rounded-full bg-[var(--muted)] animate-[bounce-dot_1.4s_infinite_ease-in-out_both] [animation-delay:-0.32s]" />
        <div className="w-2 h-2 rounded-full bg-[var(--muted)] animate-[bounce-dot_1.4s_infinite_ease-in-out_both] [animation-delay:-0.16s]" />
        <div className="w-2 h-2 rounded-full bg-[var(--muted)] animate-[bounce-dot_1.4s_infinite_ease-in-out_both]" />
      </div>
    </div>
  );
}
