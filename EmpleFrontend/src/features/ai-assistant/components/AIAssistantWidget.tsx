"use client";

import { useState, useEffect, useRef } from "react";
import { Settings, Send, Bot, Sparkles, Key, Loader2, User, CheckCircle2, ChevronLeft, LogOut, Copy, Check, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useSession } from "@descope/nextjs-sdk/client";
import {
  checkConnectionStatus,
  connectGemini,
  disconnectGemini,
  chatWithGemini,
} from "../services/aiAssistant.service";

type Message = {
  role: "user" | "assistant";
  content: string;
};

interface AIAssistantWidgetProps {
  onClose?: () => void;
}

export default function AIAssistantWidget({ onClose }: AIAssistantWidgetProps = {}) {
  const { session, sessionToken: hookSessionToken, isAuthenticated, isSessionLoading } = useSession() as any;
  const sessionToken = hookSessionToken || session?.sessionJwt || session?.jwt;

  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [apiKeyInput, setApiKeyInput] = useState("");
  const [isSavingKey, setIsSavingKey] = useState(false);
  const [errorText, setErrorText] = useState("");

  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (sessionToken) {
      checkStatus();
    } else if (!isSessionLoading && !isAuthenticated) {
      setIsLoading(false);
    }
  }, [sessionToken, isSessionLoading, isAuthenticated]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isSending]);

  const checkStatus = async () => {
    try {
      const connected = await checkConnectionStatus(sessionToken);
      setIsConnected(connected);
    } catch (error) {
      console.error("Failed to check AI connection status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveKey = async () => {
    if (!apiKeyInput.trim()) {
      setErrorText("API Key cannot be empty");
      return;
    }

    setIsSavingKey(true);
    setErrorText("");

    try {
      await connectGemini(apiKeyInput.trim(), sessionToken);
      setIsConnected(true);
      setShowModal(false);
      setApiKeyInput("");
      setShowSettings(false);
    } catch (error: any) {
      setErrorText(error.message || "Failed to save key");
    } finally {
      setIsSavingKey(false);
    }
  };

  const handleDisconnect = async () => {
    setIsSavingKey(true);
    try {
      await disconnectGemini(sessionToken);
      setIsConnected(false);
      setShowSettings(false);
      setMessages([]);
    } catch (error: any) {
      console.error("Failed to disconnect", error);
    } finally {
      setIsSavingKey(false);
    }
  };

  const handleSendMessage = async () => {
    if (!currentInput.trim() || isSending) return;

    const newMessages = [...messages, { role: "user", content: currentInput.trim() } as Message];
    setMessages(newMessages);
    setCurrentInput("");
    setIsSending(true);

    try {
      const response = await chatWithGemini(newMessages[newMessages.length - 1].content, sessionToken);
      setMessages([...newMessages, { role: "assistant", content: response }]);
    } catch (error: any) {
      setMessages([...newMessages, { role: "assistant", content: `**Error:** ${error.message || "Something went wrong"}` }]);
    } finally {
      setIsSending(false);
      // Refocus input
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-[var(--surface)]">
        <Loader2 className="w-8 h-8 text-[var(--orange)] animate-spin" />
      </div>
    );
  }

  // 1) MODAL
  if (showModal) {
    return (
      <div className="h-full w-full flex flex-col bg-[var(--surface)] text-white font-sans p-6 items-center justify-center relative">
        <button
          onClick={() => {
            setShowModal(false);
            setErrorText("");
          }}
          className="absolute top-6 left-6 text-gray-400 hover:text-white transition"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center p-2 mb-6">
          <img src="/logo-isolated.png" alt="Emple" className="w-full h-full object-contain" />
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Connect Gemini</h2>
        <p className="text-sm text-gray-400 mb-8 text-center px-4">
          Your key is encrypted before storage and is never displayed after saving.
        </p>

        <div className="w-full max-w-xs flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-300 ml-1">Gemini API Key</label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="Paste your Gemini API key"
                className="w-full bg-[#1b1f23] border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[var(--orange)] focus:ring-1 focus:ring-[var(--orange)] transition"
              />
            </div>
            {errorText && <span className="text-xs text-red-500 mt-1 ml-1">{errorText}</span>}
          </div>

          <button
            onClick={handleSaveKey}
            disabled={isSavingKey}
            className="w-full flex items-center justify-center gap-2 bg-[var(--orange)] hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition"
          >
            {isSavingKey ? <Loader2 size={18} className="animate-spin" /> : "Save Key"}
          </button>
        </div>
      </div>
    );
  }

  // 2) ONBOARDING
  if (!isConnected) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center bg-[var(--surface)] text-white font-sans p-6 text-center">
        <div className="w-20 h-20 bg-[#1b1f23] rounded-full flex items-center justify-center border border-gray-800 mb-6 relative">
          <img src="/logo-isolated.png" alt="Emple Logo" className="w-10 h-10 object-contain scale-110" />
          <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-1.5 border-4 border-[var(--surface)]">
            <Sparkles size={14} className="text-white" />
          </div>
        </div>
        
        <h2 className="text-[22px] font-bold mb-1">Emple AI</h2>
        <p className="text-[13px] font-medium text-blue-400 mb-4 bg-blue-500/10 px-3 py-1 rounded-full">
          Powered by Gemini
        </p>
        
        <p className="text-[14px] text-gray-400 leading-relaxed mb-8 max-w-[260px]">
          Connect your Gemini API key to unlock AI-powered assistance inside Emple.
        </p>

        <button
          onClick={() => setShowModal(true)}
          className="w-full max-w-[240px] flex items-center justify-center gap-2 bg-[var(--orange)] hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition shadow-lg shadow-orange-500/20 mb-4"
        >
          Connect Gemini
        </button>

        <a 
          href="https://aistudio.google.com/app/apikey" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-gray-400 hover:text-white underline transition"
        >
          How do I get a Gemini API key?
        </a>
      </div>
    );
  }

  // 3) SETTINGS
  if (showSettings) {
    return (
      <div className="h-full w-full flex flex-col bg-[var(--surface)] text-white font-sans">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border)] shrink-0">
          <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-white transition">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-semibold">Settings</h2>
        </div>

        <div className="flex-1 p-5 space-y-6">
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Connection</h3>
            <div className="bg-[#1b1f23] rounded-xl border border-[var(--border)] overflow-hidden">
              <div className="px-4 py-3 flex items-center justify-between border-b border-[var(--border)]">
                <span className="text-sm font-medium">Status</span>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md">
                  <CheckCircle2 size={14} /> Connected
                </div>
              </div>
              <div className="px-4 py-3 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-300">API Key</span>
                <span className="text-sm font-mono text-gray-500">••••••••••••</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Actions</h3>
            <div className="bg-[#1b1f23] rounded-xl border border-[var(--border)] overflow-hidden flex flex-col">
              <button 
                onClick={() => setShowModal(true)}
                className="px-4 py-3 flex items-center gap-3 text-sm font-medium hover:bg-white/5 transition border-b border-[var(--border)] text-left"
              >
                <Key size={16} className="text-gray-400" />
                Change Gemini Key
              </button>
              <button 
                onClick={handleDisconnect}
                disabled={isSavingKey}
                className="px-4 py-3 flex items-center gap-3 text-sm font-medium text-red-400 hover:bg-red-400/10 transition text-left"
              >
                {isSavingKey ? <Loader2 size={16} className="animate-spin" /> : <LogOut size={16} />}
                Disconnect Gemini
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4) CHAT UI
  return (
    <div className="h-full w-full flex flex-col bg-[var(--surface)] text-white font-sans relative">
      {/* Header */}
      <div className="p-4 border-b border-[var(--border)] flex items-center justify-between bg-[#111827] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 border border-gray-700/50 bg-[#1f2937]/30 rounded-xl flex items-center justify-center p-1 shrink-0">
            <img src="/logo-isolated.png" alt="Emple" className="w-full h-full object-contain" />
          </div>
          <div>
            <h2 className="text-[18px] font-bold text-white mb-0.5">Emple AI</h2>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <div className="w-1.5 h-1.5 bg-[#00e676] rounded-full"></div>
              Powered by Gemini
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
          >
            <Settings className="w-5 h-5" />
          </button>
          {onClose && (
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4 mb-20">
            <div className="w-16 h-16 mb-4 flex items-center justify-center">
              <img src="/logo-isolated.png" alt="Emple" className="w-full h-full object-contain opacity-90" />
            </div>
            <h3 className="text-lg font-medium text-gray-300 mb-2">Hi! I'm Emple AI.</h3>
            <p className="text-sm text-gray-500">Ask me anything about careers, code, or interviews.</p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-[var(--orange)]" : "bg-[#1f2937] border border-gray-700"}`}>
              {msg.role === "user" ? <User size={16} className="text-white" /> : <Bot size={16} className="text-blue-400" />}
            </div>
            
            <div className={`group flex flex-col max-w-[85%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
              <div 
                className={`px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed ${
                  msg.role === "user" 
                    ? "bg-[var(--orange)] text-white rounded-tr-sm" 
                    : "bg-[#1f2937] text-gray-100 rounded-tl-sm border border-gray-700/50"
                }`}
              >
                {msg.role === "user" ? (
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                ) : (
                  <div className="prose prose-invert max-w-none prose-p:my-1 prose-pre:bg-black/50 prose-pre:border prose-pre:border-gray-800 prose-pre:m-0 prose-pre:p-3 prose-code:text-orange-300 prose-code:bg-orange-500/10 prose-code:px-1 prose-code:rounded">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                )}
              </div>
              
              {msg.role === "assistant" && (
                <button 
                  onClick={() => copyToClipboard(msg.content, idx)}
                  className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] text-gray-400 hover:text-white px-1"
                >
                  {copiedIndex === idx ? <Check size={12} className="text-emerald-400"/> : <Copy size={12}/>}
                  {copiedIndex === idx ? "Copied" : "Copy"}
                </button>
              )}
            </div>
          </div>
        ))}
        
        {isSending && (
          <div className="flex gap-3 flex-row">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-[#1f2937] border border-gray-700">
              <Bot size={16} className="text-blue-400" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-[#1f2937] text-gray-100 rounded-tl-sm border border-gray-700/50 flex flex-col gap-1 items-start justify-center">
               <Loader2 size={16} className="animate-spin text-gray-400" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-[var(--border)] bg-[var(--surface)] shrink-0">
        <div className="relative bg-[#111827] border border-gray-700 rounded-xl focus-within:border-gray-500 transition flex items-end overflow-hidden">
          <textarea
            ref={inputRef}
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Emple AI..."
            className="w-full bg-transparent text-sm text-white resize-none outline-none py-3 pl-3 pr-10 max-h-[120px] min-h-[44px]"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            rows={Math.min(4, currentInput.split('\n').length)}
          />
          <button
            onClick={handleSendMessage}
            disabled={!currentInput.trim() || isSending}
            className="absolute right-2 bottom-2 w-7 h-7 flex items-center justify-center bg-[var(--orange)] hover:bg-orange-600 disabled:opacity-50 disabled:hover:bg-[var(--orange)] text-white rounded-lg transition"
          >
            <Send size={14} className="ml-0.5" />
          </button>
        </div>
        <div className="text-center mt-2">
          <span className="text-[10px] text-gray-500 font-medium tracking-wide">AI CAN MAKE MISTAKES. VERIFY IMPORTANT INFO.</span>
        </div>
      </div>
    </div>
  );
}
