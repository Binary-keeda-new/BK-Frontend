import React, { useState, useRef } from "react";
import { CONTENT, MCQ, DEBUG, DRAG_DROP, COMPLETE_EXERCISES, shuffle } from "../data/cTutorial";
import { Badge, CodeBlock, renderHighlightedText } from "./CommonComponents";
import { BookOpen, Brain, Bug, Edit3, Shuffle, ChevronRight, ChevronDown, ChevronUp, RotateCcw, CheckCircle2, AlertCircle, Trophy, Target, ThumbsUp, Dumbbell, Lightbulb } from "lucide-react";

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
  
  const itemsPerPart = Math.ceil(c.points.length / 3);
  const currentPoints = c.points.slice(currentPart * itemsPerPart, (currentPart + 1) * itemsPerPart);

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
          {Array.from({ length: 3 }).map((_, idx) => {
            if (idx * itemsPerPart >= c.points.length) return null;
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
                  {p.heading}
                  {expandedPoints[i] ? (
                    <ChevronUp size={20} className="text-[var(--muted2)] flex-shrink-0 ml-4 group-hover:text-[var(--orange)] transition-colors" />
                  ) : (
                    <ChevronDown size={20} className="text-[var(--muted2)] flex-shrink-0 ml-4 group-hover:text-[var(--orange)] transition-colors" />
                  )}
                </h3>
                {expandedPoints[i] && (
                  <div className="text-[15px] text-[var(--muted2)] leading-relaxed whitespace-pre-wrap font-medium animate-fadeIn mt-4 text-justify">
                    {renderHighlightedText(p.body)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Premium Example Code Window */}
      {c.code && (
        <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
          <div className="px-4 py-2.5 bg-[#0a0a0f] border-b border-white/5 flex items-center gap-2">
             <div className="flex gap-1.5">
               <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
             </div>
             <span className="text-[10px] font-mono text-[var(--muted2)] ml-2 uppercase tracking-[0.15em] flex-1 truncate">
               Example Code 
               {c.codeDescription && (
                 <span className="text-white/60 normal-case ml-2 text-[11px] font-sans tracking-normal hidden sm:inline-block">
                   - {c.codeDescription}
                 </span>
               )}
             </span>
          </div>
          <div className="bg-[#161820] p-2">
            <CodeBlock code={c.code} />
          </div>
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

  if (!questions || questions.length === 0) {
    return (
      <div className="py-20 text-center animate-fadeIn">
        <h3 className="text-2xl font-bold text-white mb-2">Coming Soon!</h3>
        <p className="text-[var(--muted2)]">The quiz for this chapter is currently being developed.</p>
      </div>
    );
  }

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
    
    let config = { color: "#f43f5e", icon: Dumbbell, message: "Keep practicing! Review the material and try again.", title: "Needs Work" };
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
        <h4 className="text-sm font-semibold text-[var(--text)] leading-relaxed text-justify">{renderHighlightedText(questionText)}</h4>
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
              <span className="flex-1 text-justify">{renderHighlightedText(opt)}</span>
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
            <p className="text-xs text-[var(--muted2)] leading-relaxed text-justify">
              {selected !== correctAns && <span className="font-bold text-white mb-1 block">Correct Answer: {["A", "B", "C", "D"][correctAns]}</span>}
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
  const _raw_db = DEBUG[chapter];
  const exercises = _raw_db ? (Array.isArray(_raw_db) ? _raw_db : [_raw_db]) : [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  if (!exercises || exercises.length === 0) return null;

  const handleNext = (correct: boolean) => {
    if (correct) setScore(s => s + 1);
    if (currentIdx + 1 >= exercises.length) {
      setDone(true);
      onXP(score * 5 + (correct ? 5 : 0));
    } else {
      setCurrentIdx(i => i + 1);
    }
  };

  const reset = () => {
    setCurrentIdx(0);
    setScore(0);
    setDone(false);
  };

  if (done) {
    const pct = Math.round((score / exercises.length) * 100);
    return (
      <div className="py-8 animate-fadeIn flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold text-white mb-2">Debugging Complete!</h3>
        <p className="text-sm text-[var(--muted2)] mb-6">You fixed {score} out of {exercises.length} bugs.</p>
        <button onClick={reset} className="px-6 py-2 rounded-xl text-white font-bold" style={{ background: "var(--orange)" }}>Try Again</button>
      </div>
    );
  }

  return <DebugExercise data={exercises[currentIdx]} onNext={handleNext} current={currentIdx} total={exercises.length} />;
}

function DebugExercise({ data, onNext, current, total }: { data: any, onNext: (correct: boolean) => void, current: number, total: number }) {
  const [code, setCode] = useState(data.buggy);
  const [revealedHints, setRevealedHints] = useState<boolean[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);

  // Reset state when data changes
  React.useEffect(() => {
    setCode(data.buggy);
    setRevealedHints([]);
    setSubmitted(false);
    setCorrect(false);
  }, [data]);

  const revealHint = (index: number) => {
    setRevealedHints(prev => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
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
  };

  const getFeedback = () => {
    if (correct) return "✅ Perfect! All compilation errors resolved.";
    
    const userLines = code.split('\n').map((l: string) => l.trim());
    const fixedLines = data.fixed.split('\n').map((l: string) => l.trim());
    
    for (let i = 0; i < Math.max(userLines.length, fixedLines.length); i++) {
      const ul = userLines[i] || "";
      const fl = fixedLines[i] || "";
      if (ul !== fl) {
        if (!ul) return `❌ Error on Line ${i + 1}: Code missing here.`;
        if (!fl) return `❌ Error on Line ${i + 1}: Unexpected extra code.`;
        
        if (fl.endsWith(';') && !ul.endsWith(';')) {
          if (ul.endsWith(';;')) return `❌ Error on Line ${i + 1}: Extra semicolon detected.`;
          return `❌ Error on Line ${i + 1}: Missing semicolon.`;
        }
        if (ul.endsWith(';;')) return `❌ Error on Line ${i + 1}: Extra semicolon detected.`;
        if (fl.includes('int ') && !ul.includes('int ')) return `❌ Error on Line ${i + 1}: Missing data type declaration.`;
        if (fl.includes('#include') && !ul.includes('#include')) return `❌ Error on Line ${i + 1}: Incorrect header inclusion.`;
        
        return `❌ Syntax Error on Line ${i + 1}. Check this line carefully.`;
      }
    }
    return `❌ Syntax error detected. Double check your code.`;
  };

  const handleReset = () => {
    setCode(data.buggy);
    setRevealedHints([]);
    setSubmitted(false);
    setCorrect(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <Badge text={`Exercise ${current + 1} of ${total}`} color="blue" />
      </div>
        <div className="p-4 rounded-xl border flex gap-3 items-start" style={{ background: "var(--surface2)", borderColor: "var(--border)" }}>
          <Bug className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--orange)" }} />
          <div>
            <h5 className="text-xs font-bold text-[var(--text)]">Debugging Lab - {data.title || 'Fix the code'}</h5>
            <p className="text-[11px] text-[var(--muted2)] mt-0.5 leading-relaxed text-justify">{(data.instructions || data.instruction) || data.instruction}</p>
          </div>
        </div>
      <div className="space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider font-mono block text-[var(--muted2)]">Expected Output</span>
        <pre className="p-3 border rounded-xl text-xs font-mono text-[var(--text)] whitespace-pre-wrap" style={{ background: "rgba(255, 255, 255, 0.01)", borderColor: "var(--border)" }}>{data.expectedOutput}</pre>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-wider font-mono block text-[var(--muted2)]">Editable Console</label>
        <textarea value={code} onChange={e => { setCode(e.target.value); setSubmitted(false); }} className="w-full min-h-[180px] border rounded-xl p-4 text-xs font-mono outline-none leading-relaxed resize-none transition" style={{ background: "var(--surface2)", borderColor: submitted ? (correct ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)") : "var(--border)", color: "var(--text)" }} />
      </div>

      {(data.hints || data.hint) && (() => {
        const hintsList = data.hints || [data.hint];
        return (
        <div className="space-y-2 animate-fadeIn w-full">
          <span className="text-[10px] font-bold uppercase tracking-wider font-mono block text-[var(--muted2)]">Need Help?</span>
          <div className="flex flex-wrap gap-2">
            {hintsList.map((h: string, i: number) => (
              <React.Fragment key={i}>
                {!revealedHints[i] ? (
                  <button onClick={() => revealHint(i)} className="px-3 py-1.5 rounded-lg text-[10px] font-bold border transition bg-[rgba(255,255,255,0.02)] border-[var(--border)] text-[var(--orange)] hover:bg-[var(--orange)]/10 flex items-center gap-1.5 w-fit">
                    <Lightbulb size={12} fill="#eab308" color="#eab308" />
                    Show Hint {hintsList.length > 1 ? i + 1 : ''}
                  </button>
                ) : (
                  <div className="w-full px-3 py-2 rounded-lg text-[11px] font-medium border flex items-start gap-1.5 animate-fadeIn" style={{ background: "rgba(241,90,34,0.08)", borderColor: "rgba(241,90,34,0.25)", color: "var(--orange)" }}>
                    <Lightbulb size={14} fill="#eab308" color="#eab308" className="mt-0.5 shrink-0" />
                    <span className="text-[var(--muted2)] font-normal text-justify">{h}</span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        );
      })()}

      {submitted && (
        <div className="p-4 rounded-xl border animate-fadeIn text-xs leading-relaxed" style={{ background: correct ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)", borderColor: correct ? "rgba(16,185,129,0.25)" : "rgba(239,68,68,0.25)" }}>
          <div className="font-bold text-sm" style={{ color: correct ? "#34d399" : "#f87171" }}>{getFeedback()}</div>
        </div>
      )}
      {submitted && !correct && (
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider font-mono block text-[var(--muted2)]">Correct Solution Reference</span>
          <CodeBlock code={data.fixed} />
        </div>
      )}
      <div className="flex gap-2">
        {!submitted ? (
          <button onClick={handleCheck} className="flex-1 py-2.5 hover:opacity-95 active:scale-95 transition text-xs font-bold rounded-lg text-white shadow-md" style={{ background: "var(--orange)" }}>Check Code</button>
        ) : (
          <button onClick={() => onNext(correct)} className="flex-1 py-2.5 hover:opacity-95 active:scale-95 transition text-xs font-bold rounded-lg text-white shadow-md" style={{ background: "var(--orange)" }}>Next Exercise</button>
        )}
        <button onClick={handleReset} className="p-2.5 border rounded-lg text-[var(--muted2)] hover:text-white transition active:scale-95" style={{ background: "rgba(255,255,255,0.02)", borderColor: "var(--border)" }}><RotateCcw className="w-4 h-4" /></button>
      </div>
    </div>
  );
}

// ─── COMPLETE PANEL ───
export function CompleteTab({ chapter, onXP }: TabProps) {
  const _raw_c = COMPLETE_EXERCISES[chapter];
  const exercises = _raw_c ? (Array.isArray(_raw_c) ? _raw_c : [_raw_c]) : [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  if (!exercises || exercises.length === 0) return null;

  const handleNext = (correct: boolean) => {
    if (correct) setScore(s => s + 1);
    if (currentIdx + 1 >= exercises.length) {
      setDone(true);
      onXP(score * 5 + (correct ? 5 : 0));
    } else {
      setCurrentIdx(i => i + 1);
    }
  };

  const reset = () => {
    setCurrentIdx(0);
    setScore(0);
    setDone(false);
  };

  if (done) {
    const pct = Math.round((score / exercises.length) * 100);
    return (
      <div className="py-12 animate-fadeIn flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-2xl" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981", boxShadow: "0 0 40px rgba(16,185,129,0.2)" }}>
          <Trophy size={40} strokeWidth={1.5} />
        </div>
        <h3 className="text-3xl font-black text-white mb-3 tracking-tight">Lab Completed!</h3>
        <p className="text-[15px] font-medium text-[var(--muted2)] mb-8">You successfully solved <span className="text-white font-bold">{score}</span> out of <span className="text-white font-bold">{exercises.length}</span> exercises.</p>
        <button onClick={reset} className="px-8 py-3 rounded-xl text-white font-bold hover:scale-105 active:scale-95 transition-all shadow-lg" style={{ background: "var(--orange)", boxShadow: "0 10px 25px rgba(241,90,34,0.3)" }}>Replay Lab</button>
      </div>
    );
  }

  return <CompleteExercise data={exercises[currentIdx]} onNext={handleNext} current={currentIdx} total={exercises.length} />;
}

function CompleteExercise({ data, onNext, current, total }: { data: any, onNext: (correct: boolean) => void, current: number, total: number }) {
  const [inputs, setInputs] = useState<string[]>([]);
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
  };

  const handleReset = () => {
    setInputs(data.blanks.map(() => ""));
    setSubmitted(false);
    setCorrect(false);
  };

  const parts = data.template.split("___");
  let blankCount = 0;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <Badge text={`Exercise ${current + 1} of ${total}`} color="blue" />
      </div>
      <div className="p-4 rounded-xl border flex gap-3 items-start" style={{ background: "var(--surface2)", borderColor: "var(--border)" }}>
        <Edit3 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--orange)" }} />
        <div>
          <h5 className="text-xs font-bold text-[var(--text)]">Fill in the Blanks - {data.title || 'Exercise'}</h5>
          <p className="text-[11px] text-[var(--muted2)] mt-0.5 leading-relaxed text-justify">{data.instruction}</p>
        </div>
      </div>
      <div className="p-5 rounded-xl border text-xs font-mono leading-loose whitespace-pre overflow-x-auto" style={{ background: "var(--surface2)", borderColor: "var(--border)", color: "var(--text)" }}>
        {parts.map((part: any, pi: any) => (
          <span key={pi}>
            <span>{part}</span>
            {pi < parts.length - 1 && (() => {
              const bi = blankCount++;
              const isCellCorrect = data.blanks[bi]?.split("|").includes(inputs[bi]?.trim());
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
                  style={{ width: `${Math.max(data.blanks[bi]?.length || 4, 3) + 2}ch`, background: bg, borderBottom: `2px solid ${border}`, color, borderTop: "none", borderLeft: "none", borderRight: "none" }}
                  className="mx-1.5 px-2 py-0.5 rounded-none text-center font-bold font-mono outline-none transition text-xs shadow-none focus:border-[var(--orange)] focus:bg-white/5"
                />
              );
            })()}
          </span>
        ))}
      </div>
      {submitted && (
        <div className="p-4 rounded-xl border text-xs animate-fadeIn" style={{ background: correct ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)", borderColor: correct ? "rgba(16,185,129,0.25)" : "rgba(239,68,68,0.25)", color: correct ? "#34d399" : "#f87171" }}>
          {correct ? "✅ Code compiles successfully!" : `❌ Compilation error. Incorrect inputs.`}
        </div>
      )}
      {submitted && !correct && (
        <div className="space-y-2 animate-fadeIn">
          <span className="text-[10px] font-bold uppercase tracking-wider font-mono block text-[var(--muted2)]">Correct Solution Reference</span>
          <CodeBlock code={(() => {
            let correctCode = data.template;
            const answers = data.answer || data.blanks || [];
            answers.forEach((ans: string) => {
              correctCode = correctCode.replace(/_{2,}/, ans);
            });
            return correctCode;
          })()} />
        </div>
      )}
      <div className="flex gap-2">
        {!submitted ? (
          <button onClick={handleCheck} className="flex-1 py-2.5 hover:opacity-95 active:scale-95 transition text-xs font-bold rounded-lg text-white shadow-md" style={{ background: "var(--orange)" }}>Check Answers</button>
        ) : (
          <button onClick={() => onNext(correct)} className="flex-1 py-2.5 hover:opacity-95 active:scale-95 transition text-xs font-bold rounded-lg text-white shadow-md" style={{ background: "var(--orange)" }}>Next Exercise</button>
        )}
        <button onClick={handleReset} className="p-2.5 border rounded-lg text-[var(--muted2)] hover:text-white transition active:scale-95" style={{ background: "rgba(255,255,255,0.02)", borderColor: "var(--border)" }}><RotateCcw className="w-4 h-4" /></button>
      </div>
    </div>
  );
}

// ─── ARRANGE PANEL ───
export function ArrangeTab({ chapter, onXP }: TabProps) {
  const _raw_d = DRAG_DROP[chapter];
  const exercises = _raw_d ? (Array.isArray(_raw_d) ? _raw_d : [_raw_d]) : [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  if (!exercises || exercises.length === 0) return null;

  const handleNext = (correct: boolean) => {
    if (correct) setScore(s => s + 1);
    if (currentIdx + 1 >= exercises.length) {
      setDone(true);
      onXP(score * 5 + (correct ? 5 : 0));
    } else {
      setCurrentIdx(i => i + 1);
    }
  };

  const reset = () => {
    setCurrentIdx(0);
    setScore(0);
    setDone(false);
  };

  if (done) {
    const pct = Math.round((score / exercises.length) * 100);
    return (
      <div className="py-12 animate-fadeIn flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-2xl" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981", boxShadow: "0 0 40px rgba(16,185,129,0.2)" }}>
          <Trophy size={40} strokeWidth={1.5} />
        </div>
        <h3 className="text-3xl font-black text-white mb-3 tracking-tight">Lab Completed!</h3>
        <p className="text-[15px] font-medium text-[var(--muted2)] mb-8">You successfully solved <span className="text-white font-bold">{score}</span> out of <span className="text-white font-bold">{exercises.length}</span> exercises.</p>
        <button onClick={reset} className="px-8 py-3 rounded-xl text-white font-bold hover:scale-105 active:scale-95 transition-all shadow-lg" style={{ background: "var(--orange)", boxShadow: "0 10px 25px rgba(241,90,34,0.3)" }}>Replay Lab</button>
      </div>
    );
  }

  return <ArrangeExercise data={exercises[currentIdx]} onNext={handleNext} current={currentIdx} total={exercises.length} />;
}

function ArrangeExercise({ data, onNext, current, total }: { data: any, onNext: (correct: boolean) => void, current: number, total: number }) {
  const [items, setItems] = useState<any[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  
  const dragItem = useRef<number | null>(null);
  const dragOver = useRef<number | null>(null);

  React.useEffect(() => {
    setItems(shuffle([...data.lines.map((l:any, i:number) => typeof l === "string" ? {id: i, text: l} : l)]));
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
    const ok = items.every((item, i) => {
      if (item.id === data.order[i]) return true;
      const expectedId = data.order[i];
      const expectedLine = data.lines.find((l: any) => l.id === expectedId || l === expectedId);
      const expectedText = typeof expectedLine === 'string' ? expectedLine : expectedLine?.text;
      return item.text === expectedText;
    });
    setCorrect(ok);
    setSubmitted(true);
  };

  const handleReset = () => {
    setItems(shuffle([...data.lines.map((l:any, i:number) => typeof l === "string" ? {id: i, text: l} : l)]));
    setSubmitted(false);
    setCorrect(false);
  };

  const correctCode = (data.order||[]).map((id: any) => typeof id === "number" ? data.lines[id] : data.lines.find((line: any) => line.id === id)?.text || "").join("\n");

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <Badge text={`Exercise ${current + 1} of ${total}`} color="blue" />
      </div>
      <div className="p-4 rounded-xl border flex gap-3 items-start" style={{ background: "var(--surface2)", borderColor: "var(--border)" }}>
        <Shuffle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--orange)" }} />
        <div>
          <h5 className="text-xs font-bold text-[var(--text)]">Drag & Drop Assembler - {data.title || 'Arrange Code'}</h5>
          <p className="text-[11px] text-[var(--muted2)] mt-0.5 leading-relaxed text-justify">{(data.instructions || data.instruction) || data.instruction}</p>
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
            <div key={item.id} draggable onDragStart={() => onDragStart(i)} onDragEnter={() => onDragEnter(i)} onDragEnd={onDragEnd} onDragOver={e => e.preventDefault()} className="flex items-center gap-3 px-4 py-3 rounded-xl border cursor-grab select-none transition" style={{ background: bg, borderColor: border, color }}>
              <span className="text-gray-600 font-mono text-xs flex-shrink-0 select-none">⠿</span>
              <span className="font-mono text-xs flex-1 whitespace-pre overflow-hidden text-ellipsis">{item.text}</span>
              {isCorrect && <span className="text-emerald-400 font-bold text-xs">✓</span>}
              {isWrong && <span className="text-rose-400 font-bold text-xs">✗</span>}
            </div>
          );
        })}
      </div>
      {submitted && (
        <div className="p-4 rounded-xl border text-xs animate-fadeIn" style={{ background: correct ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)", borderColor: correct ? "rgba(16,185,129,0.25)" : "rgba(239,68,68,0.25)", color: correct ? "#34d399" : "#f87171" }}>
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
        {!submitted ? (
          <button onClick={handleCheck} className="flex-1 py-2.5 hover:opacity-95 active:scale-95 transition text-xs font-bold rounded-lg text-white shadow-md" style={{ background: "var(--orange)" }}>Check Order</button>
        ) : (
          <button onClick={() => onNext(correct)} className="flex-1 py-2.5 hover:opacity-95 active:scale-95 transition text-xs font-bold rounded-lg text-white shadow-md" style={{ background: "var(--orange)" }}>Next Exercise</button>
        )}
        <button onClick={handleReset} className="p-2.5 border rounded-lg text-[var(--muted2)] hover:text-white transition active:scale-95" style={{ background: "rgba(255,255,255,0.02)", borderColor: "var(--border)" }}><RotateCcw className="w-4 h-4" /></button>
      </div>
    </div>
  );
}
