"use client";

import { Sparkles, Send } from "lucide-react";

export default function AIAssistantWidget() {
  return (
    <div className="animated-border h-full">
      <div
        className="animated-border-inner overflow-hidden h-full flex flex-col"
        style={{ padding: "clamp(14px, 4vw, 22px)" }}
      >
        <div className="flex items-center gap-2" style={{ marginBottom: "clamp(10px, 3vw, 14px)" }}>
          <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "var(--orange-dim)", color: "var(--orange)" }}>
            <Sparkles size={14} />
          </div>
          <div
            className="font-syne font-bold"
            style={{ fontSize: "clamp(13px, 3.5vw, 15px)", color: "var(--text)" }}
          >
            Emple AI
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col overflow-y-auto mb-3 gap-3 pr-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="self-start rounded-2xl rounded-tl-sm p-3 max-w-[85%]" style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}>
            <p className="m-0 text-xs leading-relaxed" style={{ color: "var(--text)" }}>Hello! How can I help you with your career goals today?</p>
          </div>
          
          {/* Typing Indicator */}
          <div className="self-start rounded-2xl rounded-tl-sm p-3 max-w-[85%] flex items-center gap-1.5" style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: "0ms" }}></span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: "150ms" }}></span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: "300ms" }}></span>
          </div>
        </div>

        {/* Input Box */}
        <div className="relative mt-auto">
          <input 
            type="text" 
            placeholder="Ask Emple AI..." 
            className="w-full rounded-xl pl-3 py-2.5 outline-none"
            style={{ paddingRight: "36px", fontSize: "12px", background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text)", transition: "border-color 0.2s" }}
            onFocus={e => e.currentTarget.style.borderColor = "var(--orange)"}
            onBlur={e => e.currentTarget.style.borderColor = "var(--border)"}
          />
          <button className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg border-none cursor-pointer flex items-center justify-center transition-transform hover:scale-105" style={{ background: "var(--orange)", color: "white" }}>
            <Send size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
