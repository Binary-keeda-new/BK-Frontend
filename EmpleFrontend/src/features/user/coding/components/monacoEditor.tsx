'use client';

import Editor from '@monaco-editor/react';
import { CodingProblem } from '../types/workspace';
import { LANGUAGE_MAP } from '../utils/languageMap';

interface Props {
  problem: CodingProblem;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  language: string;
  running: boolean;
  submitting: boolean;
  onRunCode: () => void;
  onSubmitCode: () => void;
  changeLanguage: (language: string) => void;
}

export default function MonacoEditor({
  problem,
  code,
  setCode,
  language,
  changeLanguage,
  running,
  submitting,
  onRunCode,
  onSubmitCode,
}: Props) {
  const lang = language as keyof typeof problem.codeTemplates;

  const lockedPrefix = problem?.lockedPrefixTemplates?.[lang] || '';
  const lockedSuffix = problem?.lockedSuffixTemplates?.[lang] || '';

  const hasLockedCode = Boolean(lockedPrefix || lockedSuffix);

  const availableLanguages = Array.isArray(problem?.languages) && problem.languages.length > 0
    ? problem.languages
    : ['Java', 'Python', 'C++', 'C'];

  const handleEditorChange = (value?: string) => {
    const nextValue = value ?? '';

    if (!hasLockedCode) {
      setCode(nextValue);
      return;
    }

    let editableCode = nextValue;

    if (lockedPrefix && editableCode.startsWith(lockedPrefix)) {
      editableCode = editableCode.slice(lockedPrefix.length);
    }

    if (lockedSuffix && editableCode.endsWith(lockedSuffix)) {
      editableCode = editableCode.slice(0, -lockedSuffix.length);
    }

    const restoredCode = `${lockedPrefix}${editableCode}${lockedSuffix}`;

    setCode(restoredCode);
  };

  const monacoLanguage = LANGUAGE_MAP[language as keyof typeof LANGUAGE_MAP] || 'java';

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center justify-between border-b border-[var(--clr-border)] bg-[var(--clr-surface)] px-4 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--clr-text3)]">
            Language
          </span>

          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="rounded-xl border border-[var(--clr-border)] bg-[var(--clr-surface2)] px-3 py-1.5 text-xs text-[var(--clr-text)] font-semibold outline-none focus:border-[var(--clr-accent)]"
          >
            {availableLanguages.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>

          {hasLockedCode && (
            <span className="rounded-full border border-[var(--clr-border)] bg-[var(--clr-surface2)] px-3 py-1 text-xs font-semibold text-[var(--clr-text3)]">
              Starter templates enabled
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRunCode}
            disabled={running || submitting}
            className="rounded-xl bg-emerald-700 px-4 py-1.5 text-xs font-bold text-white transition hover:bg-emerald-600 disabled:opacity-50"
          >
            {running ? 'Running...' : 'Run Code'}
          </button>

          <button
            type="button"
            onClick={onSubmitCode}
            disabled={running || submitting}
            className="rounded-xl bg-[var(--clr-accent)] px-4 py-1.5 text-xs font-bold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Code'}
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          language={monacoLanguage}
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            automaticLayout: true,
            minimap: {
              enabled: false,
            },
            fontSize: 14,
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            tabSize: 4,
            padding: {
              top: 16,
            },
            smoothScrolling: true,
            cursorSmoothCaretAnimation: 'on',
            renderLineHighlight: 'all',
            bracketPairColorization: {
              enabled: true,
            },
            guides: {
              bracketPairs: true,
            },
          }}
        />
      </div>
    </div>
  );
}