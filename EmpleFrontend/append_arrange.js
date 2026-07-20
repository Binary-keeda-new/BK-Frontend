const fs = require('fs');

const code = `

function ArrangeBlock({ data, index, total, onXP }: { data: any, index: number, total: number, onXP: (pts: number) => void }) {
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
    .map((id: string) => data.lines.find((line: any) => line.id === id)?.text || "")
    .join("\\n");

  return (
    <div className="space-y-6 animate-fadeIn pb-8 border-b border-white/5 last:border-0">
      <div 
        className="p-4 rounded-xl border flex gap-3 items-start"
        style={{ background: "var(--surface2)", borderColor: "var(--border)" }}
      >
        <Shuffle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--orange)" }} />
        <div>
          <h5 className="text-xs font-bold text-[var(--text)]">Drag & Drop Assembler {total > 1 ? \`(\${index + 1}/\${total})\` : ''}</h5>
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

  return (
    <div className="space-y-8">
      {processedData.map((data, idx) => (
        <ArrangeBlock key={idx} data={data} index={idx} total={processedData.length} onXP={onXP} />
      ))}
    </div>
  );
}
`;

fs.appendFileSync('src/features/user/tutorials/daa/components/TaskTabs.tsx', code);
