import React, { useState } from "react";
import { CheckCircle2, Copy } from "lucide-react";
import { InlineMath } from 'react-katex';

interface BadgeProps {
  text: string;
  color: "green" | "red" | "yellow" | "blue" | "purple";
}

export function Badge({ text, color }: BadgeProps) {
  const colorMap = {
    green: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    red: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
    yellow: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    blue: "bg-sky-500/10 text-sky-400 border border-sky-500/20",
    purple: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono tracking-wide ${colorMap[color]}`}>
      {text}
    </span>
  );
}


interface CodeBlockProps {
  code: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderCode = (codeText: string) => {
    const regex = /(\/\*[\s\S]*?\*\/|\/\/.*)/g;
    const parts = codeText.split(regex);
    return parts.map((part, i) => {
      if (part.startsWith('//') || part.startsWith('/*')) {
        return <span key={i} className="text-[#8a8a9a]">{part}</span>;
      }
      return <span key={i} className="text-[var(--orange)]">{part}</span>;
    });
  };

  return (
    <div 
      className="relative rounded-xl overflow-hidden border"
      style={{ background: "var(--surface2)", borderColor: "var(--border)" }}
    >
      <div 
        className="flex justify-between items-center px-4 py-2 border-b"
        style={{ background: "rgba(255, 255, 255, 0.01)", borderColor: "var(--border)" }}
      >
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-rose-500/80" />
          <div className="w-2 h-2 rounded-full bg-amber-500/80" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
        </div>
        <button 
          onClick={copyToClipboard}
          className="flex items-center gap-1 px-2.5 py-1 text-[#8a8a9a] hover:text-white rounded-lg text-xs font-semibold border active:scale-95 transition-all"
          style={{ background: "rgba(255,255,255,0.03)", borderColor: "var(--border)" }}
        >
          {copied ? (
            <>
              <CheckCircle2 size={12} className="text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-[13px] font-mono leading-relaxed max-h-96">
        <code>{renderCode(code)}</code>
      </pre>
    </div>
  );
}

export function renderHighlightedText(text: string): React.ReactNode {
  if (!text) return null;

  // Match markdown images, text in triple backticks, single backticks, **bold**, $math$, <u> tags, (GATE...), operators, or safe programming terms
  const regex = /(!\[.*?\]\(.*?\)|```[\s\S]*?```|`[^`]+`|\*\*[^*]+\*\*|\$[^$]+\$|<u>[^<]+<\/u>|\(\s*GATE[^)]+\)|&&|\|\||==|!=|<=|>=|\+\+|--|\+=|-=|\*=|\/=|%=|\b(?:int|float|double|char|void|boolean|String|printf(?:\(\))?|scanf(?:\(\))?|println(?:\(\))?|print\(\)|sizeof(?:\(\))?|malloc(?:\(\))?|free\(\)|main\(\)|fgets(?:\(\))?|fflush(?:\(\))?|System\.out\.println(?:\(\))?|System\.out\.print(?:\(\))?|#define|#include|stdio\.h|math\.h|string\.h|stdlib\.h|gcc|javac|JVM)\b)/gi;

  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;

        if (part.match(/^!\[(.*?)\]\((.*?)\)$/)) {
          const m = part.match(/^!\[(.*?)\]\((.*?)\)$/);
          return (
             <img key={i} src={m![2]} alt={m![1]} className="my-4 rounded-xl border max-w-full shadow-lg" style={{ borderColor: "var(--border)" }} />
          );
        }

        if (part.startsWith("```") && part.endsWith("```")) {
          let content = part.slice(3, -3).trim();
          const firstLine = content.split('\n')[0].trim();
          if (firstLine.match(/^[a-z]+$/i)) {
             content = content.substring(content.indexOf('\n') + 1);
          }
          return (
            <div key={i} className="my-4 overflow-x-auto w-full">
              <pre className="p-4 rounded-xl border font-mono text-[11px] leading-tight" style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--orange)" }}>
                {content}
              </pre>
            </div>
          );
        }
        
        if (part.startsWith("`") && part.endsWith("`")) {
          const content = part.slice(1, -1);
          return (
            <code 
              key={i} 
              className="px-1.5 py-0.5 rounded font-mono text-[11px] bg-white/[0.08] text-[var(--orange)] border border-white/5 mx-0.5 font-bold whitespace-pre-wrap break-words"
            >
              {content}
            </code>
          );
        }

        if (part.startsWith("**") && part.endsWith("**")) {
          const content = part.slice(2, -2);
          if (content.toUpperCase().includes("GATE")) {
            return (
              <strong 
                key={i} 
                className="font-extrabold text-[var(--orange)] bg-[rgba(255,100,0,0.1)] px-1.5 py-0.5 rounded border border-[var(--orange)] whitespace-nowrap ml-1 mr-1 text-[11px]"
              >
                {content}
              </strong>
            );
          }
          return (
            <strong 
              key={i} 
              className="font-bold text-white"
            >
              {content}
            </strong>
          );
        }

        if (part.startsWith("(") && part.toUpperCase().includes("GATE") && part.endsWith(")")) {
          return (
            <strong 
              key={i} 
              className="font-extrabold text-[var(--orange)] bg-[rgba(255,100,0,0.1)] px-1.5 py-0.5 rounded border border-[var(--orange)] whitespace-nowrap ml-1 mr-1 text-[11px]"
            >
              {part}
            </strong>
          );
        }

        if (part.startsWith("$") && part.endsWith("$") && part.length > 1) {
          const content = part.slice(1, -1);
          return (
            <span key={i} className="text-white/90 text-[15px] inline-block mx-1">
              <InlineMath math={content} />
            </span>
          );
        }

        if (part.startsWith("<u>") && part.endsWith("</u>")) {
          const content = part.slice(3, -4);
          return (
            <span 
              key={i} 
              className="font-bold text-white"
            >
              {content}
            </span>
          );
        }

        const isOperator = /^(&&|\|\||==|!=|<=|>=|\+\+|--|\+=|-=|\*=|\/=|%=)$/.test(part);
        const isAutoKeyword = /^(int|float|double|char|void|boolean|String|printf(?:\(\))?|scanf(?:\(\))?|println(?:\(\))?|print\(\)|sizeof(?:\(\))?|malloc(?:\(\))?|free\(\)|main\(\)|fgets(?:\(\))?|fflush(?:\(\))?|System\.out\.println(?:\(\))?|System\.out\.print\(\)?|System\.out\.println|System\.out\.print|#define|#include|stdio\.h|math\.h|string\.h|stdlib\.h|gcc|javac|JVM)$/.test(part);
        
        if (isOperator || isAutoKeyword) {
          return (
            <code 
              key={i} 
              className="px-1.5 py-0.5 rounded font-mono text-[11px] bg-white/[0.08] text-[var(--orange)] border border-white/5 mx-0.5 font-bold whitespace-pre-wrap break-words"
            >
              {part}
            </code>
          );
        }
        
        return part;
      })}
    </>
  );
}
