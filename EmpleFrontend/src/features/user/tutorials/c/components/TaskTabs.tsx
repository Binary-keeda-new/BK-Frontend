import React, { useState, useRef } from "react";
import { CONTENT, MCQ, DEBUG, DRAG_DROP, COMPLETE_EXERCISES, shuffle } from "../data/cTutorial";
import { Badge, CodeBlock, renderHighlightedText } from "./CommonComponents";
import { BookOpen, Brain, Bug, Edit3, Shuffle, ChevronRight, RotateCcw, CheckCircle2, AlertCircle, Trophy, Target, ThumbsUp } from "lucide-react";

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
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Overview Card */}
      <div 
        className="p-5 rounded-xl border"
        style={{ background: "rgba(255, 255, 255, 0.01)", borderColor: "var(--border)" }}
      >
        <span 
          className="text-[10px] font-bold uppercase tracking-wider font-mono"
          style={{ color: "var(--orange)" }}
        >
          Chapter Overview
        </span>
        <p className="text-sm text-[var(--muted2)] mt-2 leading-relaxed font-medium">{c.description}</p>
      </div>

      {/* Grid of Key Points */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {c.points.map((p, i) => (
          <div 
            key={i} 
            className="p-4 rounded-xl border transition-all hover:bg-white/[0.01]"
            style={{ background: "var(--surface2)", borderColor: "var(--border)" }}
          >
            <h5 className="text-xs font-bold text-[var(--text)] mb-1.5">{p.heading}</h5>
            <div className="text-[12px] text-[var(--muted2)] leading-relaxed whitespace-pre-wrap">{renderHighlightedText(p.body)}</div>
          </div>
        ))}
      </div>

      {/* Example Code */}
      <div className="space-y-2">
        <span 
          className="text-[10px] font-bold uppercase tracking-wider font-mono block"
          style={{ color: "var(--orange)" }}
        >
          Example Code
        </span>
        <CodeBlock code={c.code} />
      </div>

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
  const questions = MCQ[chapter];
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
    const correctAns = (questions[current] as any).ans !== undefined ? (questions[current] as any).ans : (questions[current] as any).correctAnswer;
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

        <button 
          onClick={reset}
          className="w-full max-w-xs py-3 hover:opacity-95 active:scale-95 transition text-sm font-bold rounded-xl text-white shadow-[0_0_15px_rgba(255,100,0,0.2)]"
          style={{ background: "var(--orange)" }}
        >
          Try Again
        </button>
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
            background: selected === q.ans ? "rgba(16, 185, 129, 0.04)" : "rgba(239, 68, 68, 0.04)",
            borderColor: selected === q.ans ? "rgba(16, 185, 129, 0.25)" : "rgba(239, 68, 68, 0.25)"
          }}
        >
          <div className="mt-0.5 shrink-0">
            {selected === q.ans ? (
              <CheckCircle2 size={16} className="text-emerald-400" />
            ) : (
              <AlertCircle size={16} className="text-rose-400" />
            )}
          </div>
          <div className="space-y-1">
            <h5 
              className="text-xs font-bold font-mono uppercase tracking-wider"
              style={{ color: selected === q.ans ? "#34d399" : "#f87171" }}
            >
              {selected === q.ans ? "Correct Explanation" : "Incorrect Answer"}
            </h5>
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
export function DebugTab({ chapter, onXP }: TabProps) {
  const data = DEBUG[chapter];
  const [code, setCode] = useState(data.buggy);
  const [revealed, setRevealed] = useState([false, false, false]);
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);

  const revealHint = (i: number) => {
    setRevealed(r => r.map((v, idx) => idx === i ? true : v));
  };

  const handleCheck = () => {
    const norm = (s: string) => {
      let clean = s.replace(/\/\/.*$/gm, "");
      clean = clean.replace(/\/\*[\s\S]*?\*\//g, "");
      clean = clean.replace(/\\n/g, "");
      return clean.replace(/\s+/g, " ").trim();
    };
    const isOk = norm(code) === norm(data.fixed);
    setCorrect(isOk);
    setSubmitted(true);
    if (isOk) onXP(25);
  };

  const handleReset = () => {
    setCode(data.buggy);
    setRevealed([false, false, false]);
    setSubmitted(false);
    setCorrect(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div 
        className="p-4 rounded-xl border flex gap-3 items-start"
        style={{ background: "var(--surface2)", borderColor: "var(--border)" }}
      >
        <Bug className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--orange)" }} />
        <div>
          <h5 className="text-xs font-bold text-[var(--text)]">Debugging Lab</h5>
          <p className="text-[11px] text-[var(--muted2)] mt-0.5 leading-relaxed">{data.instructions}</p>
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider font-mono block text-[var(--muted2)]">Expected Output</span>
        <pre 
          className="p-3 border rounded-xl text-xs font-mono text-[var(--text)] whitespace-pre-wrap"
          style={{ background: "rgba(255, 255, 255, 0.01)", borderColor: "var(--border)" }}
        >
          {data.expectedOutput}
        </pre>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-wider font-mono block text-[var(--muted2)]">Editable Console</label>
        <textarea 
          value={code} 
          onChange={e => { setCode(e.target.value); setSubmitted(false); }}
          className="w-full min-h-[180px] border rounded-xl p-4 text-xs font-mono outline-none leading-relaxed resize-none transition"
          style={{
            background: "var(--surface2)",
            borderColor: submitted ? (correct ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)") : "var(--border)",
            color: "var(--text)"
          }}
        />
      </div>

      <div className="space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider font-mono block text-[var(--muted2)]">Hint Dashboard</span>
        <div className="flex flex-wrap gap-2">
          {data.hints.map((h, i) => (
            <button 
              key={i} 
              onClick={() => revealHint(i)}
              className="px-3 py-1.5 rounded-lg text-[10px] font-bold border transition"
              style={{
                background: revealed[i] ? "rgba(16,185,129,0.08)" : "rgba(255,255,255,0.02)",
                borderColor: revealed[i] ? "rgba(16,185,129,0.25)" : "var(--border)",
                color: revealed[i] ? "#34d399" : "var(--orange)"
              }}
            >
              {revealed[i] ? `💡 ${h}` : `Hint ${i + 1}`}
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
          {correct ? "✅ Perfect! All compilation errors resolved." : "❌ Syntax error detected. Inspect the hints and double check variables."}
        </div>
      )}

      {submitted && !correct && (
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider font-mono block text-[var(--muted2)]">Correct Solution Reference</span>
          <CodeBlock code={data.fixed} />
        </div>
      )}

      <div className="flex gap-2">
        <button 
          onClick={handleCheck} 
          className="flex-1 py-2.5 hover:opacity-95 active:scale-95 transition text-xs font-bold rounded-lg text-white shadow-md"
          style={{ background: "var(--orange)" }}
        >
          Check Code
        </button>
        <button 
          onClick={handleReset} 
          className="p-2.5 border rounded-lg text-[var(--muted2)] hover:text-white transition active:scale-95"
          style={{ background: "rgba(255,255,255,0.02)", borderColor: "var(--border)" }}
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ─── COMPLETE PANEL ───
export function CompleteTab({ chapter, onXP }: TabProps) {
  const exercises = COMPLETE_EXERCISES[chapter];
  const [idx] = useState(0);
  const [inputs, setInputs] = useState<string[]>(exercises[0].blanks.map(() => ""));
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const ex = exercises[idx];

  const updateInput = (i: number, val: string) => {
    const a = [...inputs];
    a[i] = val;
    setInputs(a);
    setSubmitted(false);
  };

  const handleCheck = () => {
    const ok = inputs.every((v, i) => ex.blanks[i]?.split("|").includes(v.trim()));
    setCorrect(ok);
    setSubmitted(true);
    if (ok) onXP(20);
  };

  const handleReset = () => {
    setInputs(ex.blanks.map(() => ""));
    setSubmitted(false);
    setCorrect(false);
  };

  const parts = ex.template.split("___");
  let blankCount = 0;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div 
        className="p-4 rounded-xl border flex gap-3 items-start"
        style={{ background: "var(--surface2)", borderColor: "var(--border)" }}
      >
        <Edit3 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--orange)" }} />
        <div>
          <h5 className="text-xs font-bold text-[var(--text)]">Fill in the Blanks</h5>
          <p className="text-[11px] text-[var(--muted2)] mt-0.5 leading-relaxed">{ex.instruction}</p>
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
              const isCellCorrect = ex.blanks[bi]?.split("|").includes(inputs[bi]?.trim());
              
              let bg = "var(--surface)";
              let border = "var(--border)";
              let color = "var(--orange)";
              
              if (submitted) {
                bg = isCellCorrect ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)";
                border = isCellCorrect ? "rgba(16,185,129,0.25)" : "rgba(239,68,68,0.25)";
                color = isCellCorrect ? "#34d399" : "#f87171";
              }

              return (
                <input
                  key={bi}
                  value={inputs[bi] || ""}
                  onChange={e => updateInput(bi, e.target.value)}
                  placeholder="?"
                  style={{ 
                    width: `${Math.max(ex.blanks[bi]?.length || 4, 3) + 2}ch`,
                    background: bg,
                    borderBottom: `2px solid ${border}`,
                    color,
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none"
                  }}
                  className="mx-1.5 px-2 py-0.5 rounded-none text-center font-bold font-mono outline-none transition text-xs shadow-none focus:border-[var(--orange)] focus:bg-white/5"
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

      {submitted && !correct && ex.answer && (
        <div className="space-y-2 animate-fadeIn">
          <span className="text-[10px] font-bold uppercase tracking-wider font-mono block text-[var(--muted2)]">Correct Solution Reference</span>
          <CodeBlock code={ex.answer} />
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
    </div>
  );
}

// ─── ARRANGE PANEL ───
export function ArrangeTab({ chapter, onXP }: TabProps) {
  const data = DRAG_DROP[chapter];
  const [items, setItems] = useState(() => shuffle(data.lines));
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  
  const dragItem = useRef<number | null>(null);
  const dragOver = useRef<number | null>(null);

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
    .map(id => data.lines.find(line => line.id === id)?.text || "")
    .join("\n");

  return (
    <div className="space-y-6 animate-fadeIn">
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
        {items.map((item, i) => {
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
              <span className="text-gray-600 font-mono text-xs flex-shrink-0 select-none">⠿</span>
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
    </div>
  );
}
