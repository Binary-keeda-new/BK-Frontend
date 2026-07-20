"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { searchSiteRoutes, SiteRoute } from "./siteRoutes";
import { LOGO_URL } from '@/shared/constants/assets'

interface ChatEntry {
  id: string;
  role: "bot" | "user";
  text: string;
  matches?: SiteRoute[];
}

const WELCOME_TEXT =
  "Hi! I'm Emple Bot 👋 — your friendly guide to this site. Tell me what you're looking for, like \"roadmap\", \"jobs\", or \"ats scanner\", and I'll take you right there.";

const FOLLOW_UP_TEXT =
  "Hope this was useful! Let me know if you want to explore something else too.";

// Paths where the widget should stay hidden (landing page, auth flow, team page)
const HIDDEN_ON = (pathname: string) =>
  pathname === "/" ||
  pathname.startsWith("/auth") ||
  pathname.startsWith("/dashboard") ||
  pathname.startsWith("/admin") ||
  pathname.startsWith("/team"); 
const HelpChatWidget: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [entries, setEntries] = useState<ChatEntry[]>([]);
  const [inputVal, setInputVal] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && entries.length === 0) {
      setEntries([{ id: "welcome", role: "bot", text: WELCOME_TEXT }]);
    }
  }, [isOpen, entries.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 200);
  }, [isOpen]);

  // Hide entirely on the landing page, auth pages, and the team page.
  // Shows on every other route, including Dashboard and all modules.
  if (HIDDEN_ON(pathname)) {
    return null;
  }

  // Closes the widget AND resets the conversation, so reopening always
  // starts fresh instead of resuming the previous chat.
  const handleClose = () => {
    setIsOpen(false);
    setEntries([]);
    setInputVal("");
  };

  const handleSend = () => {
    const query = inputVal.trim();
    if (!query) return;
    setInputVal("");

    const userEntry: ChatEntry = { id: `${Date.now()}-u`, role: "user", text: query };
    const matches = searchSiteRoutes(query);

    const botEntry: ChatEntry = {
      id: `${Date.now()}-b`,
      role: "bot",
      text:
        matches.length > 0
          ? "Here's what I found:"
          : "I couldn't find a matching page. Try a different word, like \"roadmap\", \"ats\", or \"events\".",
      matches: matches.length > 0 ? matches : undefined,
    };

    if (matches.length > 0) {
      const followUpEntry: ChatEntry = {
        id: `${Date.now()}-f`,
        role: "bot",
        text: FOLLOW_UP_TEXT,
      };
      setEntries((prev) => [...prev, userEntry, botEntry, followUpEntry]);
    } else {
      setEntries((prev) => [...prev, userEntry, botEntry]);
    }
  };

  const handleNavigate = (route: SiteRoute) => {
    router.push(route.path);
    handleClose();
  };

  return (
    <>
      {/* Pulsing ring behind the button — only visible when closed */}
      {!isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "var(--orange)",
            opacity: 0.4,
            zIndex: 998,
            animation: "helpPulse 2s ease-out infinite",
            pointerEvents: "none",
          }}
        />
      )}
      <style>{`@keyframes helpPulse{0%{transform:scale(1);opacity:0.4}100%{transform:scale(1.6);opacity:0}}`}</style>

      {/* ── Floating toggle button — bottom-right, always visible ── */}
      <button
        onClick={() => (isOpen ? handleClose() : setIsOpen(true))}
        onMouseEnter={(e) => {
          setIsHovering(true);
          e.currentTarget.style.transform = "scale(1.06)";
        }}
        onMouseLeave={(e) => {
          setIsHovering(false);
          e.currentTarget.style.transform = "scale(1)";
        }}
        aria-label="Open help chat"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "var(--orange)",
          border: "none",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 999,
          color: "#fff",
          fontSize: 24,
          transition: "transform 0.15s ease",
        }}
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}
      </button>

      {/* ── Hover tooltip — "Need help?" — only shows when closed ── */}
      {isHovering && !isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 40,
            right: 90,
            background: "var(--surface2)",
            color: "var(--text)",
            border: "1px solid var(--border)",
            borderRadius: 10,
            padding: "7px 14px",
            fontSize: 13,
            fontWeight: 600,
            whiteSpace: "nowrap",
            zIndex: 999,
            boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
            animation: "helpTooltipFade 0.15s ease",
            pointerEvents: "none",
          }}
        >
          Need help? 👋
          <div
            style={{
              position: "absolute",
              right: -5,
              top: "50%",
              transform: "translateY(-50%) rotate(45deg)",
              width: 10,
              height: 10,
              background: "var(--surface2)",
              borderRight: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
            }}
          />
        </div>
      )}
      <style>{`@keyframes helpTooltipFade{from{opacity:0;transform:translateX(6px)}to{opacity:1;transform:translateX(0)}}`}</style>

      {/* ── Chat panel — fixed size, bottom-right, above the toggle ── */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 92,
            right: 24,
            width: 320,
            height: 420,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 998,
            animation: "helpSlideUp 0.2s ease",
          }}
        >
          <style>{`@keyframes helpSlideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>

          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 14px",
              borderBottom: "1px solid var(--border)",
              background: "var(--surface2)",
              flexShrink: 0,
            }}
          >
            <img src={LOGO_URL} alt="Emple" style={{ height: 20, width: "auto", objectFit: "contain" }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", display: "flex", alignItems: "center", gap: 6 }}>
                Emple Bot
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 5px #22c55e", display: "inline-block" }} />
              </div>
              <div style={{ fontSize: 10.5, color: "var(--muted2)" }}>Your site guide</div>
            </div>
            <button
              onClick={handleClose}
              style={{
                marginLeft: "auto",
                background: "none",
                border: "none",
                color: "var(--muted2)",
                cursor: "pointer",
                fontSize: 18,
                display: "flex",
                alignItems: "center",
              }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "12px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {entries.map((entry) => (
              <div key={entry.id}>
                {entry.role === "bot" ? (
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        maxWidth: "90%",
                        padding: "9px 12px",
                        background: "var(--surface2)",
                        color: "var(--text)",
                        fontSize: 13,
                        lineHeight: 1.5,
                        borderRadius: 10,
                      }}
                    >
                      {entry.text}
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div
                      style={{
                        maxWidth: "80%",
                        padding: "9px 12px",
                        background: "var(--orange)",
                        color: "#fff",
                        fontSize: 13,
                        lineHeight: 1.5,
                        borderRadius: 10,
                        fontWeight: 500,
                      }}
                    >
                      {entry.text}
                    </div>
                  </div>
                )}

                {entry.matches && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
                    {entry.matches.map((route) => (
                      <button
                        key={route.path}
                        onClick={() => handleNavigate(route)}
                        style={{
                          textAlign: "left",
                          background: "var(--surface)",
                          border: "1px solid var(--border)",
                          borderRadius: 10,
                          padding: "10px 12px",
                          cursor: "pointer",
                          transition: "border-color 0.15s",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.borderColor = "var(--orange)")}
                        onMouseOut={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                      >
                        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--orange)" }}>
                          → {route.label}
                        </div>
                        <div style={{ fontSize: 11.5, color: "var(--muted2)", marginTop: 2 }}>
                          {route.description}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              padding: "10px 12px",
              borderTop: "1px solid var(--border)",
              background: "var(--surface2)",
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="e.g. roadmap, ats, events…"
              style={{
                flex: 1,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "8px 11px",
                color: "var(--text)",
                fontSize: 12.5,
                outline: "none",
                fontFamily: "inherit",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--orange)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            />
            <button
              onClick={handleSend}
              disabled={!inputVal.trim()}
              style={{
                background: "var(--orange)",
                border: "none",
                borderRadius: 8,
                width: 34,
                height: 34,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 14,
                cursor: "pointer",
                flexShrink: 0,
                opacity: !inputVal.trim() ? 0.35 : 1,
                transition: "opacity 0.15s",
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpChatWidget;