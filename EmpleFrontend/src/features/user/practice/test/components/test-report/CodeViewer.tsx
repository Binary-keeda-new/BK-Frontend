import Editor from '@monaco-editor/react';
import { Loader2 } from 'lucide-react';

type Props = {
  language: string;
  sourceCode: string;
};

// Map Emple language strings to Monaco language IDs
const resolveLanguage = (lang: string) => {
  const l = lang.toLowerCase();
  if (l.includes('c++') || l.includes('cpp')) return 'cpp';
  if (l.includes('java') && !l.includes('script')) return 'java';
  if (l.includes('python')) return 'python';
  if (l.includes('javascript') || l.includes('js')) return 'javascript';
  if (l.includes('typescript') || l.includes('ts')) return 'typescript';
  return 'plaintext';
};

export default function CodeViewer({ language, sourceCode }: Props) {
  const monacoLanguage = resolveLanguage(language);

  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[#1e1e1e]">
      <Editor
        height="100%"
        language={monacoLanguage}
        theme="vs-dark"
        value={sourceCode}
        options={{
          readOnly: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          wordWrap: 'off',
          padding: { top: 16, bottom: 16 },
          lineNumbers: 'on',
          renderLineHighlight: 'none',
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
        }}
        loading={
          <div className="flex h-full items-center justify-center bg-[#1e1e1e]">
            <Loader2 className="h-6 w-6 animate-spin text-[var(--muted2)]" />
          </div>
        }
      />
    </div>
  );
}
