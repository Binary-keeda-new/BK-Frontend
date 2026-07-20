const fs = require('fs');
const file = 'src/features/user/tutorials/daa/components/TaskTabs.tsx';
let content = fs.readFileSync(file, 'utf8');

// The replacement code for Debug
const debugBlockCode = `
function DebugBlock({ data, index, total, onXP }: { data: any, index: number, total: number, onXP: (pts: number) => void }) {
  const [code, setCode] = React.useState(data.buggy);
  const [revealed, setRevealed] = React.useState<Record<number, boolean>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [correct, setCorrect] = React.useState(false);

  React.useEffect(() => {
    setCode(data.buggy);
    setRevealed({});
    setSubmitted(false);
    setCorrect(false);
  }, [data.buggy]);

  const revealHint = (i: number) => setRevealed(prev => ({ ...prev, [i]: true }));

  const handleCheck = () => {
    const ok = code.replace(/\\s+/g,"") === data.fixed.replace(/\\s+/g,"");
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
    <div className="space-y-6 animate-fadeIn pb-8 border-b border-white/5 last:border-0">
      <div 
        className="p-4 rounded-xl border flex gap-3 items-start"
        style={{ background: "var(--surface2)", borderColor: "var(--border)" }}
      >
        <Bug className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--orange)" }} />
        <div className="flex-1">
          <h5 className="text-xs font-bold text-[var(--text)]">Debugging Lab {total > 1 ? \`(\${index + 1}/\${total})\` : ''}</h5>
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
        <textarea 
          value={code} 
          onChange={e => { setCode(e.target.value); setSubmitted(false); }}
          className="w-full min-h-[220px] border rounded-xl p-4 text-xs font-mono outline-none leading-relaxed resize-none transition"
          style={{
            background: "var(--surface2)",
            borderColor: submitted ? (correct ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)") : "var(--border)",
            color: "var(--text)"
          }}
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
              <span className="shrink-0">{revealed[i] ? "💡" : \`🔒 Hint \${i + 1}\`}</span>
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

  return (
    <div className="space-y-8">
      {processedData.map((data, idx) => (
        <DebugBlock key={idx} data={data} index={idx} total={processedData.length} onXP={onXP} />
      ))}
    </div>
  );
}
`;

const completeBlockCode = `
function CompleteBlock({ data, index, total, onXP }: { data: any, index: number, total: number, onXP: (pts: number) => void }) {
  const [inputs, setInputs] = useState<string[]>(data.blanks.map(() => ""));
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);

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

  const parts = data.template.split(/\\/\\*\\[BLANK\\]\\*\\/|___/);
  let blankCount = 0;

  return (
    <div className="space-y-6 animate-fadeIn pb-8 border-b border-white/5 last:border-0">
      <div 
        className="p-4 rounded-xl border flex gap-3 items-start"
        style={{ background: "var(--surface2)", borderColor: "var(--border)" }}
      >
        <Edit3 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--orange)" }} />
        <div>
          <h5 className="text-xs font-bold text-[var(--text)]">Fill in the Blanks {total > 1 ? \`(\${index + 1}/\${total})\` : ''}</h5>
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
                    width: \`\${Math.max(data.blanks[bi]?.length || 4, 3) + 2}ch\`,
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
          {correct ? "✅ Code compiles successfully!" : \`❌ Compilation error. Incorrect inputs.\`}
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

  return (
    <div className="space-y-8">
      {processedData.map((data, idx) => (
        <CompleteBlock key={idx} data={data} index={idx} total={processedData.length} onXP={onXP} />
      ))}
    </div>
  );
}
`;

const debugStart = content.indexOf('export function DebugTab');
const completeStart = content.indexOf('export function CompleteTab');
const arrangeStart = content.indexOf('function ArrangeBlock');

if (debugStart > -1 && completeStart > -1 && arrangeStart > -1) {
  const beforeDebug = content.substring(0, debugStart);
  const afterComplete = content.substring(arrangeStart);
  
  const newContent = beforeDebug + debugBlockCode + "\n// ─── COMPLETE PANEL ───\n" + completeBlockCode + "\n\n" + afterComplete;
  fs.writeFileSync(file, newContent);
  console.log('Successfully updated TaskTabs.tsx');
} else {
  console.log('Could not find markers', { debugStart, completeStart, arrangeStart });
}
