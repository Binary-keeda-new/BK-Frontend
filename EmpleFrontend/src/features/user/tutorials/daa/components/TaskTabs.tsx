// @ts-nocheck
import React, { useState, useRef } from "react";
import { CONTENT, MCQS, DEBUG_EXERCISES, DRAG_EXERCISES, COMPLETE_EXERCISES } from "../data/daaTutorial";
import { Badge, CodeBlock, renderHighlightedText } from "./CommonComponents";
import { BookOpen, Brain, Bug, Edit3, Shuffle, ChevronRight, ChevronDown, ChevronUp, RotateCcw, CheckCircle2, AlertCircle, Trophy, Target, ThumbsUp } from "lucide-react";

// Utility function to shuffle arrays for exercises
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

interface TabProps {
  chapter: string;
  onXP: (pts: number) => void;
}

// ─── LEARN PANEL ───
export function LearnTab({ 
  chapter, 
  onXP, 
  isCompleted 
}: { 
  chapter: string; 
  onXP: (pts: number) => void; 
  isCompleted: boolean; 
}) {
  const c = CONTENT[chapter];
  if (!c) {
    return (
      <div className="py-20 text-center animate-fadeIn">
        <h3 className="text-2xl font-bold text-white mb-2">Coming Soon!</h3>
        <p className="text-[var(--muted2)]">The content for this chapter is currently being developed.</p>
      </div>
    );
  }
  
  const [expandedPoints, setExpandedPoints] = useState<Record<number, boolean>>({ 0: true });
  const [currentPart, setCurrentPart] = useState(0);
  const [activeCodeTab, setActiveCodeTab] = useState<string>("C");

  // Dynamically merge implementation points into a single item with language tabs
  const processedPoints: any[] = [];
  let implementationPoint: any = null;

  c.points.forEach(p => {
    const title = (p.heading || (p as any).title || "");
    if (title.toLowerCase().includes("implementation")) {
      if (!implementationPoint) {
        implementationPoint = {
          isImplementationMerged: true,
          title: "6. Implementation Code",
          implementations: []
        };
        processedPoints.push(implementationPoint);
      }
      
      let lang = "C";
      if (title.toLowerCase().includes("java")) lang = "Java";
      else if (title.toLowerCase().includes("python")) lang = "Python";
      else if (title.toLowerCase().includes("c++") || title.toLowerCase().includes("cpp")) lang = "C++";
      
      let code = (p as any).code || "";
      const body = (p as any).body || (p as any).content || (p as any).description || (p as any).text || "";
      
      if (!code && body.includes("```")) {
        const match = body.match(/```(\w+)?\n([\s\S]*?)```/);
        if (match) {
          code = match[2].trim();
        }
      } else if (!code) {
        code = body; // fallback
      }
      
      implementationPoint.implementations.push({
        language: lang,
        code: code
      });
    } else {
      processedPoints.push(p);
    }
  });

  const itemsPerPart = Math.max(1, Math.ceil(processedPoints.length / 3));
  const currentPoints = processedPoints.slice(currentPart * itemsPerPart, (currentPart + 1) * itemsPerPart);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Premium Overview Card */}
      <div 
        className="relative p-7 rounded-2xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-md"
        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)" }}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--orange)] to-rose-500 opacity-80" />
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] font-mono text-transparent bg-clip-text bg-gradient-to-r from-[var(--orange)] to-rose-400">
          Chapter Overview
        </span>
        <p className="text-[15px] text-white/80 mt-3 leading-relaxed font-medium text-justify">{c.description}</p>
      </div>

      {/* Premium Article Layout */}
      <div 
        className="p-8 rounded-2xl border border-white/5 shadow-2xl"
        style={{ background: "linear-gradient(to bottom, var(--surface), var(--bg))" }}
      >
        <div className="flex flex-wrap gap-2 mb-6">
          {Array.from({ length: Math.ceil(processedPoints.length / itemsPerPart) }).map((_, idx) => {
            return (
              <button 
                key={idx}
                onClick={() => {
                  setCurrentPart(idx);
                  setExpandedPoints({ [idx * itemsPerPart]: true });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${currentPart === idx ? 'bg-[var(--orange)] text-white shadow-[0_0_15px_rgba(241,90,34,0.3)]' : 'bg-white/5 text-[var(--muted2)] hover:bg-white/10 hover:text-white'}`}
              >
                Part {idx + 1}
              </button>
            );
          })}
        </div>
        <div className="space-y-6">
          {currentPoints.map((p: any, localIdx: number) => {
            const i = currentPart * itemsPerPart + localIdx;
            return (
              <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:w-1 before:h-6 before:bg-gradient-to-b before:from-[var(--orange)] before:to-rose-500 before:rounded-full group border-b border-white/5 pb-4 last:border-0 last:pb-0">
                <h3 
                  className="text-[18px] sm:text-xl font-bold text-white tracking-tight cursor-pointer flex justify-between items-center select-none hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[var(--orange)] hover:to-rose-400 transition-all duration-300"
                  onClick={() => setExpandedPoints(prev => ({ ...prev, [i]: !prev[i] }))}
                >
                  {p.heading || p.title}
                  {expandedPoints[i] ? (
                    <ChevronUp size={20} className="text-[var(--muted2)] flex-shrink-0 ml-4 group-hover:text-[var(--orange)] transition-colors" />
                  ) : (
                    <ChevronDown size={20} className="text-[var(--muted2)] flex-shrink-0 ml-4 group-hover:text-[var(--orange)] transition-colors" />
                  )}
                </h3>
                {expandedPoints[i] && (
                  <div className="mt-4 animate-fadeIn">
                    {p.isImplementationMerged ? (
                      <div className="bg-[var(--surface)] p-4 rounded-xl border border-white/5">
                        <div className="flex gap-2 mb-3 border-b border-white/5 pb-3">
                          {p.implementations.map((impl: any) => {
                            const currentTab = p.implementations.some((i: any) => i.language === activeCodeTab) ? activeCodeTab : p.implementations[0]?.language;
                            const isSelected = currentTab === impl.language;
                            return (
                              <button 
                                key={impl.language}
                                onClick={(e) => { e.stopPropagation(); setActiveCodeTab(impl.language); }}
                                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition ${isSelected ? "bg-[var(--orange)] text-white shadow-md" : "bg-white/5 text-[var(--muted2)] hover:bg-white/10 hover:text-white"}`}
                              >
                                {impl.language}
                              </button>
                            );
                          })}
                        </div>
                        <CodeBlock code={p.implementations.find((impl: any) => impl.language === (p.implementations.some((i: any) => i.language === activeCodeTab) ? activeCodeTab : p.implementations[0]?.language))?.code || ""} />
                      </div>
                    ) : (
                      <div className="text-[15px] text-[var(--muted2)] leading-relaxed whitespace-pre-wrap font-medium text-justify">
                        {renderHighlightedText(p.body || p.content || p.description || p.text || "")}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Example Code Window */}
      {c.code && (
        <div className="mt-8 space-y-3">
           <span className="text-[10px] font-mono text-[var(--muted2)] ml-2 uppercase tracking-[0.15em] block">
             Example Code 
             {c.codeDescription && (
               <span className="text-white/60 normal-case ml-2 text-[11px] font-sans tracking-normal hidden sm:inline-block">
                 - {c.codeDescription}
               </span>
             )}
           </span>
           <CodeBlock code={c.code} />
        </div>
      )}

      {/* Complete Lesson Button */}
      <div className="pt-4 flex justify-start border-t" style={{ borderColor: "var(--border)" }}>
        <button
          disabled={isCompleted}
          onClick={() => onXP(10)}
          className="px-5 py-2.5 rounded-lg text-xs font-bold transition duration-200 outline-none border flex items-center gap-2 select-none"
          style={{
            background: isCompleted ? "var(--surface2)" : "var(--orange)",
            borderColor: isCompleted ? "var(--border)" : "transparent",
            color: isCompleted ? "var(--muted2)" : "#fff",
            cursor: isCompleted ? "default" : "pointer"
          }}
        >
          {isCompleted ? "Lesson Completed ✓" : "Complete Lesson"}
        </button>
      </div>
    </div>
  );
}

// ─── MCQ PANEL ───
export function MCQTab({ chapter, onXP }: TabProps) {
  const questions = MCQS[chapter];
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [answered, setAnswered] = useState(false);

  const reset = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setAnswered(false);
  };

  const handleChoose = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const correctAns = questions[current].ans !== undefined ? questions[current].ans : questions[current].correctAnswer;
    if (idx === correctAns) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setDone(true);
      onXP(score === questions.length ? 30 : score * 6);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    
    let config = { color: "#f43f5e", icon: BookOpen, message: "Keep practicing! Review the material and try again.", title: "Needs Work" };
    if (pct >= 90) config = { color: "#10b981", icon: Trophy, message: "Outstanding! You're a true master of this topic.", title: "Excellent!" };
    else if (pct >= 70) config = { color: "var(--orange)", icon: Target, message: "Great job! You have a solid understanding.", title: "Good Job!" };
    else if (pct >= 50) config = { color: "#eab308", icon: ThumbsUp, message: "Good effort! A little more practice will help.", title: "Not Bad!" };
    
    const Icon = config.icon;

    return (
      <div className="py-8 animate-fadeIn flex flex-col items-center justify-center">
        <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle cx="64" cy="64" r="56" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
            <circle cx="64" cy="64" r="56" fill="transparent" stroke={config.color} strokeWidth="8" strokeDasharray="351.86" strokeDashoffset={351.86 - (351.86 * pct) / 100} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] bg-[#0f111a]">
             <Icon size={32} color={config.color} />
             <span className="text-xl font-bold mt-1 text-white">{pct}%</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">{config.title}</h3>
        <p className="text-sm text-[var(--muted2)] text-center max-w-[250px] leading-relaxed mb-6">
          {config.message}
        </p>

        <div className="flex items-center gap-4 mb-8 w-full max-w-xs p-4 rounded-xl border" style={{ background: "var(--surface2)", borderColor: "var(--border)" }}>
           <div className="flex-1 text-center">
             <div className="text-xs text-[var(--muted2)] mb-1 uppercase tracking-wider font-mono">Score</div>
             <div className="text-lg font-bold text-white">{score} <span className="text-xs text-[var(--muted2)] font-normal">/ {questions.length}</span></div>
           </div>
           <div className="w-px h-10 bg-white/10" />
           <div className="flex-1 text-center">
             <div className="text-xs text-[var(--muted2)] mb-1 uppercase tracking-wider font-mono">Status</div>
             <Badge text="Completed" color="purple" />
           </div>
        </div>

        <div className="w-full pb-8 border-b flex justify-center" style={{ borderColor: "var(--border)" }}>
          <button 
            onClick={reset}
            className="w-full max-w-xs py-3 hover:opacity-95 active:scale-95 transition text-sm font-bold rounded-xl text-white shadow-[0_0_15px_rgba(255,100,0,0.2)]"
            style={{ background: "var(--orange)" }}
          >
            Try Again
          </button>
        </div>

        <div className="text-left space-y-6 pt-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--muted2)]">Question Review</h4>
          {questions.map((quest: any, idx: number) => {
            const questionText = quest.q || quest.question || "";
            const correctAns = quest.ans !== undefined ? quest.ans : quest.correctAnswer;
            return (
              <div key={idx} className="p-5 rounded-xl border space-y-3" style={{ background: "var(--surface2)", borderColor: "var(--border)" }}>
                <h5 className="text-sm font-semibold text-[var(--text)] leading-relaxed">
                  <span className="text-[var(--orange)] mr-2">{idx + 1}.</span>
                  {renderHighlightedText(questionText)}
                </h5>
                <div className="bg-[rgba(16,185,129,0.04)] border border-[rgba(16,185,129,0.25)] rounded-lg p-3">
                  <p className="text-xs font-medium text-emerald-400 mb-2 font-mono uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 size={14} /> Correct Answer
                  </p>
                  <p className="text-sm text-white/90">{quest.options[correctAns]}</p>
                </div>
                <div className="mt-2 text-xs text-[var(--muted2)] leading-relaxed">
                  <strong className="text-white/70 mr-1">Explanation:</strong>
                  {renderHighlightedText(quest.explanation)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const q = questions[current];
  const questionText = q.q || (q as any).question || "";
  const correctAns = (q as any).ans !== undefined ? (q as any).ans : (q as any).correctAnswer;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <Badge text={`Question ${current + 1} of ${questions.length}`} color="blue" />
        <Badge text={`Score ${score}`} color="purple" />
      </div>

      <div 
        className="p-5 rounded-xl border"
        style={{ background: "var(--surface2)", borderColor: "var(--border)" }}
      >
        <h4 className="text-sm font-semibold text-[var(--text)] leading-relaxed">{renderHighlightedText(questionText)}</h4>
      </div>

      <div className="space-y-3">
        {q.options.map((opt, i) => {
          let bg = "var(--surface2)";
          let border = "var(--border)";
          let color = "var(--muted2)";
          
          if (answered) {
            if (i === correctAns) {
              bg = "rgba(16, 185, 129, 0.08)";
              border = "rgba(16, 185, 129, 0.25)";
              color = "#34d399";
            } else if (i === selected) {
              bg = "rgba(239, 68, 68, 0.08)";
              border = "rgba(239, 68, 68, 0.25)";
              color = "#f87171";
            }
          } else if (selected === i) {
            bg = "var(--orange-dim)";
            border = "var(--orange)";
            color = "var(--orange)";
          }

          return (
            <button
              key={i}
              onClick={() => handleChoose(i)}
              disabled={answered}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-xs font-bold text-left transition"
              style={{ background: bg, borderColor: border, color }}
            >
              <span 
                className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] flex-shrink-0 font-mono"
                style={{ borderColor: border }}
              >
                {["A", "B", "C", "D"][i]}
              </span>
              <span className="flex-1">{renderHighlightedText(opt)}</span>
              {answered && i === correctAns && <span className="text-emerald-400">✓</span>}
              {answered && i === selected && i !== correctAns && <span className="text-rose-400">✗</span>}
            </button>
          );
        })}
      </div>

      {answered && (
        <div 
          className="p-4 rounded-xl border flex gap-3 animate-fadeIn"
          style={{
            background: selected === correctAns ? "rgba(16, 185, 129, 0.04)" : "rgba(239, 68, 68, 0.04)",
            borderColor: selected === correctAns ? "rgba(16, 185, 129, 0.25)" : "rgba(239, 68, 68, 0.25)"
          }}
        >
          <div className="mt-0.5 shrink-0">
            {selected === correctAns ? (
              <CheckCircle2 size={16} className="text-emerald-400" />
            ) : (
              <AlertCircle size={16} className="text-rose-400" />
            )}
          </div>
          <div className="space-y-1">
            <h5 
              className="text-xs font-bold font-mono uppercase tracking-wider"
              style={{ color: selected === correctAns ? "#34d399" : "#f87171" }}
            >
              {selected === correctAns ? "Correct Explanation" : "Incorrect Answer"}
            </h5>
            {selected !== correctAns && (
              <p className="text-xs font-medium text-white/90 mb-1">
                <span className="opacity-60">Correct Answer: </span>
                {q.options[correctAns]}
              </p>
            )}
            <p className="text-xs text-[var(--muted2)] leading-relaxed">
              {q.explanation}
            </p>
          </div>
        </div>
      )}

      {answered && (
        <button 
          onClick={handleNext}
          className="w-full py-2.5 hover:opacity-95 active:scale-95 transition text-xs font-bold rounded-lg text-white shadow-md"
          style={{ background: "var(--orange)" }}
        >
          {current + 1 < questions.length ? "Next Question" : "See Results"}
        </button>
      )}
    </div>
  );
}


// ─── DEBUG PANEL ───

function HighlightedTextarea({ value, onChange, submitted, correct }: any) {
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

  const handleScroll = (e: any) => {
    const backdrop = e.target.previousElementSibling;
    if (backdrop) {
      backdrop.scrollTop = e.target.scrollTop;
      backdrop.scrollLeft = e.target.scrollLeft;
    }
  };

  return (
    <div 
      className="relative w-full h-[250px] rounded-xl overflow-hidden border transition" 
      style={{
        background: "var(--surface)",
        borderColor: submitted ? (correct ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)") : "var(--border)",
      }}
    >
      <pre 
        className="absolute inset-0 p-4 m-0 text-xs font-mono leading-relaxed overflow-y-auto whitespace-pre-wrap break-words pointer-events-none"
        aria-hidden="true"
      >
        {renderCode(value)}
        <br />
      </pre>
      <textarea
        value={value}
        onChange={onChange}
        onScroll={handleScroll}
        className="absolute inset-0 w-full h-full p-4 m-0 text-xs font-mono leading-relaxed resize-none outline-none whitespace-pre-wrap break-words bg-transparent"
        style={{ color: 'transparent', caretColor: 'white' }}
        spellCheck={false}
      />
    </div>
  );
}

function DebugBlock({ data, index, total, onXP, onNext }: { data: any, index: number, total: number, onXP: (pts: number) => void, onNext: () => void }) {
  const [code, setCode] = React.useState(data.buggy);
  const [revealed, setRevealed] = React.useState<Record<number, boolean>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [correct, setCorrect] = React.useState(false);

  React.useEffect(() => {
    setCode(data.buggy);
    setRevealed({});
    setSubmitted(false);
    setCorrect(false);
  }, [data]);

  const revealHint = (i: number) => setRevealed(prev => ({ ...prev, [i]: true }));

  const handleCheck = () => {
    const ok = code.replace(/\s+/g,"") === data.fixed.replace(/\s+/g,"");
    setCorrect(ok);
    setSubmitted(true);
    if (ok) onXP(25);
  };

  const handleReset = () => {
    setCode(data.buggy);
    setRevealed({});
    setSubmitted(false);
    setCorrect(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-8">
      <div className="flex justify-between items-center">
        <Badge text={`Question ${index + 1} of ${total}`} color="blue" />
      </div>
      <div 
        className="p-4 rounded-xl border flex gap-3 items-start"
        style={{ background: "var(--surface2)", borderColor: "var(--border)" }}
      >
        <Bug className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--orange)" }} />
        <div className="flex-1">
          <h5 className="text-xs font-bold text-[var(--text)]">Debugging Lab</h5>
          <p className="text-[11px] text-[var(--muted2)] mt-0.5 leading-relaxed">{data.instructions}</p>
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider font-mono block text-[var(--muted2)]">Expected Output</span>
        <pre 
          className="p-3 border rounded-xl text-xs font-mono text-[var(--text)] whitespace-pre-wrap"
          style={{ background: "rgba(0, 0, 0, 0.2)", borderColor: "var(--border)" }}
        >
          {data.expectedOutput}
        </pre>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-wider font-mono block text-[var(--muted2)]">Editable Console</label>
        <HighlightedTextarea 
          value={code} 
          onChange={(e: any) => { setCode(e.target.value); setSubmitted(false); }}
          submitted={submitted}
          correct={correct}
        />
      </div>

      <div className="flex gap-3">
        <button 
          onClick={handleCheck}
          className="flex-1 py-3 hover:opacity-95 active:scale-95 transition text-sm font-bold rounded-xl text-white shadow-[0_0_15px_rgba(255,100,0,0.2)]"
          style={{ background: "var(--orange)" }}
        >
          Compile & Test
        </button>
        <button 
          onClick={handleReset}
          className="px-5 py-3 hover:opacity-95 active:scale-95 transition text-sm font-bold rounded-xl border flex items-center gap-2"
          style={{ background: "var(--surface2)", borderColor: "var(--border)", color: "var(--text)" }}
        >
          <RotateCcw size={16} /> Reset
        </button>
      </div>

      <div className="space-y-2 pt-2 border-t" style={{ borderColor: "var(--border)" }}>
        <span className="text-[10px] font-bold uppercase tracking-wider font-mono block text-[var(--muted2)]">Hint Dashboard</span>
        <div className="flex flex-col gap-2">
          {data.hints.map((h: string, i: number) => (
            <button 
              key={i} 
              onClick={() => revealHint(i)}
              className="px-4 py-3 rounded-lg text-[11px] font-bold border transition text-left flex gap-3"
              style={{
                background: revealed[i] ? "rgba(16,185,129,0.08)" : "rgba(255,255,255,0.02)",
                borderColor: revealed[i] ? "rgba(16,185,129,0.25)" : "var(--border)",
                color: revealed[i] ? "#34d399" : "var(--orange)"
              }}
            >
              <span className="shrink-0">{revealed[i] ? "💡" : `🔒 Hint ${i + 1}`}</span>
              <span>{revealed[i] ? h : "Click to reveal hint..."}</span>
            </button>
          ))}
        </div>
      </div>

      {submitted && (
        <div 
          className="p-4 rounded-xl border animate-fadeIn text-xs leading-relaxed"
          style={{
            background: correct ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)",
            borderColor: correct ? "rgba(16,185,129,0.25)" : "rgba(239,68,68,0.25)",
            color: correct ? "#34d399" : "#f87171"
          }}
        >
          {correct ? "✅ Perfect! All compilation errors resolved." : "❌ Logical or syntax error detected. Inspect the hints and double check conditions."}
        </div>
      )}

      {submitted && !correct && (
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider font-mono block text-[var(--muted2)]">Correct Solution Reference</span>
          <CodeBlock code={data.fixed} />
        </div>
      )}

      {correct && index < total - 1 && (
        <button 
          onClick={onNext}
          className="w-full mt-4 py-2.5 hover:opacity-95 active:scale-95 transition text-xs font-bold rounded-lg text-white shadow-md"
          style={{ background: "var(--orange)" }}
        >
          Next Question
        </button>
      )}
      {correct && index === total - 1 && (
        <div className="mt-4 p-4 text-center rounded-xl border" style={{ background: "rgba(16,185,129,0.08)", borderColor: "rgba(16,185,129,0.25)", color: "#34d399" }}>
          🎉 You've completed all debugging exercises for this chapter!
        </div>
      )}
    </div>
  );
}

export function DebugTab({ chapter, onXP }: TabProps) {
  const rawData = DEBUG_EXERCISES[chapter];
  if (!rawData) return <div className="text-[var(--muted2)] text-xs text-center p-8 border rounded-xl border-dashed border-white/10">No debug exercises available.</div>;
  
  const exercises = Array.isArray(rawData) ? rawData : [rawData];
  const processedData = exercises.map(ex => ({
    instructions: ex.instructions || ex.problemStatement || "Find and fix the bug in the code below.",
    expectedOutput: ex.expectedOutput || "No specific output provided.",
    hints: Array.isArray(ex.hints) ? ex.hints : ["Review the code logic carefully.", "Check your loop conditions.", "Verify all variable initializations."],
    buggy: ex.buggyC || ex.buggy || ex.code || "// Code coming soon",
    fixed: ex.fixedC || ex.fixed || ex.solution || ""
  }));

  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset index when chapter changes
  React.useEffect(() => {
    setCurrentIndex(0);
  }, [chapter]);

  return (
    <div className="space-y-8">
      {processedData.length > 0 && (
        <DebugBlock 
          data={processedData[currentIndex]} 
          index={currentIndex} 
          total={processedData.length} 
          onXP={onXP} 
          onNext={() => setCurrentIndex(i => i + 1)} 
        />
      )}
    </div>
  );
}

// ─── COMPLETE PANEL ───

function CompleteBlock({ data, index, total, onXP, onNext }: { data: any, index: number, total: number, onXP: (pts: number) => void, onNext: () => void }) {
  const [inputs, setInputs] = useState<string[]>(data.blanks.map(() => ""));
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);

  React.useEffect(() => {
    setInputs(data.blanks.map(() => ""));
    setSubmitted(false);
    setCorrect(false);
  }, [data]);

  const updateInput = (i: number, val: string) => {
    const a = [...inputs];
    a[i] = val;
    setInputs(a);
    setSubmitted(false);
  };

  const handleCheck = () => {
    const ok = inputs.every((v, i) => data.blanks[i]?.split("|").includes(v.trim()));
    setCorrect(ok);
    setSubmitted(true);
    if (ok) onXP(20);
  };

  const handleReset = () => {
    setInputs(data.blanks.map(() => ""));
    setSubmitted(false);
    setCorrect(false);
  };

  const parts = data.template.split(/\/\*\[BLANK\]\*\/|___/);
  let blankCount = 0;

  return (
    <div className="space-y-6 animate-fadeIn pb-8">
      <div className="flex justify-between items-center">
        <Badge text={`Question ${index + 1} of ${total}`} color="blue" />
      </div>
      <div 
        className="p-4 rounded-xl border flex gap-3 items-start"
        style={{ background: "var(--surface2)", borderColor: "var(--border)" }}
      >
        <Edit3 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--orange)" }} />
        <div>
          <h5 className="text-xs font-bold text-[var(--text)]">Fill in the Blanks</h5>
          <p className="text-[11px] text-[var(--muted2)] mt-0.5 leading-relaxed">{data.instruction}</p>
        </div>
      </div>

      <div 
        className="p-5 rounded-xl border text-xs font-mono leading-loose whitespace-pre overflow-x-auto"
        style={{ background: "var(--surface2)", borderColor: "var(--border)", color: "var(--text)" }}
      >
        {parts.map((part: any, pi: any) => (
          <span key={pi}>
            <span>{part}</span>
            {pi < parts.length - 1 && (() => {
              const bi = blankCount++;
              const isCellCorrect = data.blanks[bi]?.split("|").includes(inputs[bi]?.trim());
              
              let bg = "rgba(255, 100, 0, 0.1)"; 
              let border = "1px dashed var(--orange)"; 
              let color = "var(--orange)";
              
              if (submitted) {
                bg = isCellCorrect ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)";
                border = isCellCorrect ? "1px solid #34d399" : "1px solid #f87171";
                color = isCellCorrect ? "#34d399" : "#f87171";
              }

              return (
                <input
                  key={bi}
                  value={inputs[bi] || ""}
                  onChange={e => updateInput(bi, e.target.value)}
                  placeholder="?"
                  style={{ 
                    width: `${Math.max(data.blanks[bi]?.length || 4, 3) + 2}ch`,
                    background: bg,
                    border: border,
                    color,
                  }}
                  className="mx-1.5 px-2 py-0.5 rounded-[4px] text-center font-bold font-mono outline-none transition text-xs shadow-[0_0_8px_rgba(255,100,0,0.1)] focus:border-[var(--orange)] focus:shadow-[0_0_12px_rgba(255,100,0,0.3)] focus:bg-[rgba(255,100,0,0.15)] placeholder:text-[var(--orange)] placeholder:opacity-70"
                />
              );
            })()}
          </span>
        ))}
      </div>

      {submitted && (
        <div 
          className="p-4 rounded-xl border text-xs animate-fadeIn"
          style={{
            background: correct ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)",
            borderColor: correct ? "rgba(16,185,129,0.25)" : "rgba(239,68,68,0.25)",
            color: correct ? "#34d399" : "#f87171"
          }}
        >
          {correct ? "✅ Code compiles successfully!" : `❌ Compilation error. Incorrect inputs.`}
        </div>
      )}

      {submitted && !correct && data.answer && (
        <div className="space-y-2 animate-fadeIn">
          <span className="text-[10px] font-bold uppercase tracking-wider font-mono block text-[var(--muted2)]">Correct Solution Reference</span>
          <CodeBlock code={data.answer} />
        </div>
      )}

      <div className="flex gap-2">
        <button 
          onClick={handleCheck} 
          className="flex-1 py-2.5 hover:opacity-95 active:scale-95 transition text-xs font-bold rounded-lg text-white shadow-md"
          style={{ background: "var(--orange)" }}
        >
          Check Answers
        </button>
        <button 
          onClick={handleReset} 
          className="p-2.5 border rounded-lg text-[var(--muted2)] hover:text-white transition active:scale-95"
          style={{ background: "rgba(255,255,255,0.02)", borderColor: "var(--border)" }}
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {correct && index < total - 1 && (
        <button 
          onClick={onNext}
          className="w-full mt-4 py-2.5 hover:opacity-95 active:scale-95 transition text-xs font-bold rounded-lg text-white shadow-md"
          style={{ background: "var(--orange)" }}
        >
          Next Question
        </button>
      )}
      {correct && index === total - 1 && (
        <div className="mt-4 p-4 text-center rounded-xl border" style={{ background: "rgba(16,185,129,0.08)", borderColor: "rgba(16,185,129,0.25)", color: "#34d399" }}>
          🎉 You've completed all Fill-in-the-Blank exercises for this chapter!
        </div>
      )}
    </div>
  );
}

export function CompleteTab({ chapter, onXP }: TabProps) {
  const rawData = COMPLETE_EXERCISES[chapter];
  if (!rawData) return <div className="text-[var(--muted2)] text-xs text-center p-8 border rounded-xl border-dashed border-white/10">No complete exercises available.</div>;
  
  const exercises = Array.isArray(rawData) ? rawData : [rawData];
  const processedData = exercises.map(ex => {
    let blanks = ex.blanks || ex.missingParts || [];
    if (blanks.length > 0 && typeof blanks[0] === 'object') {
       blanks = blanks.map((b: any) => b.correct || b.correctValue || b.expected || b.answer || "");
    }
    return {
      instruction: ex.instruction || ex.description || ex.problemStatement || ex.problem || ex.title || ex.statement || "Fill in the missing code snippets.",
      template: ex.template || ex.codeTemplate || ex.code || ex.codeSnippet || ex.initialCode || ex.skeletonCode || ex.blankCode || "___",
      blanks: blanks,
      answer: ex.answer
    };
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset index when chapter changes
  React.useEffect(() => {
    setCurrentIndex(0);
  }, [chapter]);

  return (
    <div className="space-y-8">
      {processedData.length > 0 && (
        <CompleteBlock 
          data={processedData[currentIndex]} 
          index={currentIndex} 
          total={processedData.length} 
          onXP={onXP} 
          onNext={() => setCurrentIndex(i => i + 1)}
        />
      )}
    </div>
  );
}

// ─── ARRANGE PANEL ───

function ArrangeBlock({ data, index, total, onXP, onNext }: { data: any, index: number, total: number, onXP: (pts: number) => void, onNext: () => void }) {
  const [items, setItems] = useState(() => shuffle(data.lines));
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  
  const dragItem = useRef<number | null>(null);
  const dragOver = useRef<number | null>(null);

  React.useEffect(() => {
    setItems(shuffle(data.lines));
    setSubmitted(false);
    setCorrect(false);
  }, [data]);

  const onDragStart = (i: number) => { dragItem.current = i; };
  const onDragEnter = (i: number) => { dragOver.current = i; };
  const onDragEnd = () => {
    if (dragItem.current === null || dragOver.current === null) return;
    const copy = [...items];
    const dragged = copy.splice(dragItem.current, 1)[0];
    copy.splice(dragOver.current, 0, dragged);
    dragItem.current = null;
    dragOver.current = null;
    setItems(copy);
    setSubmitted(false);
  };

  const handleCheck = () => {
    const ok = items.every((item, i) => item.id === data.order[i]);
    setCorrect(ok);
    setSubmitted(true);
    if (ok) onXP(20);
  };

  const handleReset = () => {
    setItems(shuffle(data.lines));
    setSubmitted(false);
    setCorrect(false);
  };

  const correctCode = data.order
    .map((id: string) => data.lines.find((line: any) => line.id === id)?.text || "")
    .join("\n");

  return (
    <div className="space-y-6 animate-fadeIn pb-8">
      <div className="flex justify-between items-center">
        <Badge text={`Question ${index + 1} of ${total}`} color="blue" />
      </div>
      <div 
        className="p-4 rounded-xl border flex gap-3 items-start"
        style={{ background: "var(--surface2)", borderColor: "var(--border)" }}
      >
        <Shuffle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--orange)" }} />
        <div>
          <h5 className="text-xs font-bold text-[var(--text)]">Drag & Drop Assembler</h5>
          <p className="text-[11px] text-[var(--muted2)] mt-0.5 leading-relaxed">{data.instructions}</p>
        </div>
      </div>

      <div className="space-y-2">
        {items.map((item: any, i: number) => {
          const isCorrect = submitted && item.id === data.order[i];
          const isWrong = submitted && item.id !== data.order[i];
          
          let bg = "var(--surface2)";
          let border = "var(--border)";
          let color = "var(--text)";
          if (isCorrect) {
            bg = "rgba(16, 185, 129, 0.08)";
            border = "rgba(16, 185, 129, 0.25)";
            color = "#34d399";
          } else if (isWrong) {
            bg = "rgba(239, 68, 68, 0.08)";
            border = "rgba(239, 68, 68, 0.25)";
            color = "#f87171";
          }

          return (
            <div 
              key={item.id}
              draggable
              onDragStart={() => onDragStart(i)}
              onDragEnter={() => onDragEnter(i)}
              onDragEnd={onDragEnd}
              onDragOver={e => e.preventDefault()}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border cursor-grab select-none transition"
              style={{ background: bg, borderColor: border, color }}
            >
              <span className="text-gray-600 font-mono text-xs flex-shrink-0 select-none">≡</span>
              <span className="font-mono text-xs flex-1 truncate">{item.text}</span>
              {isCorrect && <span className="text-emerald-400 font-bold text-xs">✓</span>}
              {isWrong && <span className="text-rose-400 font-bold text-xs">✗</span>}
            </div>
          );
        })}
      </div>

      {submitted && (
        <div 
          className="p-4 rounded-xl border text-xs animate-fadeIn"
          style={{
            background: correct ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)",
            borderColor: correct ? "rgba(16,185,129,0.25)" : "rgba(239,68,68,0.25)",
            color: correct ? "#34d399" : "#f87171"
          }}
        >
          {correct ? "✅ Code assembled correctly!" : "❌ Compilation error. Incorrect lines order."}
        </div>
      )}

      {submitted && !correct && (
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider font-mono block text-[var(--muted2)]">Correct Solution Reference</span>
          <CodeBlock code={correctCode} />
        </div>
      )}

      <div className="flex gap-2">
        <button 
          onClick={handleCheck} 
          className="flex-1 py-2.5 hover:opacity-95 active:scale-95 transition text-xs font-bold rounded-lg text-white shadow-md"
          style={{ background: "var(--orange)" }}
        >
          Check Order
        </button>
        <button 
          onClick={handleReset} 
          className="p-2.5 border rounded-lg text-[var(--muted2)] hover:text-white transition active:scale-95"
          style={{ background: "rgba(255,255,255,0.02)", borderColor: "var(--border)" }}
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {correct && index < total - 1 && (
        <button 
          onClick={onNext}
          className="w-full mt-4 py-2.5 hover:opacity-95 active:scale-95 transition text-xs font-bold rounded-lg text-white shadow-md"
          style={{ background: "var(--orange)" }}
        >
          Next Question
        </button>
      )}
      {correct && index === total - 1 && (
        <div className="mt-4 p-4 text-center rounded-xl border" style={{ background: "rgba(16,185,129,0.08)", borderColor: "rgba(16,185,129,0.25)", color: "#34d399" }}>
          🎉 You've completed all arrangement exercises for this chapter!
        </div>
      )}
    </div>
  );
}

export function ArrangeTab({ chapter, onXP }: TabProps) {
  const rawData = DRAG_EXERCISES[chapter];
  if (!rawData) {
    return <div className="text-[var(--muted2)] text-xs text-center p-8 border rounded-xl border-dashed border-white/10">No arrangement exercises available for this chapter yet.</div>;
  }
  
  const exercises = Array.isArray(rawData) ? rawData : [rawData];

  const processedData = exercises.map(ex => {
    const instructions = ex.instructions || (ex as any).problemStatement || (ex as any).description || (ex as any).title || "Arrange the blocks in the correct order.";
    const rawLines = ex.lines || (ex as any).steps || (ex as any).blocks || (ex as any).options || (ex as any).items || [];
    
    const normalizedLines = rawLines.map((line: any, i: number) => {
      if (typeof line === 'string') return { id: i.toString(), text: line };
      return line;
    });

    let order = ex.order || (ex as any).correctOrder;
    if (!order || order.length === 0) {
      order = normalizedLines.map((line: any) => line.id);
    } else {
      order = order.map((o: any) => o.toString());
    }

    return { instructions, lines: normalizedLines, order };
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    setCurrentIndex(0);
  }, [chapter]);

  return (
    <div className="space-y-8">
      {processedData.length > 0 && (
        <ArrangeBlock 
          data={processedData[currentIndex]} 
          index={currentIndex} 
          total={processedData.length} 
          onXP={onXP} 
          onNext={() => setCurrentIndex(i => i + 1)}
        />
      )}
    </div>
  );
}
