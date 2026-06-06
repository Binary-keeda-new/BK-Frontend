import React, { useState, useRef, useEffect } from 'react';
import { useAIChat } from '../hooks/useAIChat';
import ChatBubble from './ChatBubble';
import TypingIndicator from './TypingIndicator';
import { Send, Trash2, Sparkles, MessageSquare } from 'lucide-react';

const SUGGESTED_PROMPTS = [
  "How can I improve my resume for ATS?",
  "Give me tips for a frontend interview.",
  "What skills should I learn for full-stack?",
  "How does the Emple ATS scanner work?"
];

export default function AIChatPanel() {
  const { messages, isLoading, error, sendMessage, clearChat } = useAIChat();
  const [inputValue, setInputValue] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;
    sendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[var(--bg)]">
      {/* Header Actions */}
      {messages.length > 0 && (
        <div className="flex justify-end px-4 py-2 border-b border-[var(--border)] bg-[var(--surface)]">
          <button
            onClick={clearChat}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[var(--muted)] hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Chat
          </button>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col h-full items-center justify-center text-center max-w-sm mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--orange)] to-orange-400 flex items-center justify-center shadow-[0_0_30px_rgba(241,90,34,0.3)] mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Welcome to Emple AI</h3>
            <p className="text-[var(--muted)] text-sm mb-8">
              Your intelligent career assistant. Ask me anything about resumes, interviews, or career growth.
            </p>
            <div className="w-full space-y-2">
              {SUGGESTED_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(prompt)}
                  className="w-full text-left p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--text)] hover:border-[var(--orange)] hover:text-[var(--orange)] transition-all flex items-center gap-3 group"
                >
                  <MessageSquare className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--orange)]" />
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}
            {isLoading && <TypingIndicator />}
            {error && (
              <div className="text-center p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}
            <div ref={bottomRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[var(--surface)] border-t border-[var(--border)]">
        <div className="relative flex items-end gap-2 bg-[var(--bg)] border border-[var(--border)] rounded-2xl p-2 focus-within:border-[var(--orange)] transition-colors shadow-inner">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Emple AI anything..."
            className="w-full max-h-32 min-h-[44px] bg-transparent text-[var(--text)] text-sm px-3 py-2.5 resize-none outline-none placeholder:text-[var(--muted)]"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="p-2.5 rounded-xl bg-[var(--orange)] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-500 transition-colors flex-shrink-0 mb-0.5"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="text-center mt-2">
          <p className="text-[10px] text-[var(--muted2)]">
            Emple AI can make mistakes. Consider verifying important information.
          </p>
        </div>
      </div>
    </div>
  );
}
