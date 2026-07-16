import React, { useRef, useEffect, useState, useCallback } from "react";
import { ChatMessage, GeneratedRoadmap } from "../types/roadmapAI.types";
import { useRoadmapChat } from "../hooks/useRoadmapChat";
import { LOGO_URL } from '@/shared/constants/assets'

const TypingDots = () => (
  <div style={{ display: "flex", gap: 4, alignItems: "center", padding: "10px 14px", background: "var(--surface2)", borderRadius: 10, width: "fit-content" }}>
    {[0, 1, 2].map((i) => (
      <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--orange)", display: "inline-block", animation: "rmBounce 1.2s ease-in-out infinite", animationDelay: `${i * 0.18}s` }} />
    ))}
    <style>{`@keyframes rmBounce{0%,80%,100%{transform:translateY(0);opacity:0.4}40%{transform:translateY(-5px);opacity:1}}`}</style>
  </div>
);

const MessageBubble = ({ msg }: { msg: ChatMessage }) => {
  if (msg.role === "bot") {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ maxWidth: "88%", padding: "10px 14px", background: "var(--surface2)", color: "var(--text)", fontSize: 13, lineHeight: 1.5, borderRadius: 10 }}>
          {msg.text}
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <div style={{ maxWidth: "82%", padding: "10px 14px", background: "var(--orange)", color: "#fff", fontSize: 13, lineHeight: 1.5, borderRadius: 10, fontWeight: 500 }}>
        {msg.text}
      </div>
    </div>
  );
};

interface CreateRoadmapPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onPreviewReady: (roadmap: GeneratedRoadmap) => void;
  onFinalized: (id: string) => void;
  onGeneratingChange: (generating: boolean) => void;
}

const MIN_WIDTH = 300;
const MAX_WIDTH = 600;
const MIN_HEIGHT = 360;
const DEFAULT_WIDTH = 340;
const DEFAULT_HEIGHT = 460;
const NAVBAR_HEIGHT = 60;  // height of your top navbar
const BOTTOM_OFFSET = 20;  // gap from bottom of viewport

const CreateRoadmapPanel: React.FC<CreateRoadmapPanelProps> = ({
  isOpen, onClose, onPreviewReady, onFinalized, onGeneratingChange,
}) => {
  const [inputVal, setInputVal] = useState("");
  const [panelWidth, setPanelWidth] = useState(DEFAULT_WIDTH);
  const [panelHeight, setPanelHeight] = useState(DEFAULT_HEIGHT);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isResizingRef = useRef<null | "top" | "right" | "corner">(null);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const startWRef = useRef(DEFAULT_WIDTH);
  const startHRef = useRef(DEFAULT_HEIGHT);

  // Max height = viewport minus navbar and bottom offset
  const getMaxHeight = () =>
    typeof window !== "undefined"
      ? window.innerHeight - NAVBAR_HEIGHT - BOTTOM_OFFSET
      : 680;

  const {
    messages, currentOpts, inputDisabled, isTyping, isGenerating, isFinalizing,
    previewRoadmap, startChat, processAnswer, finalize, sendFreeTextMessage,
  } = useRoadmapChat(onPreviewReady, onFinalized);

  useEffect(() => {
    if (isOpen) {
      setInputVal("");
      setPanelWidth(DEFAULT_WIDTH);
      setPanelHeight(DEFAULT_HEIGHT);
      startChat();
    }
  }, [isOpen]);

  useEffect(() => { onGeneratingChange(isGenerating); }, [isGenerating]);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;
    const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    if (distanceFromBottom < 100) {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
    }
  }, [messages.length]);

  useEffect(() => { if (!inputDisabled) inputRef.current?.focus(); }, [inputDisabled]);

  // ── Resize handlers ───────────────────────────────────────────────────────
  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizingRef.current) return;
    const dx = e.clientX - startXRef.current;
    const dy = e.clientY - startYRef.current;

    if (isResizingRef.current === "right" || isResizingRef.current === "corner") {
      const newW = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWRef.current + dx));
      setPanelWidth(newW);
    }
    if (isResizingRef.current === "top" || isResizingRef.current === "corner") {
      const maxH = getMaxHeight();
      const newH = Math.min(maxH, Math.max(MIN_HEIGHT, startHRef.current - dy));
      setPanelHeight(newH);
    }
  }, []);

  const onMouseUp = useCallback(() => {
    if (!isResizingRef.current) return;
    isResizingRef.current = null;
    document.body.style.userSelect = "";
    document.body.style.cursor = "";
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  const startResize = (direction: "top" | "right" | "corner") => (e: React.MouseEvent) => {
    e.preventDefault();
    isResizingRef.current = direction;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    startWRef.current = panelWidth;
    startHRef.current = panelHeight;
    document.body.style.userSelect = "none";
    document.body.style.cursor =
      direction === "top" ? "ns-resize" :
      direction === "right" ? "ew-resize" : "nesw-resize";
  };

  const showQuestionFlow = currentOpts.length > 0;
  const showFreeTextChat = !!previewRoadmap && !isGenerating;

  const handleSend = () => {
    const val = inputVal.trim();
    if (!val || inputDisabled) return;
    setInputVal("");
    if (showFreeTextChat) {
      sendFreeTextMessage(val);
    } else {
      processAnswer(val);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: BOTTOM_OFFSET,
      left: 20,
      width: panelWidth,
      height: panelHeight,
      // Hard CSS cap — panel can never grow past the navbar
      maxHeight: `calc(100vh - ${NAVBAR_HEIGHT + BOTTOM_OFFSET}px)`,
      zIndex: 1000,
      display: "flex",
      flexDirection: "column",
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 16,
      boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
      overflow: "hidden",
      animation: "rmSlideUp 0.22s cubic-bezier(0.4,0,0.2,1)",
    }}>
      <style>{`
        @keyframes rmSlideUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
        .resize-handle:hover { background: var(--orange) !important; opacity: 0.5; }
      `}</style>

      {/* ── Top resize handle ── */}
      <div
        className="resize-handle"
        onMouseDown={startResize("top")}
        style={{
          position: "absolute", top: 0, left: 12, right: 12, height: 4,
          cursor: "ns-resize", zIndex: 10, borderRadius: 4,
          background: "transparent", transition: "background 0.15s",
        }}
      />

      {/* ── Right resize handle ── */}
      <div
        className="resize-handle"
        onMouseDown={startResize("right")}
        style={{
          position: "absolute", top: 12, right: 0, bottom: 12, width: 4,
          cursor: "ew-resize", zIndex: 10, borderRadius: 4,
          background: "transparent", transition: "background 0.15s",
        }}
      />

      {/* ── Top-right corner handle ── */}
      <div
        onMouseDown={startResize("corner")}
        style={{
          position: "absolute", top: 0, right: 0, width: 14, height: 14,
          cursor: "nesw-resize", zIndex: 11, borderRadius: "0 16px 0 0",
          background: "transparent",
        }}
      />

      {/* ── Dot grid resize hint ── */}
      <div style={{
        position: "absolute", top: 6, right: 6, zIndex: 12,
        display: "flex", flexDirection: "column", gap: 2,
        opacity: 0.25, pointerEvents: "none",
      }}>
        {[0, 1, 2].map(r => (
          <div key={r} style={{ display: "flex", gap: 2 }}>
            {[0, 1, 2].map(c => (
              <div key={c} style={{ width: 2, height: 2, borderRadius: "50%", background: "var(--muted2)" }} />
            ))}
          </div>
        ))}
      </div>

      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 14px", borderBottom: "1px solid var(--border)",
        flexShrink: 0, background: "var(--surface2)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src={LOGO_URL} alt="Emple" style={{ height: 20, width: "auto", objectFit: "contain" }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>Roadmap Builder</span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "none", border: "none", color: "var(--muted2)",
            cursor: "pointer", fontSize: 20, lineHeight: 1,
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 26, height: 26, borderRadius: 6, transition: "color 0.15s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "var(--text)")}
          onMouseOut={(e) => (e.currentTarget.style.color = "var(--muted2)")}
        >×</button>
      </div>

      {/* Status bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 7,
        padding: "8px 14px", borderBottom: "1px solid var(--border)",
        background: "var(--surface)", flexShrink: 0,
      }}>
        <div style={{
          width: 6, height: 6, borderRadius: "50%",
          background: isGenerating ? "var(--orange)" : "#22c55e",
          boxShadow: isGenerating ? "0 0 5px var(--orange)" : "0 0 5px #22c55e",
        }} />
        <span style={{ fontSize: 11, color: "var(--muted2)", fontWeight: 500 }}>
          {isGenerating ? "Searching the web…" : previewRoadmap ? "Preview ready — not saved yet" : "AI-powered · ~1 min"}
        </span>
      </div>

      {/* Scrollable messages */}
      <div ref={chatContainerRef} style={{
        flex: 1, overflowY: "auto", padding: "12px 14px",
        display: "flex", flexDirection: "column",
        scrollbarWidth: "thin",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {messages.map((msg) => <MessageBubble key={msg.id} msg={msg} />)}
          {isTyping && <TypingDots />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick-pick options */}
      {showQuestionFlow && (
        <div style={{
          padding: "6px 14px", display: "flex", flexWrap: "wrap", gap: 6,
          borderTop: "1px solid var(--border)", maxHeight: 90, overflowY: "auto",
        }}>
          {currentOpts.map((opt) => (
            <button
              key={opt}
              onClick={() => previewRoadmap ? sendFreeTextMessage(opt) : processAnswer(opt)}
              style={{
                background: "transparent", border: "1px solid var(--border)",
                borderRadius: 18, padding: "4px 11px", fontSize: 11.5,
                color: "var(--muted2)", cursor: "pointer", fontWeight: 500,
                transition: "all 0.15s", whiteSpace: "nowrap",
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.color = "var(--orange)"; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted2)"; }}
            >{opt}</button>
          ))}
        </div>
      )}

      {/* Finalize button */}
      {previewRoadmap && !isGenerating && (
        <div style={{ padding: "10px 14px 0", flexShrink: 0 }}>
          <button
            onClick={finalize}
            disabled={isFinalizing}
            style={{
              width: "100%", background: "var(--orange)", border: "none",
              borderRadius: 10, padding: "10px 0", color: "#fff",
              fontSize: 13, fontWeight: 700,
              cursor: isFinalizing ? "default" : "pointer",
              opacity: isFinalizing ? 0.6 : 1, transition: "opacity 0.15s",
            }}
          >
            {isFinalizing ? "Saving…" : "✓ Finalize & Save Roadmap"}
          </button>
        </div>
      )}

      {/* Input row */}
      <div style={{
        display: "flex", gap: 7, alignItems: "center",
        padding: "10px 14px", borderTop: "1px solid var(--border)",
        flexShrink: 0, background: "var(--surface)",
      }}>
        <input
          ref={inputRef}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={inputDisabled}
          placeholder={showFreeTextChat ? "Ask for tweaks…" : "Or type your answer…"}
          style={{
            flex: 1, background: "var(--surface2)", border: "1px solid var(--border)",
            borderRadius: 8, padding: "8px 11px", color: "var(--text)", fontSize: 12.5,
            outline: "none", fontFamily: "inherit",
            opacity: inputDisabled ? 0.4 : 1, transition: "border-color 0.15s",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--orange)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
        />
        <button
          onClick={handleSend}
          disabled={inputDisabled || !inputVal.trim()}
          style={{
            background: "var(--orange)", border: "none", borderRadius: 8,
            width: 32, height: 32, display: "flex", alignItems: "center",
            justifyContent: "center", color: "#fff", fontSize: 13,
            cursor: "pointer", flexShrink: 0,
            opacity: (inputDisabled || !inputVal.trim()) ? 0.3 : 1,
            transition: "opacity 0.15s",
          }}
        >➤</button>
      </div>
    </div>
  );
};

export default CreateRoadmapPanel;