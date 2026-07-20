const fs = require('fs');
const file = 'src/features/user/tutorials/daa/components/TaskTabs.tsx';
let content = fs.readFileSync(file, 'utf8');

const customComponent = `
function HighlightedTextarea({ value, onChange, submitted, correct }: any) {
  const renderCode = (codeText: string) => {
    const regex = /(\\/\\*[\\s\\S]*?\\*\\/|\\/\\/.*)/g;
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
`;

const debugBlockMarker = 'function DebugBlock({ data, index, total, onXP, onNext }';

if(content.includes(debugBlockMarker)) {
    // We can just inject the HighlightedTextarea right before DebugBlock
    content = content.replace(debugBlockMarker, customComponent + '\n' + debugBlockMarker);
    
    // Now replace the textarea usage
    const oldTextareaRegex = /<textarea[\s\S]*?\/>/m;
    const newTextarea = `<HighlightedTextarea 
          value={code} 
          onChange={(e: any) => { setCode(e.target.value); setSubmitted(false); }}
          submitted={submitted}
          correct={correct}
        />`;
    
    // We only want to replace the first textarea in the file which belongs to DebugBlock.
    content = content.replace(oldTextareaRegex, newTextarea);

    fs.writeFileSync(file, content);
    console.log("Replaced textarea successfully.");
} else {
    console.log("Could not find DebugBlock marker");
}
