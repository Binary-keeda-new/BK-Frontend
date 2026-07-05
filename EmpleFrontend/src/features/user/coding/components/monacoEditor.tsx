'use client';

import Editor from '@monaco-editor/react';
import { CodingProblem } from '../types/workspace';
import { LANGUAGE_MAP } from '../utils/languageMap';

interface Props {
  problem: CodingProblem;

  code: string;

  setCode: React.Dispatch<
    React.SetStateAction<string>
  >;

  language: string;
  running: boolean;
submitting: boolean;
onRunCode: () => void;
onSubmitCode: () => void;

  changeLanguage: (
    language: string
  ) => void;
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
  return (
    <div className="flex h-full flex-col">

      {/* Toolbar */}

      <div className="flex h-14 items-center justify-between border-b border-[var(--clr-border)] bg-[var(--clr-surface)] px-5">

        <select
          value={language}
          onChange={(e) =>
            changeLanguage(e.target.value)
          }
          className="rounded-lg border border-[var(--clr-border)] bg-transparent px-4 py-2 outline-none"
        >
          {problem.languages.map(
            (lang) => (
              <option
                key={lang}
                value={lang}
              >
                {lang}
              </option>
            )
          )}
        </select>

        <div className="flex items-center gap-2">
  <button
    type="button"
    onClick={onRunCode}
    disabled={running || submitting}
    className="rounded-lg border border-[var(--clr-border)] px-4 py-2 text-sm font-semibold text-[var(--clr-text)] disabled:opacity-50"
  >
    {running ? 'Running...' : 'Run'}
  </button>

  <button
    type="button"
    onClick={onSubmitCode}
    disabled={running || submitting}
    className="rounded-lg bg-[var(--clr-accent)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
  >
    {submitting ? 'Submitting...' : 'Submit'}
  </button>
</div>

      </div>

      {/* Monaco Editor */}

      <div className="flex-1">

        <Editor
          height="100%"
          language={
            LANGUAGE_MAP[
              language as keyof typeof LANGUAGE_MAP
            ]
          }
          value={code}
          onChange={(value) =>
            setCode(value ?? '')
          }
          theme="vs-dark"
          options={{
            automaticLayout: true,

            minimap: {
              enabled: false,
            },

            fontSize: 15,

            scrollBeyondLastLine: false,

            wordWrap: 'on',

            tabSize: 4,

            padding: {
              top: 20,
            },
          }}
        />

      </div>

    </div>
  );
}