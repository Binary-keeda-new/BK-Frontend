'use client';

import type { ExecutionResponseData } from '../services/executionService';

type Props = {
  running: boolean;
  submitting: boolean;
  result: ExecutionResponseData | null;
  error: string;
  customInput: string;
  setCustomInput: React.Dispatch<React.SetStateAction<string>>;
  onRunCode: () => void;
};

export default function ConsolePanel({
  running,
  submitting,
  result,
  error,
  customInput,
  setCustomInput,
  onRunCode,
}: Props) {
  const isBusy = running || submitting;
  const results = Array.isArray(result?.results) ? result.results : [];
  const hasExecutionResult = result !== null;

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-[var(--clr-background)] p-4">
      <div className="mb-3 flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--clr-text3)]">
            Execution Console
          </h2>
        </div>

        {isBusy && (
          <span className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            {running ? 'Running code...' : 'Submitting solution...'}
          </span>
        )}
      </div>

      {error ? (
        <div className="mb-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
          <p className="font-bold">Execution Error</p>
          <p className="mt-1 text-xs">{error}</p>
        </div>
      ) : null}

      {!hasExecutionResult && !isBusy && !error ? (
        <div className="mb-4 flex flex-1 items-center justify-center rounded-2xl border border-dashed border-[var(--clr-border)] bg-[var(--clr-surface)] p-6 text-center">
          <div>
            <p className="text-sm font-bold text-[var(--clr-text)]">
              Console Ready
            </p>
            <p className="mt-1 text-xs text-[var(--clr-text3)]">
              Click Run Code to test your solution or enter Custom Input below.
            </p>
          </div>
        </div>
      ) : null}

      {hasExecutionResult ? (
        <div className="mb-4 space-y-3">
          {/* Summary Bar */}
          {typeof result?.passedCount === 'number' && typeof result?.totalCount === 'number' && result.totalCount > 0 ? (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--clr-text3)]">
                  Summary
                </p>
                <p className="mt-1 text-sm font-semibold text-[var(--clr-text)]">
                  Passed {result.passedCount} of {result.totalCount} test cases
                </p>
              </div>

              {typeof result.accepted === 'boolean' && (
                <span
                  className={`rounded-full border px-4 py-1.5 text-xs font-bold ${
                    result.accepted
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                      : 'border-red-500/30 bg-red-500/10 text-red-400'
                  }`}
                >
                  {result.accepted ? 'Accepted' : 'Not Accepted'}
                </span>
              )}
            </div>
          ) : null}

          {/* Compile Output */}
          {result?.compileOutput ? (
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 font-mono text-xs text-amber-300">
              <p className="mb-1 font-sans font-bold text-amber-400">Compilation Log:</p>
              <pre className="whitespace-pre-wrap overflow-x-auto">{result.compileOutput}</pre>
            </div>
          ) : null}

          {/* Stderr */}
          {result?.stderr ? (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 font-mono text-xs text-red-300">
              <p className="mb-1 font-sans font-bold text-red-400">Standard Error:</p>
              <pre className="whitespace-pre-wrap overflow-x-auto">{result.stderr}</pre>
            </div>
          ) : null}

          {/* Stdout */}
          {result?.stdout ? (
            <div className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-4 font-mono text-xs text-[var(--clr-text)]">
              <p className="mb-1 font-sans font-bold text-[var(--clr-text3)]">Standard Output:</p>
              <pre className="whitespace-pre-wrap overflow-x-auto">{result.stdout}</pre>
            </div>
          ) : null}

          {/* Status Message */}
          {result?.message ? (
            <div className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-3 text-xs text-[var(--clr-text2)] font-mono">
              <span className="font-sans font-bold text-[var(--clr-text3)]">Status:</span> {result.message}
            </div>
          ) : null}

          {/* Fallback if execution finished with empty output */}
          {!result?.compileOutput && !result?.stderr && !result?.stdout && !result?.message && results.length === 0 && (
            <div className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-4 text-xs text-[var(--clr-text2)]">
              Code executed successfully with no stdout/stderr output.
            </div>
          )}

          {/* Mapped Test Cases */}
          {results.length > 0 && (
            <div className="grid gap-3">
              {results.map((item, index) => (
                <div
                  key={`${item.input || index}-${index}`}
                  className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-4"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-sm font-bold text-[var(--clr-text)]">
                      Test Case {index + 1}
                    </p>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        item.passed
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-red-500/10 text-red-400'
                      }`}
                    >
                      {item.passed ? 'Passed' : 'Failed'}
                    </span>
                  </div>

                  <div className="grid gap-2 text-xs text-[var(--clr-text2)]">
                    <ConsoleRow label="Input" value={item.input || '(empty)'} />
                    {item.expectedOutput && (
                      <ConsoleRow label="Expected Output" value={item.expectedOutput} />
                    )}
                    {item.actualOutput && (
                      <ConsoleRow label="Actual Output" value={item.actualOutput} />
                    )}
                    {item.status?.description && (
                      <ConsoleRow label="Status" value={item.status.description} />
                    )}
                    {item.time && <ConsoleRow label="Time" value={item.time} />}
                    {item.memory ? (
                      <ConsoleRow label="Memory" value={`${item.memory} KB`} />
                    ) : null}
                    {item.stderr && (
                      <ConsoleRow label="Error" value={item.stderr} danger />
                    )}
                    {item.compileOutput && (
                      <ConsoleRow label="Compile" value={item.compileOutput} danger />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}

      {/* Custom Input Area */}
      <div className="mt-auto rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-surface)] p-4 shrink-0">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--clr-text3)]">
          Custom Test Input
        </p>

        <textarea
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="Enter custom input here..."
          className="h-20 w-full resize-none rounded-xl border border-[var(--clr-border)] bg-[var(--clr-surface2)] p-3 font-mono text-xs text-[var(--clr-text)] outline-none focus:border-[var(--clr-accent)]"
        />

        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={onRunCode}
            disabled={isBusy}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-emerald-700 disabled:opacity-50"
          >
            {running ? 'Running...' : 'Run Custom Test'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ConsoleRow({
  label,
  value,
  danger = false,
}: {
  label: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div className="rounded-xl bg-[var(--clr-surface2)] px-3 py-2 font-mono text-xs">
      <span className="font-sans font-semibold text-[var(--clr-text)]">{label}:</span>{' '}
      <span className={danger ? 'text-red-300' : 'text-[var(--clr-text2)]'}>{value}</span>
    </div>
  );
}